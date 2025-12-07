"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiMenu, FiX, FiChevronLeft, FiChevronRight, FiLogOut, FiBarChart2, FiUsers, FiCheckSquare, FiHome, FiSettings, FiFileText } from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (!userData || !token) {
        router.push('/login');
        return;
      }

      const userObj = JSON.parse(userData);
      
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success && data.data.user.role === 'admin') {
        setUser(data.data.user);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error verifying admin access:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FiBarChart2 },
    { name: 'Users', href: '/admin/users', icon: FiUsers },
    { name: 'Agents', href: '/admin/agents', icon: FiCheckSquare },
    { name: 'Properties', href: '/admin/properties', icon: FiHome },
    { name: 'Off-Plan Projects', href: '/admin/off-plan-projects', icon: FiHome },
    { name: 'Guide Submissions', href: '/admin/guide-submissions', icon: FiFileText },
    { name: 'Agent Applications', href: '/admin/agent-applications', icon: FiFileText },
    { name: 'Contact Submissions', href: '/admin/contact-submissions', icon: FiFileText },
    { name: 'Fit-Out Submissions', href: '/admin/fit-out-submissions', icon: FiFileText },
    { name: 'Playbook Submissions', href: '/admin/playbook-submissions', icon: FiFileText },
    // { name: 'Analytics', href: '/admin/analytics', icon: FiBarChart2 },
    { name: 'Settings', href: '/admin/settings', icon: FiSettings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-remax-blue">
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white shadow-xl">
            {}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="text-sm align-top text-blue-600">®</span>
                <span className="text-xl font-bold ml-1">
                  <span className="text-red-400">RE</span>
                  <span className="text-blue-600">MAX</span>
                </span>
                <span className="ml-2 text-sm text-gray-500">Admin</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md text-gray-400">
                <FiX size={20} />
              </button>
            </div>

            {}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={18} />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {}
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-gray-500">
                  <FiLogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:bg-white lg:border-r lg:border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
        {}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <span className="text-sm align-top text-blue-600">®</span>
              <span className="text-xl font-bold ml-1">
                <span className="text-red-400">RE</span>
                <span className="text-blue-600">MAX</span>
              </span>
              <span className="ml-2 text-xs text-gray-500">Admin</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
            title={sidebarCollapsed ? "Expand" : "Collapse"}
          >
            {sidebarCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
          </button>
        </div>

        {}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={sidebarCollapsed ? item.name : ''}
              >
                <Icon size={18} />
                {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {}
        <div className="flex-shrink-0 border-t border-gray-200 p-3">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!sidebarCollapsed && (
              <div className="flex items-center min-w-0">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </span>
                </div>
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{user.firstName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.role}</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-gray-600 flex-shrink-0"
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {}
        <div className="sticky top-0 z-10 lg:hidden bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md text-gray-400">
              <FiMenu size={20} />
            </button>
            <div className="flex items-center">
              <span className="text-sm align-top text-blue-600">®</span>
              <span className="text-lg font-bold ml-1">
                <span className="text-red-400">RE</span>
                <span className="text-blue-600">MAX</span>
              </span>
              <span className="ml-2 text-sm text-gray-500">Admin</span>
            </div>
            <div className="w-6"></div>
          </div>
        </div>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}