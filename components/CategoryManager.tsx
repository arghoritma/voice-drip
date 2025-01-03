import React, { useState, useCallback } from 'react';
import { 
  Settings, Plus, Edit2, Trash2, X, 
  SendHorizontal,
  TrendingUp,
  Users,
  Building2,
  Flower2,
  Heart,
  Bookmark,
  Tag,
  Palette,
  Save
} from 'lucide-react';
import toast from 'react-hot-toast';
import { db, auth } from '../config/firebase';
import { 
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';

interface CategoryManagerProps {
  categories: any[];
  onUpdate: () => void;
  isOpen: boolean;
  onClose: () => void;
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
      <div className="bg-white w-full min-h-screen sm:min-h-[auto] sm:h-[auto] sm:max-w-lg sm:my-4 sm:mx-4 sm:rounded-xl shadow-xl overflow-hidden animate-fadeIn">
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
        <div className="relative">
          <div className="p-6 space-y-6 pb-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const categoryIcons = {
  'dripsender': SendHorizontal,
  'upgrading': TrendingUp,
  'parenting': Users,
  'umrah': Building2,
  'habbats': Flower2,
  'dakwah': Heart,
  'default': Bookmark
};

export default function CategoryManager({ categories, onUpdate, isOpen, onClose }: CategoryManagerProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = auth.currentUser?.uid;

  const resetForm = useCallback(() => {
    setName('');
    setColor('#3B82F6');
    setEditingCategory(null);
    setIsSubmitting(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }

    if (!name.trim()) {
      toast.error('Nama kategori tidak boleh kosong');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingCategory) {
        // Update existing category
        await updateDoc(doc(db, 'categories', editingCategory.id), {
          name: name.trim(),
          color,
          userId,
          updatedAt: new Date().toISOString()
        });
        toast.success('Kategori berhasil diperbarui!');
      } else {
        // Add new category
        await addDoc(collection(db, 'categories'), {
          name: name.trim(),
          color,
          userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        toast.success('Kategori berhasil ditambahkan!');
      }
      
      resetForm();
      if (typeof onUpdate === 'function') {
        onUpdate();
      }
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      toast.error(error?.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = useCallback((category: any) => {
    setEditingCategory(category);
    setName(category.name);
    setColor(category.color);
  }, []);

  const handleDelete = async (categoryId: string) => {
    if (!userId) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }

    if (!window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if category is being used
      const todosRef = collection(db, 'todos');
      const q = query(todosRef, 
        where('categoryId', '==', categoryId),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error('Kategori ini sedang digunakan dalam todo. Hapus todo terlebih dahulu.');
        return;
      }

      await deleteDoc(doc(db, 'categories', categoryId));
      toast.success('Kategori berhasil dihapus!');
      
      resetForm();
      if (typeof onUpdate === 'function') {
        onUpdate();
      }
    } catch (error: any) {
      console.error('Error in handleDelete:', error);
      toast.error(error?.message || 'Terjadi kesalahan saat menghapus kategori.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const adjustColor = (color: string, amount: number) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255,Math.max(0,parseInt(color,16)+amount)).toString(16)).substr(-2));
  };

  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    return (
      categoryIcons[lowerName as keyof typeof categoryIcons] || 
      Bookmark
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 mr-2 text-gray-400" />
            Nama Kategori
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder="Masukkan nama kategori"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Palette className="w-4 h-4 mr-2 text-gray-400" />
            Warna Kategori
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-16 rounded-lg border-2 border-gray-200 cursor-pointer transition-transform hover:scale-105"
            />
            <div 
              className="flex-1 h-16 rounded-lg transition-transform hover:scale-[1.02]"
              style={{ 
                background: `linear-gradient(135deg, ${color}, ${adjustColor(color, -20)})`,
                boxShadow: `0 10px 15px -3px ${color}20`
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="group flex-1 flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
          >
            <Save className="w-5 h-5 mr-2" />
            {editingCategory ? 'Update Kategori' : 'Tambah Kategori'}
          </button>
          {editingCategory && (
            <button
              type="button"
              onClick={() => handleDelete(editingCategory.id)}
              className="group flex items-center justify-center px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 focus:ring-4 focus:ring-red-200 transition-all duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Category List */}
      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Daftar Kategori</h4>
        <div className="space-y-2.5">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.name);
            return (
              <div
                key={category.id}
                className="group flex items-center justify-between p-3.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                style={{ borderLeft: `4px solid ${category.color}` }}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5" style={{ color: category.color }} />
                  <span className="font-medium text-gray-800">{category.name}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    title="Edit kategori"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"
                    title="Hapus kategori"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}