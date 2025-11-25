import { Layout } from "@/components/Layout";
import { Heart, Users, Globe, Target, Award, ArrowRight } from "lucide-react";

const About = () => {
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
            About LifeLine Shelter
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
            Dedicated to saving lives and restoring hope for victims of
            terrorism, conflict, and displacement in Nigeria
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Mission */}
            <div className="border-l-4 border-lifeline-blue pl-6">
              <Target className="w-8 h-8 text-lifeline-blue mb-4" />
              <h2 className="text-2xl font-bold text-lifeline-earth mb-3">
                Our Mission
              </h2>
              <p className="text-gray-700">
                To provide immediate humanitarian relief and long-term support
                to victims of terrorism, conflict, and displacement in Nigeria,
                while raising global awareness of the humanitarian crisis and
                mobilizing international support.
              </p>
            </div>

            {/* Vision */}
            <div className="border-l-4 border-lifeline-green pl-6">
              <Globe className="w-8 h-8 text-lifeline-green mb-4" />
              <h2 className="text-2xl font-bold text-lifeline-earth mb-3">
                Our Vision
              </h2>
              <p className="text-gray-700">
                A Nigeria where no family is displaced without immediate care,
                where communities rebuild with dignity, and where peace prevails
                over conflict. A world that responds to humanitarian crises with
                compassion and action.
              </p>
            </div>

            {/* Values */}
            <div className="border-l-4 border-lifeline-warm pl-6">
              <Heart className="w-8 h-8 text-lifeline-warm mb-4" />
              <h2 className="text-2xl font-bold text-lifeline-earth mb-3">
                Our Values
              </h2>
              <p className="text-gray-700">
                Compassion, transparency, accountability, dignity, inclusion,
                and hope. We treat every person with respect and ensure that our
                work upholds the rights and voices of the communities we serve.
              </p>
            </div>
          </div>

          {/* Core Values Cards */}
          <div className="bg-lifeline-sand bg-opacity-30 rounded-xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-lifeline-earth mb-8 text-center">
              Core Principles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-lifeline-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-lifeline-earth mb-2">
                  Compassion
                </h4>
                <p className="text-sm text-gray-700">
                  Driven by empathy and human dignity
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-lifeline-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-lifeline-earth mb-2">
                  Accountability
                </h4>
                <p className="text-sm text-gray-700">
                  Transparent in our actions and impact
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-lifeline-warm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-lifeline-earth mb-2">
                  Inclusion
                </h4>
                <p className="text-sm text-gray-700">
                  Amplifying voices of affected communities
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-lifeline-earth mb-2">
                  Excellence
                </h4>
                <p className="text-sm text-gray-700">
                  Delivering quality programs with integrity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Background */}
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
        <div className="absolute inset-0 bg-black opacity-50 z-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Our Story
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-3">
                  Origins & Founding
                </h3>
                <p className="text-gray-200 mb-4">
                  LifeLine Shelter was founded in response to the humanitarian
                  crisis facing Nigeria. As terrorism and conflict continued to
                  displace families and destroy communities, our founders
                  recognized an urgent need for comprehensive, compassionate aid
                  organizations that could respond quickly and effectively.
                </p>
                <p className="text-gray-200">
                  Drawing on years of humanitarian work across West Africa, our
                  team established LifeLine Shelter with a commitment to
                  providing not just emergency relief, but also long-term
                  support and sustainable solutions for displaced communities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-3">
                  Growth & Expansion
                </h3>
                <p className="text-gray-200 mb-4">
                  Since our inception, LifeLine Shelter has grown from a small
                  emergency response team to a comprehensive humanitarian
                  organization operating across multiple regions in Nigeria.
                  We've expanded our programs to address the most pressing
                  needs: food security, access to clean water, healthcare,
                  education, and mental health support.
                </p>
                <p className="text-gray-200">
                  Our network of dedicated staff, volunteers, and partners has
                  enabled us to help hundreds of thousands of displaced persons
                  and reach millions globally with awareness about the ongoing
                  crisis.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-3">
                  Our Impact
                </h3>
                <p className="text-gray-200">
                  Today, LifeLine Shelter operates one of the largest
                  humanitarian networks supporting internally displaced persons
                  in Nigeria. We manage multiple programs simultaneously,
                  maintain partnerships with international organizations, and
                  continue to adapt our services to meet emerging needs in
                  crisis zones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-12 text-center">
            Our Journey
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {/* 2019 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-lifeline-blue"></div>
                  <div className="w-1 h-24 bg-lifeline-sand"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-lifeline-blue mb-2">
                    2019: Foundation Year
                  </h4>
                  <p className="text-gray-700">
                    LifeLine Shelter officially launched with a small team and a
                    big vision. First emergency aid operations in Borno State.
                  </p>
                </div>
              </div>

              {/* 2020 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-lifeline-green"></div>
                  <div className="w-1 h-24 bg-lifeline-sand"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-lifeline-green mb-2">
                    2020: Expansion Phase
                  </h4>
                  <p className="text-gray-700">
                    Launched food relief programs and established clean water
                    initiatives. Reached 50,000 internally displaced persons
                    across three states.
                  </p>
                </div>
              </div>

              {/* 2021 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-lifeline-warm"></div>
                  <div className="w-1 h-24 bg-lifeline-sand"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-lifeline-warm mb-2">
                    2021: Healthcare & Education
                  </h4>
                  <p className="text-gray-700">
                    Established mobile healthcare clinics and opened educational
                    centers in IDP camps. Reached 100,000 individuals with aid.
                  </p>
                </div>
              </div>

              {/* 2022 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                  <div className="w-1 h-24 bg-lifeline-sand"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-blue-600 mb-2">
                    2022: Mental Health Integration
                  </h4>
                  <p className="text-gray-700">
                    Launched comprehensive mental health and psychosocial
                    support programs. Recognized by international humanitarian
                    organizations.
                  </p>
                </div>
              </div>

              {/* 2023 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-lifeline-blue"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-lifeline-blue mb-2">
                    2023 & Beyond: Global Impact
                  </h4>
                  <p className="text-gray-700">
                    Operating 25+ active programs across Nigeria. Partnering
                    with international agencies. Mobilizing global support for
                    displaced communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24 bg-lifeline-sand bg-opacity-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-4 text-center">
            Leadership Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
            Dedicated professionals with years of experience in humanitarian
            work, disaster response, and community development
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-64 bg-gradient-to-br from-lifeline-blue to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-lifeline-earth mb-1">
                  Dr. Amina Hassan
                </h3>
                <p className="text-sm text-lifeline-blue font-semibold mb-3">
                  Executive Director
                </p>
                <p className="text-sm text-gray-600">
                  20+ years of humanitarian experience. Former director of
                  regional health initiatives.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-64 bg-gradient-to-br from-lifeline-green to-green-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-lifeline-earth mb-1">
                  Kunle Okafor
                </h3>
                <p className="text-sm text-lifeline-green font-semibold mb-3">
                  Operations Director
                </p>
                <p className="text-sm text-gray-600">
                  Program management expert. Coordinated relief efforts across
                  West Africa.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-64 bg-gradient-to-br from-lifeline-warm to-orange-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-lifeline-earth mb-1">
                  Chioma Adeyemi
                </h3>
                <p className="text-sm text-lifeline-warm font-semibold mb-3">
                  Community Partnerships
                </p>
                <p className="text-sm text-gray-600">
                  Specializes in community engagement and local partnership
                  building.
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-64 bg-gradient-to-br from-purple-500 to-purple-700"></div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-lifeline-earth mb-1">
                  Mohammed Sani
                </h3>
                <p className="text-sm text-purple-600 font-semibold mb-3">
                  Finance & Transparency
                </p>
                <p className="text-sm text-gray-600">
                  Ensures financial accountability and resource optimization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-lifeline-earth mb-4 text-center">
            Our Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
            We work alongside international NGOs, government agencies, and
            community organizations to maximize our impact
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-center text-sm">
              UN Humanitarian
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-center text-sm">
              International Red Cross
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-center text-sm">
              Doctors Without Borders
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-center text-sm">
              World Food Programme
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-center text-sm">
              UNICEF Nigeria
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-center text-sm">
              Save the Children
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-center text-sm">
              Nigerian Red Cross
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-center text-sm">
              Local NGOs Network
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-lifeline-blue to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether through donations, volunteering, or advocacy, you can help
            us continue our life-saving work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-lg bg-white text-lifeline-blue font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Donate
            </button>
            <button className="px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-lifeline-blue transition-colors flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Volunteer
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
