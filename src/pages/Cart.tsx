import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-4xl font-display mb-4">YOUR CART IS EMPTY</h1>
          <p className="text-muted-foreground mb-8">Time to fill it with some fresh gear</p>
          <Link to="/shop">
            <Button size="lg" className="btn-tuff">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 50000 ? 0 : 2500; // Free shipping over ₦50,000
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-5xl md:text-6xl font-display">YOUR CART</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-card p-4 border-2 border-border">
                {/* Image */}
                <div className="w-24 h-32 flex-shrink-0 bg-muted overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Size: {item.size || 'N/A'} | {item.category}
                  </p>
                  <p className="font-display text-xl">₦{item.price.toLocaleString()}</p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => removeFromCart(`${item.id}-${item.size}`)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="flex items-center border-2 border-border">
                    <button
                      onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity - 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-muted/30 p-6 border-2 border-border">
              <h2 className="text-2xl font-display mb-6">ORDER SUMMARY</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Subtotal</span>
                  <span className="font-semibold">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-accent">FREE</span>
                    ) : (
                      `₦${shippingCost.toLocaleString()}`
                    )}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over ₦50,000
                  </p>
                )}
                <div className="border-t-2 border-border pt-3 flex justify-between text-lg">
                  <span className="font-display">TOTAL</span>
                  <span className="font-display">₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="w-full btn-tuff mb-4">
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Secure checkout • Free returns • 100% authentic
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 p-4 bg-card border border-border">
              <p className="text-sm font-semibold mb-2">Why Shop with Too Tuff?</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>✓ Authenticity Guaranteed</li>
                <li>✓ Fast Lagos Delivery (3-5 days)</li>
                <li>✓ 30-Day Easy Returns</li>
                <li>✓ Secure Payment Options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
