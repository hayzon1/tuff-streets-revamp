import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Home = () => {
  const newDrops = products.filter(p => p.isNew).slice(0, 4);
  const trendingProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        
        <div className="relative z-10 text-center text-primary-foreground px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display mb-6 glitch">
            TOO TUFF
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 tracking-wide">
            RAW. UNDERGROUND. UNAPOLOGETIC.
          </p>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/80">
            Lagos Youth Culture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" variant="secondary" className="btn-tuff">
                Shop New Drops <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Our Story
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* New Drops Section */}
      <section className="section-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-display mb-2">NEW DROPS</h2>
            <p className="text-muted-foreground">Fresh from the streets</p>
          </div>
          <Link to="/shop?filter=new">
            <Button variant="outline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newDrops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Shop The Look */}
      <section className="section-container bg-muted/30">
        <h2 className="text-4xl md:text-5xl font-display mb-8 text-center">SHOP THE LOOK</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
              alt="Curated Look 1"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <div className="text-white">
                <h3 className="font-display text-2xl mb-2">STREET ESSENTIALS</h3>
                <p className="text-white/80 mb-4">Hoodie + Cargo + Attitude</p>
                <Button variant="secondary">Shop This Look</Button>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
              alt="Curated Look 2"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <div className="text-white">
                <h3 className="font-display text-2xl mb-2">ALTE VIBES</h3>
                <p className="text-white/80 mb-4">Denim + Graphic Tee + Energy</p>
                <Button variant="secondary">Shop This Look</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="section-container">
        <h2 className="text-4xl md:text-5xl font-display mb-8">TRENDING NOW</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="section-container bg-primary text-primary-foreground">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display mb-4">JOIN THE MOVEMENT</h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Tag us #TooTuff and show the world your style
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary">
                <Instagram className="mr-2 h-5 w-5" />
                Follow @TooTuff
              </Button>
            </a>
          </div>
          
          {/* Instagram Feed Placeholder */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors cursor-pointer" />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-container">
        <div className="max-w-2xl mx-auto text-center bg-accent/10 p-8 md:p-12 border-2 border-accent">
          <h2 className="text-3xl md:text-4xl font-display mb-4">STAY TUFF</h2>
          <p className="text-muted-foreground mb-6">
            Get early access to new drops, exclusive deals, and street culture updates
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-primary bg-background focus:outline-none focus:border-accent"
            />
            <Button type="submit" size="lg" className="btn-tuff">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
