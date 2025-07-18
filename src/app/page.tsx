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

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-400/15 to-green-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-full blur-3xl"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
          
          {/* Floating particles */}
          <div className="absolute top-32 left-1/4 w-2 h-2 bg-green-400/60 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-1/3 w-1 h-1 bg-teal-400/60 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-green-300/60 rounded-full animate-bounce delay-1000"></div>
        </div>

        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" className="w-full h-24 md:h-32">
            <path fill="#f9fafb" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center text-center min-h-[700px] py-24">
            <div 
              ref={heroAnimation.elementRef}
              className={`transition-all duration-1000 max-w-5xl mx-auto ${
                heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Enhanced Icon/Logo */}
              <div className="mb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-teal-400/20 blur-xl rounded-full"></div>
                <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-green-400 via-teal-400 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                  <svg className="w-12 h-12 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-green-400 mb-8 leading-tight tracking-tight">
                Find Your Perfect
                <span className="block mt-4 bg-gradient-to-r from-green-300 via-teal-200 to-green-300 bg-clip-text text-transparent">Cannabis Strain</span>
                <span className="block mt-4 text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-green-200 via-teal-100 to-green-200 bg-clip-text text-transparent">with AI Recommendations</span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-16 leading-relaxed max-w-4xl mx-auto font-light">
                Get personalized strain recommendations based on your preferences, effects, and experience level. 
                <span className="block mt-2 text-gray-400">Start your cannabis journey with confidence.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <a 
                  href="/auth"
                  className="group relative bg-gradient-to-r from-green-500 to-teal-500 text-white px-12 py-6 rounded-full font-bold hover:from-green-600 hover:to-teal-600 transition-all duration-300 text-xl shadow-2xl transform hover:scale-105 hover:shadow-green-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <span className="relative z-10">Get Started Free</span>
                </a>
                <a 
                  href="#about"
                  className="group border-2 border-green-400/50 text-green-400 px-12 py-6 rounded-full font-bold hover:bg-green-400/10 hover:border-green-400 transition-all duration-300 text-xl backdrop-blur-sm hover:shadow-lg hover:shadow-green-400/20"
                >
                  Learn More
                </a>
              </div>

              {/* Enhanced Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-gray-400">
                <div className="group flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 hover:border-green-400/30 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-green-400 transition-colors">AI-Powered</span>
                </div>
                <div className="group flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 hover:border-green-400/30 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-green-400 transition-colors">Expert Verified</span>
                </div>
                <div className="group flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 hover:border-green-400/30 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-green-400 transition-colors">25k+ Happy Users</span>
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
