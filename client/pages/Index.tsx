import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Heart, Users, Droplets, Stethoscope, BookOpen, Brain, MapPin, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lifeline-blue via-blue-600 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Logo and Headline */}
            <div className="flex flex-col items-start justify-center">
              <div className="mb-8 animate-fade-in">
                <div className="w-24 h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-12 h-12 text-white fill-white" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Every Life Matters
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
                  LifeLine Shelter stands with the victims of crisis, terrorism, and displacement in Nigeria. Together, we provide immediate relief and long-term hope.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
                <button className="px-8 py-4 rounded-lg bg-white text-lifeline-blue font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </button>
                <button className="px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-lifeline-blue transition-colors flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Volunteer
                </button>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-6 w-full">
                <div>
                  <p className="text-3xl font-bold">2.9M+</p>
                  <p className="text-sm text-blue-100">Internally Displaced</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="text-sm text-blue-100">Families Helped</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">25+</p>
                  <p className="text-sm text-blue-100">Active Programs</p>
                </div>
              </div>
            </div>

            {/* Right: Hero Image Placeholder */}
            <div className="relative h-96 md:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-t from-lifeline-blue to-transparent opacity-30 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1469026238294-daf406ff8410?w=800&q=80"
                alt="Families receiving aid and support"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 md:py-16 bg-lifeline-sand bg-opacity-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/crisis"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all group cursor-pointer border border-lifeline-sand"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-lifeline-earth">Crisis Updates</h3>
                <MapPin className="w-6 h-6 text-lifeline-blue group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-600 text-sm">
                Understand the scale of the crisis with real-time statistics and affected regions
              </p>
            </Link>

            <Link
              to="/impact"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all group cursor-pointer border border-lifeline-sand"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-lifeline-earth">Impact Stories</h3>
                <TrendingUp className="w-6 h-6 text-lifeline-green group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-600 text-sm">
                Read inspiring stories of lives transformed through our humanitarian efforts
              </p>
            </Link>

            <Link
              to="/get-involved"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all group cursor-pointer border border-lifeline-sand"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-lifeline-earth">Current Campaigns</h3>
                <Heart className="w-6 h-6 text-lifeline-warm group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-600 text-sm">
                Join our active campaigns and make a direct impact in communities today
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-4">Our Life-Saving Programs</h2>
            <p className="text-lg text-gray-600">
              We address the most urgent needs of displaced families with comprehensive, compassionate care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Food Relief */}
            <Link to="/programs" className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl border border-orange-200 hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">Food Relief</h3>
              <p className="text-gray-700 text-sm mb-4">
                Ensuring vulnerable families have access to nutritious meals and food security
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Clean Water */}
            <Link to="/programs" className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">Clean Water</h3>
              <p className="text-gray-700 text-sm mb-4">
                Installing water treatment systems and boreholes in displaced communities
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Healthcare */}
            <Link to="/programs" className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl border border-red-200 hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">Healthcare Services</h3>
              <p className="text-gray-700 text-sm mb-4">
                Mobile clinics providing vaccinations, maternal care, and emergency medical aid
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Education */}
            <Link to="/programs" className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200 hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">Education Programs</h3>
              <p className="text-gray-700 text-sm mb-4">
                Creating safe learning spaces and providing educational supplies for displaced children
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Mental Health */}
            <Link to="/programs" className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">Mental Health Support</h3>
              <p className="text-gray-700 text-sm mb-4">
                Trauma counseling and community healing activities for psychological recovery
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Emergency Response */}
            <Link to="/programs" className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl border border-yellow-200 hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">Emergency Response</h3>
              <p className="text-gray-700 text-sm mb-4">
                Rapid response teams providing immediate assistance during crises and emergencies
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-lifeline-blue text-white font-bold hover:bg-blue-700 transition-colors"
            >
              Explore All Programs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Impact Stories */}
      <section className="py-16 md:py-24 bg-lifeline-sand bg-opacity-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-4">Recent Impact Stories</h2>
            <p className="text-lg text-gray-600">
              Real stories of hope, resilience, and transformation from families we've helped
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Story 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-lifeline-blue to-blue-600 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1469026238294-daf406ff8410?w=400&q=80"
                  alt="Aisha's family receiving aid"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-lifeline-earth mb-2">Aisha's Second Chance</h3>
                <p className="text-gray-600 text-sm mb-4">
                  After fleeing her home with three children, Aisha found shelter, food, and hope with LifeLine. Today, her eldest is back in school.
                </p>
                <Link to="/impact" className="text-lifeline-blue font-semibold text-sm hover:underline flex items-center gap-2">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-lifeline-green to-green-600 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-8f3c2cd83c5d?w=400&q=80"
                  alt="Community water project inauguration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-lifeline-earth mb-2">Water Brings Life to Maiduguri</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our new borehole system now provides clean water to over 5,000 people in a displaced settlement, preventing waterborne diseases.
                </p>
                <Link to="/impact" className="text-lifeline-blue font-semibold text-sm hover:underline flex items-center gap-2">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/impact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-lifeline-blue text-lifeline-blue font-bold hover:bg-lifeline-blue hover:text-white transition-colors"
            >
              View All Impact Stories <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsorship & Support Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-4">Ways to Support Us</h2>
            <p className="text-lg text-gray-600">
              Every contribution, no matter the size, changes lives and brings hope to displaced families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sponsor Child */}
            <div className="bg-gradient-to-b from-lifeline-blue to-blue-600 text-white p-8 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">👧</div>
              <h3 className="text-lg font-bold mb-3">Sponsor a Child</h3>
              <p className="text-sm text-blue-100 mb-6">
                Support a child's education and wellbeing for a year
              </p>
              <p className="text-2xl font-bold">$50/mo</p>
            </div>

            {/* Sponsor Family */}
            <div className="bg-gradient-to-b from-lifeline-green to-green-600 text-white p-8 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">👨‍👩‍👧‍👦</div>
              <h3 className="text-lg font-bold mb-3">Sponsor a Family</h3>
              <p className="text-sm text-green-100 mb-6">
                Provide food, shelter, and care for an entire family
              </p>
              <p className="text-2xl font-bold">$150/mo</p>
            </div>

            {/* Community Project */}
            <div className="bg-gradient-to-b from-lifeline-warm to-orange-600 text-white p-8 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">🏫</div>
              <h3 className="text-lg font-bold mb-3">Sponsor a Project</h3>
              <p className="text-sm text-orange-100 mb-6">
                Build a school, water system, or healthcare facility
              </p>
              <p className="text-2xl font-bold">$1000+</p>
            </div>

            {/* One-Time Donation */}
            <div className="bg-gradient-to-b from-purple-500 to-purple-700 text-white p-8 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">❤️</div>
              <h3 className="text-lg font-bold mb-3">One-Time Gift</h3>
              <p className="text-sm text-purple-100 mb-6">
                Make an immediate impact with a one-time donation
              </p>
              <p className="text-2xl font-bold">Any Amount</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-lifeline-blue text-white font-bold hover:bg-blue-700 transition-colors"
            >
              Explore All Support Options <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-lifeline-blue to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Action Can Save Lives Today</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Thousands of families displaced by conflict await help. With your support, we provide food, shelter, healthcare, and hope.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-lg bg-white text-lifeline-blue font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Donate Now
            </button>
            <button className="px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-lifeline-blue transition-colors flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Join as Volunteer
            </button>
          </div>

          <p className="text-sm text-blue-200 mt-6">
            All donations are tax-deductible. We maintain transparency with detailed impact reports.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
