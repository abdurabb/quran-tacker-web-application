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
      title: "Welcome to Amais",
      subtitle: "Empowering Minds, Building Futures",
      image: "https://www.pullman-services.com/wp-content/uploads/2018/07/iStock-497747288_University_Aerial.jpg",
      link: "#admissions"
    },
    {
      title: "World-Class Education",
      subtitle: "Join Our Academic Excellence Program",
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&h=600&fit=crop",
      link: "#courses"
    },
    {
      title: "Modern Campus Facilities",
      subtitle: "State-of-the-Art Learning Environment",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1200&h=600&fit=crop",
      link: "#about"
    }
  ];

  const courses = [
    { name: "Engineering", icon: "🔧" },
    { name: "Medical Sciences", icon: "🏥" },
    { name: "Business Administration", icon: "💼" },
    { name: "Arts & Humanities", icon: "🎨" },
    { name: "Computer Science", icon: "💻" },
    { name: "Law", icon: "⚖️" }
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
        {/* Banner Carousel */}
        <div className="relative h-96 md:h-[500px] overflow-hidden" id="home">
          {banners.map((banner, idx) => (
            <a
              key={idx}
              href={banner.link}
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
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition text-lg shadow-lg"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </a>
          ))}

          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition z-20 backdrop-blur-sm"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition z-20 backdrop-blur-sm"
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
        <section className="py-16 bg-gradient-to-b from-white to-green-50" id="courses">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Our Courses</h2>
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
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-medium">
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
                <h2 className="text-4xl font-bold text-green-700 mb-6">About Ainul Maarif</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Established in 1985, Ainul Maarif College has been at the forefront of academic excellence
                  and innovation. We are committed to providing world-class education that prepares students
                  for the challenges of tomorrow.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  With state-of-the-art facilities, experienced faculty, and a vibrant campus life, we offer
                  an environment where students can thrive academically, socially, and personally.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">15K+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">500+</div>
                    <div className="text-sm text-gray-600">Faculty</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">100+</div>
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
        <section className="py-16 bg-gradient-to-br from-green-50 to-white" id="organizations">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-green-700 mb-4">Our Organizations</h2>
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
                          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-600/60 flex items-center justify-center">
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
                            <h4 className="font-semibold text-green-700 text-lg">Key Activities:</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {org.activities.map((activity, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-700">
                                  <span className="text-green-500">✓</span>
                                  <span className="text-sm">{activity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-lg w-full md:w-auto">
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
                    className={`transition-all ${idx === currentOrg
                      ? 'w-12 h-3 bg-green-600 rounded-full'
                      : 'w-3 h-3 bg-green-300 rounded-full hover:bg-green-400'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-green-50" id="contact">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-green-600 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">123 Education Lane, Knowledge City, ST 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-green-600 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 987-6543</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-green-600 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@greenvalley.edu</p>
                      <p className="text-gray-600">admissions@greenvalley.edu</p>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  ></textarea>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Message sent successfully!');
                    }}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
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