import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-white border border-black/5 rounded-2xl aspect-[3/4] mb-4 relative">
        <img 
          src={product.images[0] || "https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=800"} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <div className="bg-secondary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            {product.condition}/10 CONDITION
          </div>
          {product.isFeatured && (
            <div className="bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              CURATED
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      
      <div className="space-y-1.5 px-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted-foreground mr-2">{product.brand}</p>
            <h3 className="font-bold text-sm uppercase tracking-tight group-hover:text-secondary transition-colors">{product.title}</h3>
          </div>
          <p className="font-bold text-sm text-secondary">Rs. {product.price.toLocaleString()}</p>
        </div>
        <p className="text-[11px] text-muted-foreground uppercase tracking-widest leading-none">{product.size} • PRE-LOVED</p>
      </div>
    </motion.div>
  );
}
