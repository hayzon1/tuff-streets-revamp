import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Settings = () => {
  const { isAdmin, loading, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, loading, navigate]);

  const [formData, setFormData] = useState({
    siteName: 'Too Tuff Clothing',
    contactEmail: 'contact@tootuff.com',
    contactPhone: '+234 XXX XXX XXXX',
    address: 'Lagos, Nigeria',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <AdminLayout><div>Loading...</div></AdminLayout>;
  }

  if (!isAdmin) {
    return null;
  }

  const isSuperAdmin = userRole === 'super_admin';

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-display mb-2">SETTINGS</h1>
          <p className="text-muted-foreground">Configure your store settings</p>
        </div>

        <Card className="p-6">
          <h3 className="text-2xl font-display mb-6">STORE INFORMATION</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="siteName" className="block font-semibold mb-2">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                disabled={!isSuperAdmin}
                className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="block font-semibold mb-2">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                disabled={!isSuperAdmin}
                className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="contactPhone" className="block font-semibold mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                disabled={!isSuperAdmin}
                className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="address" className="block font-semibold mb-2">
                Business Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isSuperAdmin}
                className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>

            {isSuperAdmin && (
              <Button type="submit" className="btn-tuff">
                Save Changes
              </Button>
            )}

            {!isSuperAdmin && (
              <p className="text-sm text-muted-foreground">
                Only super admins can modify store settings.
              </p>
            )}
          </form>
        </Card>

        <Card className="p-6">
          <h3 className="text-2xl font-display mb-4">PAYMENT GATEWAYS</h3>
          <p className="text-muted-foreground mb-4">Configure payment methods</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border-2 border-border">
              <div>
                <p className="font-semibold">Paystack</p>
                <p className="text-sm text-muted-foreground">Status: Connected</p>
              </div>
              <Button variant="outline" disabled={!isSuperAdmin}>Configure</Button>
            </div>
            <div className="flex items-center justify-between p-4 border-2 border-border">
              <div>
                <p className="font-semibold">Stripe</p>
                <p className="text-sm text-muted-foreground">Status: Not Connected</p>
              </div>
              <Button variant="outline" disabled={!isSuperAdmin}>Configure</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-2xl font-display mb-4">DELIVERY ZONES</h3>
          <p className="text-muted-foreground mb-4">Manage delivery areas and rates</p>
          <Button variant="outline" disabled={!isSuperAdmin}>
            Manage Zones
          </Button>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
