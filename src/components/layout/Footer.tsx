import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-muted mt-20 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-heading italic mb-6">Uclothes</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Curated branded pre-loved fashion. Sustainable, stylish, and accessible.
          </p>
        </div>
        <div>
          <h3 className="font-medium uppercase text-xs tracking-widest mb-6">Shop</h3>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/shop?category=formal" className="hover:text-foreground">Formal Shirts</Link></li>
            <li><Link to="/shop?category=casual" className="hover:text-foreground">Casual Shirts</Link></li>
            <li><Link to="/shop?category=jeans" className="hover:text-foreground">Jeans & Pants</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium uppercase text-xs tracking-widest mb-6">Info</h3>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/shipping" className="hover:text-foreground">Shipping Info</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium uppercase text-xs tracking-widest mb-6">Newsletter</h3>
          <p className="text-sm text-muted-foreground mb-4">Join our list for exclusive drops.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent border-b border-muted-foreground/30 flex-grow py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button className="uppercase text-xs font-bold tracking-tighter">Join</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Uclothes. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Instagram</a>
          <a href="#" className="hover:text-foreground">Facebook</a>
          <a href="#" className="hover:text-foreground">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
