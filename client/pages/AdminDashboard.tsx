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

interface PageSection {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  heroImage?: string;
}

interface PageContent {
  [page: string]: PageSection[];
}

const DEFAULT_PAGES: PageContent = {
  home: [
    { id: "hero-title", title: "Hero Title", content: "Welcome to Lifeline Shelter" },
    { id: "hero-subtitle", title: "Hero Subtitle", content: "Supporting those in crisis with compassion and action" },
    { id: "hero-image", title: "Hero Image", imageUrl: "https://images.pexels.com/photos/30415852/pexels-photo-30415852.jpeg" },
  ],
  programs: [
    { id: "programs-title", title: "Page Title", content: "Our Programs" },
    { id: "programs-intro", title: "Introduction", content: "Comprehensive support programs for vulnerable families" },
  ],
  about: [
    { id: "about-title", title: "Page Title", content: "About Lifeline Shelter" },
    { id: "about-content", title: "Content", content: "Our mission is to provide emergency support..." },
  ],
  crisis: [
    { id: "crisis-title", title: "Page Title", content: "Crisis Response" },
    { id: "crisis-content", title: "Content", content: "Immediate assistance during emergencies..." },
  ],
  "get-involved": [
    { id: "involved-title", title: "Page Title", content: "Get Involved: Volunteer or Donate" },
    { id: "involved-subtitle", title: "Subtitle", content: "Fill out the form below to volunteer or make a donation" },
  ],
  support: [
    { id: "support-title", title: "Page Title", content: "Support Us" },
    { id: "support-content", title: "Content", content: "Your support makes a difference..." },
  ],
  impact: [
    { id: "impact-title", title: "Page Title", content: "Our Impact" },
    { id: "impact-content", title: "Content", content: "Stories of lives changed..." },
  ],
  contact: [
    { id: "contact-title", title: "Page Title", content: "Contact Us" },
    { id: "contact-content", title: "Content", content: "Get in touch with Lifeline Shelter..." },
  ],
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activePage, setActivePage] = useState("home");
  
  const [pageContents, setPageContents] = useState<PageContent>(DEFAULT_PAGES);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
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
        const data: AdminDashboardResponse = await apiFetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.authenticated) {
          setIsAuthenticated(true);
          setUsername(storedUsername || data.user?.username || "Admin");
          // Load saved page contents from localStorage
          const saved = localStorage.getItem("websitePageContents");
          if (saved) {
            setPageContents(JSON.parse(saved));
          }
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

  const handleEditSection = (section: PageSection) => {
    setEditingSection({ ...section });
    setSaveMessage(null);
  };

  const handleSaveSection = async () => {
    if (!editingSection) return;

    try {
      setSaveMessage("Saving...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setPageContents(prev => {
        const updated = { ...prev };
        const sectionIndex = updated[activePage].findIndex(s => s.id === editingSection.id);
        if (sectionIndex >= 0) {
          updated[activePage][sectionIndex] = editingSection;
        }
        // Persist to localStorage
        localStorage.setItem("websitePageContents", JSON.stringify(updated));
        return updated;
      });
      
      setSaveMessage("Content saved successfully!");
      setTimeout(() => {
        setEditingSection(null);
        setSaveMessage(null);
      }, 2000);
    } catch (err) {
      setSaveMessage(`Error saving: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingSection) return;

    try {
      setUploadingImage("Uploading...");
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setEditingSection(prev =>
          prev ? { ...prev, imageUrl: base64 } : null
        );
        setUploadingImage(null);
        setSaveMessage("Image uploaded successfully!");
        setTimeout(() => setSaveMessage(null), 2000);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setUploadingImage(null);
      setSaveMessage(`Error uploading: ${err instanceof Error ? err.message : "Unknown error"}`);
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage website content: {username}</p>
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

          <Alert className="mb-8 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              You are logged in. Click on any page tab to edit its content.
            </AlertDescription>
          </Alert>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="content">Edit Pages</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-lifeline-blue">8</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Editable Sections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-lifeline-green">
                      {Object.values(pageContents).reduce((sum, pages) => sum + pages.length, 0)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-green-600">✓ Active</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Pages Available for Editing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(pageContents).map(pageName => (
                      <div key={pageName} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                          <p className="font-semibold capitalize">{pageName.replace("-", " ")}</p>
                          <p className="text-sm text-gray-600">{pageContents[pageName].length} sections</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setActivePage(pageName);
                            setActiveTab("content");
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Editor Tab */}
            <TabsContent value="content" className="space-y-6">
              {/* Page Selector */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Page to Edit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.keys(pageContents).map(pageName => (
                      <Button
                        key={pageName}
                        variant={activePage === pageName ? "default" : "outline"}
                        onClick={() => setActivePage(pageName)}
                        className={activePage === pageName ? "bg-lifeline-blue" : ""}
                      >
                        {pageName.replace("-", " ").toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {editingSection ? (
                // Edit Mode
                <Card className="border-lifeline-blue">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{editingSection.title}</CardTitle>
                        <CardDescription>Page: {activePage}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingSection(null);
                          setSaveMessage(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                      <Label htmlFor="section-title">Section Title</Label>
                      <Input
                        id="section-title"
                        value={editingSection.title}
                        onChange={(e) =>
                          setEditingSection({ ...editingSection, title: e.target.value })
                        }
                        placeholder="Section title"
                      />
                    </div>

                    {/* Subtitle Input */}
                    {editingSection.subtitle !== undefined && (
                      <div className="space-y-2">
                        <Label htmlFor="section-subtitle">Subtitle</Label>
                        <Input
                          id="section-subtitle"
                          value={editingSection.subtitle || ""}
                          onChange={(e) =>
                            setEditingSection({ ...editingSection, subtitle: e.target.value })
                          }
                          placeholder="Section subtitle"
                        />
                      </div>
                    )}

                    {/* Content Textarea */}
                    {editingSection.content !== undefined && (
                      <div className="space-y-2">
                        <Label htmlFor="section-content">Content</Label>
                        <Textarea
                          id="section-content"
                          value={editingSection.content || ""}
                          onChange={(e) =>
                            setEditingSection({ ...editingSection, content: e.target.value })
                          }
                          placeholder="Enter content here..."
                          rows={8}
                          className="font-mono text-sm"
                        />
                      </div>
                    )}

                    {/* Image Section */}
                    {editingSection.imageUrl !== undefined && (
                      <div className="space-y-2">
                        <Label>Image</Label>
                        {editingSection.imageUrl ? (
                          <div className="space-y-2">
                            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                              <img
                                src={editingSection.imageUrl}
                                alt="Content"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                setEditingSection({ ...editingSection, imageUrl: undefined })
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
                                {uploadingImage || "Click to upload image"}
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={handleSaveSection}
                        disabled={!!uploadingImage}
                        className="flex-1 bg-lifeline-blue hover:bg-blue-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingSection(null);
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
                // View Mode
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 capitalize">
                    {activePage.replace("-", " ")} Page Content
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pageContents[activePage].map((section) => (
                      <Card key={section.id} className="hover:shadow-lg transition cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                          <CardDescription>{section.id}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {section.content && (
                            <div>
                              <p className="text-sm font-semibold text-gray-600 mb-1">Content:</p>
                              <p className="text-gray-700 line-clamp-2">{section.content}</p>
                            </div>
                          )}
                          {section.subtitle && (
                            <div>
                              <p className="text-sm font-semibold text-gray-600 mb-1">Subtitle:</p>
                              <p className="text-gray-700 line-clamp-2">{section.subtitle}</p>
                            </div>
                          )}
                          {section.imageUrl && (
                            <div className="relative w-full h-32 bg-gray-100 rounded overflow-hidden border border-gray-300">
                              <img
                                src={section.imageUrl}
                                alt={section.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <Button
                            className="w-full bg-lifeline-blue hover:bg-blue-700"
                            onClick={() => handleEditSection(section)}
                          >
                            Edit Section
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
                <p className="font-semibold mb-2">How to Edit Content:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Click "Edit Pages" tab to manage website content</li>
                  <li>Select a page using the buttons (Home, Programs, etc.)</li>
                  <li>Click "Edit Section" on any content card</li>
                  <li>Update text, subtitle, and upload new images</li>
                  <li>Click "Save Changes" to persist updates</li>
                  <li>Changes are saved locally and display on the website</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Pages You Can Edit:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Home - Hero section and main content</li>
                  <li>Programs - Program descriptions and images</li>
                  <li>About - Organization information</li>
                  <li>Crisis - Crisis response content</li>
                  <li>Get Involved - Volunteer/donation page</li>
                  <li>Support Us - Fundraising information</li>
                  <li>Impact - Success stories and metrics</li>
                  <li>Contact - Contact information and form</li>
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
