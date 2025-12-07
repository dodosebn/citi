import React from 'react'
import { TrendingUp, PieChart, Shield, Globe, Target, Users, BarChart3, Briefcase } from 'lucide-react'

const Page = () => {
  const services = [
    {
      name: "Private Banking",
      icon: <Briefcase className="w-10 h-10" />,
      description: "Exclusive banking services for high-net-worth individuals",
      minimum: "$1,000,000",
      features: ["Custom credit solutions", "Global banking access", "Family office services"],
      color: "from-blue-600 to-cyan-500"
    },
    {
      name: "Investment Management",
      icon: <TrendingUp className="w-10 h-10" />,
      description: "Personalized portfolio management and strategy",
      minimum: "$500,000",
      features: ["Custom portfolio construction", "Risk management", "Tax optimization"],
      color: "from-purple-600 to-pink-500"
    },
    {
      name: "Family Office",
      icon: <Users className="w-10 h-10" />,
      description: "Comprehensive wealth management for families",
      minimum: "$10,000,000",
      features: ["Multi-generational planning", "Philanthropy strategy", "Concierge services"],
      color: "from-emerald-600 to-green-500"
    },
    {
      name: "Global Investments",
      icon: <Globe className="w-10 h-10" />,
      description: "International investment opportunities and diversification",
      minimum: "$2,000,000",
      features: ["Foreign markets access", "Currency hedging", "International real estate"],
      color: "from-amber-600 to-orange-500"
    }
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Custom Strategies",
      description: "Tailored investment approaches"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk Management",
      description: "Sophisticated risk assessment"
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Portfolio Diversification",
      description: "Global asset allocation"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Comprehensive reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-[#03305c]">
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-center gap-4 mb-6">
            <TrendingUp className="w-16 h-16 text-[#e8742c]" />
            <h1 className="text-5xl font-bold text-white">
              Wealth Management
            </h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mb-10">
            Sophisticated wealth management solutions for high-net-worth 
            individuals, families, and institutions. Experience personalized 
            service and strategic guidance.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Schedule Consultation
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
              Download Investment Guide
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Exclusive Wealth Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${service.color} p-6 rounded-t-2xl`}>
                  <div className="text-white mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {service.name}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-lg font-bold text-[#03305c]">
                      Minimum: {service.minimum}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#e8742c] rounded-full mr-2"></span>
                        {feature}
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

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Our Approach to Wealth Management
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-[#03305c]">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Dashboard */}
        <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Performance Dashboard</h2>
            <select className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
              <option>Year to Date</option>
              <option>Last 12 Months</option>
              <option>3 Year Average</option>
              <option>5 Year Average</option>
            </select>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">+12.8%</div>
              <div className="text-blue-200">Average Annual Return</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">0.35%</div>
              <div className="text-blue-200">Average Management Fee</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Client Retention Rate</div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Asset Allocation</h3>
              <div className="space-y-3">
                {[
                  { label: "Equities", value: 45, color: "#3b82f6" },
                  { label: "Fixed Income", value: 25, color: "#8b5cf6" },
                  { label: "Alternative Investments", value: 20, color: "#10b981" },
                  { label: "Cash & Equivalents", value: 10, color: "#f59e0b" }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Client Profile</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Average Portfolio Size</span>
                    <span className="font-bold">$4.2M</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Years with Firm (Avg.)</span>
                    <span className="font-bold">8.5</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Client Satisfaction</span>
                    <span className="font-bold">96%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#03305c] mb-6">
            Begin Your Wealth Management Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our team of Certified Financial Planners and Chartered Wealth 
            Managers is ready to help you achieve your financial objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Request Portfolio Review
            </button>
            <button className="bg-white border-2 border-[#03305c] text-[#03305c] py-3 px-8 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Meet Our Advisors
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
