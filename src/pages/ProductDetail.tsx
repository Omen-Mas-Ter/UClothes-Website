import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";

// In a real app, this would be a Firestore fetch
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
    description: "This classic fit button-down shirt is a timeless wardrobe staple. Crafted from premium cotton, it offers both comfort and durability. The iconic embroidered pony adds a touch of heritage style. Item is in excellent condition with no visible wear.",
    isFeatured: true,
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
    description: "The original blue jean since 1873. These vintage 501s feature the iconic straight fit and button fly. A true piece of Americana that only gets better with age. Slight fading at the knees adds authentic character.",
    isFeatured: false,
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
    description: "A fresh take on the preppy look. This striped shirt from Tommy Hilfiger is perfect for layerng or wearing on its own. Soft, breathable fabric ensures all-day comfort.",
    isFeatured: true,
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = useMemo(() => MOCK_PRODUCTS.find(p => p.id === id), [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl italic mb-4">Product not found</h1>
        <Button render={<Link to="/shop" />} variant="link" nativeButton={false}>
          Back to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product as any);
    toast.success("Added to your bag", {
      description: `${product.title} has been added.`,
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart",
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold mb-12 hover:opacity-70 transition-opacity">
        <ArrowLeft className="h-4 w-4" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-[3/4] bg-muted overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {/* Additional thumbnails would go here */}
            <div className="aspect-square bg-muted opacity-50 cursor-not-allowed border" />
            <div className="aspect-square bg-muted opacity-50 cursor-not-allowed border" />
            <div className="aspect-square bg-muted opacity-50 cursor-not-allowed border" />
            <div className="aspect-square bg-muted opacity-50 cursor-not-allowed border" />
          </div>
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="border-b pb-8 mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-bold mb-2">{product.brand}</p>
            <h1 className="text-5xl italic mb-4">{product.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-light">Rs. {product.price.toLocaleString()}</span>
              <Badge className="bg-secondary text-secondary-foreground rounded-none uppercase tracking-widest text-[10px] py-1 px-3">
                {product.condition}/10 CONDITION
              </Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest font-bold">Size: {product.size}</p>
              <p className="text-xs text-muted-foreground italic italic">ONLY 1 IN STOCK - RARE FIND</p>
            </div>

            <Button 
              size="lg" 
              className="w-full rounded-none h-16 text-lg uppercase tracking-widest font-bold"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to Shopping Bag
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="h-6 w-6 stroke-1" />
                <p className="text-[10px] uppercase font-bold tracking-tighter">Fast Delivery</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="h-6 w-6 stroke-1" />
                <p className="text-[10px] uppercase font-bold tracking-tighter">Authenticity Guaranteed</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCcw className="h-6 w-6 stroke-1" />
                <p className="text-[10px] uppercase font-bold tracking-tighter">Easy Exchanges</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
