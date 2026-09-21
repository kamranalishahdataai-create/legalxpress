import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User, LogOut } from "lucide-react";
import logo from "@/assets/legalxpress-logo.png";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Subscriptions", href: "/subscriptions/personal" },
  { name: "Case Analysis", href: "/case-analysis" },
  { name: "Contracts", href: "/contracts" },
  { name: "Affiliates", href: "/affiliates" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="LegalXpress logo" width={64} height={64} className="h-11 w-11 md:h-14 md:w-14 object-contain" />
            <span className="font-display text-xl md:text-2xl font-semibold text-foreground">
              LegalXpress
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side container with counter and buttons */}
          <div className="flex items-center gap-3">

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      Portal
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/portal">My Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/portal/consultations">My Consultations</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/portal/contracts">My Contracts</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/about">About Us</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              )}
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg transition-shadow" asChild>
                <Link to="/book">Book Free Consultation</Link>
              </Button>
            </div>

            {/* Mobile Book CTA — compact */}
            <Button size="sm" className="lg:hidden bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs px-3 h-9 shadow-md" asChild>
              <Link to="/book">Book Free</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 pt-8">
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="font-body text-lg font-medium text-foreground hover:text-secondary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex flex-col gap-3 pt-4 border-t">
                    {user ? (
                      <>
                        <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                          <Link to="/portal">Client Portal</Link>
                        </Button>
                        <Button variant="ghost" onClick={handleSignOut}>
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                        <Link to="/login">Sign In</Link>
                      </Button>
                    )}
                    <Button className="bg-secondary hover:bg-secondary/90" asChild onClick={() => setIsOpen(false)}>
                      <Link to="/book">Book Free Consultation</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
