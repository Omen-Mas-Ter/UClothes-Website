import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl italic mb-4">Your bag is empty</h1>
        <p className="text-muted-foreground mb-8 text-lg">Items you add to your bag will appear here.</p>
        <Button render={<Link to="/shop" />} size="lg" className="rounded-none px-12 h-14 uppercase tracking-widest font-bold" nativeButton={false}>
          Explore Collection
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 border-b pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl italic mb-2">Shopping Bag</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
            {itemCount} {itemCount === 1 ? "Item" : "Items"} in your collection
          </p>
        </div>
        <Link to="/shop" className="text-xs uppercase tracking-widest font-bold hover:underline mb-2">
          Continue Shopping
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-6 group"
              >
                <div className="w-32 sm:w-40 aspect-[3/4] bg-muted overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{item.brand}</p>
                      <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">Size: {item.size}</p>
                    </div>
                    <p className="text-lg font-semibold">Rs. {item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-none">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-none border-r"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-none border-l"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="bg-muted/30 p-8 border">
            <h2 className="text-2xl italic mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Shipping</span>
                <span className="text-green-600 font-bold tracking-widest text-[10px] uppercase">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full rounded-none h-14 uppercase tracking-widest font-bold"
              render={<Link to="/checkout" />}
              nativeButton={false}
            >
              Checkout Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-8 space-y-4">
              <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold">We Accept</p>
              <div className="flex justify-center gap-4 opacity-50 grayscale">
                <span className="text-xs font-bold ring-1 ring-primary px-2 py-1 rounded-sm">COD</span>
                <span className="text-xs font-bold ring-1 ring-primary px-2 py-1 rounded-sm">VISA</span>
                <span className="text-xs font-bold ring-1 ring-primary px-2 py-1 rounded-sm">STRIPE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
