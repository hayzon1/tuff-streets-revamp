import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { CouponForm } from '@/components/admin/CouponForm';

const Coupons = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchCoupons();
    }
  }, [isAdmin]);

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast.error('Failed to load coupons');
    } finally {
      setLoadingCoupons(false);
    }
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;

    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Coupon deleted successfully');
      fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error('Failed to delete coupon');
    }
  };

  const toggleCouponStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Coupon ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchCoupons();
    } catch (error) {
      console.error('Error updating coupon:', error);
      toast.error('Failed to update coupon');
    }
  };

  if (loading || loadingCoupons) {
    return <AdminLayout><div>Loading...</div></AdminLayout>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-display mb-2">COUPONS</h1>
            <p className="text-muted-foreground">Manage discount codes and promotions</p>
          </div>
          <Button className="btn-tuff" onClick={() => { setSelectedCoupon(null); setFormOpen(true); }}>
            <Plus className="h-5 w-5 mr-2" />
            Create Coupon
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-4 px-4">Code</th>
                  <th className="text-left py-4 px-4">Type</th>
                  <th className="text-left py-4 px-4">Value</th>
                  <th className="text-left py-4 px-4">Usage</th>
                  <th className="text-left py-4 px-4">Valid Period</th>
                  <th className="text-left py-4 px-4">Status</th>
                  <th className="text-left py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => {
                  const isExpired = new Date(coupon.end_date) < new Date();
                  const isMaxedOut = coupon.max_uses && coupon.used_count >= coupon.max_uses;
                  
                  return (
                    <tr key={coupon.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4 font-mono font-bold">{coupon.code}</td>
                      <td className="py-4 px-4 capitalize">{coupon.type}</td>
                      <td className="py-4 px-4 font-display">
                        {coupon.type === 'percentage' ? `${coupon.value}%` : `₦${Number(coupon.value).toLocaleString()}`}
                      </td>
                      <td className="py-4 px-4">
                        {coupon.used_count} / {coupon.max_uses || '∞'}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <div>
                          {new Date(coupon.start_date).toLocaleDateString()} -
                        </div>
                        <div>
                          {new Date(coupon.end_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 text-xs font-bold uppercase cursor-pointer ${
                            !coupon.is_active || isExpired || isMaxedOut
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-accent/20 text-accent'
                          }`}
                          onClick={() => toggleCouponStatus(coupon.id, coupon.is_active)}
                        >
                          {isExpired ? 'Expired' : isMaxedOut ? 'Maxed' : coupon.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => { setSelectedCoupon(coupon); setFormOpen(true); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteCoupon(coupon.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <CouponForm
          open={formOpen}
          onOpenChange={setFormOpen}
          onSuccess={fetchCoupons}
          coupon={selectedCoupon}
        />
      </div>
    </AdminLayout>
  );
};

export default Coupons;
