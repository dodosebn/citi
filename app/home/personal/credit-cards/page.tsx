import React from 'react'
import { CreditCard, Shield, Gift, Globe, Zap, TrendingUp } from 'lucide-react'

const Page = () => {
  const cards = [
    {
      name: "Platinum Rewards",
      icon: <CreditCard className="w-8 h-8" />,
      apr: "16.99% APR",
      rewardRate: "5x points on travel",
      annualFee: "$95",
      features: ["No foreign transaction fees", "Travel insurance", "Priority boarding"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "Cashback Plus",
      icon: <TrendingUp className="w-8 h-8" />,
      apr: "15.49% APR",
      rewardRate: "3% cashback on groceries",
      annualFee: "$0",
      features: ["Unlimited 1.5% cashback", "Sign-up bonus: $200", "Price protection"],
      gradient: "from-green-500 to-emerald-600"
    },
    {
      name: "Travel Elite",
      icon: <Globe className="w-8 h-8" />,
      apr: "18.99% APR",
      rewardRate: "10x points on hotels",
      annualFee: "$550",
      features: ["Airport lounge access", "Global entry credit", "Concierge service"],
      gradient: "from-amber-500 to-orange-600"
    }
  ]

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Zero Liability",
      description: "You're not responsible for unauthorized purchases"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Welcome Bonus",
      description: "Earn up to 80,000 bonus points"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Approval",
      description: "Get a decision in 60 seconds"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#03305c] via-purple-600 to-pink-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold text-white mb-6">
            Credit Cards That Work For You
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Choose from our premium selection of credit cards with rewards, 
            cashback, and travel benefits tailored to your lifestyle.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 -mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Card Header */}
              <div className={`h-48 bg-gradient-to-r ${card.gradient} p-6 flex flex-col justify-between`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{card.name}</h3>
                    <p className="text-blue-100 mt-2">{card.rewardRate}</p>
                  </div>
                  <div className="text-white">
                    {card.icon}
                  </div>
                </div>
                <div className="text-white">
                  <div className="text-3xl font-bold">{card.annualFee}</div>
                  <div className="text-sm opacity-90">annual fee</div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {card.apr}
                  </div>
                  <div className="text-sm text-gray-500">Purchase APR</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-[#e8742c] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8 text-center">
            Premium Benefits Included
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-[#03305c]">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator Section */}
        <div className="mt-16 bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Rewards Calculator</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <label className="block mb-2">Monthly Spending</label>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  className="w-full"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>$500</span>
                  <span>$10,000</span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Spending Category</label>
                <select className="w-full p-3 rounded-lg text-gray-800">
                  <option>Travel</option>
                  <option>Groceries</option>
                  <option>Dining</option>
                  <option>Gas</option>
                </select>
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Estimated Rewards</h3>
              <div className="text-4xl font-bold mb-2">$1,250</div>
              <p className="text-blue-200">Annual cashback value</p>
              <button className="mt-6 bg-white text-[#03305c] py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                See Your Matches
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page