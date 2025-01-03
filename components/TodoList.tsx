import React from 'react';
import { format } from 'date-fns';
import { Check, Clock, Trash2 } from 'lucide-react';
import { Todo } from '../types';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

interface TodoListProps {
  todos: Todo[];
  onUpdate: () => void;
}

export default function TodoList({ todos, onUpdate }: TodoListProps) {
  const toggleComplete = async (todo: Todo) => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed
      });
      onUpdate();
      toast.success('Todo updated successfully!');
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      onUpdate();
      toast.success('Todo deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
            todo.completed ? 'border-green-500' : 'border-yellow-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {todo.title}
              </h3>
              <p className="text-gray-600 mt-1">{todo.description}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {format(new Date(todo.date), 'PPP')}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleComplete(todo)}
                className={`p-2 rounded-full ${
                  todo.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                } hover:bg-opacity-80`}
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}