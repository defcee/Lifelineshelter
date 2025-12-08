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
import { AlertCircle, LogOut, CheckCircle, Upload, Save, X, Edit2 } from "lucide-react";
import type { AdminDashboardResponse } from "@shared/api";
import { apiFetch } from "@shared/apiClient";

interface EditableContent {
  id: string;
  label: string;
  type: "text" | "textarea" | "image";
  value: string;
  placeholder?: string;
}

interface PageContent {
  [page: string]: EditableContent[];
}

// Comprehensive content structure for all pages
const DEFAULT_PAGES: PageContent = {
  home: [
    { id: "hero-title-1", label: "Hero Title - Line 1", type: "text", value: "Every Life", placeholder: "Hero title line 1" },
    { id: "hero-title-2", label: "Hero Title - Line 2", type: "text", value: "Matters", placeholder: "Hero title line 2" },
    { id: "hero-description", label: "Hero Description", type: "textarea", value: "LifeLine Shelter stands with the victims of crisis, terrorism, and displacement in Nigeria. Together, we provide immediate relief and long-term hope.", placeholder: "Hero description" },
    { id: "home-hero-image", label: "Hero Image", type: "image", value: "https://images.pexels.com/photos/30415852/pexels-photo-30415852.jpeg" },
  ],
  programs: [
    { id: "programs-title", label: "Page Title", type: "text", value: "Our Aids and Programs", placeholder: "Programs page title" },
    { id: "programs-subtitle", label: "Page Subtitle", type: "textarea", value: "At LifeLine Shelter, our work is driven by compassion, dignity, and the belief that every life deserves safety, hope, and opportunity.", placeholder: "Programs subtitle" },
    { id: "programs-description", label: "Programs Description", type: "textarea", value: "We support vulnerable individuals and communities affected by violence, displacement, terrorism, poverty, and humanitarian crises across Nigeria.", placeholder: "Programs description" },
    { id: "programs-footer", label: "Programs Footer", type: "textarea", value: "Our programs are designed to respond to urgent needs while creating long-term pathways for stability, recovery, and empowerment.", placeholder: "Programs footer text" },
    { id: "programs-hero-image", label: "Hero Image", type: "image", value: "https://images.pexels.com/photos/hero-programs.svg" },
  ],
  about: [
    { id: "about-title", label: "Page Title", type: "text", value: "About LifeLine Shelter", placeholder: "About page title" },
    { id: "about-description", label: "About Page Description", type: "textarea", value: "Dedicated to saving lives and restoring hope for victims of terrorism, conflict, and displacement in Nigeria", placeholder: "About page description" },
    { id: "about-mission", label: "Mission Statement", type: "textarea", value: "To provide immediate humanitarian relief and long-term support to victims of terrorism, conflict, and displacement in Nigeria, while raising global awareness of the humanitarian crisis and mobilizing international support.", placeholder: "Mission statement" },
    { id: "about-vision", label: "Vision Statement", type: "textarea", value: "A Nigeria where no family is displaced without immediate care, where communities rebuild with dignity, and where peace prevails over conflict. A world that responds to humanitarian crises with compassion and action.", placeholder: "Vision statement" },
    { id: "about-values", label: "Values Statement", type: "textarea", value: "Compassion, transparency, accountability, dignity, inclusion, and hope. We treat every person with respect and ensure that our work upholds the rights and voices of the communities we serve.", placeholder: "Values statement" },
    { id: "about-hero-image", label: "Hero Image", type: "image", value: "https://images.pexels.com/photos/6317433/pexels-photo-6317433.jpeg" },
  ],
  crisis: [
    { id: "crisis-title", label: "Page Title", type: "text", value: "Crisis Response", placeholder: "Crisis page title" },
    { id: "crisis-content", label: "Crisis Content", type: "textarea", value: "Immediate assistance during emergencies and humanitarian crises.", placeholder: "Crisis page content" },
    { id: "crisis-hero-image", label: "Hero Image", type: "image", value: "https://images.pexels.com/photos/30415852/pexels-photo-30415852.jpeg" },
  ],
  "get-involved": [
    { id: "involved-title", label: "Page Title", type: "text", value: "Get Involved: Volunteer or Donate", placeholder: "Get involved title" },
    { id: "involved-subtitle", label: "Page Subtitle", type: "textarea", value: "Fill out the form below to volunteer or make a donation. We appreciate your support!", placeholder: "Get involved subtitle" },
    { id: "involved-hero-image", label: "Hero Image", type: "image", value: "https://images.pexels.com/photos/6647176/pexels-photo-6647176.jpeg" },
  ],
  support: [
    { id: "support-title", label: "Page Title", type: "text", value: "Support Us", placeholder: "Support page title" },
    { id: "support-content", label: "Support Content", type: "textarea", value: "Your support makes a difference in the lives of vulnerable families and communities.", placeholder: "Support page content" },
    { id: "support-hero-image", label: "Hero Image", type: "image", value: "https://images.pexels.com/photos/hero-support.svg" },
  ],
  impact: [
    { id: "impact-title", label: "Page Title", type: "text", value: "Our Impact", placeholder: "Impact page title" },
    { id: "impact-content", label: "Impact Content", type: "textarea", value: "Stories of lives changed and communities transformed through our interventions.", placeholder: "Impact page content" },
  ],
  contact: [
    { id: "contact-title", label: "Page Title", type: "text", value: "Contact Us", placeholder: "Contact page title" },
    { id: "contact-description", label: "Contact Description", type: "textarea", value: "Get in touch with Lifeline Shelter to learn more or get involved.", placeholder: "Contact description" },
    { id: "contact-email", label: "Contact Email", type: "text", value: "customerrepresentative@lifelineshelter.com", placeholder: "Contact email" },
    { id: "contact-phone", label: "Contact Phone", type: "text", value: "+234 (0) 123 456 7890", placeholder: "Contact phone" },
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");
  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);
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

  const handleStartEdit = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditingValue(currentValue);
    setSaveMessage(null);
  };

  const handleSaveContent = (id: string) => {
    try {
      setPageContents(prev => {
        const updated = { ...prev };
        const contentIndex = updated[activePage].findIndex(c => c.id === id);
        if (contentIndex >= 0) {
          updated[activePage][contentIndex].value = editingValue;
        }
        localStorage.setItem("websitePageContents", JSON.stringify(updated));
        return updated;
      });
      setSaveMessage("Saved successfully!");
      setEditingId(null);
      setTimeout(() => setSaveMessage(null), 2000);
    } catch (err) {
      setSaveMessage(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, contentId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImageId(contentId);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setPageContents(prev => {
          const updated = { ...prev };
          const contentIndex = updated[activePage].findIndex(c => c.id === contentId);
          if (contentIndex >= 0) {
            updated[activePage][contentIndex].value = base64;
          }
          localStorage.setItem("websitePageContents", JSON.stringify(updated));
          return updated;
        });
        setUploadingImageId(null);
        setSaveMessage("Image uploaded successfully!");
        setTimeout(() => setSaveMessage(null), 2000);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setUploadingImageId(null);
      setSaveMessage(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
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
              <h1 className="text-4xl font-bold text-gray-900">Admin Content Manager</h1>
              <p className="text-gray-600 mt-2">Manage all website content: {username}</p>
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
              Click "Edit" on any content section to update text or images. Changes are saved automatically.
            </AlertDescription>
          </Alert>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="edit">Edit Content</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-lifeline-blue">{Object.keys(pageContents).length}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Editable Sections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-lifeline-green">
                      {Object.values(pageContents).reduce((sum, items) => sum + items.length, 0)}
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
                  <CardTitle>Available Pages</CardTitle>
                  <CardDescription>Click a page to edit its content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(pageContents).map(pageName => (
                      <div key={pageName} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                        <div>
                          <p className="font-semibold text-lg capitalize">{pageName.replace("-", " ")}</p>
                          <p className="text-sm text-gray-600">{pageContents[pageName].length} sections</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setActivePage(pageName);
                            setActiveTab("edit");
                          }}
                          className="bg-lifeline-blue hover:bg-blue-700"
                        >
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Edit Content Tab */}
            <TabsContent value="edit" className="space-y-6">
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
                        className={activePage === pageName ? "bg-lifeline-blue text-white" : ""}
                      >
                        {pageName.replace("-", " ").substring(0, 10).toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Content List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {activePage.replace("-", " ")} Page Content
                </h2>

                {saveMessage && (
                  <Alert className={saveMessage.includes("Error") ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}>
                    <AlertCircle className={`h-4 w-4 ${saveMessage.includes("Error") ? "text-red-600" : "text-green-600"}`} />
                    <AlertDescription className={saveMessage.includes("Error") ? "text-red-800" : "text-green-800"}>
                      {saveMessage}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pageContents[activePage].map(content => (
                    <Card key={content.id} className={editingId === content.id ? "border-lifeline-blue border-2" : ""}>
                      <CardHeader>
                        <CardTitle className="text-base">{content.label}</CardTitle>
                        <CardDescription>{content.id}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {editingId === content.id ? (
                          // Edit Mode
                          <>
                            {content.type === "text" && (
                              <Input
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                placeholder={content.placeholder}
                              />
                            )}

                            {content.type === "textarea" && (
                              <Textarea
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                placeholder={content.placeholder}
                                rows={5}
                                className="font-mono text-sm"
                              />
                            )}

                            {content.type === "image" && editingValue && (
                              <div>
                                <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-300 mb-2">
                                  <img
                                    src={editingValue}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <label className="block mb-2">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, content.id)}
                                    disabled={!!uploadingImageId}
                                    className="hidden"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    asChild
                                  >
                                    <span>{uploadingImageId === content.id ? "Uploading..." : "Change Image"}</span>
                                  </Button>
                                </label>
                              </div>
                            )}

                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleSaveContent(content.id)}
                                className="flex-1 bg-green-600 hover:bg-green-700"
                              >
                                <Save className="w-4 h-4 mr-1" />
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setEditingId(null);
                                  setEditingValue("");
                                }}
                                className="flex-1"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </>
                        ) : (
                          // View Mode
                          <>
                            {content.type === "image" ? (
                              <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                                <img
                                  src={content.value}
                                  alt={content.label}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <p className="text-gray-700 text-sm line-clamp-3">{content.value || "No content"}</p>
                            )}

                            <Button
                              variant="default"
                              size="sm"
                              className="w-full bg-lifeline-blue hover:bg-blue-700"
                              onClick={() => handleStartEdit(content.id, content.value)}
                            >
                              <Edit2 className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Help */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">📖 Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 space-y-2">
              <p><strong>1. Click "Edit Content" tab</strong></p>
              <p><strong>2. Select a page</strong> (Home, Programs, About, etc.)</p>
              <p><strong>3. Click "Edit" on any section</strong></p>
              <p><strong>4. Update text or upload new images</strong></p>
              <p><strong>5. Click "Save"</strong> - Changes appear on your website immediately!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
