import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ComposedChart, Line } from 'recharts';
import { doc, updateDoc, collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';
import { FaTasks, FaClock, FaCheckCircle } from 'react-icons/fa';
import { 
  SendHorizonal,
  TrendingUp,
  Users,
  Building2,
  Flower2,
  Heart,
  Bookmark
} from 'lucide-react';
import { updateTodoStatus, checkAndCreateRecurringTodos } from '../firebase';
import TodoInput from './TodoInput';

interface Todo {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  completed?: boolean;
  status?: 'completed' | 'pending';
  isRecurring?: boolean;
  mainTodoId?: string;
  completedAt?: string;
}

interface TodoRecurrence {
  id: string;
  mainTodoId: string;
  pattern: RepeatPattern;
  nextDate: string;
  lastCompletedDate?: string;
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface DashboardProps {
  todos: Todo[];
  categories: Category[];
  onEditTodo: (todo: Todo) => void;
  onUpdate: () => void;
}

type RepeatPattern = 'daily' | 'workdays' | 'weekends' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'semiannual' | 'yearly';

const categoryIcons = {
  'dripsender': SendHorizonal,
  'upgrading': TrendingUp,
  'parenting': Users,
  'umrah': Building2,
  'habbats': Flower2,
  'dakwah': Heart,
  'default': Bookmark
};

const getCategoryIcon = (categoryName: string) => {
  const lowercaseName = categoryName.toLowerCase();
  for (const [key, Icon] of Object.entries(categoryIcons)) {
    if (lowercaseName.includes(key)) {
      return Icon;
    }
  }
  return categoryIcons.default;
};

const adjustColor = (color: string, amount: number) => {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255,Math.max(0,parseInt(color,16)+amount)).toString(16)).substr(-2));
};

const getNextDate = (currentDate: string, repeatType: RepeatPattern): string => {
  const date = new Date(currentDate);
  switch (repeatType) {
    case 'daily':
      date.setDate(date.getDate() + 1);
      break;
    case 'workdays':
      do {
        date.setDate(date.getDate() + 1);
      } while (date.getDay() === 0 || date.getDay() === 6);
      break;
    case 'weekends':
      do {
        date.setDate(date.getDate() + 1);
      } while (date.getDay() !== 0 && date.getDay() !== 6);
      break;
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'biweekly':
      date.setDate(date.getDate() + 14);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'quarterly':
      date.setMonth(date.getMonth() + 3);
      break;
    case 'semiannual':
      date.setMonth(date.getMonth() + 6);
      break;
    case 'yearly':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      return currentDate;
  }
  return date.toISOString().split('T')[0];
};

const isSameDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const Dashboard: React.FC<DashboardProps> = ({ 
  todos, 
  categories, 
  onEditTodo,
  onUpdate 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<{
    title: string;
    description: string;
    category: string;
    date: string;
    repeat?: string;
  } | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const checkRecurring = async () => {
      try {
        await checkAndCreateRecurringTodos();
        if (typeof onUpdate === 'function') {
          onUpdate();
        }
      } catch (error) {
        console.error('Error checking recurring todos:', error);
      }
    };
    
    checkRecurring();
  }, [onUpdate]);

  const handleTodoComplete = async (todo: Todo) => {
    try {
      const newStatus = todo.status !== 'completed';

      await updateTodoStatus(
        todo.id,
        newStatus,
        todo.isRecurring || false,
        todo.mainTodoId
      );

      if (typeof onUpdate === 'function') {
        onUpdate();
      }

      toast.success(
        newStatus 
          ? 'Todo selesai!' 
          : 'Todo belum selesai'
      );
    } catch (error) {
      console.error('Error updating todo status:', error);
      toast.error('Gagal mengupdate status todo');
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo({
      title: todo.title,
      description: todo.description,
      category: todo.category,
      date: todo.date,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const filteredTodos = todos.map(todo => ({
    ...todo,
    status: todo.completed ? 'completed' : 'pending'
  })).filter(todo => {
    if (selectedCategory !== 'all' && todo.category !== selectedCategory) return false;
    if (statusFilter !== 'all' && todo.status !== statusFilter) return false;
    if (dateRange.start && todo.date < dateRange.start) return false;
    if (dateRange.end && todo.date > dateRange.end) return false;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const pieChartData = [
    {
      name: 'Selesai',
      value: filteredTodos.filter((todo) => todo.completed).length,
    },
    {
      name: 'Pending',
      value: filteredTodos.filter((todo) => !todo.completed).length,
    },
  ];

  const barChartData = categories.map((category) => ({
    category: category.name,
    completed: filteredTodos.filter(
      (todo) => todo.category === category.id && todo.completed
    ).length,
    pending: filteredTodos.filter(
      (todo) => todo.category === category.id && !todo.completed
    ).length,
  }));

  const handleResetFilter = () => {
    setSelectedCategory('all');
    setDateRange({ start: '', end: '' });
    setStatusFilter('all');
  };

  const getLastWeekData = () => {
    const today = new Date();
    const data = [];

    // Mengambil data 6 hari ke belakang + hari ini (total 7 hari)
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Set waktu ke 00:00:00 untuk perbandingan yang akurat
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      // Filter todo berdasarkan tanggal pembuatan
      const todosCreatedOnDate = filteredTodos.filter(todo => {
        if (!todo.date) return false;
        const createdDate = new Date(todo.date);
        return createdDate >= date && createdDate < nextDate;
      });

      // Hitung todo yang selesai pada tanggal tersebut (berdasarkan completedAt)
      const completedOnDate = filteredTodos.filter(todo => {
        if (!todo.completed || !todo.completedAt) return false;
        const completedDate = new Date(todo.completedAt);
        return completedDate >= date && completedDate < nextDate;
      }).length;

      // Hitung pending berdasarkan todo yang tidak selesai pada tanggal pembuatannya
      const pendingOnDate = todosCreatedOnDate.filter(todo => {
        // Jika todo sudah selesai, cek apakah diselesaikan di hari yang sama dengan pembuatannya
        if (todo.completed && todo.completedAt) {
          const completedDate = new Date(todo.completedAt);
          const createdDate = new Date(todo.date);
          // Set waktu ke 00:00:00 untuk perbandingan yang akurat
          completedDate.setHours(0, 0, 0, 0);
          createdDate.setHours(0, 0, 0, 0);
          // Jika selesai di hari yang sama, tidak dihitung sebagai pending
          return !isSameDay(completedDate, createdDate);
        }
        // Jika belum selesai, hitung sebagai pending
        return true;
      }).length;

      data.push({
        date: date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }),
        completed: completedOnDate,
        pending: pendingOnDate,
        total: todosCreatedOnDate.length
      });
    }
    return data;
  };

  const renderTodoList = () => {
    const mappedTodos = sortedTodos.map(todo => ({
      ...todo,
      status: todo.completed ? 'completed' : 'pending'
    }));

    // Hitung total halaman
    const totalPages = Math.ceil(mappedTodos.length / itemsPerPage);
    
    // Ambil todo untuk halaman saat ini
    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentTodos = mappedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Todo Harian</h2>
          <div className="space-y-4">
            {mappedTodos.length > 0 ? (
              <>
                {currentTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`border-2 rounded-xl p-5 transition-all duration-200 ${
                      todo.completed
                        ? 'bg-green-50 border-green-200'
                        : 'hover:border-blue-300 border-gray-200 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center space-x-4 flex-grow">
                        <button
                          onClick={() => handleTodoComplete(todo)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200
                            ${
                              todo.completed
                                ? 'bg-green-500 border-green-500 hover:bg-green-600'
                                : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                            }`}
                          title={todo.completed ? "Tandai belum selesai" : "Tandai selesai"}
                        >
                          {todo.completed && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex items-center space-x-3 flex-grow">
                          <div
                            className="w-4 h-4 rounded-full ring-2 ring-offset-2"
                            style={{
                              backgroundColor: categories.find((c) => c.id === todo.category)?.color,
                              ringColor: categories.find((c) => c.id === todo.category)?.color,
                            }}
                            title={categories.find((c) => c.id === todo.category)?.name}
                          />
                          <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {todo.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                            todo.completed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {todo.completed ? '✓ Selesai' : '⏳ Pending'}
                        </span>
                        {!todo.completed && (
                          <button
                            onClick={() => handleEditClick(todo)}
                            className="px-4 py-1.5 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-1"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <span>Edit</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <p className={`text-base ${todo.completed ? 'text-gray-500' : 'text-gray-600'}`}>
                        {todo.description}
                      </p>
                      <div className="flex items-center space-x-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-500 font-medium">
                          {new Date(todo.date).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-lg ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      <span className="hidden sm:inline">Sebelumnya</span>
                      <span className="sm:hidden">←</span>
                    </button>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {totalPages <= 5 ? (
                        // Jika total halaman <= 5, tampilkan semua nomor
                        [...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-lg ${
                              currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))
                      ) : (
                        // Jika total halaman > 5, tampilkan dengan ellipsis
                        <>
                          {/* Selalu tampilkan halaman pertama */}
                          <button
                            onClick={() => setCurrentPage(1)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-lg ${
                              currentPage === 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            1
                          </button>

                          {/* Ellipsis di awal jika perlu */}
                          {currentPage > 3 && <span className="px-1">...</span>}

                          {/* Halaman di sekitar halaman aktif */}
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            if (
                              pageNumber !== 1 &&
                              pageNumber !== totalPages &&
                              (Math.abs(pageNumber - currentPage) <= 1 ||
                                (currentPage <= 3 && pageNumber <= 4) ||
                                (currentPage >= totalPages - 2 && pageNumber >= totalPages - 3))
                            ) {
                              return (
                                <button
                                  key={pageNumber}
                                  onClick={() => setCurrentPage(pageNumber)}
                                  className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-lg ${
                                    currentPage === pageNumber
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  {pageNumber}
                                </button>
                              );
                            }
                            return null;
                          })}

                          {/* Ellipsis di akhir jika perlu */}
                          {currentPage < totalPages - 2 && <span className="px-1">...</span>}

                          {/* Selalu tampilkan halaman terakhir */}
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-lg ${
                              currentPage === totalPages
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-lg ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      <span className="hidden sm:inline">Selanjutnya</span>
                      <span className="sm:hidden">→</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-600 font-medium">Tidak ada todo yang sesuai dengan filter</p>
                <p className="text-gray-500 text-sm mt-1">Coba ubah filter atau tambah todo baru</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingTodo ? 'Edit Todo' : 'Tambah Todo Baru'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <TodoInput
              categories={categories}
              editingTodo={editingTodo}
              setEditingTodo={setEditingTodo}
              onTodoAdded={() => {
                handleCloseModal();
                if (onUpdate) onUpdate();
              }}
            />
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">Todo Dashboard</h1>
        </div>
      </header>

        {/* Filter Buttons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm p-4 mb-6">
            <div className="overflow-x-auto">
              <div className="flex flex-nowrap gap-3 pb-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`group flex-shrink-0 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200/50'
                      : 'bg-white text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center">
                    <Bookmark className={`w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110 ${
                      selectedCategory === 'all' ? '' : 'group-hover:text-blue-500'
                    }`} />
                    <span className="font-medium whitespace-nowrap">Semua</span>
                  </div>
                </button>
                {categories.map((category) => {
                  const IconComponent = getCategoryIcon(category.name);
                  const categoryColorRgb = category.color.match(/\d+/g);
                  const shadowColor = categoryColorRgb ? `rgba(${categoryColorRgb[0]}, ${categoryColorRgb[1]}, ${categoryColorRgb[2]}, 0.3)` : 'rgba(0, 0, 0, 0.1)';

                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsModalOpen(false);
                      }}
                      className={`group flex-shrink-0 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                        selectedCategory === category.id
                          ? 'text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md'
                      }`}
                      style={{
                        background: selectedCategory === category.id 
                          ? `linear-gradient(235deg, ${category.color}, ${adjustColor(category.color, -20)})`
                          : undefined,
                        boxShadow: selectedCategory === category.id 
                          ? `0 10px 15px -3px ${shadowColor}`
                          : undefined
                      }}
                    >
                      <div className="flex items-center">
                        <IconComponent className={`w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110 ${
                          selectedCategory === category.id ? '' : `group-hover:text-[${category.color}]`
                        }`} />
                        <span className="font-medium whitespace-nowrap">{category.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      {/* Status Filter Buttons */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between w-full">
          <div className="grid grid-cols-3 sm:flex gap-2 sm:gap-3">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 transition-all duration-200 transform hover:scale-105 ${
                statusFilter === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white hover:bg-blue-50 text-gray-700 border-2 border-gray-100 hover:border-blue-200'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="font-medium text-sm sm:text-base">Semua</span>
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 transition-all duration-200 transform hover:scale-105 ${
                statusFilter === 'pending'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-200'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border-2 border-gray-100 hover:border-amber-200'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-sm sm:text-base">Pending</span>
              {statusFilter !== 'completed' && (
                <span className="hidden sm:inline-flex px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                  {sortedTodos.filter(t => !t.completed).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 transition-all duration-200 transform hover:scale-105 ${
                statusFilter === 'completed'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-200'
                  : 'bg-white hover:bg-green-50 text-gray-700 border-2 border-gray-100 hover:border-green-200'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-sm sm:text-base">Selesai</span>
              {statusFilter !== 'pending' && (
                <span className="hidden sm:inline-flex px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                  {sortedTodos.filter(t => t.completed).length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Tanggal */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-1 sm:flex-initial items-center gap-2 bg-gray-100 p-2 sm:p-3 rounded-xl">
              <div className="flex flex-1 sm:flex-initial items-center gap-2">
                <div className="relative flex-1 sm:flex-initial">
                  <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                    className="w-full sm:w-auto pl-8 sm:pl-10 pr-2 sm:pr-4 py-2 text-sm rounded-lg border-2 border-transparent bg-white shadow-sm
                      focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                  />
                </div>
                <span className="text-gray-500 font-medium text-sm whitespace-nowrap">sampai</span>
                <div className="relative flex-1 sm:flex-initial">
                  <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                    className="w-full sm:w-auto pl-8 sm:pl-10 pr-2 sm:pr-4 py-2 text-sm rounded-lg border-2 border-transparent bg-white shadow-sm
                      focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleResetFilter}
              className="px-4 py-2 text-sm bg-white text-gray-700 rounded-lg hover:bg-gray-200 
                transition-colors duration-200 flex items-center justify-center gap-2 border-2 border-transparent 
                hover:border-gray-300 active:bg-gray-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset Filter</span>
            </button>
          </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Statistik Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <FaTasks className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  TOTAL TUGAS
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{filteredTodos.length}</h3>
              <p className="text-sm text-gray-600">Total keseluruhan tugas</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-500 p-3 rounded-lg">
                  <FaClock className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                  PENDING
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{filteredTodos.filter(todo => !todo.completed).length}</h3>
              <p className="text-sm text-gray-600">Tugas yang belum selesai</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-500 p-3 rounded-lg">
                  <FaCheckCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  SELESAI
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{filteredTodos.filter(todo => todo.completed).length}</h3>
              <p className="text-sm text-gray-600">Tugas yang sudah selesai</p>
            </div>
          </div>

          {/* 3 Kolom Tambahan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Kolom 1: Daftar Todo Pending */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-lg border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Todo Pending</h3>
                <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                  {filteredTodos.filter(todo => !todo.completed).length} TUGAS
                </span>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                {filteredTodos.filter(todo => !todo.completed).map(todo => {
                  const todoDate = new Date(todo.date);
                  const today = new Date();
                  const isOverdue = todoDate < today && !todo.completed;

                  return (
                    <div key={todo.id} className="bg-white p-3 rounded-lg shadow-sm hover:shadow transition-shadow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-800">{todo.title}</h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          isOverdue ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                          {todoDate.toLocaleDateString('id-ID', { 
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                          {categories.find((c) => c.id === todo.category)?.name || todo.category}
                        </span>
                        {isOverdue && (
                          <span className="text-xs font-medium text-red-600">
                            Terlambat
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                {filteredTodos.filter(todo => !todo.completed).length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    Tidak ada todo pending
                  </div>
                )}
              </div>
            </div>

            {/* Kolom 2: Grafik Kombinasi */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Progres Minggu Ini</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={getLastWeekData()}>
                  <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="pending" fill="#FFA500" name="Pending" />
                  <Bar dataKey="completed" fill="#10B981" name="Selesai" />
                  <Line type="monotone" dataKey="total" stroke="#2563EB" name="Total" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Kolom 3: Daftar Todo Selesai Hari Ini */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Todo Selesai Hari Ini</h3>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {filteredTodos.filter(todo => {
                    if (!todo.completed || !todo.completedAt) return false;
                    const today = new Date();
                    const completedDate = new Date(todo.completedAt);
                    return (
                      completedDate.getDate() === today.getDate() &&
                      completedDate.getMonth() === today.getMonth() &&
                      completedDate.getFullYear() === today.getFullYear()
                    );
                  }).length} SELESAI
                </span>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                {filteredTodos
                  .filter(todo => {
                    if (!todo.completed || !todo.completedAt) return false;
                    const today = new Date();
                    const completedDate = new Date(todo.completedAt);
                    return (
                      completedDate.getDate() === today.getDate() &&
                      completedDate.getMonth() === today.getMonth() &&
                      completedDate.getFullYear() === today.getFullYear()
                    );
                  })
                  .map(todo => (
                    <div key={todo.id} className="bg-white p-3 rounded-lg shadow-sm hover:shadow transition-shadow">
                      <h4 className="font-medium text-gray-800">{todo.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          {categories.find(cat => cat.id === todo.category)?.name || todo.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          Selesai: {new Date(todo.completedAt || '').toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                {filteredTodos.filter(todo => {
                  if (!todo.completed || !todo.completedAt) return false;
                  const today = new Date();
                  const completedDate = new Date(todo.completedAt);
                  return (
                    completedDate.getDate() === today.getDate() &&
                    completedDate.getMonth() === today.getMonth() &&
                    completedDate.getFullYear() === today.getFullYear()
                  );
                }).length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    Belum ada todo selesai hari ini
                  </div>
                )}
              </div>
            </div>
          </div>

          

          

          {/* Charts and Todo List */}
          <div className="space-y-6">
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Ringkasan Status Tugas</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#4ADE80" />
                        <Cell fill="#FCD34D" />
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Distribusi Kategori</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#4ADE80" name="Selesai" />
                      <Bar dataKey="pending" fill="#FCD34D" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Todo List Section */}
            <div className="bg-white rounded-lg shadow">
              {renderTodoList()}
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default Dashboard;
