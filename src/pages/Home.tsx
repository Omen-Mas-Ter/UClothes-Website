import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Ralph Lauren Classic Shirt",
    brand: "Polo Ralph Lauren",
    condition: 9,
    size: "XL",
    price: 3500,
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"],
    category: "formal",
    stock: 1,
    description: "Classic fit button down.",
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Levi's 501 Original Denim",
    brand: "Levi's",
    condition: 8,
    size: "34",
    price: 4200,
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800"],
    category: "jeans",
    stock: 1,
    description: "Vintage 501s in great condition.",
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Tommy Hilfiger Striped Shirt",
    brand: "Tommy Hilfiger",
    condition: 9,
    size: "L",
    price: 2800,
    images: ["https://images.unsplash.com/photo-1621072156002-e2fcced0b170?auto=format&fit=crop&q=80&w=800"],
    category: "casual",
    stock: 1,
    description: "Perfect for a casual day out.",
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Vintage Dockers Chinos",
    brand: "Dockers",
    condition: 7,
    size: "32",
    price: 2200,
    images: ["https://images.unsplash.com/photo-1624371414361-e6e8ea01c1e2?auto=format&fit=crop&q=80&w=800"],
    category: "pants",
    stock: 1,
    description: "Relaxed fit chinos.",
    isFeatured: false,
    createdAt: new Date().toISOString()
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center px-10 gap-16 bg-white overflow-hidden shrink-0">
        <div className="w-full lg:w-1/2 space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 bg-secondary text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
              Curated Pre-Loved Premium
            </div>
            <h1 className="text-6xl md:text-8xl font-heading leading-[0.9] text-foreground mb-6">
              Elevated Thrift. <br/><span className="text-secondary italic">Unbeatable Prices.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-lg mb-10">
              Discover branded formal shirts, casual wear, and premium denim carefully inspected for quality and condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-none px-10 py-7 text-xs font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-all" render={<Link to="/shop" />} nativeButton={false}>
                Shop New Arrivals
              </Button>
              <Button size="lg" variant="outline" className="rounded-none px-10 py-7 text-xs font-bold uppercase tracking-[0.2em] border-primary/20" render={<Link to="/shop?featured=true" />} nativeButton={false}>
                Featured Selection
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:flex w-1/2 h-full items-center justify-center relative">
          <div className="absolute w-[500px] h-[500px] bg-background rounded-full -z-0" />
          <div className="grid grid-cols-2 gap-8 z-10 w-full max-w-lg">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className="h-64 bg-[#E0E0D6] rounded-[2rem] overflow-hidden border border-black/5 flex items-center justify-center p-4"
            >
              <div className="text-center text-muted-foreground/60 uppercase tracking-widest font-mono text-[10px]">Oxford Collection</div>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 }}
               className="h-64 bg-[#D6D6CC] rounded-[2rem] overflow-hidden border border-black/5 flex items-center justify-center p-4 mt-12 shadow-2xl shadow-black/5"
            >
              <div className="text-center text-muted-foreground/60 uppercase tracking-widest font-mono text-[10px]">Premium Denim</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Grid Header */}
      <section className="pt-24 pb-8 container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase font-bold tracking-[0.25em] text-muted-foreground/60">Featured Selection</h2>
          <div className="flex gap-3">
            <div className="px-5 py-2 border border-black/5 bg-white rounded-full text-[10px] font-extrabold uppercase tracking-widest cursor-pointer hover:bg-muted transition-colors">Size: All</div>
            <div className="px-5 py-2 border border-black/5 bg-white rounded-full text-[10px] font-extrabold uppercase tracking-widest cursor-pointer hover:bg-muted transition-colors">Condition: 8.5+</div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl italic mb-12 underline underline-offset-[12px] decoration-secondary/30">Why choose Uclothes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Strict Quality Control</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Every item is hand-inspected for authenticity and condition before listing.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Fast Shipping</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Multiple delivery options with Cash on Delivery supported across major cities.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Sustainable Choice</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Look good, feel good. Giving branded clothes a second life reduces waste.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
