"use client";
import React, { useState } from 'react'
import { Briefcase, Users, Award, TrendingUp, MapPin, DollarSign, Clock, GraduationCap } from 'lucide-react'

const Page = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Financial Analyst",
      department: "Finance",
      location: "New York, NY",
      type: "Full-time",
      salary: "$95,000 - $130,000",
      experience: "5+ years",
      posted: "2 days ago",
      description: "Lead financial modeling and analysis for strategic initiatives"
    },
    {
      id: 2,
      title: "Software Engineer",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      salary: "$110,000 - $150,000",
      experience: "3+ years",
      posted: "1 week ago",
      description: "Develop cutting-edge banking applications and APIs"
    },
    {
      id: 3,
      title: "Relationship Manager",
      department: "Commercial Banking",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$85,000 - $120,000",
      experience: "4+ years",
      posted: "3 days ago",
      description: "Manage portfolio of commercial banking clients"
    },
    {
      id: 4,
      title: "Cybersecurity Analyst",
      department: "Technology",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$105,000 - $140,000",
      experience: "3+ years",
      posted: "5 days ago",
      description: "Protect our digital assets and customer data"
    },
    {
      id: 5,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      salary: "$70,000 - $95,000",
      experience: "2+ years",
      posted: "1 week ago",
      description: "Develop and execute digital marketing campaigns"
    },
    {
      id: 6,
      title: "Risk Management Associate",
      department: "Risk",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$80,000 - $110,000",
      experience: "3+ years",
      posted: "4 days ago",
      description: "Assess and mitigate operational risks"
    }
  ];

  const departments = [
    { id: 'all', name: 'All Departments', count: 6 },
    { id: 'technology', name: 'Technology', count: 2 },
    { id: 'finance', name: 'Finance', count: 1 },
    { id: 'commercial', name: 'Commercial Banking', count: 1 },
    { id: 'marketing', name: 'Marketing', count: 1 },
    { id: 'risk', name: 'Risk Management', count: 1 }
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Competitive Compensation",
      description: "Above-market salaries and bonuses"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Clear promotion paths and mentorship"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Learning & Development",
      description: "$5,000 annual education budget"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Work",
      description: "Hybrid and remote options available"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Recognition",
      description: "Quarterly awards and bonuses"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Inclusive Culture",
      description: "Diverse and supportive environment"
    }
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department.toLowerCase().includes(selectedDepartment));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#03305c] via-blue-800 to-[#1a4f8c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-6">
            <Briefcase className="w-12 h-12 text-[#e8742c]" />
            <h1 className="text-5xl font-bold">Build Your Career With Us</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            Join a team that's redefining banking. We're looking for passionate 
            individuals who want to make an impact in financial services.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              View Open Positions
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
              Join Talent Network
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Job Openings */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-[#03305c]">
              Current Openings
            </h2>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDepartment === dept.id
                      ? 'bg-[#e8742c] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept.name} ({dept.count})
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{job.posted}</span>
                </div>

                <p className="text-gray-600 mb-6">
                  {job.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job.experience}</span>
                  </div>
                </div>

                <button className="w-full bg-[#03305c] text-white py-3 rounded-xl font-semibold hover:bg-[#1a4f8c] transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8 text-center">
            Why Work With Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-[#03305c]">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Values */}
        <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
              <p className="text-blue-100 text-lg mb-6">
                We foster an environment of innovation, collaboration, and 
                continuous learning where everyone can thrive and grow.
              </p>
              <ul className="space-y-4">
                {[
                  "Weekly team learning sessions",
                  "Monthly innovation challenges",
                  "Quarterly hackathons",
                  "Annual company retreat",
                  "Regular wellness programs",
                  "Volunteer time off"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#e8742c] rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Employee Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Employee Satisfaction</span>
                    <span className="font-bold">92%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="w-[92%] bg-green-400 h-2 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Average Tenure</span>
                    <span className="font-bold">4.2 years</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="w-[84%] bg-blue-400 h-2 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Promotion Rate</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="w-[25%] bg-amber-400 h-2 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#03305c] mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Don't see the perfect role? Join our talent network to stay 
            updated on future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Join Talent Network
            </button>
            <button className="bg-white border-2 border-[#03305c] text-[#03305c] py-3 px-8 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Campus Recruiting
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page