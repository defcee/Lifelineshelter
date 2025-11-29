import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Heart, Users, Handshake, Megaphone, ArrowRight } from "lucide-react";

const SupportUs = () => {
  return (
    <Layout>
      <section className="py-20 min-h-screen bg-lifeline-sand bg-opacity-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-lifeline-earth mb-4">
              Support Us
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Your support helps us save lives, restore dignity, and build hope for families affected by crisis, violence, and displacement in Nigeria.
            </p>
          </div>

          {/* Why Support Us */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-lifeline-blue mb-3">Why Support Us?</h2>
            <p className="text-gray-700 mb-2">
              LifeLine Shelter is committed to providing immediate relief and long-term solutions for vulnerable communities. Your contribution enables us to deliver food, water, healthcare, education, and hope where it’s needed most.
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-4 space-y-1 text-left">
              <li>Direct impact on families in crisis</li>
              <li>Transparent, accountable use of funds</li>
              <li>Community-driven, sustainable programs</li>
              <li>Every gift, large or small, makes a difference</li>
            </ul>
          </div>

          {/* Ways to Support */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-lifeline-blue mb-6 text-center">Ways to Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-lifeline-blue to-blue-600 text-white rounded-xl p-8 flex flex-col items-center">
                <Heart className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Donate</h3>
                <p className="mb-4 text-center">Make a one-time or recurring donation to provide food, shelter, and hope to those in need.</p>
                <Link to="/get-involved" className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-lifeline-blue font-bold hover:bg-blue-50 transition-colors">
                  Donate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-lifeline-green to-green-600 text-white rounded-xl p-8 flex flex-col items-center">
                <Users className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Volunteer</h3>
                <p className="mb-4 text-center">Join our team of volunteers and make a hands-on difference in the lives of displaced families.</p>
                <Link to="/get-involved" className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-lifeline-green font-bold hover:bg-green-50 transition-colors">
                  Volunteer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-lifeline-warm to-orange-600 text-white rounded-xl p-8 flex flex-col items-center">
                <Handshake className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Partner</h3>
                <p className="mb-4 text-center">Collaborate with us as a corporate, NGO, or community partner to expand our impact.</p>
                <Link to="/get-involved" className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-lifeline-warm font-bold hover:bg-orange-50 transition-colors">
                  Partner <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-xl p-8 flex flex-col items-center">
                <Megaphone className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Advocate</h3>
                <p className="mb-4 text-center">Raise awareness, fundraise, or advocate for the rights of displaced persons and survivors of crisis.</p>
                <Link to="/get-involved" className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-blue-700 font-bold hover:bg-blue-100 transition-colors">
                  Advocate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits of Supporting */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-lifeline-blue mb-3">Benefits of Supporting</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
              <li>Be part of a compassionate, global community</li>
              <li>Receive regular updates and impact stories</li>
              <li>Opportunities for recognition and partnership</li>
              <li>Make a lasting difference in the lives of others</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-lifeline-blue mb-4">Ready to Make a Difference?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/get-involved" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-lifeline-blue text-white font-bold hover:bg-blue-700 transition-colors">
                Donate <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/get-involved" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-lifeline-blue text-lifeline-blue font-bold hover:bg-lifeline-blue hover:text-white transition-colors">
                Volunteer <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/get-involved" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-lifeline-green text-lifeline-green font-bold hover:bg-lifeline-green hover:text-white transition-colors">
                Partner <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-gray-600">Thank you for supporting LifeLine Shelter and the families we serve.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SupportUs;
