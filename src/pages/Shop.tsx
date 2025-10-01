import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'Hoodies', 'Tees', 'Cargo', 'Outerwear'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-display mb-4">SHOP ALL</h1>
          <p className="text-muted-foreground text-lg">
            {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="lg:w-64 hidden lg:block">
            <div className="sticky top-24">
              <h3 className="font-display text-xl mb-4">FILTERS</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-4 py-2 transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground font-semibold'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        className="px-4 py-2 border-2 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors font-semibold"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>

            {/* Mobile Filters Dropdown */}
            {showFilters && (
              <div className="mt-4 p-4 border-2 border-border bg-background animate-slide-down">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowFilters(false);
                      }}
                      className={`px-4 py-2 transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'bg-muted hover:bg-muted/70'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>

                <h4 className="font-semibold mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className="px-4 py-2 border-2 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl font-display text-muted-foreground">
                  NO PRODUCTS FOUND
                </p>
                <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
