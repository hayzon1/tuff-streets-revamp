import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">PRODUCT NOT FOUND</h1>
          <Link to="/shop">
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
    });
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted cursor-pointer hover:opacity-70 transition-opacity">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-display mb-4">{product.name}</h1>
            <p className="text-3xl font-display mb-6">₦{product.price.toLocaleString()}</p>

            {product.soldOut && (
              <div className="badge-sold-out inline-block mb-6">SOLD OUT</div>
            )}

            <p className="text-lg mb-8 text-foreground/80">
              {product.description || 'Premium streetwear piece from the Too Tuff collection. Designed for the bold and unapologetic.'}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Size</h3>
                <button className="text-sm text-muted-foreground hover:text-foreground underline">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={product.soldOut}
                    className={`px-6 py-3 border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    } ${product.soldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                    disabled={product.soldOut}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                    disabled={product.soldOut}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={product.soldOut}
                className="btn-tuff flex-1"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.soldOut ? 'Sold Out' : 'Add to Cart'}
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Details */}
            <div className="border-t-2 border-border pt-6 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Style Notes</h4>
                <p className="text-foreground/70">
                  Perfect for rooftop sessions, skate parks, or just flexing on the gram. 
                  Pair with cargo pants and fresh kicks for the complete look.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Shipping & Returns</h4>
                <p className="text-foreground/70">
                  Free delivery within Lagos (3-5 days). Nationwide shipping available. 
                  30-day return policy on unworn items.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl md:text-4xl font-display mb-8">COMPLETE THE LOOK</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
