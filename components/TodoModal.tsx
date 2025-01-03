import React, { useState, useRef } from 'react';
import { 
  X, 
  Trash2, 
  Save, 
  Tag, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Bookmark,
  ChevronDown,
  RefreshCw,
  Copy
} from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Todo, RepeatPattern } from '../types';

interface TodoModalProps {
  todo: Todo;
  categories: any[];
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-[9999] overflow-y-auto">
      <div className="bg-white w-full max-h-[90vh] sm:max-w-lg my-4 mx-4 rounded-xl shadow-xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm border-b border-gray-100 z-10">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 ml-auto"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
          <div className="p-6 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
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

export default function TodoModal({ todo, categories, isOpen, onClose, onUpdate }: TodoModalProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [category, setCategory] = useState(todo.category);
  const [date, setDate] = useState(todo.date);
  const [completed, setCompleted] = useState(todo.completed || false);
  const [repeat, setRepeat] = useState<RepeatPattern>(todo.repeat || 'never');
  const [isRepeatOpen, setIsRepeatOpen] = useState(false);
  const repeatRef = useRef<HTMLDivElement>(null);

  const selectedRepeatOption = REPEAT_OPTIONS.find(option => option.id === repeat);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'todos', todo.id), {
        title,
        description,
        category,
        date,
        completed,
        repeat,
        completedAt: completed ? new Date().toISOString() : null
      });
      toast.success('Todo berhasil diperbarui!');
      onUpdate();
      onClose();
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus todo ini?')) {
      try {
        // Hapus todo dari Firestore
        await deleteDoc(doc(db, 'todos', todo.id));
        
        // Tampilkan notifikasi sukses
        toast.success('Todo berhasil dihapus!');
        
        // Tutup modal
        onClose();
        
        // Update UI setelah modal tertutup
        setTimeout(() => {
          onUpdate();
        }, 50);
      } catch (error) {
        console.error('Error deleting todo:', error);
        toast.error('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  const handleDuplicate = async () => {
    try {
      // Buat salinan todo baru
      const duplicatedTodo = {
        title: `${todo.title} (Copy)`,
        description: todo.description,
        category: todo.category,
        date: todo.date,
        completed: false,
        repeat: todo.repeat || 'never',
        createdAt: new Date().toISOString()
      };

      // Tambahkan todo baru ke Firestore
      await addDoc(collection(db, 'todos'), duplicatedTodo);
      
      toast.success('Todo berhasil diduplikasi!');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error menduplikasi todo:', error);
      toast.error('Gagal menduplikasi todo');
    }
  };

  const selectedCategory = categories.find(c => c.id === category);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Todo"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 mr-2 text-gray-400" />
            Judul Todo
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder="Masukkan judul todo"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 mr-2 text-gray-400" />
            Deskripsi
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 min-h-[100px]"
            placeholder="Masukkan deskripsi todo"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Bookmark className="w-4 h-4 mr-2 text-gray-400" />
            Kategori
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none"
              style={{ 
                borderLeft: selectedCategory ? `4px solid ${selectedCategory.color}` : undefined,
                paddingLeft: selectedCategory ? '1rem' : undefined
              }}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            Tanggal
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <RefreshCw className="w-4 h-4 mr-2 text-gray-400" />
            Pengulangan
          </label>
          <div className="relative" ref={repeatRef}>
            <button
              type="button"
              onClick={() => setIsRepeatOpen(!isRepeatOpen)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-between gap-2 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedRepeatOption?.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {selectedRepeatOption?.label}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  isRepeatOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isRepeatOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 max-h-60 overflow-y-auto">
                {REPEAT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setRepeat(option.id as RepeatPattern);
                      setIsRepeatOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-200 ${
                      repeat === option.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: repeat === option.id ? option.color : '#374151' }}
                    >
                      {option.label}
                    </span>
                    {repeat === option.id && (
                      <div 
                        className="ml-auto w-2 h-2 rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <CheckCircle2 className="w-4 h-4 mr-2 text-gray-400" />
            Status
          </label>
          <button
            type="button"
            onClick={() => setCompleted(!completed)}
            className={`flex items-center px-4 py-3 rounded-lg border ${
              completed 
                ? 'border-green-200 bg-green-50 text-green-700' 
                : 'border-gray-200 bg-gray-50 text-gray-700'
            } hover:bg-opacity-80 transition-colors duration-200`}
          >
            <CheckCircle2 className={`w-4 h-4 mr-2 ${completed ? 'text-green-500' : 'text-gray-400'}`} />
            {completed ? 'Selesai' : 'Belum Selesai'}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="group flex-1 flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
          >
            <Save className="w-5 h-5 mr-2" />
            Update Todo
          </button>
          <button
            type="button"
            onClick={handleDuplicate}
            className="group flex items-center justify-center px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="group flex items-center justify-center px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 focus:ring-4 focus:ring-red-200 transition-all duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </form>
    </Modal>
  );
}