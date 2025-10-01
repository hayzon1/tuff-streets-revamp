import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display mb-4">TOO TUFF</h3>
            <p className="text-sm text-primary-foreground/70">
              Raw. Underground. Unapologetic.
              <br />
              Lagos youth culture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-accent transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=hoodies" className="hover:text-accent transition-colors">Hoodies</Link></li>
              <li><Link to="/shop?category=tees" className="hover:text-accent transition-colors">Tees</Link></li>
              <li><Link to="/shop?category=cargo" className="hover:text-accent transition-colors">Cargo</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-accent transition-colors">Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-accent transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg mb-4">Stay Tuff</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Join the movement. Follow us.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; {new Date().getFullYear()} Too Tuff. All rights reserved. Lagos, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
