import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Heart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Account = () => {
  const navigate = useNavigate();
  const { user, signOut, loading, isAdmin } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    setProfile(data);
  };

  const fetchOrders = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    setOrders(data || []);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen pt-24 flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-display mb-8">MY ACCOUNT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-2 bg-card border-2 border-border p-4">
              <button className="w-full text-left px-4 py-3 bg-primary text-primary-foreground font-semibold flex items-center gap-3">
                <Package className="h-5 w-5" />
                Orders
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-3">
                <Heart className="h-5 w-5" />
                Wishlist
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-3">
                <User className="h-5 w-5" />
                Profile
              </button>
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-3"
                >
                  <Package className="h-5 w-5" />
                  Admin Panel
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center gap-3"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome */}
            <div className="bg-primary text-primary-foreground p-8 mb-8">
              <h2 className="text-3xl font-display mb-2">WELCOME BACK!</h2>
              <p className="text-primary-foreground/80">
                {profile?.full_name || user.email} • {user.email}
              </p>
              {isAdmin && (
                <p className="text-primary-foreground/60 text-sm mt-1">Admin Account</p>
              )}
            </div>

            {/* Orders */}
            <div className="mb-8">
              <h2 className="text-2xl font-display mb-4">RECENT ORDERS</h2>
              {orders.length === 0 ? (
                <div className="bg-card border-2 border-border p-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
                  <Button onClick={() => navigate('/shop')}>Start Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-card border-2 border-border p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold text-lg">Order #{order.order_number}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-bold uppercase ${
                            order.status === 'delivered'
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-display text-xl">
                          ₦{Number(order.total_amount).toLocaleString()}
                        </p>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 p-6 text-center">
                <p className="text-3xl font-display mb-2">{orders.length}</p>
                <p className="text-muted-foreground">Total Orders</p>
              </div>
              <div className="bg-muted/30 p-6 text-center">
                <p className="text-3xl font-display mb-2">0</p>
                <p className="text-muted-foreground">Wishlist Items</p>
              </div>
              <div className="bg-muted/30 p-6 text-center">
                <p className="text-3xl font-display mb-2">
                  ₦{orders.reduce((sum, o) => sum + Number(o.total_amount), 0).toLocaleString()}
                </p>
                <p className="text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
