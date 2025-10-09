import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: Tag, label: 'Coupons', path: '/admin/coupons' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-16'
        } bg-card border-r-2 border-border overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b-2 border-border">
            {sidebarOpen && (
              <Link to="/admin" className="font-display text-xl">
                TOO TUFF ADMIN
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-semibold">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t-2 border-border p-4">
            {sidebarOpen && (
              <div className="mb-3">
                <p className="font-semibold truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            )}
            <Button
              variant="destructive"
              size={sidebarOpen ? 'default' : 'icon'}
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="h-5 w-5" />
              {sidebarOpen && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-card border-b-2 border-border flex items-center px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-muted rounded"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-4 font-display text-lg">TOO TUFF ADMIN</span>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
