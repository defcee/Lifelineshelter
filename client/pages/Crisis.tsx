import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  Users,
  AlertCircle,
  TrendingUp,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Crisis = () => {
  const crisisStats = [
    {
      number: "4.8M+",
      label: "Internally Displaced Persons",
      icon: Users,
    },
    {
      number: "2.4M+",
      label: "In Crisis Areas",
      icon: AlertCircle,
    },
    {
      number: "1.5M+",
      label: "Children Affected",
      icon: TrendingUp,
    },
    {
      number: "6+",
      label: "States Impacted",
      icon: MapPin,
    },
  ];

  const crisisFactors = [
    {
      title: "Armed Conflict",
      description:
        "Ongoing insecurity in northeastern Nigeria due to terrorism and insurgency has displaced millions from their homes.",
      icon: "⚔️",
    },
    {
      title: "Displacement",
      description:
        "Families flee their communities seeking safety, often losing everything and facing inadequate shelter and resources.",
      icon: "🏚️",
    },
    {
      title: "Food Insecurity",
      description:
        "Disrupted agricultural activities and limited access to markets have created severe food shortages in affected regions.",
      icon: "🍽️",
    },
    {
      title: "Health Crisis",
      description:
        "Limited medical facilities, disease outbreaks, and malnutrition are major health concerns in IDP camps.",
      icon: "🏥",
    },
    {
      title: "Education Disruption",
      description:
        "Thousands of children have been displaced from schools, disrupting their education and future opportunities.",
      icon: "📚",
    },
    {
      title: "Psychological Trauma",
      description:
        "Survivors face severe trauma from witnessing violence and losing their livelihoods and communities.",
      icon: "🧠",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full text-white py-32 md:py-48 overflow-hidden">
        {/* Full-width background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6317433/pexels-photo-6317433.jpeg')",
          }}
        ></div>

        {/* Dark translucent overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Crisis: Understanding the Situation
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
            Real-time statistics, affected regions, and the scale of the
            humanitarian emergency in Nigeria
          </p>
        </div>
      </section>

      {/* Crisis Statistics Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6317433/pexels-photo-6317433.jpeg')",
          }}
        ></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Scale of the Crisis
            </h2>
            <p className="text-lg text-gray-100">
              Key statistics showing the humanitarian emergency affecting
              Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {crisisStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20 hover:bg-opacity-20 transition-all"
                >
                  <Icon className="w-8 h-8 text-white mx-auto mb-4" />
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-200 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Crisis Factors Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-4">
              Understanding the Crisis
            </h2>
            <p className="text-lg text-gray-600">
              Multiple interconnected challenges creating a complex humanitarian
              emergency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                ...crisisFactors[0],
                image:
                  "https://images.pexels.com/photos/34106813/pexels-photo-34106813.jpeg",
              },
              {
                ...crisisFactors[1],
                image:
                  "https://images.pexels.com/photos/17067103/pexels-photo-17067103.jpeg",
              },
              {
                ...crisisFactors[2],
                image:
                  "https://images.pexels.com/photos/32968674/pexels-photo-32968674.jpeg",
              },
              {
                ...crisisFactors[3],
                image:
                  "https://images.pexels.com/photos/4989139/pexels-photo-4989139.jpeg",
              },
              {
                ...crisisFactors[4],
                image:
                  "https://images.pexels.com/photos/2406271/pexels-photo-2406271.jpeg",
              },
              {
                ...crisisFactors[5],
                image:
                  "https://images.pexels.com/photos/5699463/pexels-photo-5699463.jpeg",
              },
            ].map((factor, index) => (
              <div
                key={index}
                className="group relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                <img
                  src={factor.image}
                  alt={factor.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="text-4xl mb-4">{factor.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {factor.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affected Regions Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6317433/pexels-photo-6317433.jpeg')",
          }}
        ></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Most Affected States
            </h2>
            <p className="text-lg text-gray-100">
              The humanitarian crisis is most severe in northeastern Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                state: "Borno",
                impact: "Epicenter of the crisis",
                idps: "2.2M+ displaced",
              },
              {
                state: "Adamawa",
                impact: "Significant displacement",
                idps: "1.1M+ displaced",
              },
              {
                state: "Yobe",
                impact: "High insecurity",
                idps: "780K+ displaced",
              },
              {
                state: "Taraba",
                impact: "Rising conflict",
                idps: "420K+ displaced",
              },
            ].map((region, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20"
              >
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {region.state}
                    </h3>
                    <p className="text-gray-200 mb-2">{region.impact}</p>
                    <p className="text-white font-semibold">{region.idps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-6">
              How You Can Help
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              LifeLine Shelter is working to provide immediate relief and
              long-term support to affected families. Your contribution can save
              lives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/programs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-lifeline-blue text-white font-bold hover:bg-blue-700 transition-colors"
              >
                Our Programs <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-lifeline-blue text-lifeline-blue font-bold hover:bg-lifeline-blue hover:text-white transition-colors"
              >
                Donate Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Crisis;
