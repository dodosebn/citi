import React from 'react'
import { Target, Calculator, Shield, TrendingUp, Calendar, Users, PieChart, DollarSign } from 'lucide-react'

const Page = () => {
  const retirementPlans = [
    {
      name: "401(k) Plans",
      icon: <Target className="w-10 h-10" />,
      description: "Employer-sponsored retirement savings",
      contribution: "$22,500 annual limit",
      features: ["Employer matching", "Tax-deferred growth", "Loan options"],
      color: "from-blue-600 to-cyan-500"
    },
    {
      name: "IRAs",
      icon: <Calculator className="w-10 h-10" />,
      description: "Individual Retirement Accounts",
      contribution: "$6,500 annual limit",
      features: ["Traditional & Roth options", "Tax advantages", "Flexible investments"],
      color: "from-purple-600 to-pink-500"
    },
    {
      name: "Pension Plans",
      icon: <Shield className="w-10 h-10" />,
      description: "Defined benefit retirement plans",
      contribution: "Custom employer contributions",
      features: ["Guaranteed income", "Survivor benefits", "Early retirement options"],
      color: "from-emerald-600 to-green-500"
    },
    {
      name: "Annuities",
      icon: <TrendingUp className="w-10 h-10" />,
      description: "Guaranteed lifetime income",
      contribution: "No annual limits",
      features: ["Income guarantees", "Death benefits", "Inflation protection"],
      color: "from-amber-600 to-orange-500"
    }
  ];

  const planningStages = [
    {
      stage: "Early Career",
      age: "20s-30s",
      icon: <Calendar className="w-8 h-8" />,
      focus: "Accumulation",
      tips: ["Start early", "Maximize 401(k) match", "Diversify investments"]
    },
    {
      stage: "Mid Career",
      age: "40s-50s",
      icon: <PieChart className="w-8 h-8" />,
      focus: "Growth & Protection",
      tips: ["Increase contributions", "Review allocation", "Catch-up contributions"]
    },
    {
      stage: "Pre-Retirement",
      age: "55-65",
      icon: <Target className="w-8 h-8" />,
      focus: "Transition Planning",
      tips: ["Income planning", "Social Security strategy", "Healthcare planning"]
    },
    {
      stage: "Retirement",
      age: "65+",
      icon: <Users className="w-8 h-8" />,
      focus: "Distribution",
      tips: ["Withdrawal strategy", "Tax efficiency", "Estate planning"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#03305c] via-blue-800 to-[#1a4f8c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-12 h-12 text-[#e8742c]" />
            <h1 className="text-5xl font-bold">Retirement Planning</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            Comprehensive retirement solutions to help you build, 
            protect, and distribute your wealth for a secure future.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Start Planning
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
              Retirement Calculator
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Retirement Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Retirement Account Options
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {retirementPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${plan.color} p-6 rounded-t-2xl`}>
                  <div className="text-white mb-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {plan.name}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-lg font-bold text-[#03305c]">
                      {plan.contribution}
                    </div>
                    <div className="text-sm text-gray-500">Annual Contribution</div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
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

        {/* Planning Stages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Retirement Planning by Life Stage
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {planningStages.map((stage, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <div className="text-[#03305c]">
                      {stage.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{stage.stage}</h3>
                    <div className="text-sm text-gray-600">{stage.age}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="font-semibold text-[#e8742c] mb-2">
                    Focus: {stage.focus}
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {stage.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-[#03305c] rounded-full mr-2 mt-1.5"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator Section */}
        <div className="bg-gradient-to-r from-[#03305c] to-[#1a4f8c] rounded-2xl p-8 text-white mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Retirement Savings Calculator
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block mb-2">Current Age</label>
                  <input 
                    type="range" 
                    min="25" 
                    max="65" 
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>25</span>
                    <span>65</span>
                  </div>
                </div>
                <div>
                  <label className="block mb-2">Retirement Age</label>
                  <input 
                    type="range" 
                    min="55" 
                    max="75" 
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>55</span>
                    <span>75</span>
                  </div>
                </div>
                <div>
                  <label className="block mb-2">Monthly Contribution</label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input 
                      type="number" 
                      defaultValue="500"
                      className="bg-white/20 text-white px-4 py-2 rounded-lg w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Projected Results</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-blue-200">Estimated Retirement Savings</div>
                  <div className="text-4xl font-bold">$1.2M</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Monthly Retirement Income</div>
                  <div className="text-3xl font-bold">$4,800</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Confidence Score</div>
                  <div className="text-2xl font-bold text-green-400">85%</div>
                </div>
                <button className="w-full bg-white text-[#03305c] py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors mt-4">
                  Create Detailed Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#03305c] mb-6">
            Secure Your Retirement Future
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our retirement specialists can help you create a comprehensive 
            plan tailored to your unique goals and circumstances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Schedule Consultation
            </button>
            <button className="bg-white border-2 border-[#03305c] text-[#03305c] py-3 px-8 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Download Planning Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page