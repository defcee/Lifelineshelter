import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogOut, CheckCircle } from "lucide-react";
import type { AdminDashboardResponse } from "@shared/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("adminToken");
      const storedUsername = localStorage.getItem("adminUsername");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: AdminDashboardResponse = await response.json();

        if (response.ok && data.authenticated) {
          setIsAuthenticated(true);
          setUsername(storedUsername || data.user?.username || "Admin");
        } else {
          setError(data.message || "Authentication failed");
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUsername");
          setTimeout(() => navigate("/admin/login"), 2000);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to verify authentication");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUsername");
        setTimeout(() => navigate("/admin/login"), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600">Verifying authentication...</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-red-600">Authentication Error</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <p className="text-sm text-gray-600 mt-4">Redirecting to login...</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {username}!</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Success Alert */}
          <Alert className="mb-8 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              You are successfully authenticated. The admin login is working correctly!
            </AlertDescription>
          </Alert>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Statistics Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Users</CardTitle>
                <CardDescription>Registered admin users</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-lifeline-blue">1</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
                <CardDescription>Backend API status</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">✓ Online</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Last Login</CardTitle>
                <CardDescription>Your authentication timestamp</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{new Date().toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Info Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Admin Panel Information</CardTitle>
              <CardDescription>Details about your admin access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900">Username</p>
                <p className="text-gray-600">{username}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Authentication Status</p>
                <p className="text-green-600 font-semibold">✓ Authenticated</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">API Endpoints Available</p>
                <ul className="text-gray-600 text-sm space-y-1 mt-2">
                  <li>✓ POST /api/admin/login</li>
                  <li>✓ GET /api/admin/dashboard</li>
                  <li>✓ GET /api/demo (public)</li>
                  <li>✓ GET /api/ping (public)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Environment Configuration</p>
                <p className="text-gray-600 text-sm">
                  Admin credentials are loaded from ADMIN_USERNAME and ADMIN_PASSWORD environment variables.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting Section */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 space-y-2">
              <p><strong>If login fails:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Verify ADMIN_USERNAME and ADMIN_PASSWORD are set in .env</li>
                <li>Ensure the backend server is running</li>
                <li>Check browser console for API errors</li>
                <li>Verify /api/admin/login endpoint is accessible</li>
              </ul>
              <p className="mt-4"><strong>For cPanel deployment:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Ensure .env file is in the correct directory</li>
                <li>Set environment variables via cPanel's Node.js manager</li>
                <li>Verify .htaccess rewrites /api/* to Node.js app</li>
                <li>Check Node.js application logs in cPanel</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
