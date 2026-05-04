import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { OrderStatus, PaymentMethod } from "@/types";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (items.length === 0) return <Navigate to="/shop" />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to place an order");
      return navigate("/login", { state: { from: { pathname: "/checkout" } } });
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const orderData = {
      userId: user.uid,
      items,
      total,
      status: OrderStatus.PENDING,
      paymentMethod: formData.get("payment") as PaymentMethod,
      shippingAddress: {
        fullName: formData.get("name") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        phone: formData.get("phone") as string,
      },
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      toast.success("Order placed successfully!", {
        description: "We'll contact you for confirmation shortly."
      });
      clearCart();
      navigate("/");
    } catch (error) {
      toast.error("Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl italic mb-12 border-b pb-8">Finalize Purchase</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-10">
            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-6">1. Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="uppercase text-[10px] tracking-widest font-bold">Full Name</Label>
                  <Input id="name" name="name" defaultValue={profile?.displayName} required className="rounded-none h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="uppercase text-[10px] tracking-widest font-bold">Phone Number</Label>
                  <Input id="phone" name="phone" required className="rounded-none h-12" placeholder="03XXXXXXXXX" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address" className="uppercase text-[10px] tracking-widest font-bold">Shipping Address</Label>
                  <Input id="address" name="address" required className="rounded-none h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="uppercase text-[10px] tracking-widest font-bold">City</Label>
                  <Input id="city" name="city" required className="rounded-none h-12" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-6">2. Payment Method</h2>
              <RadioGroup defaultValue="cod" name="payment" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Label
                  htmlFor="cod"
                  className="flex flex-col items-center justify-between rounded-none border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <RadioGroupItem value="cod" id="cod" className="sr-only" />
                  <span className="font-bold uppercase tracking-widest text-xs">Cash on Delivery</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Pay when you receive items</span>
                </Label>
                <Label
                  htmlFor="stripe"
                  className="flex flex-col items-center justify-between rounded-none border-2 border-muted bg-popover p-4 opacity-50 grayscale cursor-not-allowed"
                >
                  <RadioGroupItem value="stripe" id="stripe" className="sr-only" disabled />
                  <span className="font-bold uppercase tracking-widest text-xs">Card Payment</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Coming Soon</span>
                </Label>
              </RadioGroup>
            </section>

            <Button type="submit" size="lg" disabled={loading} className="w-full rounded-none h-16 text-lg uppercase tracking-widest font-bold">
              {loading ? "Processing..." : "Confirm & Place Order"}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-muted/30 p-8 border sticky top-24">
            <h2 className="text-2xl italic mb-8">In Your Bag</h2>
            <div className="space-y-4 mb-8 max-h-[40vh] overflow-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-muted flex-shrink-0">
                    <img src={item.images[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <h3 className="text-sm font-medium h-5 overflow-hidden">{item.title}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Size {item.size} × {item.quantity}</p>
                    <p className="text-xs font-bold mt-1">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                <span className="font-medium">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total Due</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
