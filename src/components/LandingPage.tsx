import React from 'react';
import { Brain, Heart, Shield, Clock, ArrowRight, Sparkles, Users, Mic } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const features = [
    {
      icon: Brain,
      title: "Smart Memory Assistant",
      description: "AI-powered memory tracking that learns and adapts to your needs"
    },
    {
      icon: Mic,
      title: "Voice Enabled",
      description: "Speak naturally to add memories and get instant responses"
    },
    {
      icon: Users,
      title: "Caregiver Support",
      description: "Family and caregivers can help manage and add memories"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your memories are stored safely and kept completely private"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden animate-gradient bg-[length:400%_400%]">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-floatDelay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-float"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/20 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-emerald-400/20 rounded-full animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-pink-400/20 rounded-full animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Logo & Title */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8 animate-fadeInDown">
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl animate-glow hover:scale-110 transition-transform duration-300">
                  <Brain className="w-16 h-16 text-white animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
                </div>
                {/* Orbital rings */}
                <div className="absolute inset-0 rounded-3xl border-2 border-blue-300/30 animate-spin" style={{ animationDuration: '10s' }}></div>
                <div className="absolute -inset-2 rounded-3xl border border-purple-300/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              </div>
            </div>
            
            <div className="animate-slideInLeft">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
                MemoCare
              </h1>
            </div>
            
            <div className="animate-slideInRight" style={{ animationDelay: '0.3s' }}>
              <p className="text-2xl md:text-3xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                Your intelligent memory companion for a more organized, peaceful mind
              </p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-8 text-lg text-gray-600 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                <span>Compassionate Care</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                <Clock className="w-5 h-5 text-blue-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <span>Always Available</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                <Shield className="w-5 h-5 text-green-500 animate-bounce" style={{ animationDelay: '1s' }} />
                <span>100% Private</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
              <button
                onClick={onEnterApp}
                className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xl font-semibold rounded-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 shadow-2xl hover:shadow-blue-500/50 focus:ring-4 focus:ring-blue-300/50 focus:outline-none animate-glow"
              >
                <span>Start Your Memory Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              
              <p className="text-sm text-gray-500 animate-pulse">
                No signup required • Start immediately • Free to use
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 hover:scale-105 transition-transform duration-300">
              Why Choose MemoCare?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Designed with care, built for simplicity, powered by intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-fadeInUp"
                style={{ animationDelay: `${(index + 3) * 200}ms` }}
              >
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl w-fit shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-glow">
                    <feature.icon className="w-8 h-8 text-white group-hover:animate-bounce" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-glow">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 animate-slideInLeft">
              Ready to enhance your memory?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slideInRight" style={{ animationDelay: '0.2s' }}>
              Join thousands who trust MemoCare to keep their important memories safe and accessible.
            </p>
            
            <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={onEnterApp}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-purple-500/50 animate-pulse"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Floating elements around CTA */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-400/20 rounded-full animate-bounce-slow"></div>
            <div className="absolute -top-2 -right-6 w-6 h-6 bg-blue-400/20 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-indigo-400/20 rounded-full animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-2 -left-6 w-4 h-4 bg-violet-400/20 rounded-full animate-bounce-slow" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}; 