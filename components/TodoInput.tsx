import React, { useState, useRef, useEffect } from 'react';
import { db, auth, createTodoWithRecurrence } from '../config/firebase';
import { Category } from '../types';
import toast from 'react-hot-toast';
import { 
  SendHorizonal,
  TrendingUp,
  Users,
  Building2,
  Flower2,
  Heart,
  Bookmark,
  ChevronDown,
  PlusCircle,
  Calendar,
  Clock,
  Type,
  AlignLeft,
  RefreshCw
} from 'lucide-react';

interface TodoInputProps {
  categories: { id: string; name: string; color: string }[];
  editingTodo: { 
    title: string; 
    description: string; 
    category: string; 
    date: string;
    repeat?: string; 
  } | null;
  setEditingTodo: (todo: { 
    title: string; 
    description: string; 
    category: string; 
    date: string;
    repeat?: string;
  } | null) => void;
  onTodoAdded?: () => void;
}

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

const REPEAT_OPTIONS = [
  { id: 'never', label: 'Jangan Pernah', icon: '🚫', color: '#EF4444' },
  { id: 'daily', label: 'Harian', icon: '📅', color: '#3B82F6' },
  { id: 'workdays', label: 'Hari Kerja', icon: '💼', color: '#10B981' },
  { id: 'weekends', label: 'Akhir Pekan', icon: '🌅', color: '#F59E0B' },
  { id: 'weekly', label: 'Mingguan', icon: '📊', color: '#8B5CF6' },
  { id: 'biweekly', label: 'Dua Minggu Sekali', icon: '📆', color: '#EC4899' },
  { id: 'monthly', label: 'Bulanan', icon: '📌', color: '#6366F1' },
  { id: 'quarterly', label: 'Setiap 3 Bulan', icon: '🗓️', color: '#14B8A6' },
  { id: 'semiannual', label: 'Setiap 6 Bulan', icon: '📋', color: '#F97316' },
  { id: 'yearly', label: 'Tahunan', icon: '🎯', color: '#9333EA' }
];

export default function TodoInput({ categories, editingTodo, setEditingTodo, onTodoAdded }: TodoInputProps) {
  const [title, setTitle] = useState(editingTodo?.title || '');
  const [description, setDescription] = useState(editingTodo?.description || '');
  const [category, setCategory] = useState(editingTodo?.category || '');
  const [date, setDate] = useState(editingTodo?.date || '');
  const [repeat, setRepeat] = useState(editingTodo?.repeat || 'never');
  const [isOpen, setIsOpen] = useState(false);
  const [isRepeatOpen, setIsRepeatOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const repeatRef = useRef<HTMLDivElement>(null);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (repeatRef.current && !repeatRef.current.contains(event.target as Node)) {
        setIsRepeatOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedRepeatOption = REPEAT_OPTIONS.find(option => option.id === repeat);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }

    if (!title || !category || !date) {
      toast.error('Mohon isi semua field yang diperlukan');
      return;
    }

    setIsSubmitting(true);

    try {
      await createTodoWithRecurrence({
        title: title.trim(),
        description: description.trim(),
        category,
        date,
        repeat,
        userId
      });

      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setDate('');
      setRepeat('never');
      setIsOpen(false);
      setIsRepeatOpen(false);

      toast.success('Todo berhasil ditambahkan!');
      
      if (typeof onTodoAdded === 'function') {
        onTodoAdded();
      }
    } catch (error: any) {
      console.error('Error menambahkan todo:', error);
      toast.error(error?.message || 'Terjadi kesalahan saat menambahkan todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 transition-all duration-300 hover:shadow-md">
      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Type className="w-4 h-4 mr-2 text-gray-400" />
            Judul Todo
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder="Masukkan judul todo..."
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <AlignLeft className="w-4 h-4 mr-2 text-gray-400" />
            Deskripsi
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 min-h-[100px] resize-y"
            placeholder="Tambahkan detail tentang todo ini..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Bookmark className="w-4 h-4 mr-2 text-gray-400" />
              Kategori
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-left flex items-center justify-between"
              >
                {category ? (
                  <div className="flex items-center">
                    {(() => {
                      const selectedCategory = categories.find(cat => cat.id === category);
                      if (selectedCategory) {
                        const IconComponent = getCategoryIcon(selectedCategory.name);
                        return (
                          <>
                            <IconComponent className="w-4 h-4 mr-2" style={{ color: selectedCategory.color }} />
                            <span>{selectedCategory.name}</span>
                          </>
                        );
                      }
                      return 'Pilih Kategori';
                    })()}
                  </div>
                ) : (
                  <span className="text-gray-500">Pilih Kategori</span>
                )}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 max-h-60 overflow-auto">
                  {categories.map((cat) => {
                    const IconComponent = getCategoryIcon(cat.name);
                    return (
                      <div
                        key={cat.id}
                        className={`px-4 py-2.5 flex items-center cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                          category === cat.id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => {
                          setCategory(cat.id);
                          setIsOpen(false);
                        }}
                      >
                        <IconComponent 
                          className="w-4 h-4 mr-2 flex-shrink-0" 
                          style={{ color: cat.color }} 
                        />
                        <span className={`${category === cat.id ? 'font-medium' : 'font-normal'}`}>
                          {cat.name}
                        </span>
                        {category === cat.id && (
                          <svg className="h-4 w-4 text-blue-500 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Repeat Dropdown */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <RefreshCw className="w-4 h-4 mr-2 text-gray-400" />
              Pengulangan
            </label>
            <div className="relative" ref={repeatRef}>
              <button
                type="button"
                onClick={() => setIsRepeatOpen(!isRepeatOpen)}
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-between gap-2 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedRepeatOption?.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {selectedRepeatOption?.label}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isRepeatOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isRepeatOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                  {/* Dropdown Header */}
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">
                        Pilih Pola Pengulangan
                      </span>
                    </div>
                  </div>
                  
                  {/* Dropdown Options */}
                  <div className="py-1 max-h-60 overflow-y-auto">
                    {REPEAT_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setRepeat(option.id);
                          setIsRepeatOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-200 ${
                          repeat === option.id ? 'bg-gray-50' : ''
                        }`}
                      >
                        <span className="text-lg flex-shrink-0">{option.icon}</span>
                        <span 
                          className="text-sm font-medium flex-grow text-left"
                          style={{ color: repeat === option.id ? option.color : '#374151' }}
                        >
                          {option.label}
                        </span>
                        {repeat === option.id && (
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: option.color }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            Tanggal
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            {editingTodo ? 'Update Todo' : 'Tambah Todo'}
          </button>
        </div>
      </div>
    </form>
  );
}