import React from 'react'
import { Users, Award, Briefcase, Target, Linkedin, Mail } from 'lucide-react'

const Page = () => {
  const leadershipTeam = [
    {
      name: "Sarah Chen",
      position: "Chief Executive Officer",
      bio: "20+ years in financial services, former McKinsey partner",
      experience: "Harvard MBA, Chartered Financial Analyst",
      linkedin: "#",
      email: "#",
      imageColor: "from-blue-500 to-cyan-500"
    },
    {
      name: "Michael Rodriguez",
      position: "Chief Financial Officer",
      bio: "Former VP of Finance at Goldman Sachs",
      experience: "CPA, Wharton School graduate",
      linkedin: "#",
      email: "#",
      imageColor: "from-purple-500 to-pink-500"
    },
    {
      name: "James Wilson",
      position: "Chief Technology Officer",
      bio: "Fintech pioneer with 3 successful startup exits",
      experience: "Stanford Computer Science, Former Google",
      linkedin: "#",
      email: "#",
      imageColor: "from-emerald-500 to-green-500"
    },
    {
      name: "Jennifer Park",
      position: "Chief Risk Officer",
      bio: "15 years in risk management and compliance",
      experience: "FRM, Georgetown Law",
      linkedin: "#",
      email: "#",
      imageColor: "from-amber-500 to-orange-500"
    },
    {
      name: "David Thompson",
      position: "Chief Marketing Officer",
      bio: "Award-winning marketing strategist",
      experience: "Kellogg MBA, Former Apple",
      linkedin: "#",
      email: "#",
      imageColor: "from-red-500 to-pink-500"
    },
    {
      name: "Lisa Williams",
      position: "Chief Human Resources Officer",
      bio: "Global HR leader with focus on diversity and inclusion",
      experience: "Cornell ILR, Former Microsoft",
      linkedin: "#",
      email: "#",
      imageColor: "from-indigo-500 to-purple-500"
    }
  ];

  const boardMembers = [
    {
      name: "Robert Johnson",
      role: "Chairman Emeritus",
      tenure: "Founder (1985-Present)"
    },
    {
      name: "Amanda Davis",
      role: "Board Chair",
      tenure: "Former CEO, Global Bank Corp"
    },
    {
      name: "Thomas Kim",
      role: "Independent Director",
      tenure: "Professor, Harvard Business School"
    },
    {
      name: "Maria Garcia",
      role: "Independent Director",
      tenure: "Former SEC Commissioner"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#03305c] via-blue-800 to-[#1a4f8c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-12 h-12 text-[#e8742c]" />
            <h1 className="text-5xl font-bold">Leadership Team</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            Meet the visionary leaders guiding our bank's mission and driving 
            innovation in the financial services industry.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Executive Team */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#03305c]">
              Executive Leadership
            </h2>
            <div className="flex items-center gap-2 text-[#03305c]">
              <Briefcase className="w-5 h-5" />
              <span className="font-medium">12 Executive Team Members</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header with gradient */}
                <div className={`h-40 bg-gradient-to-r ${member.imageColor} p-6 flex items-end`}>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-white/90">{member.position}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {member.bio}
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Award className="w-4 h-4" />
                      <span className="font-medium">Credentials</span>
                    </div>
                    <p className="text-gray-700">
                      {member.experience}
                    </p>
                  </div>

                  {/* Contact Links */}
                  <div className="flex gap-4">
                    <a 
                      href={member.linkedin} 
                      className="flex items-center gap-2 text-[#03305c] hover:text-[#e8742c] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <a 
                      href={`mailto:${member.email}`} 
                      className="flex items-center gap-2 text-[#03305c] hover:text-[#e8742c] transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Board of Directors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Board of Directors
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boardMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <div className="text-[#e8742c] font-medium">
                      {member.role}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {member.tenure}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Philosophy */}
        <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Leadership Philosophy</h2>
              <p className="text-blue-100 text-lg mb-6">
                We believe in servant leadership, transparency, and fostering 
                a culture of continuous innovation and collaboration.
              </p>
              <ul className="space-y-4">
                {[
                  "Empowering teams to make decisions",
                  "Fostering diversity of thought and experience",
                  "Leading with empathy and integrity",
                  "Driving sustainable growth"
                ].map((principle, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#e8742c] rounded-full mr-3"></div>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Leadership Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Employee Satisfaction</span>
                    <span className="font-bold">94%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="w-[94%] bg-green-400 h-2 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Gender Diversity (Leadership)</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="w-[45%] bg-blue-400 h-2 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Internal Promotion Rate</span>
                    <span className="font-bold">68%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="w-[68%] bg-amber-400 h-2 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#03305c] mb-6">
            Connect with Our Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our leadership team is committed to transparency and accessibility. 
            We welcome your questions and feedback.
          </p>
          <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
            Contact Leadership Team
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page