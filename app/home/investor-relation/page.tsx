import React from 'react'
import { TrendingUp, BarChart3, PieChart, Download, Calendar, FileText, Users, Globe, Shield, Award, Target, DollarSign } from 'lucide-react'

const Page = () => {
  const financialHighlights = [
    {
      metric: "Market Capitalization",
      value: "$119.4B",
      change: "+12.4%",
      trend: "up",
      description: "As of latest trading day"
    },
    {
      metric: "Dividend Yield",
      value: "3.2%",
      change: "+0.4%",
      trend: "up",
      description: "Annualized"
    },
    {
      metric: "P/E Ratio",
      value: "11.2",
      change: "-0.8",
      trend: "down",
      description: "Industry average: 13.5"
    },
    {
      metric: "ROE",
      value: "8.5%",
      change: "+1.2%",
      trend: "up",
      description: "Return on Equity"
    }
  ];

  const reports = [
    {
      type: "Quarterly Earnings",
      title: "Q4 2024 Financial Results",
      date: "January 15, 2025",
      size: "2.4 MB",
      link: "#"
    },
    {
      type: "Annual Report",
      title: "2024 Annual Report",
      date: "February 28, 2025",
      size: "15.2 MB",
      link: "#"
    },
    {
      type: "Investor Presentation",
      title: "Q4 2024 Investor Deck",
      date: "January 16, 2025",
      size: "8.7 MB",
      link: "#"
    },
    {
      type: "Proxy Statement",
      title: "2025 Proxy Statement",
      date: "March 15, 2025",
      size: "3.1 MB",
      link: "#"
    }
  ];

  const events = [
    {
      date: "April 25, 2025",
      time: "10:00 AM ET",
      type: "Earnings Call",
      title: "Q1 2025 Earnings Release",
      description: "Live webcast and conference call"
    },
    {
      date: "May 15, 2025",
      time: "9:00 AM ET",
      type: "Investor Day",
      title: "Annual Investor Day",
      description: "Virtual investor presentation"
    },
    {
      date: "June 10, 2025",
      time: "2:00 PM ET",
      type: "Conference",
      title: "Morgan Stanley Financial Conference",
      description: "Fireside chat with CEO"
    },
    {
      date: "July 22, 2025",
      time: "8:30 AM ET",
      type: "Earnings Call",
      title: "Q2 2025 Earnings Release",
      description: "Live webcast and conference call"
    }
  ];

  const leadershipContacts = [
    {
      name: "Sarah Chen",
      title: "Chief Financial Officer",
      department: "Finance & Investor Relations",
      email: "investor.relations@citi.com"
    },
    {
      name: "Michael Rodriguez",
      title: "Head of Investor Relations",
      department: "Investor Relations",
      email: "ir@citi.com"
    },
    {
      name: "Jennifer Park",
      title: "VP, Investor Communications",
      department: "Investor Relations",
      email: "investor.communications@citi.com"
    }
  ];

  const stockInfo = {
    symbol: "C",
    exchange: "NYSE",
    price: "$58.42",
    change: "+$1.24",
    percentChange: "+2.17%",
    volume: "15.2M",
    marketCap: "$119.4B"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-[#0033A0]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <TrendingUp className="w-12 h-12 text-[#ED1C24]" />
                <h1 className="text-5xl font-bold text-white">Investor Relations</h1>
              </div>
              <p className="text-xl text-blue-100 max-w-3xl mb-8">
                Driving sustainable growth and creating long-term value for our 
                shareholders through strategic execution and financial discipline.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-[#ED1C24] to-[#FF6B6B] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
                  Latest Earnings
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
                  Subscribe to Updates
                </button>
              </div>
            </div>
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl font-bold">NYSE: {stockInfo.symbol}</div>
                  <div className="text-sm opacity-80">{stockInfo.exchange}</div>
                </div>
                <div className="text-4xl font-bold mb-2">{stockInfo.price}</div>
                <div className={`text-lg font-bold mb-4 ${stockInfo.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stockInfo.change} ({stockInfo.percentChange})
                </div>
                <div className="text-sm opacity-80">
                  <div>Volume: {stockInfo.volume}</div>
                  <div>Market Cap: {stockInfo.marketCap}</div>
                  <div className="text-xs opacity-60 mt-2">Real-time as of 4:00 PM ET</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Financial Highlights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#0033A0] mb-8">
            Financial Highlights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialHighlights.map((highlight, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-gray-800">{highlight.metric}</h3>
                  <div className={`flex items-center gap-1 ${highlight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {highlight.trend === 'up' ? '↗' : '↘'}
                    <span className="font-bold">{highlight.change}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#0033A0] mb-2">
                  {highlight.value}
                </div>
                <div className="text-sm text-gray-500">
                  {highlight.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Reports & Filings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0033A0]">Reports & Filings</h2>
                <button className="flex items-center gap-2 text-[#0033A0] font-medium hover:text-[#ED1C24] transition-colors">
                  <Download className="w-5 h-5" />
                  View All Reports
                </button>
              </div>
              
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#0033A0]" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{report.title}</div>
                        <div className="text-sm text-gray-500">
                          {report.type} • {report.date} • {report.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-[#0033A0] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors">
                        Download PDF
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        View Online
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Charts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#0033A0] mb-6">Performance Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">Stock Performance (5 Year)</h3>
                  <div className="h-48 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-[#0033A0] opacity-50" />
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>+58.4%</span>
                      <span>5-Year Return</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">Revenue Growth</h3>
                  <div className="h-48 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl flex items-center justify-center">
                    <PieChart className="w-16 h-16 text-[#0033A0] opacity-50" />
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>+24.8%</span>
                      <span>YoY Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-[#ED1C24]" />
                <h2 className="text-2xl font-bold text-[#0033A0]">Upcoming Events</h2>
              </div>
              
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-[#0033A0] transition-colors">
                    <div className="text-sm text-[#ED1C24] font-medium mb-1">{event.type}</div>
                    <div className="font-bold text-gray-800 mb-2">{event.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{event.description}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                    </div>
                    <button className="w-full mt-3 py-2 text-[#0033A0] font-medium hover:text-[#ED1C24] transition-colors">
                      Add to Calendar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Investor Contacts */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-800 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-6">Investor Relations Team</h2>
              
              <div className="space-y-4">
                {leadershipContacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-white/10 rounded-xl">
                    <div className="font-bold">{contact.name}</div>
                    <div className="text-sm text-blue-200 mb-2">{contact.title}</div>
                    <div className="text-xs opacity-80 mb-3">{contact.department}</div>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-sm text-white hover:text-blue-200 transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="font-bold mb-2">Investor Relations</div>
                <a href="tel:+1-470-390-3270" className="text-lg font-bold hover:text-blue-200 transition-colors">
                  +1-470-390-3270
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Pillars */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0033A0] mb-8 text-center">
            Our Strategic Pillars
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                title: "Profitable Growth",
                description: "Focus on high-return businesses and markets"
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Risk Management",
                description: "Prudent risk-taking and strong capital position"
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: "Digital Transformation",
                description: "Investing in technology and innovation"
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "ESG Leadership",
                description: "Commitment to sustainability and social impact"
              }
            ].map((pillar, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-[#0033A0]">
                    {pillar.icon}
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{pillar.title}</h3>
                <p className="text-gray-600 text-sm">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0033A0] mb-8">
            Shareholder Information
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Dividend Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Dividend</span>
                  <span className="font-bold">$0.53</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency</span>
                  <span className="font-bold">Quarterly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Pay Date</span>
                  <span className="font-bold">May 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ex-Dividend Date</span>
                  <span className="font-bold">April 30, 2025</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Stock Transfer Agent</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-gray-600 text-sm">Computershare Trust Company</div>
                  <div className="font-bold">+1-470-390-3270</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm">Online Account Access</div>
                  <a href="#" className="text-[#0033A0] font-medium hover:text-[#ED1C24]">
                    www.computershare.com/citi
                  </a>
                </div>
                <div>
                  <div className="text-gray-600 text-sm">Direct Stock Purchase</div>
                  <div className="font-bold">Available</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Corporate Governance</h3>
              <div className="space-y-3">
                <a href="#" className="block text-[#0033A0] hover:text-[#ED1C24] transition-colors">
                  Board of Directors
                </a>
                <a href="#" className="block text-[#0033A0] hover:text-[#ED1C24] transition-colors">
                  Committee Charters
                </a>
                <a href="#" className="block text-[#0033A0] hover:text-[#ED1C24] transition-colors">
                  Corporate Governance Guidelines
                </a>
                <a href="#" className="block text-[#0033A0] hover:text-[#ED1C24] transition-colors">
                  Code of Conduct
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0033A0] mb-6">
            Stay Connected with Citibank Investors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Subscribe to receive investor alerts, financial reports, and 
            the latest news directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#ED1C24] to-[#FF6B6B] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              Subscribe to Alerts
            </button>
            <button className="bg-white border-2 border-[#0033A0] text-[#0033A0] py-3 px-8 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Contact Investor Relations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page