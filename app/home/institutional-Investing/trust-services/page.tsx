import React from 'react'
import { Shield, Users, Home, Gift, Scale, FileText, Lock, Globe } from 'lucide-react'

const Page = () => {
  const trustTypes = [
    {
      name: "Revocable Living Trust",
      icon: <Home className="w-10 h-10" />,
      description: "Maintain control during lifetime with easy modifications",
      benefits: ["Avoids probate", "Privacy protection", "Incapacity planning"],
      minimum: "$500,000",
      color: "from-blue-600 to-cyan-500"
    },
    {
      name: "Irrevocable Trust",
      icon: <Lock className="w-10 h-10" />,
      description: "Asset protection and estate tax reduction",
      benefits: ["Asset protection", "Tax advantages", "Medicaid planning"],
      minimum: "$1,000,000",
      color: "from-purple-600 to-pink-500"
    },
    {
      name: "Charitable Trust",
      icon: <Gift className="w-10 h-10" />,
      description: "Support causes while receiving tax benefits",
      benefits: ["Tax deductions", "Income stream", "Philanthropic legacy"],
      minimum: "$250,000",
      color: "from-emerald-600 to-green-500"
    },
    {
      name: "Special Needs Trust",
      icon: <Users className="w-10 h-10" />,
      description: "Provide for loved ones without affecting benefits",
      benefits: ["Preserves benefits", "Quality of life", "Professional management"],
      minimum: "$100,000",
      color: "from-amber-600 to-orange-500"
    }
  ];

  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust Administration",
      description: "Professional management and distribution"
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Estate Planning",
      description: "Comprehensive wealth transfer strategies"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Document Preparation",
      description: "Legal document drafting and review"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Fiduciary Services",
      description: "Acting in your best interests as trustee"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-[#03305c]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-16 h-16 text-[#e8742c]" />
            <h1 className="text-5xl font-bold text-white">
              Trust Services
            </h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mb-10">
            Professional trust administration and estate planning services 
            to protect your legacy and ensure your wishes are carried out.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Schedule Consultation
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
              Download Estate Planning Guide
            </button>
          </div>
        </div>
      </div>

      {/* Trust Types */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Types of Trusts We Manage
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustTypes.map((trust, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${trust.color} p-6 rounded-t-2xl`}>
                  <div className="text-white mb-4">
                    {trust.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {trust.name}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {trust.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-lg font-bold text-[#03305c]">
                      Minimum: {trust.minimum}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {trust.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#e8742c] rounded-full mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Comprehensive Trust Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-[#03305c]">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8 text-center">
            Our Trust Administration Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description: "Understand your goals and needs"
              },
              {
                step: "2",
                title: "Plan Design",
                description: "Custom trust structure creation"
              },
              {
                step: "3",
                title: "Documentation",
                description: "Legal drafting and review"
              },
              {
                step: "4",
                title: "Ongoing Management",
                description: "Continuous administration"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#e8742c] to-[#f5a623] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{process.title}</h4>
                <p className="text-sm text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Trust Services Statistics
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$4.2B</div>
              <div className="text-blue-200">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">125+</div>
              <div className="text-blue-200">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-200">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#03305c] mb-6">
            Protect Your Legacy Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our team of experienced trust officers and estate planning 
            attorneys can help you create a comprehensive plan for your legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Schedule Estate Review
            </button>
            <button className="bg-white border-2 border-[#03305c] text-[#03305c] py-3 px-8 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Meet Our Trust Officers
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
