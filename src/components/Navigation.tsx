import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Heart },
    { path: "/stories", label: "Stories", icon: MessageCircle },
    { path: "/asteria", label: "Asteria AI", icon: MessageCircle },
    { path: "/post", label: "Share Story", icon: PenTool },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent hover:scale-105 transition-transform duration-gentle"
          >
            The Unheard Stories
          </Link>
          
          <div className="flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-gentle",
                  "hover:bg-primary-soft hover:text-primary",
                  location.pathname === path
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground"
                )}
              >
                <Icon size={18} />
                <span className="hidden sm:inline font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;