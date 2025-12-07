import React from 'react'
import { MapPin, Clock, Phone, Globe, Car, Accessibility, Wifi, Coffee, Shield, PhoneCall } from 'lucide-react'

const Page = () => {
  const branches = [
    {
      id: 1,
      name: "Citibank Manhattan Financial Center",
      address: "388 Greenwich Street, New York, NY 10013",
      phone: "(212) 816-8000",
      hours: {
        weekdays: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 4:00 PM",
        sunday: "Closed"
      },
      services: ["Full-Service Banking", "Wealth Management", "Business Banking"],
      amenities: ["Drive-Thru ATM", "Safe Deposit Boxes", "Notary", "Multilingual Staff"],
      coordinates: { lat: 40.7159, lng: -74.0095 },
      imageColor: "from-blue-600 to-cyan-500"
    },
    {
      id: 2,
      name: "Citibank Midtown Banking Center",
      address: "399 Park Avenue, New York, NY 10022",
      phone: "(212) 559-1000",
      hours: {
        weekdays: "8:30 AM - 5:30 PM",
        saturday: "10:00 AM - 3:00 PM",
        sunday: "Closed"
      },
      services: ["Personal Banking", "Investment Services", "Mortgage Center"],
      amenities: ["24/7 ATM", "Coffee Bar", "Free WiFi", "Conference Rooms"],
      coordinates: { lat: 40.7580, lng: -73.9735 },
      imageColor: "from-purple-600 to-pink-500"
    },
    {
      id: 3,
      name: "Citibank Brooklyn Financial Hub",
      address: "186 Montague Street, Brooklyn, NY 11201",
      phone: "(718) 625-4200",
      hours: {
        weekdays: "9:00 AM - 5:00 PM",
        saturday: "9:00 AM - 2:00 PM",
        sunday: "Closed"
      },
      services: ["Small Business Banking", "Student Banking", "Retirement Planning"],
      amenities: ["Drive-Thru", "Accessibility Features", "Children's Area", "Community Room"],
      coordinates: { lat: 40.6937, lng: -73.9903 },
      imageColor: "from-emerald-600 to-green-500"
    },
    {
      id: 4,
      name: "Citibank Queens Commercial Center",
      address: "42-15 Queens Boulevard, Sunnyside, NY 11104",
      phone: "(718) 784-9000",
      hours: {
        weekdays: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 4:00 PM",
        sunday: "Closed"
      },
      services: ["Commercial Banking", "International Banking", "Loan Department"],
      amenities: ["Extended Hours", "Currency Exchange", "Business Support", "Free Parking"],
      coordinates: { lat: 40.7430, lng: -73.9207 },
      imageColor: "from-amber-600 to-orange-500"
    },
    {
      id: 5,
      name: "Citibank Bronx Community Branch",
      address: "2505 Grand Concourse, Bronx, NY 10468",
      phone: "(718) 562-8100",
      hours: {
        weekdays: "9:00 AM - 5:00 PM",
        saturday: "9:00 AM - 1:00 PM",
        sunday: "Closed"
      },
      services: ["Basic Banking", "Credit Counseling", "Financial Education"],
      amenities: ["Community Center", "Financial Workshops", "Public Computers", "ATM Only"],
      coordinates: { lat: 40.8629, lng: -73.8994 },
      imageColor: "from-red-600 to-pink-500"
    },
    {
      id: 6,
      name: "Citibank Staten Island",
      address: "2655 Richmond Avenue, Staten Island, NY 10314",
      phone: "(718) 370-3200",
      hours: {
        weekdays: "8:30 AM - 5:30 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      },
      services: ["Full-Service Banking", "Insurance Services", "Estate Planning"],
      amenities: ["Drive-Thru Banking", "Safe Deposit", "Notary Public", "Free Parking"],
      coordinates: { lat: 40.5816, lng: -74.1656 },
      imageColor: "from-indigo-600 to-purple-500"
    }
  ];

  const atmLocations = [
    { location: "Times Square", address: "1500 Broadway, NY 10036", features: ["24/7", "Currency Exchange"] },
    { location: "JFK Airport Terminal 4", address: "JFK International Airport", features: ["24/7", "Multi-Currency"] },
    { location: "Grand Central Terminal", address: "89 E 42nd St, NY 10017", features: ["24/7", "Cash & Check Deposit"] },
    { location: "Penn Station", address: "2 Penn Plaza, NY 10121", features: ["24/7", "Quick Cash"] }
  ];

  const services = [
    { icon: <Globe className="w-6 h-6" />, name: "Global Banking", description: "International services in 100+ countries" },
    { icon: <Shield className="w-6 h-6" />, name: "Safe Deposit Boxes", description: "Secure storage available at most branches" },
    { icon: <Accessibility className="w-6 h-6" />, name: "Accessibility", description: "All locations ADA compliant" },
    { icon: <Wifi className="w-6 h-6" />, name: "Digital Banking", description: "Free WiFi and computer stations" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0033A0] via-blue-800 to-[#0033A0] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="w-12 h-12 text-[#ED1C24]" />
                <h1 className="text-5xl font-bold">Find a Citibank Location</h1>
              </div>
              <p className="text-xl text-blue-100 max-w-3xl mb-6">
                With over 2,600 branches in 19 countries and 65,000 ATMs worldwide, 
                we're always nearby. Find your nearest branch or ATM.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-[#ED1C24] to-[#FF6B6B] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
                  Find Nearest Branch
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20">
                  View ATMs Only
                </button>
              </div>
            </div>
            <div className="lg:w-1/3 mt-8 lg:mt-0 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <MapPin className="w-32 h-32 text-white/80" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#ED1C24] to-orange-500 rounded-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl font-bold">2,600+</div>
                    <div className="text-sm">Branches</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City or ZIP Code</label>
              <input 
                type="text" 
                placeholder="e.g., New York, NY or 10013"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0033A0] focus:ring-2 focus:ring-[#0033A0]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0033A0] focus:ring-2 focus:ring-[#0033A0]/20 transition-all">
                <option>All Services</option>
                <option>Personal Banking</option>
                <option>Business Banking</option>
                <option>Wealth Management</option>
                <option>Loan Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch Type</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0033A0] focus:ring-2 focus:ring-[#0033A0]/20 transition-all">
                <option>All Locations</option>
                <option>Full Service</option>
                <option>ATM Only</option>
                <option>24/7 Access</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-[#0033A0] to-blue-800 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                Search Locations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Branches Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#0033A0]">New York City Branches</h2>
            <div className="text-gray-600">
              <span className="font-bold text-[#ED1C24]">6</span> locations found
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {branches.map((branch) => (
              <div 
                key={branch.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                {/* Branch Header */}
                <div className={`h-48 bg-gradient-to-r ${branch.imageColor} p-6 flex items-end relative`}>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">{branch.name}</h3>
                    <div className="flex items-center mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm opacity-90">{branch.address.split(',')[0]}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                    {branch.id === 1 ? "Headquarters" : "Full Service"}
                  </div>
                </div>

                {/* Branch Details */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-gray-700 mb-2">
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">Phone</span>
                      </div>
                      <a 
                        href={`tel:${branch.phone}`}
                        className="text-[#0033A0] hover:text-[#ED1C24] transition-colors font-medium"
                      >
                        {branch.phone}
                      </a>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-700 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">Hours</span>
                      </div>
                      <div className="text-sm">
                        <div>Mon-Fri: {branch.hours.weekdays}</div>
                        <div>Sat: {branch.hours.saturday}</div>
                        <div>Sun: {branch.hours.sunday}</div>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Services Available</h4>
                    <div className="flex flex-wrap gap-2">
                      {branch.services.map((service, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-50 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {branch.amenities.map((amenity, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center gap-1"
                        >
                          {amenity.includes("ATM") && <Car className="w-3 h-3" />}
                          {amenity.includes("WiFi") && <Wifi className="w-3 h-3" />}
                          {amenity.includes("Coffee") && <Coffee className="w-3 h-3" />}
                          {amenity.includes("Accessibility") && <Accessibility className="w-3 h-3" />}
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#0033A0] text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors">
                      Get Directions
                    </button>
                    <button className="px-6 py-3 border-2 border-[#0033A0] text-[#0033A0] rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                      Schedule Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATM Locations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#0033A0] mb-8">
            24/7 ATM Locations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {atmLocations.map((atm, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-[#0033A0]" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{atm.location}</h3>
                <p className="text-sm text-gray-600 mb-4">{atm.address}</p>
                <div className="flex flex-wrap gap-2">
                  {atm.features.map((feature, i) => (
                    <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Services */}
        <div className="bg-gradient-to-r from-[#0033A0] to-blue-800 rounded-2xl p-8 text-white mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Global Banking Network</h2>
              <p className="text-blue-100 text-lg mb-6">
                Access your accounts worldwide through our extensive network of 
                branches and partner institutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">19</div>
                  <div className="text-blue-200">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">65K+</div>
                  <div className="text-blue-200">ATMs Worldwide</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100M+</div>
                  <div className="text-blue-200">Customers Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-blue-200">Global Support</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Branch Services</h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-white">
                      {service.icon}
                    </div>
                    <div>
                      <div className="font-bold">{service.name}</div>
                      <div className="text-sm text-blue-200">{service.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0033A0] mb-6">
            Need Help Finding a Location?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our customer service team can help you find the nearest branch 
            or assist with scheduling an appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r flex text-center gap-2 from-[#ED1C24] to-[#FF6B6B] text-white py-3 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              <PhoneCall /> for Assistance: +1-470-390-3270
            </button>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page