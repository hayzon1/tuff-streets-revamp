import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-8xl md:text-9xl font-display mb-4 glitch">404</h1>
        <h2 className="text-3xl md:text-4xl font-display mb-4">PAGE NOT FOUND</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          This page doesn't exist. Maybe it's too underground, or maybe you took a wrong turn.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="btn-tuff">
              <Home className="mr-2 h-5 w-5" />
              Back Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" variant="outline">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
