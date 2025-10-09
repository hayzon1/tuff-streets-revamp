import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Eye } from 'lucide-react';

const Orders = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchOrders();
    }
  }, [isAdmin]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, profiles(full_name, email)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoadingOrders(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  if (loading || loadingOrders) {
    return <AdminLayout><div>Loading...</div></AdminLayout>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-display mb-2">ORDERS</h1>
          <p className="text-muted-foreground">Manage customer orders</p>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-4 px-4">Order #</th>
                  <th className="text-left py-4 px-4">Customer</th>
                  <th className="text-left py-4 px-4">Date</th>
                  <th className="text-left py-4 px-4">Total</th>
                  <th className="text-left py-4 px-4">Payment</th>
                  <th className="text-left py-4 px-4">Status</th>
                  <th className="text-left py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4 font-mono text-sm">{order.order_number}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold">{order.profiles?.full_name || 'Guest'}</p>
                        <p className="text-xs text-muted-foreground">{order.profiles?.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 font-display">
                      ₦{Number(order.total_amount).toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-bold uppercase ${
                          order.payment_status === 'paid'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-primary/20 text-primary'
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="px-3 py-1 border-2 border-border bg-background text-sm font-semibold uppercase"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Orders;
