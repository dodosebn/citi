import React from 'react'
import { CreditCard, Smartphone, Store, Globe, Shield, Zap, TrendingUp, Users } from 'lucide-react'

const Page = () => {
  const services = [
    {
      name: "Point of Sale Systems",
      icon: <Store className="w-10 h-10" />,
      description: "Complete POS solutions for retail and restaurants",
      features: ["Inventory management", "Sales reporting", "Customer management"],
      pricing: "From $29/month",
      color: "from-blue-600 to-cyan-500"
    },
    {
      name: "Online Payments",
      icon: <Globe className="w-10 h-10" />,
      description: "Secure e-commerce payment processing",
      features: ["Website integration", "Shopping cart", "Recurring billing"],
      pricing: "2.9% + $0.30 per transaction",
      color: "from-purple-600 to-pink-500"
    },
    {
      name: "Mobile Payments",
      icon: <Smartphone className="w-10 h-10" />,
      description: "Accept payments anywhere with mobile devices",
      features: ["Card reader included", "Tap-to-pay", "Offline mode"],
      pricing: "From $49 one-time",
      color: "from-emerald-600 to-green-500"
    },
    {
      name: "Virtual Terminal",
      icon: <CreditCard className="w-10 h-10" />,
      description: "Process payments remotely via computer",
      features: ["Manual entry", "Email invoices", "Batch processing"],
      pricing: "Included with account",
      color: "from-amber-600 to-orange-500"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "PCI Compliant",
      description: "Highest security standards"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Deposits",
      description: "Next-day funding available"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "No Hidden Fees",
      description: "Transparent pricing"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Dedicated account manager"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#03305c] via-blue-800 to-[#1a4f8c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-6">
            <CreditCard className="w-12 h-12 text-[#e8742c]" />
            <h1 className="text-5xl font-bold">Merchant Services</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            Accept payments anywhere with our comprehensive merchant solutions. 
            From in-store to online, we've got you covered.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Get Started
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
              Request Demo
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8 text-center">
            Payment Processing Solutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
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
                  
                  <div className="mb-6">
                    <div className="text-lg font-bold text-[#03305c]">
                      {service.pricing}
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
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Why Choose Our Merchant Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
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

        {/* Integration Section */}
        <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Seamless Integrations
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Connect with the tools you already use to streamline your business operations.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {["Shopify", "Square", "QuickBooks", "WooCommerce", "Salesforce", "Xero"].map((integration) => (
                  <div key={integration} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="font-semibold">{integration}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Transaction Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Approval Rate</span>
                    <span className="font-bold">99.2%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="w-[99.2%] bg-green-400 h-2 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Average Processing Time</span>
                    <span className="font-bold">1.8s</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="w-[95%] bg-blue-400 h-2 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Customer Satisfaction</span>
                    <span className="font-bold">98.5%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="w-[98.5%] bg-amber-400 h-2 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#03305c] mb-6">
            Ready to Accept Payments?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join over 50,000 businesses that trust us with their payment processing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Start Free Trial
            </button>
            <button className="bg-white border-2 border-[#03305c] text-[#03305c] py-3 px-8 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page