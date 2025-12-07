"use client";
import React, { useState } from 'react'
import { Building2, Factory, Store, Truck, Calculator, TrendingUp, Shield, Clock } from 'lucide-react'

const Page = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [term, setTerm] = useState(60);
  const [purpose, setPurpose] = useState('equipment');
  
  const loanTypes = [
    {
      id: 'startup',
      name: 'Startup Loan',
      icon: <Building2 className="w-8 h-8" />,
      description: 'Funding for new businesses',
      amount: 'Up to $250,000',
      rate: 'From 8.99%',
      term: '1-5 years',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      id: 'expansion',
      name: 'Expansion Loan',
      icon: <Factory className="w-8 h-8" />,
      description: 'Grow your existing business',
      amount: 'Up to $1,000,000',
      rate: 'From 6.99%',
      term: '3-7 years',
      color: 'from-purple-600 to-pink-500'
    },
    {
      id: 'equipment',
      name: 'Equipment Financing',
      icon: <Truck className="w-8 h-8" />,
      description: 'Purchase or lease equipment',
      amount: 'Up to $500,000',
      rate: 'From 5.99%',
      term: '2-7 years',
      color: 'from-emerald-600 to-green-500'
    },
    {
      id: 'working',
      name: 'Working Capital',
      icon: <Store className="w-8 h-8" />,
      description: 'Cover daily operational costs',
      amount: 'Up to $100,000',
      rate: 'From 7.99%',
      term: '6-24 months',
      color: 'from-amber-600 to-orange-500'
    }
  ];

  const qualifications = [
    {
      requirement: "Time in Business",
      value: "6+ months",
      icon: <Clock className="w-5 h-5" />
    },
    {
      requirement: "Credit Score",
      value: "620+",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      requirement: "Annual Revenue",
      value: "$50,000+",
      icon: <Calculator className="w-5 h-5" />
    },
    {
      requirement: "Collateral",
      value: "Varies",
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const calculatePayment = () => {
    const selectedLoan = loanTypes.find(loan => loan.id === purpose);
    const rate = selectedLoan ? parseFloat(selectedLoan.rate.split(' ')[1]) / 100 / 12 : 0.08 / 12;
    const months = term;
    const principal = loanAmount;
    
    if (rate === 0) return principal / months;
    
    const monthlyPayment = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
    return monthlyPayment.toFixed(2);
  };

  const monthlyPayment = calculatePayment();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#03305c] via-blue-800 to-[#1a4f8c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold mb-6">Business Loan Solutions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            Fuel your business growth with flexible financing options 
            designed for entrepreneurs and established companies.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Apply Now
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
              Pre-Qualify
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Loan Options */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-[#03305c] mb-8">
              Choose Your Loan Purpose
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {loanTypes.map((loan) => (
                <div
                  key={loan.id}
                  onClick={() => setPurpose(loan.id)}
                  className={`bg-white rounded-2xl shadow-lg p-6 border-2 cursor-pointer transition-all hover:shadow-xl ${
                    purpose === loan.id 
                      ? 'border-[#e8742c] ring-2 ring-[#e8742c]/20' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${loan.color} w-fit mb-4`}>
                    <div className="text-white">{loan.icon}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {loan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {loan.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Loan Amount</span>
                      <span className="font-bold text-gray-800">{loan.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Interest Rate</span>
                      <span className="font-bold text-[#03305c]">{loan.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Term</span>
                      <span className="font-bold text-gray-800">{loan.term}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Qualifications */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#03305c] mb-6">
                Basic Qualifications
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {qualifications.map((qual, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-[#03305c] mx-auto mb-2">
                      {qual.icon}
                    </div>
                    <div className="font-bold text-gray-800">{qual.requirement}</div>
                    <div className="text-sm text-gray-600">{qual.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl sticky top-8">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold text-[#03305c] mb-4">
                  Loan Calculator
                </h3>
                <p className="text-gray-600">
                  Estimate your monthly payments
                </p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium text-gray-700">Loan Amount</label>
                    <span className="text-2xl font-bold text-[#03305c]">
                      ${loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e8742c]"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>$10,000</span>
                    <span>$1,000,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium text-gray-700">Loan Term</label>
                    <span className="text-2xl font-bold text-[#03305c]">
                      {term} months
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="12"
                    value={term}
                    onChange={(e) => setTerm(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e8742c]"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1 year</span>
                    <span>7 years</span>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-[#03305c] to-blue-800 rounded-xl p-6 text-white">
                  <h4 className="font-bold mb-4">Estimated Payment</h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">${monthlyPayment}</div>
                    <div className="text-blue-200">per month</div>
                  </div>
                  <div className="mt-4 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Total Loan Amount</span>
                      <span>${loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest</span>
                      <span>${((parseFloat(String(monthlyPayment)) * term) - loanAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t border-white/20">
                      <span>Total Payment</span>
                      <span>${(parseFloat(String(monthlyPayment)) * term).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8 text-center">
            Benefits of Our Business Loans
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Fast Funding",
                description: "Get funded in as little as 24-48 hours",
                color: "bg-blue-100"
              },
              {
                title: "Flexible Terms",
                description: "Custom repayment schedules",
                color: "bg-emerald-100"
              },
              {
                title: "No Prepayment Penalties",
                description: "Pay off early without extra fees",
                color: "bg-amber-100"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <div className="text-2xl font-bold text-[#03305c]">
                    {index + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page