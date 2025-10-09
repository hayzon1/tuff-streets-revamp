import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Star, Ban, Eye } from 'lucide-react';

const Customers = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchCustomers();
    }
  }, [isAdmin]);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoadingCustomers(false);
    }
  };

  const toggleVIP = async (customerId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_vip: !currentStatus })
        .eq('id', customerId);

      if (error) throw error;
      toast.success(`Customer ${!currentStatus ? 'marked as' : 'removed from'} VIP`);
      fetchCustomers();
    } catch (error) {
      console.error('Error updating VIP status:', error);
      toast.error('Failed to update VIP status');
    }
  };

  const toggleBlock = async (customerId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_blocked: !currentStatus })
        .eq('id', customerId);

      if (error) throw error;
      toast.success(`Customer ${!currentStatus ? 'blocked' : 'unblocked'}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error updating block status:', error);
      toast.error('Failed to update block status');
    }
  };

  if (loading || loadingCustomers) {
    return <AdminLayout><div>Loading...</div></AdminLayout>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-display mb-2">CUSTOMERS</h1>
          <p className="text-muted-foreground">Manage your customer base</p>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-4 px-4">Name</th>
                  <th className="text-left py-4 px-4">Email</th>
                  <th className="text-left py-4 px-4">Phone</th>
                  <th className="text-left py-4 px-4">Joined</th>
                  <th className="text-left py-4 px-4">Status</th>
                  <th className="text-left py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {customer.is_vip && <Star className="h-4 w-4 text-accent fill-accent" />}
                        <span className="font-semibold">{customer.full_name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{customer.email}</td>
                    <td className="py-4 px-4">{customer.phone || 'N/A'}</td>
                    <td className="py-4 px-4 text-sm">
                      {new Date(customer.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      {customer.is_blocked ? (
                        <span className="px-2 py-1 text-xs font-bold uppercase bg-destructive/20 text-destructive">
                          Blocked
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-bold uppercase bg-accent/20 text-accent">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={customer.is_vip ? 'default' : 'outline'}
                          onClick={() => toggleVIP(customer.id, customer.is_vip)}
                        >
                          <Star className={`h-4 w-4 ${customer.is_vip ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant={customer.is_blocked ? 'destructive' : 'outline'}
                          onClick={() => toggleBlock(customer.id, customer.is_blocked)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
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

export default Customers;
