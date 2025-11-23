import { Layout } from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <Layout>
      <section className="py-24 bg-lifeline-sand bg-opacity-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-lifeline-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔄</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-lifeline-earth mb-4">
              {title}
            </h1>

            <p className="text-lg text-gray-600 mb-8">{description}</p>

            <div className="bg-blue-50 border border-lifeline-blue rounded-xl p-8 mb-8">
              <p className="text-lifeline-earth font-semibold mb-3">
                📝 This page is being developed
              </p>
              <p className="text-gray-700 mb-4">
                Continue chatting with us to customize and populate this page
                with your content, stories, and updates.
              </p>
              <p className="text-sm text-gray-600">
                We're ready to build exactly what you need for this section of
                your LifeLine Shelter website.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-lifeline-blue text-white font-bold hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PlaceholderPage;
