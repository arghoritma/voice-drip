import React from "react";
import { Bookmark } from "lucide-react";

export default function Categories({ categories }: { categories: any[] }) {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm p-4 mb-6">
      <div className="overflow-x-auto">
        <div className="flex flex-nowrap gap-3 pb-1">
          <button className="group flex-shrink-0 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200/50">
            <div className="flex items-center">
              <Bookmark className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium whitespace-nowrap">Semua</span>
            </div>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className="group flex-shrink-0 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] bg-white text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center">
                <Bookmark className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#3b83f7]" />
                <span className="font-medium whitespace-nowrap">
                  {category.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
