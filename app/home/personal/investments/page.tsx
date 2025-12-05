import React from 'react'
import { TrendingUp, PieChart, Target, Globe, Shield, BarChart } from 'lucide-react'

const Page = () => {
  const investmentOptions = [
    {
      category: "Retirement",
      icon: <Target className="w-10 h-10" />,
      plans: [
        { name: "Traditional IRA", minAmount: "$500", growth: "7-10%" },
        { name: "Roth IRA", minAmount: "$500", growth: "7-10%" },
        { name: "401(k) Rollover", minAmount: "$1,000", growth: "6-9%" }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Wealth Management",
      icon: <PieChart className="w-10 h-10" />,
      plans: [
        { name: "Managed Portfolio", minAmount: "$25,000", growth: "8-12%" },
        { name: "Robo-Advisor", minAmount: "$5,000", growth: "6-9%" },
        { name: "Custom Strategy", minAmount: "$100,000", growth: "9-15%" }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Education & Goals",
      icon: <TrendingUp className="w-10 h-10" />,
      plans: [
        { name: "529 College Plan", minAmount: "$250", growth: "5-8%" },
        { name: "Brokerage Account", minAmount: "$1,000", growth: "7-11%" },
        { name: "High-Yield CDs", minAmount: "$10,000", growth: "4-5%" }
      ],
      color: "from-green-500 to-emerald-500"
    }
  ]

  const marketData = [
    { label: "Stocks", value: 45, color: "#3b82f6" },
    { label: "Bonds", value: 30, color: "#8b5cf6" },
    { label: "Real Estate", value: 15, color: "#10b981" },
    { label: "Commodities", value: 10, color: "#f59e0b" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-[#03305c]">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&#34;60&#34; height=&#34;60&#34; viewBox=&#34;0 0 60 60&#34; xmlns=&#34;http://www.w3.org/2000/svg&#34;%3E%3Cg fill=&#34;none&#34; fillRule=&#34;evenodd&#34;%3E%3Cg fill=&#34;%239C92AC&#34; fillOpacity=&#34;0.4&#34;%3E%3Cpath d=&#34;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&#34;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold text-white mb-6">
            Build Your Financial Future
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-10">
            Expert investment strategies, personalized guidance, and 
            cutting-edge tools to help you grow your wealth.
          </p>
          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Start Investing
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Investment Options */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {investmentOptions.map((option, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${option.color} p-6`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">
                    {option.category}
                  </h3>
                  <div className="text-white">
                    {option.icon}
                  </div>
                </div>
              </div>

              {/* Plans */}
              <div className="p-6">
                <div className="space-y-4">
                  {option.plans.map((plan, i) => (
                    <div 
                      key={i}
                      className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-800">{plan.name}</h4>
                        <span className="text-[#e8742c] font-bold">{plan.growth}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Minimum: {plan.minAmount}</span>
                        <span>Annual Growth</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Explore Options
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Market Dashboard */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#03305c]">
              Market Insights Dashboard
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Live Data</span>
              </div>
              <select className="bg-gray-100 px-4 py-2 rounded-lg">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Portfolio Allocation */}
            <div>
              <h3 className="text-xl font-bold mb-6">Recommended Allocation</h3>
              <div className="space-y-4">
                {marketData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-gray-900 to-[#03305c] text-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">+12.4%</div>
                  <div className="text-sm text-gray-300">YTD Return</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">0.25%</div>
                  <div className="text-sm text-gray-300">Expense Ratio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">A+</div>
                  <div className="text-sm text-gray-300">Risk Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">96%</div>
                  <div className="text-sm text-gray-300">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-center text-white">
          <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Our certified financial advisors are here to help you create a 
            personalized investment strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#03305c] py-3 px-8 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
              Book Free Consultation
            </button>
            <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors">
              Download Investment Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
