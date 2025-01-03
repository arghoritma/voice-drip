import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  startOfWeek,
  endOfWeek,
  subDays,
  startOfDay,
  endOfDay,
  isWithinInterval,
  addDays,
  subMonths,
  addMonths
} from 'date-fns';
import { Todo, Category } from '../types';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Bookmark, SendHorizonal, TrendingUp, Users } from 'lucide-react';
import TodoModal from './TodoModal';

// Fungsi untuk menyesuaikan warna (membuat lebih gelap)
const adjustColor = (color: string, amount: number): string => {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255,Math.max(0,parseInt(color,16)+amount)).toString(16)).substr(-2));
};

// Fungsi untuk mendapatkan icon kategori
const categoryIcons = {
  'dripsender': SendHorizonal,
  'upgrading': TrendingUp,
  'parenting': Users,
  // Tambahkan kategori lain sesuai kebutuhan
};

const getCategoryIcon = (categoryName: string) => {
  const lowerCaseName = categoryName.toLowerCase();
  return categoryIcons[lowerCaseName] || Bookmark;
};

// Fungsi untuk mendapatkan warna default kategori "Semua"
const getDefaultCategoryColor = () => {
  return {
    main: '#3B82F6', // blue-500
    darker: adjustColor('#3B82F6', -20),
    shadow: 'rgba(59, 130, 246, 0.3)' // blue-500 with opacity
  };
};

