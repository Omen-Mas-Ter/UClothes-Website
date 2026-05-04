import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2, Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, "products"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(items);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      title: formData.get("title") as string,
      brand: formData.get("brand") as string,
      price: Number(formData.get("price")),
      condition: Number(formData.get("condition")),
      size: formData.get("size") as string,
      category: formData.get("category") as string,
      images: [formData.get("imageUrl") as string],
      stock: 1,
      description: formData.get("description") as string,
      createdAt: new Date().toISOString(),
      isFeatured: false,
    };

    try {
      await addDoc(collection(db, "products"), productData);
      toast.success("Product added successfully");
      setIsAdding(false);
      fetchProducts();
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product removed");
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl italic mb-2">Inventory Management</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Admin Control Panel</p>
        </div>

        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger
            render={
              <Button className="rounded-none h-12 px-8 uppercase tracking-widest font-bold">
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            }
          />
          <DialogContent className="max-w-xl rounded-none">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading italic">Add Thrift Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="uppercase text-[10px] tracking-widest font-bold">Product Title</Label>
                  <Input id="title" name="title" required className="rounded-none h-10" placeholder="e.g. Vintage Denim Jacket" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand" className="uppercase text-[10px] tracking-widest font-bold">Brand</Label>
                  <Input id="brand" name="brand" required className="rounded-none h-10" placeholder="e.g. Levi's" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="uppercase text-[10px] tracking-widest font-bold">Price (Rs.)</Label>
                  <Input id="price" name="price" type="number" required className="rounded-none h-10" placeholder="3500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition" className="uppercase text-[10px] tracking-widest font-bold">Condition (1-10)</Label>
                  <Input id="condition" name="condition" type="number" min="1" max="10" required className="rounded-none h-10" placeholder="9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size" className="uppercase text-[10px] tracking-widest font-bold">Size</Label>
                  <Input id="size" name="size" required className="rounded-none h-10" placeholder="XL / 34 / M" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="uppercase text-[10px] tracking-widest font-bold">Category</Label>
                  <Input id="category" name="category" required className="rounded-none h-10" placeholder="formal / casual / jeans" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="uppercase text-[10px] tracking-widest font-bold">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" required className="rounded-none h-10" placeholder="https://unsplash..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="uppercase text-[10px] tracking-widest font-bold">Description</Label>
                <textarea 
                  id="description" 
                  name="description" 
                  className="w-full border p-3 rounded-none h-24 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Tell us about this unique piece..."
                />
              </div>
              <Button type="submit" className="w-full rounded-none h-12 uppercase tracking-widest font-bold">Save to Inventory</Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {/* Basic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="rounded-none border-t-4 border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light">{products.length} Items</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-t-4 border-t-secondary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light">0 Pending</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-t-4 border-t-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light">Rs. 0</div>
          </CardContent>
        </Card>
      </div>

      {/* Product List */}
      <div className="border bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="uppercase text-[10px] tracking-widest h-12">
              <TableHead className="font-bold">Item</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Size</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Cond.</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10 italic">Loading inventory...</TableCell></TableRow>
            ) : products.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10 italic">Inventory is currently empty.</TableCell></TableRow>
            ) : (
              products.map((item) => (
                <TableRow key={item.id} className="group hover:bg-muted/30 transition-colors h-20">
                  <TableCell>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-12 h-16 bg-muted overflow-hidden flex-shrink-0">
                        <img src={item.images[0]} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">{item.brand}</p>
                        <p className="font-medium text-base h-6 overflow-hidden">{item.title}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize text-xs font-medium tracking-wide">{item.category}</TableCell>
                  <TableCell className="text-xs font-bold">{item.size}</TableCell>
                  <TableCell className="text-sm font-semibold">Rs. {item.price.toLocaleString()}</TableCell>
                  <TableCell className="text-xs font-bold">{item.condition}/10</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
