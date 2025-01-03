import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Todo, Category } from '../types';
import TodoInput from '../components/TodoInput';
import WeeklyView from '../components/WeeklyView';
import MonthlyView from '../components/MonthlyView';
import DayView from '../components/DayView';
import CategoryManager from '../components/CategoryManager';
import Dashboard from '../components/Dashboard';
import TodoModal from '../components/TodoModal';
import { checkAndCreateRecurringTodos } from '../config/firebase';
import { 
  ListTodo, 
  Calendar, 
  LayoutDashboard,
  CalendarDays,
  CalendarCheck2,
  Menu,
  X,
  LogOut,
  Settings
} from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState<'day' | 'week' | 'month' | 'dashboard'>('dashboard');
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    let unsubscribe: () => void;
    
    const setupFirestoreListener = async () => {
      try {
        const q = query(
          collection(db, 'todos'),
          where('userId', '==', userId),
          orderBy('date', 'asc')
        );
        
        unsubscribe = onSnapshot(q, 
          (querySnapshot) => {
            const todosData = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            } as Todo));
            setTodos(todosData);
          },
          (error) => {
            console.error('Firestore listener error:', error);
            // Implement retry logic here if needed
          }
        );
      } catch (error) {
        console.error('Error setting up Firestore listener:', error);
      }
    };

    setupFirestoreListener();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, 'categories'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categoriesData = querySnapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id } as Category))
        .filter(category => category.userId === userId);
      setCategories(categoriesData);
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    
    const checkRecurring = async () => {
      try {
        await checkAndCreateRecurringTodos();
      } catch (error) {
        console.error('Error checking recurring todos:', error);
      }
    };
    checkRecurring();
  }, [userId]);

  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
    setView('day');
    setIsMobileMenuOpen(false);
  }, []);

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowTodoModal(true);
  };

  const handleUpdate = useCallback(() => {
    // Refresh todos data if needed
    if (userId) {
      const q = query(collection(db, 'todos'), orderBy('date', 'asc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todosData = querySnapshot.docs
          .map(doc => ({ ...doc.data(), id: doc.id } as Todo))
          .filter(todo => todo.userId === userId);
        setTodos(todosData);
      });
      return () => unsubscribe();
    }
  }, [userId]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const NavButton = ({ onClick, isActive, icon: Icon, label }: any) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center justify-between bg-white shadow-sm px-6 py-3 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-1">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl shadow-lg">
              <ListTodo className="w-6.5 h-6.5 text-white" />
            </div>
          <h1 className="text-2xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">Todo App - Menjadi Muslim Produktif</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <NavButton 
            onClick={() => setView('dashboard')} 
            isActive={view === 'dashboard'}
            icon={LayoutDashboard}
            label="Dashboard"
          />
          <NavButton 
            onClick={() => setView('day')} 
            isActive={view === 'day'}
            icon={CalendarDays}
            label="Day"
          />
          <NavButton 
            onClick={() => setView('week')} 
            isActive={view === 'week'}
            icon={Calendar}
            label="Week"
          />
          <NavButton 
            onClick={() => setView('month')} 
            isActive={view === 'month'}
            icon={CalendarCheck2}
            label="Month"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCategoryManager(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white shadow-sm px-4 py-3 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-1">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl shadow-lg">
              <ListTodo className="w-4.5 h-4.5 text-white" />
            </div>
          <span className="text-1.5xl sm:text-1.5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">Todo App - Menjadi Muslim Produktif</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-20"
          onClick={() => setIsMobileMenuOpen(false)} // Close when clicking overlay
        >
          <div 
            className="bg-white w-64 min-h-screen p-4 transform transition-transform duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking menu content
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <ListTodo className="w-6 h-6 text-indigo-600" />
                <span className="text-xl font-semibold text-gray-800">Todo App</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="space-y-2">
              <NavButton 
                onClick={() => {
                  setView('dashboard');
                  setIsMobileMenuOpen(false);
                }} 
                isActive={view === 'dashboard'}
                icon={LayoutDashboard}
                label="Dashboard"
              />
              <NavButton 
                onClick={() => {
                  setView('day');
                  setIsMobileMenuOpen(false);
                }} 
                isActive={view === 'day'}
                icon={CalendarDays}
                label="Day"
              />
              <NavButton 
                onClick={() => {
                  setView('week');
                  setIsMobileMenuOpen(false);
                }} 
                isActive={view === 'week'}
                icon={Calendar}
                label="Week"
              />
              <NavButton 
                onClick={() => {
                  setView('month');
                  setIsMobileMenuOpen(false);
                }} 
                isActive={view === 'month'}
                icon={CalendarCheck2}
                label="Month"
              />
              <div className="border-t border-gray-200 my-4"></div>
              <NavButton 
                onClick={() => {
                  setShowCategoryManager(true);
                  setIsMobileMenuOpen(false);
                }}
                icon={Settings}
                label="Categories"
              />
              <NavButton 
                onClick={handleLogout}
                icon={LogOut}
                label="Logout"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-16 md:pt-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <TodoInput categories={categories} />
          
          {view === 'dashboard' && (
            <Dashboard 
              todos={todos} 
              categories={categories} 
              onEditTodo={handleTodoClick}
              onUpdate={handleUpdate}
            />
          )}
          
          {view === 'day' && (
            <DayView
              todos={todos}
              selectedDate={selectedDate}
              onTodoClick={handleTodoClick}
              categories={categories}
            />
          )}
          
          {view === 'week' && (
            <WeeklyView
              todos={todos}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onTodoClick={handleTodoClick}
              categories={categories}
            />
          )}
          
          {view === 'month' && (
            <MonthlyView
              todos={todos}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              categories={categories}
            />
          )}
        </div>
      </div>

      {showTodoModal && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => {
            setShowTodoModal(false);
            setSelectedTodo(null);
          }}
          categories={categories}
        />
      )}

      {showCategoryManager && (
        <CategoryManager
          categories={categories}
          isOpen={showCategoryManager}
          onClose={() => setShowCategoryManager(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
