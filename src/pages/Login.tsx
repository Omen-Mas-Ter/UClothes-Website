import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as any)?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Welcome to Uclothes");
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center">
      <div className="max-w-md w-full bg-white border p-12 text-center">
        <h1 className="text-4xl italic mb-4">Join the Collective</h1>
        <p className="text-muted-foreground mb-12 text-sm uppercase tracking-widest font-bold">
          Sign in to manage your orders and wishlist.
        </p>

        <div className="space-y-6">
          <Button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            size="lg" 
            variant="outline" 
            className="w-full h-14 rounded-none border-primary uppercase tracking-widest font-bold"
          >
            {loading ? "Connecting..." : (
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" /> Continue with Google
              </span>
            )}
          </Button>

          <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
            By continuing, you agree to Uclothes' Terms of Service and Privacy Policy.
          </p>
        </div>

        <div className="mt-12 pt-12 border-t">
          <p className="text-sm italic">"Branded Clothes at Thrift Prices."</p>
        </div>
      </div>
    </div>
  );
}
