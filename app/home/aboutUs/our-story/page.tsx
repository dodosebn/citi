import React from 'react'
import { Building2, Target, Users, Globe, Award, TrendingUp, Shield, Heart } from 'lucide-react'

const Page = () => {
  const milestones = [
    {
      year: "1985",
      title: "Foundation",
      description: "Founded as a community bank with a mission to serve local families",
      icon: <Building2 className="w-8 h-8" />
    },
    {
      year: "1995",
      title: "Regional Expansion",
      description: "Expanded to 10 branches across the state",
      icon: <Globe className="w-8 h-8" />
    },
    {
      year: "2005",
      title: "Digital Transformation",
      description: "Launched online banking and mobile app",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      year: "2015",
      title: "National Recognition",
      description: "Named 'Best Bank for Customer Service' by Financial Times",
      icon: <Award className="w-8 h-8" />
    },
    {
      year: "2020",
      title: "Sustainable Banking",
      description: "Committed to carbon-neutral operations",
      icon: <Heart className="w-8 h-8" />
    },
    {
      year: "2024",
      title: "Future Ready",
      description: "Investing in AI and blockchain technology",
      icon: <Target className="w-8 h-8" />
    }
  ];

  const values = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our dealings"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Community",
      description: "We're committed to the prosperity of the communities we serve"
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Innovation",
      description: "We embrace technology to better serve our customers"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Inclusion",
      description: "We celebrate diversity and promote equal opportunities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#03305c] via-blue-800 to-[#1a4f8c]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            For nearly four decades, we've been helping individuals, families, 
            and businesses achieve their financial goals with integrity and innovation.
          </p>
          <div className="flex items-center gap-4">
            <div className="text-white">
              <div className="text-4xl font-bold">39</div>
              <div className="text-sm">Years of Service</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold">250K+</div>
              <div className="text-sm">Customers Served</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold">85</div>
              <div className="text-sm">Branches Nationwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-12 h-12 text-[#e8742c]" />
            <h2 className="text-3xl font-bold text-[#03305c]">Our Mission</h2>
          </div>
          <p className="text-xl text-gray-700 mb-6">
            To empower our customers to achieve financial success through innovative 
            solutions, personalized service, and unwavering integrity.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#03305c] mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the most trusted and innovative financial institution, 
                creating lasting value for our customers, employees, and communities.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#03305c] mb-4">Our Promise</h3>
              <p className="text-gray-600">
                We promise to always act in your best interest, provide transparent 
                services, and support the communities where we live and work.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-[#03305c]">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8 text-center">
            Our Journey Through Time
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-[#e8742c]">
                        {milestone.icon}
                      </div>
                      <span className="text-2xl font-bold text-[#03305c]">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Dot */}
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#e8742c] to-[#f5a623] rounded-full border-4 border-white"></div>
                </div>

                {/* Empty spacer */}
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Message */}
        <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/3">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mx-auto flex items-center justify-center">
                <Users className="w-32 h-32 text-white/80" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6">A Message from Our Founder</h2>
              <blockquote className="text-xl italic mb-6">
                "When we started this bank in 1985, we had a simple vision: 
                to create a financial institution that truly cares about its 
                customers. Today, that vision remains at the heart of everything we do."
              </blockquote>
              <div>
                <div className="font-bold">Robert Johnson</div>
                <div className="text-blue-200">Founder & Chairman Emeritus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page