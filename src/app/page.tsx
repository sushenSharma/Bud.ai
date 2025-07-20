'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { AuthForm } from '../components/AuthForm';

export default function Home() {
  const heroAnimation = useScrollAnimation();
  const featuresAnimation = useScrollAnimation();
  const testimonialsAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-teal-600">BUD.ai</span>
            </div>
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <a href="#hero" className="text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap">Home</a>
              <a href="#about" className="text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap">About</a>
              <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap">Memberships</a>
              <a href="/strains" className="text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap">Products</a>
              <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap">Blog</a>
              <a href="/cart" className="text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" />
                </svg>
                Cart
              </a>
              <a href="/auth" className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap">Get Started</a>
            </div>
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    {/* Spacer to push content below fixed navbar */}
    <div className="h-16 md:h-20"></div>

{/* Hero Section */}
<section id="hero" className="pt-44 pb-24 md:pt-44 md:pb-32">
  <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
    <div 
      ref={heroAnimation.elementRef}
      className={`transition-all duration-1000 ${
        heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="rounded-3xl overflow-hidden shadow-xl" style={{ backgroundColor: '#054848' }}>
        <div className="px-8 py-16 md:px-16 md:py-20 lg:px-20 lg:py-24 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-12 leading-tight max-w-4xl mx-auto">
            Earn points with every visit,
            <span className="block mt-2">paving the way for rewards</span>
            <span className="block mt-2">and benefits</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/auth"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 text-center border border-white/30 min-w-[120px]"
            >
              Join
            </a>
            <a
              href="#about"
              className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 text-center min-w-[140px]"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Content - Image */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-teal-100 rounded-full opacity-60"></div>
              <div className="relative z-10">
                <div className="aspect-[4/5] w-full max-w-xs mx-auto md:mx-0">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=350&h=440&fit=crop&crop=face"
                    alt="Professional woman with tablet"
                    className="w-full h-full object-cover rounded-2xl shadow-xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-teal-100 rounded-2xl shadow-xl items-center justify-center">
                    <div className="text-center text-teal-600">
                      <div className="w-16 h-16 bg-teal-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="font-semibold">Cannabis Expertise</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-teal-200/40 rounded-full"></div>
            </div>
            
            {/* Right Content - Text */}
            <div 
              ref={featuresAnimation.elementRef}
              className={`transition-all duration-1000 ${
                featuresAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Professional cannabis guidance for your wellness journey
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform combines cutting-edge AI technology with expert knowledge to provide personalized cannabis recommendations. Whether you're new to cannabis or an experienced user, we help you find the perfect strains for your specific needs and preferences.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-base text-gray-700">Personalized AI-powered recommendations</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-base text-gray-700">Expert-curated strain database</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-base text-gray-700">Track and optimize your experience</span>
                </div>
              </div>
              <div>
                <a 
                  href="/auth"
                  className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors inline-block"
                >
                  Start Your Journey
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-600 block">1500+</span>
              </div>
              <p className="text-gray-700 font-semibold text-lg">Verified Strains</p>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-600 block">98%</span>
              </div>
              <p className="text-gray-700 font-semibold text-lg">User Satisfaction</p>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-600 block">50+</span>
              </div>
              <p className="text-gray-700 font-semibold text-lg">Expert Partners</p>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-600 block">25k+</span>
              </div>
              <p className="text-gray-700 font-semibold text-lg">Happy Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={testimonialsAnimation.elementRef}
            className={`text-center mb-20 transition-all duration-1000 ${
              testimonialsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Meet Our Expert Team</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our dedicated professionals bring years of experience in cannabis science, technology, and wellness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Team Member 1 */}
            <div className="text-center group hover-lift bg-gray-50 p-8 rounded-2xl">
              <div className="relative mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="Dr. James Anderson"
                  className="w-40 h-40 rounded-full mx-auto object-cover shadow-xl group-hover:shadow-2xl transition-shadow"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-40 h-40 rounded-full mx-auto bg-teal-100 items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-teal-600">JA</span>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Dr. James Anderson</h4>
              <p className="text-teal-600 font-semibold mb-4 text-lg">Chief Cannabis Officer</p>
              <p className="text-gray-600 leading-relaxed">
                PhD in Plant Biology with 15+ years of cannabis research experience. Leading expert in strain genetics and therapeutic applications.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center group hover-lift bg-gray-50 p-8 rounded-2xl">
              <div className="relative mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
                  alt="Sarah Mitchell"
                  className="w-40 h-40 rounded-full mx-auto object-cover shadow-xl group-hover:shadow-2xl transition-shadow"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-40 h-40 rounded-full mx-auto bg-teal-100 items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-teal-600">SM</span>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Sarah Mitchell</h4>
              <p className="text-teal-600 font-semibold mb-4 text-lg">Head of AI Development</p>
              <p className="text-gray-600 leading-relaxed">
                Machine Learning Engineer specializing in recommendation systems. Former Google AI researcher with expertise in personalization algorithms.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center group hover-lift bg-gray-50 p-8 rounded-2xl">
              <div className="relative mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                  alt="Alex Rivera"
                  className="w-40 h-40 rounded-full mx-auto object-cover shadow-xl group-hover:shadow-2xl transition-shadow"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-40 h-40 rounded-full mx-auto bg-teal-100 items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-teal-600">AR</span>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Alex Rivera</h4>
              <p className="text-teal-600 font-semibold mb-4 text-lg">Wellness Coordinator</p>
              <p className="text-gray-600 leading-relaxed">
                Licensed wellness practitioner and certified cannabis counselor. Specializes in medical cannabis applications and patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 bg-gradient-to-br from-teal-600 to-teal-800 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-16 right-16 w-40 h-40 bg-teal-400/20 rounded-full"></div>
        <div className="absolute bottom-16 left-16 w-32 h-32 bg-teal-300/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-teal-500/10 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
            {/* Left Content */}
            <div 
              ref={contactAnimation.elementRef}
              className={`transition-all duration-1000 ${
                contactAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                Start your Discovery and
                <span className="block mt-2 text-teal-200">unlock Benefits</span>
              </h2>
              <p className="text-lg md:text-xl text-teal-100 mb-10 leading-relaxed">
                Join thousands of members who have discovered their perfect cannabis matches through our AI-powered platform.
              </p>
              <div className="space-y-6 text-teal-100">
                <div className="flex items-start">
                  <svg className="w-8 h-8 mr-4 text-teal-300 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-lg">Personalized strain recommendations</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-8 h-8 mr-4 text-teal-300 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-lg">Expert guidance and support</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-8 h-8 mr-4 text-teal-300 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-lg">Track your wellness journey</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - CTA Form */}
            <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-lg mx-auto lg:mx-0 w-full">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Started Today</h3>
                <p className="text-gray-600">Join our community and discover your perfect match</p>
              </div>
              <AuthForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-teal-400">BUD.ai</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Your intelligent cannabis companion for personalized recommendations. Discover the perfect strains for your wellness journey with our AI-powered platform.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#features" className="hover:text-teal-400 transition-colors">Features</a></li>
                <li><a href="/strains" className="hover:text-teal-400 transition-colors">Strain Database</a></li>
                <li><a href="/dashboard" className="hover:text-teal-400 transition-colors">Recommendations</a></li>
                <li><a href="/auth" className="hover:text-teal-400 transition-colors">Sign Up</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>&copy; 2024 BUD.ai. All rights reserved.</p>
              </div>
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="text-sm">Trusted by 25,000+ cannabis enthusiasts</span>
                <div className="w-8 h-1 bg-teal-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
