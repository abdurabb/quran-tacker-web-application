import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import UserNavbar from '../../components/navbar/UserNavbar';
import UserFooter from '../../components/navbar/UserFooter';

function CollegeWebsite() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentCourse, setCurrentCourse] = useState(0);
  const [currentOrg, setCurrentOrg] = useState(0);

  const banners = [
    {
      title: "Welcome to Qaf International Campus",
      subtitle: "READ. LEARN. EVOLVE",
      image: "/one.jpeg",
      link: "#home"
    },
    {
      title: "Excellence in Education",
      subtitle: "Empowering Minds, Building Futures",
      image: "/two.jpeg",
      link: "#about"
    },
    {
      title: "World-Class Learning Environment",
      subtitle: "State-of-the-Art Facilities for Academic Success",
      image: "/three.jpeg",
      link: "#courses"
    },
    {
      title: "Comprehensive Academic Programs",
      subtitle: "From Quran Hifz to Modern Education",
      image: "/four.jpeg",
      link: "#courses"
    },
    {
      title: "Vibrant Campus Life",
      subtitle: "Where Learning Meets Community",
      image: "/five.jpeg",
      link: "#organizations"
    },
    {
      title: "Dedicated Faculty & Mentors",
      subtitle: "Guiding Students Towards Excellence",
      image: "/six.jpeg",
      link: "#about"
    },
    {
      title: "Modern Infrastructure",
      subtitle: "Creating the Perfect Learning Atmosphere",
      image: "/seven.jpeg",
      link: "#about"
    },
    {
      title: "Join Our Community",
      subtitle: "Start Your Journey of Knowledge Today",
      image: "/eight.jpeg",
      link: "#admissions"
    }
  ];

  const courses = [
    { name: "Academic", icon: "📚" },        // Books for studying
    { name: "Quran Hifz", icon: "📖" },      // Quran book
    { name: "Sports Activities", icon: "🏅" }, // Medal or sports-related
    { name: "Islamic Manners", icon: "🕌" },   // Mosque or Islamic symbol
    { name: "Social Activities", icon: "🤝" }, // Handshake for socializing
    { name: "Moral Activity", icon: "🕊️" }    // Dove for morals/ethics
  ];


  const organizations = [
    {
      name: "ASF - Amais Student Federation",
      description: "The Amais Student Federation (ASF) is the vibrant voice of our student community, dedicated to fostering leadership, academic excellence, and social responsibility. ASF organizes cultural events, academic workshops, sports competitions, and community service initiatives that enrich campus life and prepare students for future success.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
      activities: ["Leadership Programs", "Cultural Events", "Academic Support", "Sports & Recreation"],
      icon: "🎓"
    },
    {
      name: "AMIS - Ainies Movement for Islamic Services",
      description: "The Ainies Movement for Islamic Services (AMIS) is our distinguished alumni organization committed to serving humanity through Islamic values and educational excellence. AMIS connects generations of graduates, provides mentorship opportunities, supports charitable initiatives, and maintains the college's legacy of academic and spiritual growth.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
      activities: ["Alumni Networking", "Mentorship Programs", "Charitable Services", "Community Outreach"],
      icon: "🤝"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCourse((prev) => (prev + 1) % courses.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOrg((prev) => (prev + 1) % organizations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="min-h-screen bg-white">
      <UserNavbar />
      <main>
        {/* Banner Video Section */}
        <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden" id="home">
          {/* Commented Banner Carousel Code */}
          {banners.map((banner, idx) => (
            <div
              onClick={() => {
                nextBanner()
              }}
              key={idx}
              className={`absolute inset-0 transition-all duration-1000 block ${idx === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{banner.title}</h2>
                  <p className="text-xl md:text-2xl mb-8 drop-shadow-md">{banner.subtitle}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Commented Navigation Buttons */}
          <button
            onClick={prevBanner}
            className=" hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition z-20 backdrop-blur-sm"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextBanner}
            className=" hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition z-20 backdrop-blur-sm"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === currentBanner ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <section className="py-16 bg-gradient-to-b from-white" style={{ backgroundImage: 'linear-gradient(to bottom, white, #E6F0FF)' }} id="courses">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#0B2B6C' }}>Our Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4 text-center">{course.icon}</div>
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-3">{course.name}</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Comprehensive programs designed to prepare you for a successful career.
                  </p>
                  <button className="w-full text-white py-2 rounded-lg transition font-medium" style={{ backgroundColor: '#0B2B6C' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0a2458'} onMouseLeave={(e) => e.target.style.backgroundColor = '#0B2B6C'}>
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white" id="about">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#0B2B6C' }}>About Qaf Institute</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Established in 2007, Ainul Maarif College has been at the forefront of academic excellence
                  and innovation. We are committed to providing world-class education that prepares students
                  for the challenges of tomorrow.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  With state-of-the-art facilities, experienced faculty, and a vibrant campus life, we offer
                  an environment where students can thrive academically, socially, and personally.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#E6F0FF' }}>
                    <div className="text-3xl font-bold" style={{ color: '#0B2B6C' }}>15K+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#E6F0FF' }}>
                    <div className="text-3xl font-bold" style={{ color: '#0B2B6C' }}>500+</div>
                    <div className="text-sm text-gray-600">Faculty</div>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#E6F0FF' }}>
                    <div className="text-3xl font-bold" style={{ color: '#0B2B6C' }}>100+</div>
                    <div className="text-sm text-gray-600">Programs</div>
                  </div>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&h=600&fit=crop"
                  alt="Campus"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Organizations Section - ASF & AMIS */}
        <section className="py-16 bg-gradient-to-br to-white" style={{ backgroundImage: 'linear-gradient(to bottom right, #E6F0FF, white)' }} id="organizations">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#0B2B6C' }}>Our Organizations</h2>
              <p className="text-gray-600 text-lg">Building Community, Inspiring Excellence</p>
            </div>

            <div className="relative">
              {/* Organization Carousel */}
              <div className="relative h-auto overflow-hidden">
                {organizations.map((org, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-1000 ${idx === currentOrg ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
                      }`}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-auto">
                          <img
                            src={org.image}
                            alt={org.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(to right, rgba(11, 43, 108, 0.8), rgba(11, 43, 108, 0.6))' }}>
                            <div className="text-center text-white px-4">
                              <div className="text-6xl mb-4">{org.icon}</div>
                              <h3 className="text-3xl font-bold">{org.name}</h3>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">{org.name}</h3>
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {org.description}
                          </p>

                          <div className="space-y-3 mb-6">
                            <h4 className="font-semibold text-lg" style={{ color: '#0B2B6C' }}>Key Activities:</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {org.activities.map((activity, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-700">
                                  <span style={{ color: '#0B2B6C' }}>✓</span>
                                  <span className="text-sm">{activity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button className="text-white px-6 py-3 rounded-lg transition font-semibold shadow-lg w-full md:w-auto" style={{ backgroundColor: '#0B2B6C' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0a2458'} onMouseLeave={(e) => e.target.style.backgroundColor = '#0B2B6C'}>
                            Learn More & Join
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {organizations.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentOrg(idx)}
                    className={`transition-all rounded-full ${idx === currentOrg
                      ? 'w-12 h-3'
                      : 'w-3 h-3'
                      }`}
                    style={idx === currentOrg
                      ? { backgroundColor: '#0B2B6C' }
                      : { backgroundColor: '#B3D9FF' }
                    }
                    onMouseEnter={(e) => {
                      if (idx !== currentOrg) e.target.style.backgroundColor = '#80C0FF';
                    }}
                    onMouseLeave={(e) => {
                      if (idx !== currentOrg) e.target.style.backgroundColor = '#B3D9FF';
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16" style={{ backgroundColor: '#E6F0FF' }} id="contact">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#0B2B6C' }}>Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1" size={20} style={{ color: '#0B2B6C' }} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">Kannur - Kerala - India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1" size={20} style={{ color: '#0B2B6C' }} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+91 7909199591</p>
                      <p className="text-gray-600">+91 8129535993</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1" size={20} style={{ color: '#0B2B6C' }} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@maarif.com</p>
                      <p className="text-gray-600">admissions@maarif.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                    style={{ '--tw-ring-color': '#0B2B6C' }}
                    onFocus={(e) => e.target.style.borderColor = '#0B2B6C'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                    onFocus={(e) => e.target.style.borderColor = '#0B2B6C'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                    onFocus={(e) => e.target.style.borderColor = '#0B2B6C'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  ></textarea>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Message sent successfully!');
                    }}
                    className="w-full text-white py-3 rounded-lg transition font-semibold"
                    style={{ backgroundColor: '#0B2B6C' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0a2458'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#0B2B6C'}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UserFooter />

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default CollegeWebsite;