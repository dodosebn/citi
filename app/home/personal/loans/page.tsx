"use client";
import React, { useState } from 'react'
import { Home, Car, GraduationCap, Briefcase, Calculator, ShieldCheck, Clock, TrendingDown } from 'lucide-react'

const Page = () => {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [term, setTerm] = useState(60);
  const [loanType, setLoanType] = useState('personal');
  
  const loanTypes = [
    {
      id: 'mortgage',
      icon: <Home className="w-8 h-8" />,
      name: 'Mortgage',
      description: 'Home loans with competitive rates',
      rates: 'From 6.25% APR',
      maxAmount: '$2,000,000',
      term: '15-30 years',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      id: 'auto',
      icon: <Car className="w-8 h-8" />,
      name: 'Auto Loan',
      description: 'New or used vehicle financing',
      rates: 'From 4.99% APR',
      maxAmount: '$100,000',
      term: '2-7 years',
      color: 'from-emerald-600 to-green-500'
    },
    {
      id: 'personal',
      icon: <Briefcase className="w-8 h-8" />,
      name: 'Personal Loan',
      description: 'Flexible loans for any purpose',
      rates: 'From 7.99% APR',
      maxAmount: '$100,000',
      term: '1-7 years',
      color: 'from-purple-600 to-pink-500'
    },
    {
      id: 'student',
      icon: <GraduationCap className="w-8 h-8" />,
      name: 'Student Loan',
      description: 'Education financing options',
      rates: 'From 3.99% APR',
      maxAmount: '$150,000',
      term: '10-20 years',
      color: 'from-amber-600 to-orange-500'
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Approval',
      description: 'Get a decision in as little as 24 hours'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'No Hidden Fees',
      description: 'Transparent pricing, no prepayment penalties'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Secure Process',
      description: 'Bank-level security for all applications'
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: 'Competitive Rates',
      description: 'Lowest rates for qualified borrowers'
    }
  ];

  // Calculate monthly payment
  const calculatePayment = () => {
    const selectedLoan = loanTypes.find(loan => loan.id === loanType);
    const rate = selectedLoan ? parseFloat(selectedLoan.rates.split(' ')[1]) / 100 / 12 : 0.07 / 12;
    const months = term;
    const principal = loanAmount;
    
    if (rate === 0) return principal / months;
    
    const monthlyPayment = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
    return monthlyPayment.toFixed(2);
  };

  const monthlyPayment = calculatePayment();
  const totalPayment = (parseFloat(String(monthlyPayment)) * term).toFixed(2);
  const interestPaid = (parseFloat(totalPayment) - loanAmount).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#03305c] via-blue-800 to-[#1a4f8c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold mb-6">Find Your Perfect Loan</h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            Flexible financing options with competitive rates. 
            Get the funds you need to achieve your goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#e8742c] to-[#f5a623] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Apply Now
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
              Check Rates
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Loan Types */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-[#03305c] mb-8">
              Choose Your Loan Type
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {loanTypes.map((loan) => (
                <div
                  key={loan.id}
                  onClick={() => setLoanType(loan.id)}
                  className={`bg-white rounded-2xl shadow-lg p-6 border-2 cursor-pointer transition-all hover:shadow-xl ${
                    loanType === loan.id 
                      ? 'border-[#e8742c] ring-2 ring-[#e8742c]/20' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${loan.color}`}>
                      <div className="text-white">{loan.icon}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      loanType === loan.id 
                        ? 'bg-[#e8742c] text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      Selected
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {loan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {loan.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rates</span>
                      <span className="font-bold text-[#03305c]">{loan.rates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Amount</span>
                      <span className="font-bold text-gray-800">{loan.maxAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Term</span>
                      <span className="font-bold text-gray-800">{loan.term}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-[#03305c] mb-6">
                Why Choose Our Loans
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-5 hover:bg-white hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-[#03305c]">
                        {benefit.icon}
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl sticky top-8">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-8 h-8 text-[#03305c]" />
                  <h3 className="text-2xl font-bold text-[#03305c]">
                    Loan Calculator
                  </h3>
                </div>
                <p className="text-gray-600">
                  Adjust the sliders to estimate your monthly payments
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium text-gray-700">Loan Amount</label>
                    <span className="text-2xl font-bold text-[#03305c]">
                      ${loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e8742c]"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>$1,000</span>
                    <span>$500,000</span>
                  </div>
                </div>

                {/* Loan Term */}
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
                    max="360"
                    step="12"
                    value={term}
                    onChange={(e) => setTerm(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e8742c]"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-700 mb-4">Payment Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly Payment</span>
                      <span className="text-3xl font-bold text-[#03305c]">
                        ${monthlyPayment}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Payment</span>
                      <span className="font-medium">${totalPayment}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Interest Paid</span>
                      <span className="font-medium">${interestPaid}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Based on {loanTypes.find(l => l.id === loanType)?.rates} interest rate
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-[#03305c] to-[#1a4f8c] text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
                  Apply for This Loan
                </button>

                <div className="text-center">
                  <button className="text-[#03305c] font-medium hover:text-[#e8742c] transition-colors">
                    Need help? Speak with a loan specialist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8 text-center">
            Simple Application Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Check Rates', desc: 'See your rate in minutes' },
              { step: '2', title: 'Apply Online', desc: 'Complete application' },
              { step: '3', title: 'Get Approved', desc: 'Quick decision' },
              { step: '4', title: 'Receive Funds', desc: 'Money deposited fast' }
            ].map((process) => (
              <div key={process.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#e8742c] to-[#f5a623] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{process.title}</h4>
                <p className="text-sm text-gray-600">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-[#03305c] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "What documents do I need to apply?",
                a: "You'll need proof of income, identification, and bank statements. The specific documents vary by loan type."
              },
              {
                q: "How long does approval take?",
                a: "Most applications receive a decision within 24 hours. Auto loans can be approved in as little as 1 hour."
              },
              {
                q: "Can I pay off my loan early?",
                a: "Yes! We don't charge prepayment penalties. You can pay off your loan anytime without extra fees."
              },
              {
                q: "What credit score do I need?",
                a: "Minimum scores vary by loan type, starting at 620 for personal loans and 680 for mortgages."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-800 mb-3">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page