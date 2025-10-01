import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    deliveryMethod: 'local',
    paymentMethod: 'card',
  });

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 50000 ? 0 : 2500;
  const finalTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order placed successfully!', {
      description: `Order total: ₦${finalTotal.toLocaleString()}`,
    });
    clearCart();
    navigate('/account');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-display mb-8">CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-card p-6 border-2 border-border">
              <h2 className="text-2xl font-display mb-6">CONTACT INFORMATION</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card p-6 border-2 border-border">
              <h2 className="text-2xl font-display mb-6">SHIPPING ADDRESS</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                    >
                      <option value="">Select State</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-card p-6 border-2 border-border">
              <h2 className="text-2xl font-display mb-6">DELIVERY METHOD</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-border cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="local"
                    checked={formData.deliveryMethod === 'local'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">Local Delivery (Lagos)</p>
                    <p className="text-sm text-muted-foreground">3-5 business days</p>
                  </div>
                  <p className="font-semibold">₦2,500</p>
                </label>
                <label className="flex items-center p-4 border-2 border-border cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="nationwide"
                    checked={formData.deliveryMethod === 'nationwide'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">Nationwide Delivery</p>
                    <p className="text-sm text-muted-foreground">5-7 business days</p>
                  </div>
                  <p className="font-semibold">₦5,000</p>
                </label>
                <label className="flex items-center p-4 border-2 border-border cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === 'pickup'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">Pickup (Lagos Store)</p>
                    <p className="text-sm text-muted-foreground">Ready in 24 hours</p>
                  </div>
                  <p className="font-semibold text-accent">FREE</p>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card p-6 border-2 border-border">
              <h2 className="text-2xl font-display mb-6">PAYMENT METHOD</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-border cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <p className="font-semibold">Card Payment (Paystack)</p>
                </label>
                <label className="flex items-center p-4 border-2 border-border cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <p className="font-semibold">Bank Transfer</p>
                </label>
              </div>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card p-6 border-2 border-border">
              <h2 className="text-2xl font-display mb-6">ORDER SUMMARY</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="w-16 h-20 bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Size: {item.size} × {item.quantity}</p>
                      <p className="text-sm font-semibold mt-1">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t-2 border-border pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-accent">FREE</span>
                    ) : (
                      `₦${shippingCost.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="border-t-2 border-border pt-3 flex justify-between text-lg">
                  <span className="font-display">TOTAL</span>
                  <span className="font-display">₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full btn-tuff mt-6" onClick={handleSubmit}>
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
