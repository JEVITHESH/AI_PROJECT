import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            localStorage.setItem("isAdmin", "true");
            toast.success("Welcome back, Admin!");
            navigate("/admin/dashboard");
        } else {
            toast.error("Invalid password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
                        <CardDescription>Enter your secret key to continue</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-lg"
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 text-lg">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
