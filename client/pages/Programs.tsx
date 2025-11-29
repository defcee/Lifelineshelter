import PlaceholderPage from "./PlaceholderPage";


import { Layout } from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const programData = [
  {
    title: "Emergency Relief & Humanitarian Assistance",
    emoji: "🚨",
    image: "https://images.pexels.com/photos/30415852/pexels-photo-30415852.jpeg",
    description: "Immediate support to families affected by conflict, disaster, and displacement.",
    bullets: [
      "Food packs and nutritional support",
      "Clean water distribution",
      "Temporary shelter and essential household items",
      "Emergency medical aid and referrals",
      "Rapid response interventions for communities in distress",
    ],
    goal: "Save lives, reduce suffering, and restore hope."
  },
  {
    title: "Food Security & Nutrition Support",
    emoji: "🍚",
    image: "https://images.pexels.com/photos/6647176/pexels-photo-6647176.jpeg",
    description: "Distributing food supplies to vulnerable households, especially children, widows, the elderly, and displaced families.",
    bullets: [
      "Monthly food basket distribution",
      "Mobile feeding for children in IDP camps",
      "Nutrition screening and malnutrition management",
      "Community-based food assistance",
    ],
    goal: "No family goes to bed hungry."
  },
  {
    title: "Education Support & Child Development",
    emoji: "📚",
    image: "https://images.pexels.com/photos/33824863/pexels-photo-33824863.jpeg",
    description: "Creating safe learning opportunities for children affected by conflict, poverty, and displacement.",
    bullets: [
      "Back-to-school scholarships",
      "Provision of school supplies and uniforms",
      "Community learning hubs",
      "Literacy and numeracy classes",
      "Support for orphans and vulnerable children",
    ],
    goal: "Education is a lifeline to a better future."
  },
  {
    title: "Psychosocial Support & Trauma Healing",
    emoji: "🧠",
    image: "https://images.pexels.com/photos/5711236/pexels-photo-5711236.jpeg",
    description: "Helping survivors rebuild emotional strength and mental well-being.",
    bullets: [
      "Counseling for children and adults",
      "Trauma healing and resilience workshops",
      "Safe spaces for women and children",
      "Peer support groups in affected communities",
    ],
    goal: "Restore hope, dignity, and emotional stability."
  },
  {
    title: "Livelihood & Economic Empowerment",
    emoji: "💼",
    image: "https://images.pexels.com/photos/8061688/pexels-photo-8061688.jpeg",
    description: "Empowering individuals to rebuild their lives with dignity.",
    bullets: [
      "Skills training (tailoring, agriculture, crafts, ICT, small-scale business)",
      "Start-up kits for small businesses",
      "Vocational mentorship",
      "Support for widows and displaced families to regain financial stability",
    ],
    goal: "From survival to independence."
  },
  {
    title: "Health Outreach & Medical Support",
    emoji: "🏥",
    image: "https://images.pexels.com/photos/8061687/pexels-photo-8061687.jpeg",
    description: "Bringing health care closer to those who need it most.",
    bullets: [
      "Community health screenings",
      "Maternal and child health support",
      "Immunization partnerships",
      "Health education and awareness campaigns",
      "Mobile clinics for underserved communities",
    ],
    goal: "Access to health care saves lives."
  },
  {
    title: "Protection & Advocacy",
    emoji: "🛡️",
    image: "https://images.pexels.com/photos/27962039/pexels-photo-27962039.jpeg",
    description: "Safeguarding the rights and dignity of the vulnerable.",
    bullets: [
      "Advocacy for displaced persons and survivors of violence",
      "Child protection services",
      "Gender-based violence (GBV) prevention and response",
      "Community sensitization on safety, rights, and protection",
    ],
    goal: "We stand as a voice for the voiceless."
  },
];

const Programs = () => {
  return (
    <Layout>
      <section className="py-0 min-h-screen">
        <div className="page-hero" style={{ backgroundImage: "url('/images/hero-programs.svg')" }}>
          <div className="hero-inner">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center text-white mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">🌍 Our Aids and Programs</h1>
                <p className="text-lg opacity-90">
                  At LifeLine Shelter, our work is driven by compassion, dignity, and the belief that every life deserves safety, hope, and opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-20 bg-lifeline-sand bg-opacity-20">
          <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-lifeline-earth mb-4">
              🌍 Our Aids and Programs
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              At LifeLine Shelter, our work is driven by compassion, dignity, and the belief that every life deserves safety, hope, and opportunity.<br/>
              We support vulnerable individuals and communities affected by violence, displacement, terrorism, poverty, and humanitarian crises across Nigeria.
            </p>
            <p className="text-md text-gray-600">
              Our programs are designed to respond to urgent needs while creating long-term pathways for stability, recovery, and empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {programData.map((program, idx) => (
              <div key={program.title} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div className="h-56 w-full overflow-hidden relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover object-center"
                    style={{ minHeight: 220 }}
                  />
                  <span className="absolute top-4 left-4 text-3xl bg-white bg-opacity-80 rounded-full px-3 py-1 shadow">
                    {program.emoji}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-lifeline-blue mb-2">{program.title}</h2>
                  <p className="text-gray-700 mb-3">{program.description}</p>
                  <ul className="list-disc list-inside text-gray-600 mb-3 space-y-1">
                    {program.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-lifeline-earth font-semibold mt-auto">{program.goal}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-16">
            <div className="bg-blue-50 border border-lifeline-blue rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-lifeline-blue mb-2">💙 Our Commitment</h2>
              <p className="text-gray-700 mb-4">
                Every program we deliver is built on:
              </p>
              <ul className="flex flex-wrap justify-center gap-4 text-lifeline-earth font-semibold text-lg mb-4">
                <li>✔ Compassion</li>
                <li>✔ Transparency</li>
                <li>✔ Accountability</li>
                <li>✔ Community-centered action</li>
                <li>✔ Sustainable impact</li>
              </ul>
              <p className="text-gray-600">
                At LifeLine Shelter, we are committed to saving lives, restoring dignity, and building hope for a brighter future.
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
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
