import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Todo } from '../types';
import { Calendar } from 'lucide-react';

interface TimelineProps {
  todos: Todo[];
}

export default function Timeline({ todos }: TimelineProps) {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Calendar className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Monthly Timeline</h2>
      </div>
      
      <div className="space-y-4">
        {days.map((day) => {
          const dayTodos = todos.filter(
            (todo) => format(new Date(todo.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );

          if (dayTodos.length === 0) return null;

          return (
            <div key={day.toISOString()} className="border-l-2 border-blue-200 pl-4">
              <div className="text-sm font-medium text-gray-500">
                {format(day, 'EEEE, MMMM d')}
              </div>
              <div className="mt-2 space-y-2">
                {dayTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-2 rounded-md ${
                      todo.completed ? 'bg-green-50' : 'bg-yellow-50'
                    }`}
                  >
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                      {todo.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}