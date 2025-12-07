import React from 'react'
import { Heart, Users, Trees, GraduationCap, Home, DollarSign, TrendingUp, Award } from 'lucide-react'

const Page = () => {
  const initiatives = [
    {
      category: "Financial Education",
      icon: <GraduationCap className="w-10 h-10" />,
      description: "Free financial literacy programs for all ages",
      impact: "50,000+ people educated",
      year: "2023",
      color: "from-blue-600 to-cyan-500"
    },
    {
      category: "Affordable Housing",
      icon: <Home className="w-10 h-10" />,
      description: "Low-interest loans for first-time homebuyers",
      impact: "2,500 homes financed",
      year: "2023",
      color: "from-purple-600 to-pink-500"
    },
    {
      category: "Small Business Support",
      icon: <TrendingUp className="w-10 h-10" />,
      description: "Grants and mentorship for local entrepreneurs",
      impact: "$10M in grants distributed",
      year: "2023",
      color: "from-emerald-600 to-green-500"
    },
    {
      category: "Environmental Sustainability",
      icon: <Trees className="w-10 h-10" />,
      description: "Carbon-neutral operations and green initiatives",
      impact: "100% renewable energy",
      year: "2024",
      color: "from-amber-600 to-orange-500"
    }
  ];

  const volunteerStats = [
    {
      number: "15,000+",
      label: "Volunteer Hours",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "$5M",
      label: "Community Grants",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      number: "200+",
      label: "Nonprofit Partners",
      icon: <Heart className="w-6 h-6" />
    },
    {
      number: "95%",
      label: "Employee Participation",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const recentProjects = [
    {
      title: "Financial Literacy in Schools",
      description: "Partnered with 100 schools to teach personal finance",
      status: "Ongoing",
      participants: "25,000 students"
    },
    {
      title: "Community Development Fund",
      description: "$2M fund for neighborhood revitalization projects",
      status: "Active",
      participants: "15 communities"
    },
    {
      title: "Veteran Entrepreneurship Program",
      description: "Training and funding for veteran-owned businesses",
      status: "Ongoing",
      participants: "200 veterans"
    },
    {
      title: "Digital Inclusion Initiative",
      description: "Providing technology access to underserved communities",
      status: "Completed",
      participants: "10,000 individuals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#03305c] via-blue-800 to-[#1a4f8c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-12 h-12 text-[#e8742c]" />
            <h1 className="text-5xl font-bold">Community Impact</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            We believe in building stronger communities. Our commitment extends 
            beyond banking to create lasting positive change where we live and work.
          </p>
          <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
            Get Involved
          </button>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8 text-center">
            Our Impact in Numbers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerStats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-[#03305c]">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Initiatives */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Focus Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${initiative.color} p-6`}>
                  <div className="text-white mb-4">
                    {initiative.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {initiative.category}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {initiative.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">Impact</div>
                      <div className="font-bold text-[#03305c]">
                        {initiative.impact}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Year</div>
                      <div className="font-bold text-gray-800">
                        {initiative.year}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Recent Community Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recentProjects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    project.status === 'Ongoing' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{project.participants}</span>
                  </div>
                  <button className="text-[#03305c] font-medium hover:text-[#e8742c] transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stories */}
        <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Community Stories</h2>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <blockquote className="italic mb-4">
                    "Thanks to the bank's small business grant program, 
                    I was able to expand my bakery and hire two more employees 
                    from our neighborhood."
                  </blockquote>
                  <div>
                    <div className="font-bold">Maria Gonzalez</div>
                    <div className="text-blue-200">Local Business Owner</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <div>
                    <div className="font-bold">Financial Literacy Workshop</div>
                    <div className="text-sm text-blue-200">Oct 15, 2024</div>
                  </div>
                  <button className="text-sm bg-white text-[#03305c] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Register
                  </button>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <div>
                    <div className="font-bold">Community Cleanup Day</div>
                    <div className="text-sm text-blue-200">Nov 5, 2024</div>
                  </div>
                  <button className="text-sm bg-white text-[#03305c] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Volunteer
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">Small Business Expo</div>
                    <div className="text-sm text-blue-200">Dec 10, 2024</div>
                  </div>
                  <button className="text-sm bg-white text-[#03305c] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#03305c] mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Whether you're an individual, business, or nonprofit organization, 
            there are many ways to partner with us for community impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Partner With Us
            </button>
            <button className="bg-white border-2 border-[#03305c] text-[#03305c] py-3 px-8 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Download Impact Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page