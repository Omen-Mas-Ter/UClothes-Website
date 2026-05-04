import { Link } from "react-router-dom";
import { ShoppingBag, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/shop" className="text-lg font-medium">Shop</Link>
                <Link to="/categories" className="text-lg font-medium">Categories</Link>
                <Link to="/about" className="text-lg font-medium">About</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter uppercase italic absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          Uclothes
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.25em]">
          <Link to="/" className="text-secondary border-b-2 border-secondary pb-1">Home</Link>
          <Link to="/shop?category=formal" className="hover:text-secondary transition-colors">Formal</Link>
          <Link to="/shop?category=casual" className="hover:text-secondary transition-colors">Casual</Link>
          <Link to="/shop?category=jeans" className="hover:text-secondary transition-colors">Denim</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" render={<Link to="/login" />} nativeButton={false}>
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative underline-offset-4" render={<Link to="/cart" />} nativeButton={false}>
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-bold">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
