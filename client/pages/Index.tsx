import { Layout } from "@/components/Layout";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  Droplets,
  Stethoscope,
  BookOpen,
  Brain,
  MapPin,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const heroCarouselImages = [
    {
      src: "https://images.pexels.com/photos/30415852/pexels-photo-30415852.jpeg",
      alt: "Community gathered in Borno, Nigeria - resilience and togetherness",
    },
    {
      src: "https://images.pexels.com/photos/17067103/pexels-photo-17067103.jpeg",
      alt: "Families at refugee camp in Northern Nigeria - IDPs in temporary shelter",
    },
    {
      src: "https://images.pexels.com/photos/8061687/pexels-photo-8061687.jpeg",
      alt: "Volunteer holding baby at Lagos Food Bank - compassionate care for vulnerable children",
    },
    {
      src: "https://images.pexels.com/photos/27962039/pexels-photo-27962039.jpeg",
      alt: "Children at temporary tent camp in Northern Nigeria - hope amid crisis",
    },
  ];

  return (
    <Layout>
      {/* Hero Section with Full-Width Carousel Background */}
      <section className="relative w-full text-white py-32 md:py-48 lg:py-56 overflow-hidden">
        {/* Full-width background carousel */}
        <div className="absolute inset-0 w-full h-full z-0">
          <ImageCarousel
            images={heroCarouselImages}
            autoPlayInterval={5000}
            className="h-full rounded-none"
          />
        </div>

        {/* Dark blue overlay for better text contrast */}
        <div className="absolute inset-0 bg-blue-900 opacity-40 z-5 pointer-events-none"></div>

        {/* Content container */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Logo with animation */}
            <div
              className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-8 animate-fade-in"
              style={{
                animation: "fadeInUp 0.8s ease-out 0.1s both",
              }}
            >
              <Heart className="w-12 h-12 text-white fill-white" />
            </div>

            {/* Main Headline - Line by line animation */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span
                className="block"
                style={{
                  animation: "fadeInUp 0.8s ease-out 0.2s both",
                }}
              >
                Every Life
              </span>
              <span
                className="block"
                style={{
                  animation: "fadeInUp 0.8s ease-out 0.4s both",
                }}
              >
                Matters
              </span>
            </h1>

            {/* Description - Animated paragraph */}
            <p
              className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg leading-relaxed"
              style={{
                animation: "fadeInUp 0.8s ease-out 0.6s both",
              }}
            >
              LifeLine Shelter stands with the victims of crisis, terrorism, and
              displacement in Nigeria. Together, we provide immediate relief and
              long-term hope.
            </p>

            {/* CTA Buttons - Staggered animation */}
            <div
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
              style={{
                animation: "fadeInUp 0.8s ease-out 0.8s both",
              }}
            >
              <button className="px-8 py-4 rounded-lg bg-white text-lifeline-blue font-bold hover:bg-blue-50 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                <Heart className="w-5 h-5" />
                Donate Now
              </button>
              <button className="px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-lifeline-blue transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                <Users className="w-5 h-5" />
                Volunteer
              </button>
            </div>

            {/* Impact Stats - Grid animation */}
            <div
              className="grid grid-cols-3 gap-4 md:gap-6 w-full"
              style={{
                animation: "fadeInUp 0.8s ease-out 1s both",
              }}
            >
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all">
                <p className="text-2xl md:text-3xl font-bold">2.9M+</p>
                <p className="text-xs md:text-sm text-blue-100">Internally Displaced</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all">
                <p className="text-2xl md:text-3xl font-bold">50K+</p>
                <p className="text-xs md:text-sm text-blue-100">Families Helped</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all">
                <p className="text-2xl md:text-3xl font-bold">25+</p>
                <p className="text-xs md:text-sm text-blue-100">Active Programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add CSS animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Quick Links Section with Background */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Full-width background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6317433/pexels-photo-6317433.jpeg')",
          }}
        ></div>

        {/* Dark translucent overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore Our Work
            </h2>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto">
              Stay informed about the crisis, celebrate impact, and join our
              campaigns
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Crisis Updates Card */}
            <Link
              to="/crisis"
              className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Card Image */}
              <img
                src="https://images.pexels.com/photos/15861714/pexels-photo-15861714.jpeg"
                alt="Crisis Updates - Affected regions and emergency response"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Dark overlay on card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

              {/* Icon */}
              <div className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm group-hover:bg-lifeline-blue group-hover:bg-opacity-80 transition-all duration-300">
                <MapPin className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-lifeline-blue transition-colors">
                  Crisis Updates
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Real-time statistics, affected regions, and emergency response
                  information
                </p>
                <div className="mt-4 flex items-center text-white font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>

            {/* Impact Stories Card */}
            <Link
              to="/impact"
              className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Card Image */}
              <img
                src="https://images.pexels.com/photos/6646870/pexels-photo-6646870.jpeg"
                alt="Impact Stories - Lives transformed through humanitarian efforts"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Dark overlay on card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

              {/* Icon */}
              <div className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm group-hover:bg-lifeline-green group-hover:bg-opacity-80 transition-all duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-lifeline-green transition-colors">
                  Impact Stories
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Inspiring stories of families helped, communities rebuilt, and
                  lives transformed
                </p>
                <div className="mt-4 flex items-center text-white font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Read Stories <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>

            {/* Current Campaigns Card */}
            <Link
              to="/get-involved"
              className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Card Image */}
              <img
                src="https://images.pexels.com/photos/8377428/pexels-photo-8377428.jpeg"
                alt="Current Campaigns - Join active fundraising and advocacy campaigns"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Dark overlay on card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

              {/* Icon */}
              <div className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm group-hover:bg-lifeline-warm group-hover:bg-opacity-80 transition-all duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-lifeline-warm transition-colors">
                  Current Campaigns
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Active fundraising, advocacy initiatives, and volunteer
                  opportunities
                </p>
                <div className="mt-4 flex items-center text-white font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Get Involved <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Crisis & News Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Full-width background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/8061687/pexels-photo-8061687.jpeg')",
          }}
        ></div>

        {/* Dark translucent overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Latest Crisis Updates
            </h2>
            <p className="text-lg text-gray-100">
              Real-time updates on the humanitarian crisis in northern Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* News Item 1 */}
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <img
                src="https://images.pexels.com/photos/27962039/pexels-photo-27962039.jpeg"
                alt="Affected communities in northern Nigeria"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm group-hover:bg-red-600 group-hover:bg-opacity-90 transition-all duration-300">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-300 bg-red-600 bg-opacity-80 px-3 py-1 rounded-full">
                    🚨 Urgent
                  </span>
                  <span className="text-xs text-gray-300">2 days ago</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                  Escalating Crisis in Borno State
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed mb-4">
                  Over 50,000 newly displaced persons reported in Maiduguri and
                  surrounding areas following security incidents. Our emergency
                  response teams are on the ground providing immediate aid.
                </p>
                <Link
                  to="/crisis"
                  className="text-white font-semibold text-sm hover:text-red-300 flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300"
                >
                  Read Full Report <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* News Item 2 */}
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <img
                src="https://images.pexels.com/photos/6647176/pexels-photo-6647176.jpeg"
                alt="Humanitarian aid distribution"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm group-hover:bg-amber-500 group-hover:bg-opacity-90 transition-all duration-300">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-600 bg-opacity-80 px-3 py-1 rounded-full">
                    📰 Update
                  </span>
                  <span className="text-xs text-gray-300">1 week ago</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  Emergency Food Distribution Campaign
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed mb-4">
                  LifeLine Shelter distributed food packages to 15,000 families
                  across 8 displaced communities. This initiative provided
                  emergency sustenance to vulnerable populations in Adamawa
                  State.
                </p>
                <Link
                  to="/impact"
                  className="text-white font-semibold text-sm hover:text-amber-300 flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300"
                >
                  View Impact Report <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* News Item 3 */}
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <img
                src="https://images.pexels.com/photos/10613996/pexels-photo-10613996.jpeg"
                alt="Water access initiative"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm group-hover:bg-green-600 group-hover:bg-opacity-90 transition-all duration-300">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-300 bg-green-600 bg-opacity-80 px-3 py-1 rounded-full">
                    ✅ Completed
                  </span>
                  <span className="text-xs text-gray-300">3 weeks ago</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                  Clean Water Access Project Success
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed mb-4">
                  Successfully installed 12 water boreholes in IDPs camps across
                  Yobe State, providing clean water access to 25,000
                  individuals. A critical step in disease prevention and
                  community health.
                </p>
                <Link
                  to="/programs"
                  className="text-white font-semibold text-sm hover:text-green-300 flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300"
                >
                  Learn About Programs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* News Item 4 */}
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <img
                src="https://images.pexels.com/photos/7551597/pexels-photo-7551597.jpeg"
                alt="Healthcare services delivery"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm group-hover:bg-blue-600 group-hover:bg-opacity-90 transition-all duration-300">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-600 bg-opacity-80 px-3 py-1 rounded-full">
                    🏥 Initiative
                  </span>
                  <span className="text-xs text-gray-300">5 days ago</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  Mobile Healthcare Clinics Active
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed mb-4">
                  Our mobile healthcare teams have conducted 3,200 medical
                  consultations across 6 IDP camps. Free vaccinations, maternal
                  care, and emergency medical services continue daily.
                </p>
                <Link
                  to="/programs"
                  className="text-white font-semibold text-sm hover:text-blue-300 flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/crisis"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-colors"
            >
              View All Crisis Updates <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Full-width background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6317433/pexels-photo-6317433.jpeg')",
          }}
        ></div>

        {/* Dark translucent overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Life-Saving Programs
            </h2>
            <p className="text-lg text-gray-100">
              We address the most urgent needs of displaced families with
              comprehensive, compassionate care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Food Relief */}
            <Link
              to="/programs"
              className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-xl border border-orange-300 hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-white bg-opacity-30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Food Relief
              </h3>
              <p className="text-orange-100 text-sm mb-4">
                Ensuring vulnerable families have access to nutritious meals and
                food security
              </p>
              <div className="text-white font-semibold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Clean Water */}
            <Link
              to="/programs"
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">
                Clean Water
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Installing water treatment systems and boreholes in displaced
                communities
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Healthcare */}
            <Link
              to="/programs"
              className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl border border-red-200 hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">
                Healthcare Services
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Mobile clinics providing vaccinations, maternal care, and
                emergency medical aid
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Education */}
            <Link
              to="/programs"
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200 hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">
                Education Programs
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Creating safe learning spaces and providing educational supplies
                for displaced children
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Mental Health */}
            <Link
              to="/programs"
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">
                Mental Health Support
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Trauma counseling and community healing activities for
                psychological recovery
              </p>
              <div className="text-lifeline-blue font-semibold text-sm flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Emergency Response */}
            <Link
              to="/programs"
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl border border-yellow-200 hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-xl font-bold text-lifeline-earth mb-3">
                Emergency Response
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Rapid response teams providing immediate assistance during
                crises and emergencies
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
            <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-4">
              Recent Impact Stories
            </h2>
            <p className="text-lg text-gray-600">
              Real stories of hope, resilience, and transformation from families
              we've helped
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
                <h3 className="text-xl font-bold text-lifeline-earth mb-2">
                  Aisha's Second Chance
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  After fleeing her home with three children, Aisha found
                  shelter, food, and hope with LifeLine. Today, her eldest is
                  back in school.
                </p>
                <Link
                  to="/impact"
                  className="text-lifeline-blue font-semibold text-sm hover:underline flex items-center gap-2"
                >
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
                <h3 className="text-xl font-bold text-lifeline-earth mb-2">
                  Water Brings Life to Maiduguri
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our new borehole system now provides clean water to over 5,000
                  people in a displaced settlement, preventing waterborne
                  diseases.
                </p>
                <Link
                  to="/impact"
                  className="text-lifeline-blue font-semibold text-sm hover:underline flex items-center gap-2"
                >
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
            <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-4">
              Ways to Support Us
            </h2>
            <p className="text-lg text-gray-600">
              Every contribution, no matter the size, changes lives and brings
              hope to displaced families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sponsor Child */}
            <div className="bg-gradient-to-b from-lifeline-blue to-blue-600 text-white p-8 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                👧
              </div>
              <h3 className="text-lg font-bold mb-3">Sponsor a Child</h3>
              <p className="text-sm text-blue-100 mb-6">
                Support a child's education and wellbeing for a year
              </p>
              <p className="text-2xl font-bold">$50/mo</p>
            </div>

            {/* Sponsor Family */}
            <div className="bg-gradient-to-b from-lifeline-green to-green-600 text-white p-8 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                👨‍👩‍👧‍👦
              </div>
              <h3 className="text-lg font-bold mb-3">Sponsor a Family</h3>
              <p className="text-sm text-green-100 mb-6">
                Provide food, shelter, and care for an entire family
              </p>
              <p className="text-2xl font-bold">$150/mo</p>
            </div>

            {/* Community Project */}
            <div className="bg-gradient-to-b from-lifeline-warm to-orange-600 text-white p-8 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                🏫
              </div>
              <h3 className="text-lg font-bold mb-3">Sponsor a Project</h3>
              <p className="text-sm text-orange-100 mb-6">
                Build a school, water system, or healthcare facility
              </p>
              <p className="text-2xl font-bold">$1000+</p>
            </div>

            {/* One-Time Donation */}
            <div className="bg-gradient-to-b from-purple-500 to-purple-700 text-white p-8 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                ❤️
              </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Action Can Save Lives Today
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Thousands of families displaced by conflict await help. With your
            support, we provide food, shelter, healthcare, and hope.
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
            All donations are tax-deductible. We maintain transparency with
            detailed impact reports.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
