import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const CATEGORIES = [
  { name: "All Items", slug: "all" },
  { name: "Formal Shirts", slug: "formal" },
  { name: "Casual Shirts", slug: "casual" },
  { name: "Premium Jeans", slug: "jeans" },
  { name: "Pants & Chinos", slug: "pants" },
];

const MOCK_PRODUCTS: Product[] = [
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
    description: "Classic fit button down in pristine condition. Authentic Ralph Lauren.",
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
    description: "Vintage 501s in great condition. Classic blue wash.",
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
    description: "Perfect casual striped shirt. Lightweight and premium.",
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
    description: "Relaxed fit chinos. Iconic Dockers quality.",
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Oxford Cotton Formal Shirt",
    brand: "Brooks Brothers",
    condition: 10,
    size: "M",
    price: 4500,
    images: ["https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=800"],
    category: "formal",
    stock: 1,
    description: "Brand new condition Oxford shirt.",
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "Straight Fit Raw Denim",
    brand: "Diesel",
    condition: 9,
    size: "33",
    price: 5500,
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800"],
    category: "jeans",
    stock: 1,
    description: "Premium raw denim from Diesel.",
    isFeatured: false,
    createdAt: new Date().toISOString()
  }
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (currentCategory !== "all") {
      result = result.filter(p => p.category === currentCategory);
    }

    if (searchParams.get("featured") === "true") {
      result = result.filter(p => p.isFeatured);
    }

    // Sorting
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "condition") result.sort((a, b) => b.condition - a.condition);

    return result;
  }, [currentCategory, searchParams, sortBy]);

  const handleCategoryChange = (slug: string) => {
    if (slug === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl italic mb-4">Shop All Items</h1>
        <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Curated Branded Thrifting</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8 items-start mb-12 border-b pb-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 flex-grow">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.slug}
              variant={currentCategory === cat.slug ? "default" : "outline"}
              className="rounded-none uppercase tracking-widest text-[10px] h-9 px-6"
              onClick={() => handleCategoryChange(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <p className="text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">Sort By</p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px] rounded-none border-t-0 border-l-0 border-r-0 border-b bg-transparent shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="condition">Best Condition</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-muted-foreground italic">
            No products found in this category. Check back soon for new drops.
          </div>
        )}
      </div>
    </div>
  );
}
