
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

const GetInvolved = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    type: "Donate",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Submission failed");
      }
      setSuccess(true);
      setForm({ firstName: "", lastName: "", email: "", type: "Donate", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-0 min-h-screen">
        <div className="page-hero" style={{ backgroundImage: "url('/images/hero-get-involved.svg')" }}>
          <div className="hero-inner">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center text-white mb-8">
                <h1 className="text-3xl md:text-4xl font-bold">Get Involved: Volunteer or Donate</h1>
                <p className="opacity-90 mt-2">Fill out the form below to volunteer or make a donation. We appreciate your support!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-lifeline-blue text-center mb-2">
                  Join Us — Donate or Volunteer
                </CardTitle>
                <p className="text-center text-gray-600">Use this form to tell us how you'd like to help. We will follow up by email.</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <img src="/images/placeholder-photo.svg" alt="Get Involved" className="page-placeholder-img" />
                </div>
                {success && (
                  <Alert className="mb-4 bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Thank you! Your message has been sent. We will contact you soon.
                    </AlertDescription>
                  </Alert>
                )}
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="Your first name"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">I want to:</Label>
                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lifeline-blue text-gray-700"
                    >
                      <option value="Donate">Donate</option>
                      <option value="Volunteer">Volunteer</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      disabled={isLoading}
                      placeholder="Tell us how you'd like to help or any questions you have."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-lifeline-blue hover:bg-blue-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Submit"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
