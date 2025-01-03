  "use client"
  import React, {useState, useEffect} from "react";
  import { usePathname,  useRouter } from 'next/navigation';
  import Link from 'next/link';
  import { 
    ListTodo, 
    Calendar, 
    LayoutDashboard,
    CalendarDays,
    CalendarCheck2,
    Menu,
    X,
    LogOut,
    Settings,
    ChevronDown,
    ChevronUp,
    Users,
    Building2,
    FolderKanban,
    ClipboardList,
    MessageSquare,
    FileBox,
    Bell
  } from 'lucide-react';

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      subItems: [
        { label: 'Overview', path: '/dashboard/overview' },
        { label: 'Analytics', path: '/dashboard/analytics' }
      ]
    },
    {
      key: 'teams',
      label: 'Teams',
      icon: Users,
      path: '/dashboard/teams',
      subItems: [
        { label: 'Team List', path: '/dashboard/teams/list' },
        { label: 'Team Members', path: '/dashboard/teams/members' }
      ]
    },
    {
      key: 'divisions',
      label: 'Divisions',
      icon: Building2,
      path: '/dashboard/divisions',
      subItems: [
        { label: 'Division List', path: '/dashboard/divisions/list' },
        { label: 'User Divisions', path: '/dashboard/divisions/users' }
      ]
    },
    {
      key: 'projects',
      label: 'Projects',
      icon: FolderKanban,
      path: '/dashboard/projects',
      subItems: [
        { label: 'All Projects', path: '/dashboard/projects/all' },
        { label: 'Project Tasks', path: '/dashboard/projects/tasks' }
      ]
    },
    {
      key: 'tasks',
      label: 'Tasks',
      icon: ClipboardList,
      path: '/dashboard/tasks',
      subItems: [
        { label: 'Task List', path: '/dashboard/tasks/list' },
        { label: 'Assigned Tasks', path: '/dashboard/tasks/assigned' }
      ]
    },
    {
      key: 'comments',
      label: 'Comments',
      icon: MessageSquare,
      path: '/dashboard/comments',
      subItems: [
        { label: 'Task Comments', path: '/dashboard/comments/tasks' }
      ]
    },
    {
      key: 'files',
      label: 'Files',
      icon: FileBox,
      path: '/dashboard/files',
      subItems: [
        { label: 'Task Files', path: '/dashboard/files/tasks' },
        { label: 'Uploaded Files', path: '/dashboard/files/uploaded' }
      ]
    },
    {
      key: 'calendar',
      label: 'Calendar View',
      icon: Calendar,
      path: '/dashboard/calendar',
      subItems: [
        { 
          label: 'Day View', 
          icon: CalendarDays,
          path: '/dashboard/calendar/day',
          subSubItems: [
            { label: 'Today', path: '/dashboard/calendar/day/today' },
            { label: 'Tomorrow', path: '/dashboard/calendar/day/tomorrow' }
          ]
        },
        { 
          label: 'Week View',
          icon: Calendar,
          path: '/dashboard/calendar/week',
          subSubItems: [
            { label: 'This Week', path: '/dashboard/calendar/week/this-week' },
            { label: 'Next Week', path: '/dashboard/calendar/week/next-week' }
          ]
        },
        { 
          label: 'Month View',
          icon: CalendarCheck2,
          path: '/dashboard/calendar/month',
          subSubItems: [
            { label: 'This Month', path: '/dashboard/calendar/month/this-month' },
            { label: 'Next Month', path: '/dashboard/calendar/month/next-month' }
          ]
        }
      ]
    }
  ];

  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [view, setView] = useState<'dashboard' | 'teams' | 'divisions' | 'projects' | 'tasks' | 'comments' | 'files' | 'calendar'>('dashboard');
    const [showCategoryManager, setShowCategoryManager] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
    const router = useRouter();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    useEffect(() => {
      menuItems.forEach((item) => {
        if (pathname.startsWith(item.path)) {
          setView(item.key as any);
          setOpenDropdowns(prev => ({ ...prev, [item.key]: true }));
          
          item.subItems.forEach((subItem, index) => {
            if ('path' in subItem && pathname.startsWith(subItem.path)) {
              setOpenDropdowns(prev => ({ ...prev, [`${item.key}-${index}`]: true }));
            }
          });
        }
      });
    }, [pathname]);

    const handleLogout = () => {
      console.log("logout");
    }

    const toggleDropdown = (key: string) => {
      setOpenDropdowns(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };

    const NavButton = ({ icon: Icon, label, children, dropdownKey, path }: any) => {
      const pathSegments = pathname.split('/').filter(Boolean);
      const isActive = pathSegments.length <= 2 ? pathname.startsWith(path) : path !== '/dashboard' && pathname.startsWith(path);
      
      return (
      <div className="w-full">
        <div className="w-full">
          {children ? (
            <button
              onClick={() => toggleDropdown(dropdownKey)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200/50' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center">
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span className="font-medium">{label}</span>
              </div>
              {openDropdowns[dropdownKey] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          ) : (
            <Link href={path}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200/50' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center">
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span className="font-medium">{label}</span>
              </div>
            </Link>
          )}
        </div>
        {children && openDropdowns[dropdownKey] && (
          <div className="ml-6 mt-1 space-y-1">
            {children}
          </div>
        )}
      </div>
    )};

    const SubNavButton = ({ label, icon: Icon, children, dropdownKey, path }: any) => (
      <div className="w-full">
        <div className="w-full">
          {children ? (
            <button
              onClick={() => toggleDropdown(dropdownKey)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                pathname === path
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center">
                {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500" />}
                <span className="font-medium">{label}</span>
              </div>
              {openDropdowns[dropdownKey] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          ) : (
            <Link href={path}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                pathname === path
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center">
                {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500" />}
                <span className="font-medium">{label}</span>
              </div>
            </Link>
          )}
        </div>
        {children && openDropdowns[dropdownKey] && (
          <div className="ml-6 mt-1 space-y-1">
            {children}
          </div>
        )}
      </div>
    );

    const SubSubNavButton = ({ label, path }: any) => {
      const router = useRouter();
      return (
        <div
          onClick={() => router.push(path)}
          className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
            pathname === path
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <span className="font-medium">{label}</span>
        </div>
      );
    };
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 w-64 md:translate-x-0`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl shadow-lg">
                  <ListTodo className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">DripTasker</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <NavButton 
                  key={item.key}
                  icon={item.icon}
                  label={item.label}
                  dropdownKey={item.key}
                  path={item.path}
                >
                  {item.subItems.map((subItem, index) => (
                    <SubNavButton
                      key={index}
                      icon={'icon' in subItem ? subItem.icon : undefined}
                      label={subItem.label}
                      dropdownKey={`${item.key}-${index}`}
                      path={subItem.path}
                    >
                      {'subSubItems' in subItem && subItem.subSubItems?.map((subSubItem, subIndex) => (
                        <SubSubNavButton
                          key={subIndex}
                          label={subSubItem.label}
                          path={subSubItem.path}
                        />
                      ))}
                    </SubNavButton>
                  ))}
                </NavButton>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t bg-gray-50 border-gray-200 space-y-2 " onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="relative group flex items-center space-x-3" >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8LrGjiUDcvYjUMk7jUJJZo0kK4Y4NzKxmQ&s"
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    
                  />
                  <div>
                    <p className="font-medium text-gray-800">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                  {showProfileDropdown && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => router.push('/profile')}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          <span>My Profile</span>
                        </button>
                        <button
                          onClick={() => setShowCategoryManager(true)}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          <span>Settings</span>
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Toggle */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="fixed bottom-4 right-4 md:hidden z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Main Content */}
        <div className="flex-1 md:pl-64">
          {/* Top Navbar */}
          <nav className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                {menuItems.find(item => item.key === view)?.label || 'Dashboard'}
              </h1>
              <button onClick={() => router.push("/dashboard/notifications")} className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
            </div>
          </nav>
          <div className="p-4 md:p-8 bg-gray-200 min-h-screen">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    );
  }

  