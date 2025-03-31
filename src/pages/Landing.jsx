import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-95 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* TODO: Add your gym logo */}
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-white">
                  Gym<span className="text-red-600">Plus</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-red-500 transition-colors">Features</a>
              <a href="#trainers" className="text-gray-300 hover:text-red-500 transition-colors">Trainers</a>
              <a href="#pricing" className="text-gray-300 hover:text-red-500 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-300 hover:text-red-500 transition-colors">Contact</a>
              <Link to="/login" className="text-gray-300 hover:text-red-500 transition-colors">Login</Link>
              <Link
                to="/register"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Register
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-red-500"
              >
                {/* Hamburger icon */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block text-gray-300 hover:text-red-500 px-3 py-2">Features</a>
              <a href="#trainers" className="block text-gray-300 hover:text-red-500 px-3 py-2">Trainers</a>
              <a href="#pricing" className="block text-gray-300 hover:text-red-500 px-3 py-2">Pricing</a>
              <a href="#contact" className="block text-gray-300 hover:text-red-500 px-3 py-2">Contact</a>
              <Link to="/login" className="block text-gray-300 hover:text-red-500 px-3 py-2">Login</Link>
              <Link to="/register" className="block text-red-600 hover:text-red-500 px-3 py-2">Register</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0">
          {/* 
            TODO: Replace with your hero image
            Recommended: High-quality gym/workout image
            Size: 1920x1080px
            Style: Dark, high-contrast image of gym equipment or training
          */}
          <div className="bg-black absolute inset-0 opacity-60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Transform Your Body,<br />
              <span className="text-red-600">Transform Your Life</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the ultimate fitness experience with state-of-the-art equipment,
              expert trainers, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                View Plans
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Features</h2>
            <p className="text-gray-400">Everything you need for your fitness journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg hover:transform hover:-translate-y-1 transition duration-300"
              >
                <div className="text-red-500 mb-4">
                  {/* TODO: Add feature icon */}
                  <div className="w-12 h-12 rounded-full bg-red-500 bg-opacity-20 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Expert Trainers</h2>
            <p className="text-gray-400">Meet our professional fitness experts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                {/* 
                  TODO: Add trainer image
                  Size: 400x400px
                  Style: Professional headshot or training photo
                */}
                <div className="h-64 bg-gray-700"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{trainer.name}</h3>
                  <p className="text-red-500 mb-4">{trainer.specialty}</p>
                  <p className="text-gray-400">{trainer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Membership Plans</h2>
            <p className="text-gray-400">Choose the perfect plan for your fitness goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-gray-900 rounded-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-red-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-red-500 text-white text-center py-1">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-red-500 mb-4">
                    ₹{plan.price}<span className="text-gray-400 text-base">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <svg
                          className="h-5 w-5 text-red-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className="block text-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-gray-400">Have questions? We're here to help!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-300">
                  <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Fitness Street, Mumbai, India
                </p>
                <p className="flex items-center text-gray-300">
                  <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 98765 43210
                </p>
                <p className="flex items-center text-gray-300">
                  <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@gymplus.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">GymPlus</h4>
              <p className="text-gray-400">Your premium fitness destination</p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-red-500">Features</a></li>
                <li><a href="#trainers" className="text-gray-400 hover:text-red-500">Trainers</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-red-500">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-red-500">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-red-500">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {/* TODO: Add social media icons */}
                <a href="#" className="text-gray-400 hover:text-red-500">FB</a>
                <a href="#" className="text-gray-400 hover:text-red-500">TW</a>
                <a href="#" className="text-gray-400 hover:text-red-500">IG</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; 2024 GymPlus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data
const features = [
  {
    icon: '🏋️‍♂️', // TODO: Replace with proper icon
    title: 'Modern Equipment',
    description: 'State-of-the-art fitness equipment for all your workout needs',
  },
  {
    icon: '👥', // TODO: Replace with proper icon
    title: 'Expert Trainers',
    description: 'Professional trainers to guide and motivate you',
  },
  {
    icon: '🕒', // TODO: Replace with proper icon
    title: 'Flexible Hours',
    description: '24/7 access to fit your busy schedule',
  },
];

const trainers = [
  {
    name: 'Rahul Kumar',
    specialty: 'Strength Training',
    description: '10+ years of experience in strength and conditioning.',
  },
  {
    name: 'Priya Singh',
    specialty: 'Yoga Expert',
    description: 'Certified yoga instructor with holistic approach to fitness.',
  },
  {
    name: 'Amit Patel',
    specialty: 'CrossFit Coach',
    description: 'Specialized in high-intensity functional training.',
  },
];

const plans = [
  {
    name: 'Basic',
    price: '1,499',
    features: [
      'Access to gym floor',
      'Basic equipment usage',
      'Locker room access',
      'Fitness assessment',
    ],
  },
  {
    name: 'Premium',
    price: '2,999',
    popular: true,
    features: [
      'All Basic features',
      'Group classes',
      'Personal trainer (2x/month)',
      'Nutrition consultation',
    ],
  },
  {
    name: 'Elite',
    price: '4,999',
    features: [
      'All Premium features',
      'Unlimited personal training',
      'Private locker',
      'Spa access',
    ],
  },
];

export default Landing;