// Fungsi untuk mendapatkan warna kategori
const getCategoryColors = (color: string) => {
  if (!color.startsWith('#')) {
    // Jika warna dalam format RGB, konversi ke HEX
    const rgb = color.match(/\d+/g);
    if (!rgb) return getDefaultCategoryColor();
    
    color = '#' + rgb.map(x => {
      const hex = parseInt(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  return {
    main: color,
    darker: adjustColor(color, -20),
    shadow: `${color}4D` // 30% opacity in hex
  };
};

interface DateFilterOption {
  label: string;
  getValue: () => { start: Date; end: Date };
}

const dateFilterOptions: DateFilterOption[] = [
  {
    label: 'Minggu Ini',
    getValue: () => ({
      start: startOfWeek(new Date(), { weekStartsOn: 0 }),
      end: endOfWeek(new Date(), { weekStartsOn: 0 })
    })
  },
  {
    label: 'Minggu Lalu',
    getValue: () => ({
      start: startOfWeek(subDays(new Date(), 7), { weekStartsOn: 0 }),
      end: endOfWeek(subDays(new Date(), 7), { weekStartsOn: 0 })
    })
  },
  {
    label: 'Bulan Ini',
    getValue: () => ({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date())
    })
  },
  {
    label: 'Bulan Lalu',
    getValue: () => ({
      start: startOfMonth(subDays(startOfMonth(new Date()), 1)),
      end: endOfMonth(subDays(startOfMonth(new Date()), 1))
    })
  },
  {
    label: 'Bulan Depan',
    getValue: () => ({
      start: startOfMonth(addDays(endOfMonth(new Date()), 1)),
      end: endOfMonth(addDays(endOfMonth(new Date()), 1))
    })
  }
];

interface MonthlyViewProps {
  todos: Todo[];
  categories: Category[];
}

export default function MonthlyView({ todos, categories }: MonthlyViewProps) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<DateFilterOption>(dateFilterOptions[2]);
  const [customDateRange, setCustomDateRange] = useState<{ start: Date; end: Date }>({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  });

  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfWeek(customDateRange.start, { weekStartsOn: 0 }),
    end: endOfWeek(customDateRange.end, { weekStartsOn: 0 })
  });

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#3B82F6';
  };

  const filteredTodos = todos.filter(todo => {
    const todoDate = new Date(todo.date);
    const dateMatch = isWithinInterval(todoDate, {
      start: customDateRange.start,
      end: customDateRange.end
    });
    
    const categoryMatch = selectedCategory === 'all' || todo.category === selectedCategory;
    
    return dateMatch && categoryMatch;
  });

  const renderFilterDropdown = () => {
    return (
      <div className="relative w-full sm:w-auto">
        <button
          onClick={() => setShowDateFilter(!showDateFilter)}
          className="w-full sm:w-auto flex items-center justify-between space-x-2 px-4 py-2.5 text-sm bg-white border-2 border-violet-200 rounded-lg hover:bg-violet-50 hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
        >
          <span className="font-medium text-gray-700">{selectedFilter.label}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDateFilter ? 'transform rotate-180' : ''}`} />
        </button>

        {showDateFilter && (
          <>
            {/* Overlay untuk mobile */}
            <div 
              className="fixed inset-0 bg-black/20 z-40 sm:hidden"
              onClick={() => setShowDateFilter(false)}
            />
            
            {/* Dropdown content */}
            <div className="fixed sm:absolute bottom-0 sm:bottom-auto inset-x-0 sm:inset-auto sm:right-0 sm:top-full mt-2 z-50 bg-white border-2 border-violet-100 rounded-t-xl sm:rounded-xl shadow-xl transform transition-all duration-200 ease-out sm:w-80">
              <div className="p-2 border-b sm:hidden">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto"/>
              </div>
              <div className="max-h-[70vh] sm:max-h-[400px] overflow-y-auto custom-scrollbar">
                <div className="p-3">
                  {dateFilterOptions.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => {
                        const range = option.getValue();
                        setCustomDateRange(range);
                        setSelectedFilter(option);
                        setShowDateFilter(false);
                      }}
                      className="block w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-violet-50 rounded-lg transition-colors duration-150 mb-1 hover:shadow-sm"
                    >
                      {option.label}
                    </button>
                  ))}
                  <div className="border-t border-violet-100 mt-3 pt-4">
                    <div className="text-sm font-semibold text-gray-800 px-4 mb-3">Tanggal Custom</div>
                    <div className="px-4 space-y-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1.5">Tanggal Mulai</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2.5 border-2 border-violet-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 hover:border-violet-300"
                          value={format(customDateRange.start, 'yyyy-MM-dd')}
                          onChange={(e) => {
                            const newStart = new Date(e.target.value);
                            setCustomDateRange(prev => ({
                              ...prev,
                              start: startOfDay(newStart)
                            }));
                            setSelectedFilter({
                              label: 'Custom',
                              getValue: () => customDateRange
                            });
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1.5">Tanggal Akhir</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2.5 border-2 border-violet-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 hover:border-violet-300"
                          value={format(customDateRange.end, 'yyyy-MM-dd')}
                          onChange={(e) => {
                            const newEnd = new Date(e.target.value);
                            setCustomDateRange(prev => ({
                              ...prev,
                              end: endOfDay(newEnd)
                            }));
                            setSelectedFilter({
                              label: 'Custom',
                              getValue: () => customDateRange
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Category Filter Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm p-4">
          <div className="overflow-x-auto">
            <div className="flex flex-nowrap gap-3 pb-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`group flex-shrink-0 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                  selectedCategory === 'all'
                    ? 'text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md'
                }`}
                style={{
                  background: selectedCategory === 'all'
                    ? `linear-gradient(235deg, ${getDefaultCategoryColor().main}, ${getDefaultCategoryColor().darker})`
                    : undefined,
                  boxShadow: selectedCategory === 'all'
                    ? `0 10px 15px -3px ${getDefaultCategoryColor().shadow}`
                    : undefined
                }}
              >
                <div className="flex items-center">
                  <Bookmark className={`w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110 ${
                    selectedCategory === 'all' ? '' : `group-hover:text-[${getDefaultCategoryColor().main}]`
                  }`} />
                  <span className="font-medium whitespace-nowrap">Semua</span>
                </div>
              </button>
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category.name);
                const colors = getCategoryColors(category.color);

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group flex-shrink-0 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                      selectedCategory === category.id
                        ? 'text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md'
                    }`}
                    style={{
                      background: selectedCategory === category.id 
                        ? `linear-gradient(235deg, ${colors.main}, ${colors.darker})`
                        : undefined,
                      boxShadow: selectedCategory === category.id 
                        ? `0 10px 15px -3px ${colors.shadow}`
                        : undefined,
                      '--hover-color': colors.main // CSS variable untuk hover effect
                    } as React.CSSProperties}
                  >
                    <div className="flex items-center">
                      <IconComponent 
                        className={`w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110 ${
                          selectedCategory === category.id ? '' : 'group-hover:text-[var(--hover-color)]'
                        }`}
                        style={selectedCategory !== category.id ? { color: colors.main } : undefined}
                      />
                      <span className="font-medium whitespace-nowrap">{category.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 border-b bg-gradient-to-r from-violet-50 to-indigo-50 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="flex items-center justify-center w-full sm:w-auto space-x-2">
              <button
                onClick={() => {
                  const prevMonth = subMonths(customDateRange.start, 1);
                  setCustomDateRange({
                    start: startOfMonth(prevMonth),
                    end: endOfMonth(prevMonth)
                  });
                }}
                className="p-2 bg-white rounded-lg hover:bg-violet-100 transition-colors duration-200 border border-violet-200"
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft className="w-5 h-5 text-violet-600" />
              </button>

              <div className="p-2 bg-violet-100 rounded-lg">
                <Calendar className="w-5 h-5 text-violet-600" />
              </div>

              <button
                onClick={() => {
                  const nextMonth = addMonths(customDateRange.start, 1);
                  setCustomDateRange({
                    start: startOfMonth(nextMonth),
                    end: endOfMonth(nextMonth)
                  });
                }}
                className="p-2 bg-white rounded-lg hover:bg-violet-100 transition-colors duration-200 border border-violet-200"
                aria-label="Bulan selanjutnya"
              >
                <ChevronRight className="w-5 h-5 text-violet-600" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
              <h2 className="text-xl font-bold text-violet-700 tracking-wide">
                {format(customDateRange.start, 'MMMM yyyy')
                  .replace('January', 'Januari')
                  .replace('February', 'Februari')
                  .replace('March', 'Maret')
                  .replace('April', 'April')
                  .replace('May', 'Mei')
                  .replace('June', 'Juni')
                  .replace('July', 'Juli')
                  .replace('August', 'Agustus')
                  .replace('September', 'September')
                  .replace('October', 'Oktober')
                  .replace('November', 'November')
                  .replace('December', 'Desember')}
              </h2>
              <span className="text-sm font-medium text-gray-500 bg-white/50 px-3 py-1 rounded-full border border-gray-200">
                {format(today, 'd MMM yyyy')
                  .replace('Jan', 'Jan')
                  .replace('Feb', 'Feb')
                  .replace('Mar', 'Mar')
                  .replace('Apr', 'Apr')
                  .replace('May', 'Mei')
                  .replace('Jun', 'Jun')
                  .replace('Jul', 'Jul')
                  .replace('Aug', 'Agu')
                  .replace('Sep', 'Sep')
                  .replace('Oct', 'Okt')
                  .replace('Nov', 'Nov')
                  .replace('Dec', 'Des')}
              </span>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-center sm:justify-start">
            {renderFilterDropdown()}
          </div>
        </div>

        <div className="grid grid-cols-7 divide-x divide-y divide-violet-100/50">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
            <div key={day} className="bg-gradient-to-b from-violet-50 to-transparent p-3 text-sm font-semibold text-gray-700 text-center border-b-2 border-violet-100">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}

          {days.map((day) => {
            const dayTodos = filteredTodos.filter(
              todo => format(new Date(todo.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );

            return (
              <div
                key={day.toString()}
                className={`min-h-[120px] sm:min-h-[160px] p-2 sm:p-3 relative group rounded-lg m-0.5 ${
                  isToday(day)
                    ? 'bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 text-white shadow-lg shadow-violet-200/50'
                    : isSameMonth(day, customDateRange.start)
                      ? 'bg-white hover:bg-violet-50/50'
                      : 'bg-gray-50 text-gray-400'
                } transition-colors duration-200`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <span
                      className={`text-base sm:text-sm font-medium ${
                        !isSameMonth(day, customDateRange.start)
                          ? 'text-gray-400'
                          : isToday(day)
                          ? 'bg-white text-violet-600 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm'
                          : 'text-gray-700'
                      }`}
                    >
                      {format(day, 'd')}
                    </span>
                    
                    {dayTodos.length > 0 && (
                      <span className="text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 bg-violet-100 text-violet-600 rounded-full">
                        {dayTodos.length}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px] sm:max-h-[120px] scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-transparent">
                    {dayTodos.map(todo => (
                      <div
                        key={todo.id}
                        onClick={() => setSelectedTodo(todo)}
                        className={`text-xs p-1.5 rounded-lg cursor-pointer bg-white hover:bg-violet-200 text-violet-600 transition-colors duration-200 flex items-center space-x-1.5 ${
                          todo.completed ? 'opacity-50' : 'opacity-100'
                        }`}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getCategoryColor(todo.category) }}
                        />
                        <div className={`truncate flex-grow text-[11px] sm:text-xs ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                          {todo.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          categories={categories}
          isOpen={!!selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onUpdate={() => {
            setSelectedTodo(null);
          }}
        />
      )}
    </>
  );
}