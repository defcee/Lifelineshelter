import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-24 bg-lifeline-sand bg-opacity-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl font-bold text-lifeline-blue mb-4">
              404
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-lifeline-earth mb-4">
              Page Not Found
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist. It may have been
              moved or deleted.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-lifeline-blue text-white font-bold hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
