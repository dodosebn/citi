'use client';
import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  Building,
  HelpCircle,
  Shield,
  Globe,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status when user starts typing
    if (formStatus.type) {
      setFormStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setFormStatus({ type: null, message: '' });

  console.log('Form Data:', formData); // Add this

  try {
    const response = await fetch('/api/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('Response Status:', response.status); // Add this

    const result = await response.json();
    console.log('Response Result:', result); // Add this

    if (response.ok) {
      setFormStatus({ 
        type: 'success', 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } else {
      throw new Error(result.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    setFormStatus({ 
      type: 'error', 
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' 
    });
  } finally {
    setIsSubmitting(false);
  }
};
  const contactMethods = [
    {
      icon: Phone,
      title: '24/7 Customer Service',
      details: ['+1-470-390-3270', 'TTY: +1-470-390-3270'],
      description: 'Available round the clock',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: ['customerservice@citi.com', 'support@citi.com'],
      description: 'Response within 24 hours',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Citibank Headquarters',
      details: ['388 Greenwich Street', 'New York, NY 10013'],
      description: 'Visit our main office',
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Clock,
      title: 'Branch Hours',
      details: ['Mon-Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
      description: 'Extended hours for your convenience',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const subjects = [
    'Account Inquiry',
    'Credit Card Services',
    'Loan Application',
    'Online Banking Support',
    'Fraud Alert',
    'Investment Services',
    'Business Banking',
    'Wealth Management',
    'General Inquiry'
  ];

  const quickLinks = [
    {
      title: 'Find a Branch',
      description: 'Locate nearest ATM or branch',
      icon: MapPin,
      link: '#'
    },
    {
      title: 'Online Support',
      description: 'Live chat with our agents',
      icon: MessageSquare,
      link: '#'
    },
    {
      title: 'Security Center',
      description: 'Report suspicious activity',
      icon: Shield,
      link: '#'
    },
    {
      title: 'Global Support',
      description: 'International assistance',
      icon: Globe,
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0033A0] via-blue-800 to-[#0033A0] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <Building className="w-12 h-12 text-[#ED1C24]" />
                <h1 className="text-5xl font-bold">Contact Citibank</h1>
              </div>
              <p className="text-xl text-blue-100 max-w-3xl mb-6">
                We're here to help you with all your banking needs. Contact us through 
                any convenient method, and our dedicated team will assist you promptly.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="tel:+1-470-390-3270"
                  className="bg-gradient-to-r from-[#ED1C24] to-[#FF6B6B] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Call Now
                </a>
                <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
                  Find Branch
                </button>
              </div>
            </div>
            <div className="lg:w-1/3 mt-8 lg:mt-0 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                <MessageCircle className="w-32 h-32 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {formStatus.type && (
        <div className={`max-w-7xl mx-auto px-6 py-4 animate-fadeIn`}>
          <div className={`rounded-xl p-4 flex items-center gap-3 ${
            formStatus.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {formStatus.type === 'success' ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <span>{formStatus.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information & Quick Links */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#0033A0] mb-6">Contact Methods</h2>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color}`}>
                      <method.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{method.title}</h3>
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700">{detail}</p>
                      ))}
                      <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                <div className="flex items-center space-x-3 mb-3">
                  <MessageCircle className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-red-800">Emergency Contact</h3>
                </div>
                <p className="text-red-700 text-sm mb-2">
                  Lost or stolen card? Call immediately:
                </p>
                <div className="bg-white p-3 rounded-lg border border-red-300">
                  <a 
                    href="tel:1-800-950-5114"
                    className="text-lg font-bold text-red-800 text-center block hover:text-red-900"
                  >
                    +1-470-390-3270
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#0033A0] mb-6">Quick Access</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    className="bg-gray-50 hover:bg-blue-50 rounded-xl p-4 text-center transition-colors group block"
                  >
                    <link.icon className="h-8 w-8 text-[#0033A0] mx-auto mb-2 group-hover:text-[#ED1C24] transition-colors" />
                    <div className="font-medium text-gray-800 group-hover:text-[#0033A0]">{link.title}</div>
                    <div className="text-xs text-gray-500">{link.description}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Send className="w-8 h-8 text-[#ED1C24]" />
                <h2 className="text-3xl font-bold text-[#0033A0]">Send Us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ED1C24] focus:ring-2 focus:ring-[#ED1C24]/20 transition-all"
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ED1C24] focus:ring-2 focus:ring-[#ED1C24]/20 transition-all"
                      placeholder="Enter your email"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ED1C24] focus:ring-2 focus:ring-[#ED1C24]/20 transition-all"
                      placeholder="Enter your phone number"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ED1C24] focus:ring-2 focus:ring-[#ED1C24]/20 transition-all bg-white"
                      disabled={isSubmitting}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ED1C24] focus:ring-2 focus:ring-[#ED1C24]/20 transition-all resize-vertical"
                    placeholder="Please describe your inquiry in detail..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#ED1C24] to-[#FF6B6B] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-6 w-6 mr-3" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-8 h-8 text-[#0033A0]" />
                <h2 className="text-3xl font-bold text-[#0033A0]">Frequently Asked Questions</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    q: "How do I open a new account?",
                    a: "You can open an account online through our website, via our mobile app, or by visiting any Citibank branch."
                  },
                  {
                    q: "What documents do I need for verification?",
                    a: "Typically, you'll need a government-issued ID, proof of address, and your Social Security number."
                  },
                  {
                    q: "How do I report fraudulent activity?",
                    a: "Call our 24/7 fraud hotline immediately at 1-800-950-5114 or use the Fraud Alert feature in our mobile app."
                  },
                  {
                    q: "Can I schedule an appointment online?",
                    a: "Yes! You can schedule appointments with our specialists directly through our website or mobile app."
                  },
                  {
                    q: "What are your international banking hours?",
                    a: "Our international banking services are available 24/7 for online transactions, with phone support from 6 AM to midnight EST."
                  },
                  {
                    q: "How secure is Citibank online banking?",
                    a: "We use bank-level encryption, multi-factor authentication, and real-time monitoring to ensure your data is protected."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-gray-50 hover:bg-blue-50 rounded-xl p-6 transition-colors">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-[#ED1C24] rounded-full mr-3"></span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Support Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#0033A0] to-blue-800 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="text-4xl font-bold mb-2">Live Support</div>
              <p className="text-blue-100">Available 24/7 for urgent matters</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">5 min</div>
              <p className="text-blue-100">Average response time</p>
            </div>
            <div className="text-center md:text-right">
              <button className="bg-white text-[#0033A0] py-3 px-8 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}