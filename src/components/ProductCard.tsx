import { Link } from 'react-router-dom';
import { Product } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product & { soldOut?: boolean; isNew?: boolean };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="product-card">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="badge-new">New Drop</span>
            )}
            {product.soldOut && (
              <span className="badge-sold-out">Sold Out</span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 z-10">
            <span className="text-white font-display text-lg uppercase tracking-wider">
              View Product
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="font-display text-xl">₦{product.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
