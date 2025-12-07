'use client';
import React, { useState } from 'react'
import { Search, ChevronDown, HelpCircle, Shield, CreditCard, Building, Globe, Users, Lock, Smartphone, DollarSign, Clock, Phone } from 'lucide-react'

const Page = () => {
  const [openCategory, setOpenCategory] = useState<string | null>('general');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFaq = (id: number) => {
    setOpenFaqs(prev => 
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };

  const faqCategories = [
    {
      id: 'general',
      title: 'General Banking',
      icon: <Building className="w-6 h-6" />,
      count: 8,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'digital',
      title: 'Digital Banking',
      icon: <Smartphone className="w-6 h-6" />,
      count: 6,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'cards',
      title: 'Credit & Debit Cards',
      icon: <CreditCard className="w-6 h-6" />,
      count: 7,
      color: 'from-emerald-500 to-green-500'
    },
    {
      id: 'security',
      title: 'Security & Fraud',
      icon: <Shield className="w-6 h-6" />,
      count: 6,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'loans',
      title: 'Loans & Mortgages',
      icon: <DollarSign className="w-6 h-6" />,
      count: 5,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'international',
      title: 'International Banking',
      icon: <Globe className="w-6 h-6" />,
      count: 5,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const allFaqs = [
    // General Banking
    {
      id: 1,
      category: 'general',
      question: 'How do I open a Citibank account?',
      answer: 'You can open an account in three ways: 1) Online through our website or mobile app, 2) Visit any Citibank branch with required documents, or 3) Call our customer service at 1-800-374-9700. You will need a valid government-issued ID, Social Security number, and proof of address.',
      popular: true
    },
    {
      id: 2,
      category: 'general',
      question: 'What documents do I need to open an account?',
      answer: 'Typically, you will need: 1) Valid government-issued photo ID (driver\'s license, passport), 2) Social Security number or ITIN, 3) Proof of address (utility bill, lease agreement), and 4) Initial deposit amount (varies by account type). For business accounts, additional business documentation is required.'
    },
    {
      id: 3,
      category: 'general',
      question: 'What are your branch hours?',
      answer: 'Most Citibank branches are open Monday through Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 4:00 PM. Some locations offer extended hours. You can check specific branch hours using our branch locator tool.'
    },
    {
      id: 4,
      category: 'general',
      question: 'How do I order new checks?',
      answer: 'You can order checks: 1) Through Online Banking under "Account Services", 2) Using the Citibank mobile app, 3) By calling 1-800-374-9700, or 4) Visiting any branch. Standard delivery takes 7-10 business days, expedited shipping is available.'
    },
    {
      id: 5,
      category: 'general',
      question: 'How do I update my contact information?',
      answer: 'Update your information through: 1) Online Banking under "Profile & Settings", 2) Citibank mobile app in "Account Settings", 3) Calling customer service, or 4) Visiting a branch. Some changes may require identity verification.'
    },
    {
      id: 6,
      category: 'general',
      question: 'What is your routing number?',
      answer: 'Citibank\'s routing number is 021000089 for electronic transfers and ACH payments. For wire transfers, the routing number is 021000089. Always verify routing numbers based on your account type and transaction method.'
    },
    {
      id: 7,
      category: 'general',
      question: 'How do I close my account?',
      answer: 'To close your account: 1) Ensure all transactions are cleared, 2) Transfer or withdraw remaining funds, 3) Call customer service at 1-800-374-9700, or 4) Visit a branch. You will need to provide identification and sign closure documents.'
    },
    {
      id: 8,
      category: 'general',
      question: 'Are there fees for using another bank\'s ATM?',
      answer: 'Citibank does not charge a fee for using other banks\' ATMs, but the ATM owner may charge a fee. We recommend using Citibank ATMs or our extensive network of fee-free ATMs to avoid charges.'
    },

    // Digital Banking
    {
      id: 9,
      category: 'digital',
      question: 'How do I enroll in Online Banking?',
      answer: 'Enroll by visiting citi.com and clicking "Enroll Now". You will need your account number, Social Security number, and email address. Follow the prompts to create your username and password. The process takes about 5-10 minutes.',
      popular: true
    },
    {
      id: 10,
      category: 'digital',
      question: 'How do I reset my online banking password?',
      answer: 'Click "Forgot Password" on the login page. You will need to verify your identity using your username, Social Security number, and answer security questions. Alternatively, call 1-800-374-9700 for assistance.'
    },
    {
      id: 11,
      category: 'digital',
      question: 'Is the Citibank mobile app secure?',
      answer: 'Yes, our mobile app uses 256-bit encryption, biometric authentication (Touch ID, Face ID), and two-factor authentication. We also employ real-time fraud monitoring and secure session management to protect your information.'
    },
    {
      id: 12,
      category: 'digital',
      question: 'How do I set up mobile check deposit?',
      answer: '1) Open the Citibank mobile app, 2) Select "Deposit Check", 3) Endorse the check with "For Mobile Deposit Only", 4) Take photos of front and back, 5) Enter amount, and 6) Submit. Funds are typically available within 1-2 business days.'
    },
    {
      id: 13,
      category: 'digital',
      question: 'Can I pay bills through the app?',
      answer: 'Yes, you can pay bills through Online Banking or the mobile app. Add payees, schedule one-time or recurring payments, and set up payment alerts. Most payments are processed within 1-2 business days.'
    },
    {
      id: 14,
      category: 'digital',
      question: 'How do I set up account alerts?',
      answer: 'In Online Banking or the mobile app, go to "Alerts" and select the types of alerts you want: low balance, large transactions, deposit notifications, etc. You can receive alerts via email, text, or push notification.'
    },

    // Credit & Debit Cards
    {
      id: 15,
      category: 'cards',
      question: 'How do I activate my new card?',
      answer: 'Activate by: 1) Calling the number on the activation sticker, 2) Using the Citibank mobile app, 3) Online Banking, or 4) Visiting an ATM with your PIN. Activation is required before first use.',
      popular: true
    },
    {
      id: 16,
      category: 'cards',
      question: 'What should I do if my card is lost or stolen?',
      answer: 'Immediately call 1-800-950-5114 (24/7) to report it lost or stolen. We will cancel the card and send a replacement. Monitor your account for unauthorized transactions through Online Banking.'
    },
    {
      id: 17,
      category: 'cards',
      question: 'How do I dispute a charge on my statement?',
      answer: 'Contact us within 60 days of the statement date. You can dispute charges through Online Banking, the mobile app, or by calling 1-800-950-5114. Provide documentation to support your dispute. We typically resolve disputes within 10 business days.'
    },
    {
      id: 18,
      category: 'cards',
      question: 'What are the foreign transaction fees?',
      answer: 'Most Citibank credit cards have no foreign transaction fees. For debit cards, there is a 3% foreign transaction fee. We recommend using credit cards for international purchases for better protection and no fees.'
    },
    {
      id: 19,
      category: 'cards',
      question: 'How do I increase my credit limit?',
      answer: 'Request a credit limit increase through Online Banking, the mobile app, or by calling the number on the back of your card. We review your payment history, credit score, and income before approval.'
    },
    {
      id: 20,
      category: 'cards',
      question: 'What is the grace period for payments?',
      answer: 'You have at least 21 days from the statement closing date to make a payment without incurring interest. The exact due date is listed on your monthly statement and can be viewed in Online Banking.'
    },
    {
      id: 21,
      category: 'cards',
      question: 'How do I redeem credit card rewards?',
      answer: 'Redeem rewards through Online Banking or the mobile app. Options include statement credits, gift cards, merchandise, or travel bookings. Some cards offer special redemption bonuses.'
    },

    // Security & Fraud
    {
      id: 22,
      category: 'security',
      question: 'How do I report suspected fraud?',
      answer: 'Call our 24/7 fraud hotline immediately at 1-800-950-5114. You can also report through Online Banking or visit a branch. We will secure your account and investigate suspicious activity.',
      popular: true
    },
    {
      id: 23,
      category: 'security',
      question: 'What is Zero Liability Protection?',
      answer: 'Citibank\'s Zero Liability Protection ensures you won\'t be held responsible for unauthorized transactions on your credit or debit card. Report fraudulent charges promptly to qualify for this protection.'
    },
    {
      id: 24,
      category: 'security',
      question: 'How can I protect my account from fraud?',
      answer: '1) Enable two-factor authentication, 2) Use strong, unique passwords, 3) Monitor account activity regularly, 4) Set up transaction alerts, 5) Never share login credentials, and 6) Use secure networks for banking.'
    },
    {
      id: 25,
      category: 'security',
      question: 'What is phishing and how do I avoid it?',
      answer: 'Phishing is when scammers pretend to be Citibank to steal your information. We will never ask for your password or full Social Security number via email or text. Always verify communications by contacting us directly.'
    },
    {
      id: 26,
      category: 'security',
      question: 'Is my money FDIC insured?',
      answer: 'Yes, deposits at Citibank are FDIC insured up to $250,000 per depositor, per account ownership category. This insurance covers checking, savings, CDs, and other deposit accounts.'
    },
    {
      id: 27,
      category: 'security',
      question: 'How do I set up account alerts for security?',
      answer: 'In Online Banking, go to "Alerts" and enable: login notifications, large transaction alerts, international transaction alerts, and balance change alerts. These help detect suspicious activity early.'
    },

    // Loans & Mortgages
    {
      id: 28,
      category: 'loans',
      question: 'How do I apply for a mortgage?',
      answer: 'Apply online, through our mobile app, by phone at 1-800-967-2448, or at a branch. You will need documentation including income verification, tax returns, bank statements, and information about the property.',
      popular: true
    },
    {
      id: 29,
      category: 'loans',
      question: 'What is the current mortgage interest rate?',
      answer: 'Interest rates vary based on loan type, credit score, down payment, and market conditions. Check our website for current rates or speak with a mortgage specialist at 1-800-967-2448 for personalized quotes.'
    },
    {
      id: 30,
      category: 'loans',
      question: 'How do I make a loan payment?',
      answer: 'Pay through: 1) Online Banking or mobile app, 2) Automatic payments setup, 3) Mail to the payment address on your statement, 4) Phone payment at 1-800-967-2448, or 5) At any branch.'
    },
    {
      id: 31,
      category: 'loans',
      question: 'Can I get pre-approved for a mortgage?',
      answer: 'Yes, pre-approval gives you a competitive edge when house hunting. Apply online or call 1-800-967-2448. The process typically takes 1-3 business days and provides an estimate of how much you can borrow.'
    },
    {
      id: 32,
      category: 'loans',
      question: 'What types of loans does Citibank offer?',
      answer: 'We offer: mortgages, home equity lines of credit, personal loans, auto loans, student loans, and small business loans. Each has specific terms, rates, and qualification requirements.'
    },

    // International Banking
    {
      id: 33,
      category: 'international',
      question: 'How do I send money internationally?',
      answer: 'Use Citibank Global Transfers for fast, low-cost international transfers. Available through Online Banking, mobile app, or by calling 1-800-374-9700. We support transfers to over 100 countries.',
      popular: true
    },
    {
      id: 34,
      category: 'international',
      question: 'What are the fees for international wire transfers?',
      answer: 'Outgoing international wires cost $35-50 depending on currency and destination. Incoming wires are free. Always verify fees before initiating transfers as they vary by country and transfer method.'
    },
    {
      id: 35,
      category: 'international',
      question: 'Can I use my Citibank card abroad?',
      answer: 'Yes, Citibank cards work worldwide wherever the card network is accepted. Notify us of travel plans to ensure uninterrupted service. Most credit cards have no foreign transaction fees.'
    },
    {
      id: 36,
      category: 'international',
      question: 'How do I open an account in another country?',
      answer: 'Visit citi.com/international or contact our Global Banking team at 1-800-285-3000. Requirements vary by country but typically include proof of identity, address, and source of funds.'
    },
    {
      id: 37,
      category: 'international',
      question: 'What is Citi Global Transfer?',
      answer: 'Citi Global Transfer allows instant, fee-free transfers between Citibank accounts worldwide. Available through Online Banking and mobile app for accounts in participating countries.'
    }
  ];

  // Filter FAQs based on search term and category
  const filteredFaqs = allFaqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !openCategory || faq.category === openCategory;
    
    return matchesSearch && matchesCategory;
  });

  const popularFaqs = allFaqs.filter(faq => faq.popular);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0033A0] via-blue-800 to-[#0033A0] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <HelpCircle className="w-12 h-12 text-[#ED1C24]" />
                <h1 className="text-5xl font-bold">Frequently Asked Questions</h1>
              </div>
              <p className="text-xl text-blue-100 max-w-3xl mb-8">
                Find answers to common questions about Citibank accounts, 
                services, security, and more. Can't find what you're looking for? 
                Contact our customer support team.
              </p>
              <div className="relative max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 border border-white/20 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 mt-8 lg:mt-0 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                <Users className="w-32 h-32 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Popular FAQs */}
        {!searchTerm && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#0033A0] mb-8">
              Most Popular Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {popularFaqs.map((faq) => (
                <div 
                  key={faq.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="w-5 h-5 text-[#ED1C24]" />
                        </div>
                        <h3 className="font-bold text-gray-800">{faq.question}</h3>
                      </div>
                      {openFaqs.includes(faq.id) && (
                        <div className="pl-13 mt-2">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-[#0033A0] transition-transform ${openFaqs.includes(faq.id) ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Selection */}
        {!searchTerm && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0033A0] mb-8">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setOpenCategory(category.id === openCategory ? null : category.id)}
                  className={`bg-white rounded-2xl shadow-lg p-6 text-left hover:shadow-xl transition-all ${
                    openCategory === category.id ? 'ring-2 ring-[#0033A0]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${category.color}`}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {category.count} FAQs
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {category.title}
                  </h3>
                  <div className="flex items-center text-[#0033A0] font-medium">
                    <span>Browse questions</span>
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${openCategory === category.id ? 'rotate-180' : ''}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Header */}
        {searchTerm && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0033A0]">
                Search Results for "{searchTerm}"
              </h2>
              <span className="text-gray-600">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        )}

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-start justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-[#0033A0]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2">
                          {faq.question}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {faqCategories.find(c => c.id === faq.category)?.title}
                          </span>
                          {faq.popular && (
                            <span className="px-3 py-1 bg-red-100 text-[#ED1C24] text-xs font-medium rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {openFaqs.includes(faq.id) && (
                      <div className="mt-6 pl-14">
                        <div className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-500">
                            Was this answer helpful? 
                            <button className="ml-4 text-[#0033A0] font-medium hover:text-[#ED1C24]">
                              Yes
                            </button>
                            <button className="ml-2 text-[#0033A0] font-medium hover:text-[#ED1C24]">
                              No
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <ChevronDown 
                    className={`w-6 h-6 text-[#0033A0] ml-4 flex-shrink-0 transition-transform ${openFaqs.includes(faq.id) ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            ))
          ) : (
            // No results found
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No results found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                We couldn't find any FAQs matching "{searchTerm}". Try different keywords or browse by category.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-[#0033A0] text-white py-3 px-8 rounded-xl font-semibold hover:bg-blue-900 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-gradient-to-r from-[#0033A0] to-blue-800 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Still need help?</h2>
              <p className="text-blue-100 text-lg mb-6">
                Our customer service team is available 24/7 to assist you with 
                any questions or concerns not covered in our FAQ.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <div>
                    <div className="font-bold">Phone Support</div>
                    <a href="tel:+1-470-390-3270" className="text-xl font-bold hover:text-blue-200 transition-colors">
                      +1-470-390-3270
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <div>
                    <div className="font-bold">24/7 Availability</div>
                    <div className="text-blue-200">Always here to help</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  <div>
                    <div className="font-bold">International Support</div>
                    <div className="text-blue-200">Available in multiple languages</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Quick Contact Options</h3>
              <div className="space-y-4">
                <button className="w-full bg-white text-[#0033A0] py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Start Live Chat
                </button>
                <button className="w-full bg-transparent border-2 border-white text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Schedule Call Back
                </button>
                <button className="w-full bg-transparent border-2 border-white text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Was this page helpful?
          </h3>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-green-100 text-green-800 rounded-xl font-semibold hover:bg-green-200 transition-colors">
              Yes, found what I needed
            </button>
            <button className="px-6 py-3 bg-red-100 text-red-800 rounded-xl font-semibold hover:bg-red-200 transition-colors">
              No, still need help
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page