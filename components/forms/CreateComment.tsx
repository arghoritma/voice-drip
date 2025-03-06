import React, { useEffect } from "react";
import { addCommentToRequest } from "@/actions/comments";
import { useActionState } from "react";

interface CreateCommentProps {
  requestId: string;
  onSuccess?: () => void;
}

interface CommentState {
  errors: {
    _form?: string;
  };
  success: boolean;
}

export default function CreateComment({
  requestId,
  onSuccess,
}: CreateCommentProps) {
  const initialState: CommentState = { errors: {}, success: false };
  const [state, formAction, isPending] = useActionState(
    (state: CommentState, formData: FormData) => {
      formData.append("requestId", requestId);
      return addCommentToRequest(
        requestId,
        formData.get("content") as string,
        formData,
        state
      );
    },
    initialState
  );

  useEffect(() => {
    if (state.success) {
      onSuccess && onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <div className="flex-1">
      <form action={formAction}>
        {state?.errors?._form && (
          <div className="text-error mb-2">{state.errors._form}</div>
        )}
        <textarea
          name="content"
          className="textarea textarea-bordered w-full"
          placeholder="Add a comment..."
          rows={3}
          required
          disabled={isPending}
        ></textarea>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner"></span>
              Posting...
            </>
          ) : (
            "Post Comment"
          )}
        </button>
      </form>
    </div>
  );
}
