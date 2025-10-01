import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HardHat } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AlertSweet } from "../alert/alertService";
import { useNavigate } from "react-router-dom";
import { ThemeSwitch } from "../theme/ThemeSwitch";

export function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (e.currentTarget.email as HTMLInputElement).value;
    const password = (e.currentTarget.password as HTMLInputElement).value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      AlertSweet(4, userCredential.user.email ?? "");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch {
      AlertSweet(5);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/background-login.jpg')" }}
    >
      <div className="fixed top-0 right-0 h-20  flex items-center justify-end px-10 z-50">
        <ThemeSwitch iconColor="white" />
      </div>
      <Card className="w-[400px] h-auto flex flex-col  p-6 rounded-xl shadow-lg ">
        <CardHeader className="flex flex-col items-center gap-2">
          <HardHat size={64} color="black" />
          <CardDescription className="text-black text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 mt-4">
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <Label htmlFor="email" className="text-black mb-5">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="w-full px-3 py-6 text-black"
                required
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="password" className="text-black mb-5 mt-4">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="w-full px-3 py-6 text-black"
                required
              />
            </div>
            <a
              href="#"
              className="text-sm text-black underline-offset-4 hover:underline self-end"
            >
              Forgot your password?
            </a>
            <CardFooter>
              <Button
                type="submit"
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mt-4"
              >
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
