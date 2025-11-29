import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, LogIn } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AdminLoginRequest, AdminLoginResponse } from "@shared/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const loginData: AdminLoginRequest = {
        username,
        password,
      };

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Handle non-JSON responses gracefully (server may return HTML on errors)
      const contentType = response.headers.get("content-type") || "";

      let data: AdminLoginResponse | null = null;
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Fallback: read as text and show as error
        const text = await response.text();
        setError(text || "Unexpected server response");
        return;
      }

      if (!response.ok || !data || !data.success) {
        setError((data && data.message) || "Login failed");
        return;
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUsername", username);
      }

      // Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lifeline-blue to-blue-600 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-lifeline-blue">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-lifeline-blue hover:bg-blue-700 text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-sm text-gray-600">
                Username: <code className="bg-white px-2 py-1 rounded">admin</code>
              </p>
              <p className="text-sm text-gray-600">
                Password: <code className="bg-white px-2 py-1 rounded">admin123</code>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                (Change these in production by setting ADMIN_USERNAME and ADMIN_PASSWORD in .env)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin;
