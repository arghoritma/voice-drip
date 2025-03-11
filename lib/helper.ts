import { v4 as uuidv4 } from "uuid";

export const generateUUID = () => {
  return uuidv4();
};

interface ItemShareProps {
  id: string;
  title: string;
  description: string;
}

export const handleShare = async (item: ItemShareProps) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: item.title,
        text: item.description,
        url: `voice.drip.id/posts/${item.id}`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  }
};
