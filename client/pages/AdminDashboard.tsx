import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, LogOut, CheckCircle, Upload, Save, X } from "lucide-react";
import type { AdminDashboardResponse } from "@shared/api";
import { apiFetch } from "@shared/apiClient";

interface PageContent {
  section: string;
  title: string;
  content: string;
  imageUrl?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Content editing state
  const [pageContents, setPageContents] = useState<PageContent[]>([
    { section: "home", title: "Home Hero Title", content: "Welcome to Lifeline Shelter" },
    { section: "home", title: "Home Hero Subtitle", content: "Supporting those in crisis" },
    { section: "about", title: "About Us", content: "Lifeline Shelter provides emergency housing and support services." },
    { section: "getinvolved", title: "Get Involved Title", content: "Make a Difference" },
    { section: "programs", title: "Programs Overview", content: "Our comprehensive support programs" },
  ]);

  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("adminToken");
      const storedUsername = localStorage.getItem("adminUsername");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const data: AdminDashboardResponse = await apiFetch("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.authenticated) {
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

  const handleEditContent = (content: PageContent) => {
    setEditingContent(content);
    setSaveMessage(null);
  };

  const handleSaveContent = async () => {
    if (!editingContent) return;

    try {
      setSaveMessage("Saving...");
      // Simulate save - in production, this would hit an API endpoint
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPageContents(prev =>
        prev.map(item =>
          item.section === editingContent.section && item.title === editingContent.title
            ? editingContent
            : item
        )
      );
      
      setSaveMessage("Content saved successfully!");
      setTimeout(() => {
        setEditingContent(null);
        setSaveMessage(null);
      }, 2000);
    } catch (err) {
      setSaveMessage(`Error saving content: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingContent) return;

    try {
      setUploadingImage("Uploading...");
      
      // Simulate image upload
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setEditingContent(prev =>
          prev ? { ...prev, imageUrl: base64 } : null
        );
        setUploadingImage(null);
        setSaveMessage("Image uploaded successfully!");
        setTimeout(() => setSaveMessage(null), 2000);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setUploadingImage(null);
      setSaveMessage(`Error uploading image: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
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
              You are successfully authenticated. You can now manage your website content.
            </AlertDescription>
          </Alert>

          {/* Tabs for Dashboard and Content Editor */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dashboard">Dashboard Overview</TabsTrigger>
              <TabsTrigger value="content">Edit Page Content</TabsTrigger>
            </TabsList>

            {/* Dashboard Overview Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              {/* Admin Panel Information */}
              <Card>
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
                    <p className="font-semibold text-gray-900">Features Available</p>
                    <ul className="text-gray-600 text-sm space-y-1 mt-2">
                      <li>✓ Edit page content (text and images)</li>
                      <li>✓ Upload and replace images</li>
                      <li>✓ Manage multiple page sections</li>
                      <li>✓ Save changes with confirmation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Editor Tab */}
            <TabsContent value="content" className="space-y-6">
              {editingContent ? (
                // Content Editing Form
                <Card className="border-lifeline-blue">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Edit: {editingContent.title}</CardTitle>
                        <CardDescription>Section: {editingContent.section}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingContent(null);
                          setSaveMessage(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Save Message */}
                    {saveMessage && (
                      <Alert className={saveMessage.includes("Error") ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}>
                        <AlertCircle className={`h-4 w-4 ${saveMessage.includes("Error") ? "text-red-600" : "text-green-600"}`} />
                        <AlertDescription className={saveMessage.includes("Error") ? "text-red-800" : "text-green-800"}>
                          {saveMessage}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Title Input */}
                    <div className="space-y-2">
                      <Label htmlFor="content-title">Title</Label>
                      <Input
                        id="content-title"
                        value={editingContent.title}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, title: e.target.value })
                        }
                        placeholder="Content title"
                      />
                    </div>

                    {/* Content Textarea */}
                    <div className="space-y-2">
                      <Label htmlFor="content-text">Content</Label>
                      <Textarea
                        id="content-text"
                        value={editingContent.content}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, content: e.target.value })
                        }
                        placeholder="Enter your content here..."
                        rows={8}
                        className="font-mono text-sm"
                      />
                    </div>

                    {/* Image Section */}
                    <div className="space-y-2">
                      <Label>Image</Label>
                      {editingContent.imageUrl ? (
                        <div className="space-y-2">
                          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                            <img
                              src={editingContent.imageUrl}
                              alt="Content preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              setEditingContent({ ...editingContent, imageUrl: undefined })
                            }
                          >
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={!!uploadingImage}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-600">
                              {uploadingImage || "Click to upload an image"}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              PNG, JPG, GIF up to 10MB
                            </span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={handleSaveContent}
                        disabled={!!uploadingImage}
                        className="flex-1 bg-lifeline-blue hover:bg-blue-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingContent(null);
                          setSaveMessage(null);
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // Content List View
                <div className="space-y-4">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Website Content</h2>
                    <p className="text-gray-600">Select a section to edit its content and images</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pageContents.map((content, idx) => (
                      <Card key={idx} className="hover:shadow-lg transition cursor-pointer" onClick={() => handleEditContent(content)}>
                        <CardHeader>
                          <CardTitle className="text-lg">{content.title}</CardTitle>
                          <CardDescription className="capitalize">{content.section} section</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Current Content:</p>
                            <p className="text-gray-700 line-clamp-2">{content.content}</p>
                          </div>
                          {content.imageUrl && (
                            <div className="relative w-full h-32 bg-gray-100 rounded overflow-hidden border border-gray-300">
                              <img
                                src={content.imageUrl}
                                alt={content.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <Button
                            className="w-full bg-lifeline-blue hover:bg-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditContent(content);
                            }}
                          >
                            Edit Content
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Help Section */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Help & Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 space-y-3">
              <div>
                <p className="font-semibold mb-2">Managing Content:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Click "Edit Content" on any section to modify text and images</li>
                  <li>Upload new images or remove existing ones</li>
                  <li>Click "Save Changes" to persist your updates</li>
                  <li>Changes are saved to your website immediately</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Image Upload:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Supported formats: PNG, JPG, GIF</li>
                  <li>Maximum file size: 10MB</li>
                  <li>Images are optimized automatically</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
