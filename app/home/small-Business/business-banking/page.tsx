import React from 'react'
import { Building2, CreditCard, BarChart3, Shield, Users, Clock, TrendingUp, Globe } from 'lucide-react'

const Page = () => {
  const businessAccounts = [
    {
      name: "Business Checking Pro",
      icon: <Building2 className="w-10 h-10" />,
      description: "Advanced checking for growing businesses",
      fee: "$0 monthly with $5,000 balance",
      features: ["Unlimited transactions", "Free wire transfers", "Cash management"],
      color: "from-blue-600 to-cyan-500"
    },
    {
      name: "Merchant Solutions",
      icon: <CreditCard className="w-10 h-10" />,
      description: "Complete payment processing",
      fee: "1.5% + $0.10 per transaction",
      features: ["POS systems", "Online payments", "Mobile payments"],
      color: "from-purple-600 to-pink-500"
    },
    {
      name: "High-Yield Business Savings",
      icon: <TrendingUp className="w-10 h-10" />,
      description: "Grow your business reserves",
      apy: "4.5% APY",
      features: ["No minimum balance", "FDIC insured", "Easy transfers"],
      color: "from-emerald-600 to-green-500"
    },
    {
      name: "Treasury Management",
      icon: <BarChart3 className="w-10 h-10" />,
      description: "Advanced cash flow solutions",
      fee: "Custom pricing",
      features: ["ACH processing", "Payroll services", "Fraud protection"],
      color: "from-amber-600 to-orange-500"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with 24/7 monitoring"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dedicated Support",
      description: "Your personal business banking advisor"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Extended Hours",
      description: "Support available 7am-8pm EST"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Banking",
      description: "International payments and currency exchange"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#03305c] via-blue-800 to-[#1a4f8c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-6">
            <Building2 className="w-12 h-12 text-[#e8742c]" />
            <h1 className="text-5xl font-bold">Business Banking Solutions</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            Tailored financial services designed to help your business thrive. 
            From startups to established enterprises, we have the tools you need.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Open Business Account
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Business Accounts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Business Account Solutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessAccounts.map((account, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${account.color} p-6 rounded-t-2xl`}>
                  <div className="flex items-center justify-between">
                    <div className="text-white">{account.icon}</div>
                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {account.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {account.description}
                  </p>

                  <div className="mb-4">
                    <div className={`text-lg font-bold ${
                      account.apy ? 'text-emerald-600' : 'text-[#03305c]'
                    }`}>
                      {account.apy || account.fee}
                    </div>
                    <div className="text-sm text-gray-500">
                      {account.apy ? 'Annual Percentage Yield' : 'Monthly fee'}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {account.features.map((feature, i) => (
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

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Why Choose Our Business Banking
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

        {/* Tools Section */}
        <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Advanced Business Tools
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Access powerful financial management tools designed specifically for businesses.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time cash flow analytics",
                  "Automated invoice processing",
                  "Multi-user account access",
                  "Integration with accounting software",
                  "Custom reporting dashboards",
                  "Mobile check deposit"
                ].map((tool, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#e8742c] rounded-full mr-3"></div>
                    {tool}
                  </li>
                ))}
              </ul>
              <button className="bg-white text-[#03305c] py-3 px-8 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Explore Tools
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">15,000+</div>
                <div className="text-blue-200">Businesses Trust Us</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Daily Transactions</span>
                  <span className="font-bold">$2.4M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Customer Satisfaction</span>
                  <span className="font-bold">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Mobile App Rating</span>
                  <span className="font-bold">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-[#03305c] mb-6">
            Ready to Elevate Your Business Banking?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of successful businesses that trust us with their financial operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Get Started Today
            </button>
            <button className="bg-white border-2 border-[#03305c] text-[#03305c] py-3 px-8 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page