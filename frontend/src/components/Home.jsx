import React, { useState, useEffect, useRef } from "react";
import { GiFarmTractor, GiWheat, GiCottonFlower } from "react-icons/gi";
import {
  FaLeaf,
  FaChartLine,
  FaStore,
  FaMicrophone,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaRobot,
  FaCloudSun,
  FaSearchLocation,
  FaRupeeSign,
  FaUsersCog,
  FaProjectDiagram,
} from "react-icons/fa";
import { MdOutlineAgriculture } from "react-icons/md";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

// Simplified animation component
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const { current } = domRef;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className="transition-all duration-1000 ease-in-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Simple hover card
const FeatureCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all duration-300 ${
        isHovered ? "transform -translate-y-2 shadow-xl" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="inline-block p-4 bg-green-100 rounded-xl text-green-900 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-green-900">{title}</h3>
      <p className="text-gray-600">{description}</p>

      {isHovered && (
        <div className="mt-4">
          <a href="#" className="text-green-700 font-medium flex items-center">
            Learn more
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/animations/hero.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));

    // Add this to fix any default body/html margins
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";

    return () => {
      // Clean up when component unmounts
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.documentElement.style.margin = "";
      document.documentElement.style.padding = "";
    };
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section - Full height for mobile and properly centered for desktop */}
      <header className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white relative min-h-screen pt-16 sm:pt-20 flex items-center">
        {/* Professional subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Subtle leaf accents - more professional positioning */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400"
              style={{
                left: `${65 + i * 12}%`,
                top: `${20 + i * 25}%`,
                opacity: 0.15,
                transform: `rotate(${i * 45}deg) scale(${1 + i * 0.5})`,
              }}
            >
              <FaLeaf className="text-4xl" />
            </div>
          ))}
        </div>

        {/* Main container with proper centering for desktop and no gaps for mobile */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-12">
              <FadeInSection>
                <div className="flex items-center mb-4">
                  <div className="h-1 w-12 bg-green-400 rounded mr-4"></div>
                  <span className="uppercase tracking-wider text-green-300 font-medium">
                    AI-POWERED AGRICULTURE
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                  <span className="block">Smart Farming.</span>
                  <span className="block">Better Decisions.</span>
                  <span className="block text-green-300">
                    Better Harvests.
                  </span>
                </h1>
              </FadeInSection>

              <FadeInSection delay={200}>
                <p className="text-lg sm:text-xl mb-8 text-green-50 leading-relaxed">
                  KrishiMitra brings AI-powered crop insights, disease detection, yield prediction, market intelligence and farming assistance together in one simple platform built for Indian farmers.
                </p>
              </FadeInSection>

              <FadeInSection delay={400}>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/market" className="bg-white text-green-900 font-medium py-3 px-8 rounded-lg shadow-lg hover:bg-green-50 transition duration-300 ease-in-out text-center border border-green-200">
                    Explore KrishiMitra
                  </Link>
                  <Link to="/chat" className="border border-white text-white hover:bg-black hover:bg-opacity-10 font-medium py-3 px-8 rounded-lg transition duration-300 ease-in-out text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center justify-center">
                    <FaRobot className="mr-2" />
                    Talk to KrishiMitra
                  </Link>
                </div>
              </FadeInSection>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <FadeInSection delay={300}>
                <div className="relative">
                  {/* Background decorative elements */}
                  <div className="absolute -left-6 -top-6 w-64 h-64 bg-green-700 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-green-500 rounded-full opacity-20 blur-xl"></div>

                  {/* Animation container */}
                  <div className="relative overflow-hidden h-96 sm:w-80 md:w-96">
                    {animationData ? (
                      <Lottie
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-50">
                        <GiFarmTractor className="text-8xl text-green-600" />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-100 opacity-50"></div>
                      </div>
                    )}
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </header>
      {/* Application Added Notice */}
      <FadeInSection delay={100}>
        <div className="flex justify-center my-8">
          <span className="inline-block bg-green-700 text-white text-lg font-semibold rounded-full px-6 py-2 shadow-md">
            🌱 New: KrishiMitra Application Added — Now available for all Indian farmers!
          </span>
        </div>
      </FadeInSection>
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
                Powered by Advanced AI
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                KrishiMitra combines multiple AI technologies to provide
                comprehensive farming assistance in your local language.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeInSection delay={100}>
              <FeatureCard
                icon={<FaLeaf className="text-4xl text-green-800" />} 
                title="AI Crop Disease Detection"
                description="Snap a photo of your crop to instantly detect diseases using advanced computer vision. Receive actionable treatment and prevention advice."
              />
            </FadeInSection>

            <FadeInSection delay={200}>
              <FeatureCard
                icon={<MdOutlineAgriculture className="text-4xl text-amber-700" />} 
                title="AI Yield Prediction"
                description="Predict your harvest with confidence. Our AI analyzes soil, fertilizer, and weather data to estimate your crop yield and provide growth recommendations."
              />
            </FadeInSection>

            <FadeInSection delay={300}>
              <FeatureCard
                icon={<FaChartLine className="text-4xl text-green-700" />} 
                title="Mandi & Market Intelligence"
                description="Get real-time mandi prices and market trends for your crops across Indian states. Make the smartest selling decisions using verified data."
              />
            </FadeInSection>

            <FadeInSection delay={400}>
              <FeatureCard
                icon={<FaCloudSun className="text-4xl text-blue-500" />} 
                title="Weather & Climate Insights"
                description="Plan your farm work with climate insights integrated directly into your yield predictions and farming chat."
              />
            </FadeInSection>

            <FadeInSection delay={500}>
              <FeatureCard
                icon={<FaMicrophone className="text-4xl text-green-600" />} 
                title="AI Farming Assistant"
                description="Talk to KrishiMitra AI in English, Hindi, or Marathi. Get expert answers, step-by-step guidance, and farming support hands-free."
              />
            </FadeInSection>

            <FadeInSection delay={600}>
              <FeatureCard
                icon={<GiFarmTractor className="text-4xl text-amber-600" />} 
                title="Micro Farm Planning"
                description="Manage your small-scale farming operations, track your expenses, and plan your crop cycles efficiently."
              />
            </FadeInSection>

            <FadeInSection delay={700}>
              <FeatureCard
                icon={<FaRupeeSign className="text-4xl text-purple-600" />} 
                title="Farmer Finance & Government Schemes"
                description="Stay updated with the latest government subsidies, tracking options, and financial assistance designed for farmers."
              />
            </FadeInSection>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <FadeInSection>
          <div className="max-w-5xl mx-auto bg-green-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Start Growing Smarter Today
                </h2>
                <p className="text-green-100 mb-8">
                  Join thousands of farmers using AI to improve yields, reduce
                  costs, and farm more sustainably.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-white text-green-900 hover:bg-green-50 font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:-translate-y-1">
                    Download App
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-green-900 font-bold py-3 px-6 rounded-lg transition transform hover:-translate-y-1">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 bg-green-800 flex items-center justify-center relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-white animate-pulse"
                      style={{
                        width: "100px",
                        height: "100px",
                        left: `${i * 30}%`,
                        top: `${i * 25}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    ></div>
                  ))}
                </div>

                <div className="text-center p-8 relative">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 rounded-full p-4 transform transition hover:rotate-12">
                      <GiFarmTractor className="text-6xl text-green-900" />
                    </div>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2 text-center">
                    Get KrishiMitra
                  </h3>
                  <p className="text-green-100 mb-4 text-center">
                    Available as a Web App
                  </p>
                  <div className="flex flex-col justify-center w-full">
                    <Link to="/disease" className="bg-white text-green-900 font-bold px-4 py-2 rounded shadow hover:bg-green-50 transition transform hover:scale-105">
                      Start Detecting Diseases
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>
      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 text-green-900 font-extrabold text-xl mb-2">
                <div className="bg-green-900 p-2 rounded-full flex items-center justify-center">
                  <GiFarmTractor className="text-xl text-white" />
                </div>
                <span>KrishiMitra</span>
              </div>
              <p className="text-gray-600 mb-1 text-base font-medium">
                "Your Intelligent Farming Companion"
              </p>
              <p className="text-gray-600 text-sm">
                Built for smarter, more sustainable farming.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-green-900 mb-3">Platform</h3>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <Link to="/market" className="text-gray-600 hover:text-green-900 transition-colors">
                    Market
                  </Link>
                </li>
                <li>
                  <Link to="/disease" className="text-gray-600 hover:text-green-900 transition-colors">
                    Disease Detection
                  </Link>
                </li>
                <li>
                  <Link to="/yield" className="text-gray-600 hover:text-green-900 transition-colors">
                    Yield Prediction
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className="text-gray-600 hover:text-green-900 transition-colors">
                    AI Assistant
                  </Link>
                </li>
                <li>
                  <Link to="/microfarm" className="text-gray-600 hover:text-green-900 transition-colors">
                    Micro Farm
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-green-900 mb-3">About</h3>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-900 transition-colors">
                    About KrishiMitra
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-900 transition-colors">
                    Sustainable Agriculture
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-900 transition-colors">
                    AI for Farmers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-center text-sm">
              &copy; 2026 KrishiMitra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
