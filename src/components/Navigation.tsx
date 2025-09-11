import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { AlertTriangle, Menu, Shield, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Heritage Sites", path: "/heritage" },
    { label: "State Exploration", path: "/exploration" },
    { label: "Adventure", path: "/adventure" },
    { label: "Alerts", path: "/alerts", hasAlert: true },
    { label: "Innovation", path: "/innovation" }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation("/")}>
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">SafeTour</h1>
              <p className="text-xs text-muted-foreground">Monitoring System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className="relative"
              >
                {item.label}
                {item.hasAlert && (
                  <Badge className="ml-2 bg-danger text-danger-foreground animate-pulse-glow">
                    2
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Emergency Button */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="destructive" 
              size="sm"
              className="animate-pulse-glow"
              onClick={() => handleNavigation("/alerts")}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Emergency
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold text-primary">SafeTour</span>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
                
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.label}
                      {item.hasAlert && (
                        <Badge className="ml-auto bg-danger text-danger-foreground animate-pulse-glow">
                          2
                        </Badge>
                      )}
                    </Button>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <Button 
                      variant="destructive" 
                      className="w-full animate-pulse-glow"
                      onClick={() => handleNavigation("/alerts")}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Emergency Response
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};