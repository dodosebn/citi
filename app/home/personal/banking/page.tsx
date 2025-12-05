import React from 'react'
import { Building, Shield, PiggyBank, CreditCard } from 'lucide-react'

const Page = () => {
  const features = [
    {
      icon: <PiggyBank className="w-10 h-10" />,
      title: "Savings Accounts",
      description: "High-yield savings with competitive interest rates",
      apy: "4.25% APY"
    },
    {
      icon: <CreditCard className="w-10 h-10" />,
      title: "Checking Accounts",
      description: "No monthly fees with direct deposit",
      features: ["No minimum balance", "Free ATMs worldwide"]
    },
    {
      icon: <Building className="w-10 h-10" />,
      title: "Mortgage Services",
      description: "Home loans with competitive rates",
      rate: "From 6.25% APR"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Secure Banking",
      description: "24/7 fraud protection & FDIC insured",
      coverage: "Up to $250,000"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Personal Banking</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Modern banking solutions designed for your financial success. 
            Experience seamless digital banking with the security you trust.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-[#03305c] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              {feature.apy && (
                <div className="bg-green-50 text-green-700 font-bold p-2 rounded-lg text-center">
                  {feature.apy}
                </div>
              )}
              {feature.features && (
                <ul className="space-y-2">
                  {feature.features.map((feat, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#e8742c] rounded-full mr-2"></span>
                      {feat}
                    </li>
                  ))}
                </ul>
              )}
              {feature.rate && (
                <div className="text-[#03305c] font-bold text-lg mt-2">
                  {feature.rate}
                </div>
              )}
              {feature.coverage && (
                <div className="text-sm text-gray-500 mt-2">
                  {feature.coverage}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button className="bg-[#03305c] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#1a4f8c] transition-colors">
              Open New Account
            </button>
            <button className="bg-white border-2 border-[#03305c] text-[#03305c] py-4 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Schedule Appointment
            </button>
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-4 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Apply for Loan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page