import { Package, Heart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Account = () => {
  const orders = [
    { id: '001', date: '2025-01-15', total: 45000, status: 'Delivered' },
    { id: '002', date: '2025-01-20', total: 28000, status: 'In Transit' },
  ];

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
              <Link to="/login">
                <button className="w-full text-left px-4 py-3 hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center gap-3">
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome */}
            <div className="bg-primary text-primary-foreground p-8 mb-8">
              <h2 className="text-3xl font-display mb-2">WELCOME BACK!</h2>
              <p className="text-primary-foreground/80">John Doe • john@email.com</p>
            </div>

            {/* Orders */}
            <div className="mb-8">
              <h2 className="text-2xl font-display mb-4">RECENT ORDERS</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-card border-2 border-border p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-lg">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-bold uppercase ${
                          order.status === 'Delivered'
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-display text-xl">₦{order.total.toLocaleString()}</p>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 p-6 text-center">
                <p className="text-3xl font-display mb-2">12</p>
                <p className="text-muted-foreground">Total Orders</p>
              </div>
              <div className="bg-muted/30 p-6 text-center">
                <p className="text-3xl font-display mb-2">5</p>
                <p className="text-muted-foreground">Wishlist Items</p>
              </div>
              <div className="bg-muted/30 p-6 text-center">
                <p className="text-3xl font-display mb-2">₦340K</p>
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
