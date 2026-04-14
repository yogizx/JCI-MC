import React from 'react';
import { ArrowRight, CheckCircle2, Quote, Users, Target, Zap, Globe, Award } from 'lucide-react';

const BrandShowcase = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/jci_hero_corporate_1776166986988.png" 
            alt="JCI Corporate" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-jci-black/90 via-jci-black/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-jci-blue text-white text-sm font-semibold tracking-wider uppercase rounded-full mb-6 animate-fade-in">
              Establishing Global Leadership
            </span>
            <h1 className="text-white mb-6 leading-[1.2]">
              Empowering Young Leaders for <span className="text-jci-blue font-bold tracking-tight">Sustainable Impact</span>.
            </h1>
            <p className="text-white/80 text-xl lg:text-2xl mb-10 max-w-2xl leading-[1.3] font-light">
              We provide the development opportunities that empower young people to create positive change within their communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-jci-blue hover:bg-jci-navy text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-jci-blue/20">
                Get Started <ArrowRight size={20} />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 rounded-lg font-semibold transition-all border border-white/30">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-6 lg:right-12 hidden md:grid grid-cols-2 gap-4">
          {[
            { label: 'Countries', value: '100+' },
            { label: 'Members', value: '200K+' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
              <div className="text-jci-yellow text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Values Grid */}
      <section className="py-24 bg-jci-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-jci-black mb-4">Our Core Directives</h2>
            <div className="w-20 h-1.5 bg-jci-yellow mx-auto rounded-full mb-8"></div>
            <p className="text-jci-black-75">
              JCI is a worldwide federation of young leaders and entrepreneurs with nearly 200,000 active members in over 100 countries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Target className="text-jci-blue" />, 
                title: 'Global Network', 
                desc: 'Connect with a diverse network of young active citizens across the globe.' 
              },
              { 
                icon: <Zap className="text-jci-teal" />, 
                title: 'Personal Growth', 
                desc: 'Unlock your potential through world-class training and leadership development.' 
              },
              { 
                icon: <Globe className="text-jci-navy" />, 
                title: 'Community Impact', 
                desc: 'Collaborate with local partners to create sustainable solutions to societal challenges.' 
              }
            ].map((item, i) => (
              <div key={i} className="group p-10 rounded-2xl border border-jci-black-25 hover:border-jci-blue/50 hover:shadow-2xl hover:shadow-jci-blue/5 transition-all duration-500 bg-white">
                <div className="mb-6 p-4 bg-jci-blue/5 rounded-xl inline-block group-hover:bg-jci-blue group-hover:text-white transition-colors duration-500">
                  {React.cloneElement(item.icon, { size: 32, className: 'transition-colors' })}
                </div>
                <h3 className="mb-4 text-jci-black group-hover:text-jci-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-jci-black-75">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Quote Section - Using Arvo */}
      <section className="py-24 bg-jci-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <Quote size={200} className="text-jci-blue" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="text-jci-yellow mb-8 mx-auto" size={48} />
            <blockquote className="mb-8 italic leading-relaxed text-white">
              "Developing the next generation of leaders is not just a goal, it's a responsibility. JCI provides the platform where passion meets purpose to create lasting change."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-jci-blue flex items-center justify-center font-bold text-white">
                JC
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">JCI President</div>
                <div className="text-jci-teal uppercase text-xs tracking-widest font-bold">World Headquarters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contrast & Pairing Demo */}
      <section className="py-24 bg-jci-blue text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-white mb-6">Designed for Visibility</h2>
              <p className="text-jci-blue-25 mb-8 text-xl">
                We maintain a strict 35% JCI Blue dominance, balanced with 20% Black and White. Navy and Teal provide depth, while Yellow creates focal points.
              </p>
              <ul className="space-y-4">
                {[
                  'High contrast accessibility standards',
                  'Modern grid-based alignment',
                  'Soft 12px rounded corner radius',
                  'Dynamic whitespace utilization'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-jci-yellow" size={24} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-jci-navy p-8 rounded-2xl h-48 flex items-end">
                <span className="text-white font-bold tracking-wider opacity-50">JCI NAVY</span>
              </div>
              <div className="bg-jci-teal p-8 rounded-2xl h-48 flex items-end">
                <span className="text-jci-black font-bold tracking-wider opacity-50">JCI TEAL</span>
              </div>
              <div className="bg-jci-black p-8 rounded-2xl h-48 flex items-end col-span-2 border border-white/10">
                <span className="text-white font-bold tracking-wider opacity-50 uppercase">JCI Black & White Contrast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 text-center">
          <div className="relative z-10 max-w-4xl mx-auto border-2 border-jci-blue/20 p-16 rounded-[40px] bg-white shadow-2xl shadow-jci-blue/10">
            <h2 className="text-jci-black mb-6">Ready to Lead?</h2>
            <p className="text-jci-black-75 text-xl mb-10 max-w-2xl mx-auto">
              Join JCI Madurai Central today and become part of a global movement of young active citizens creating positive change.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <button className="bg-jci-blue hover:bg-jci-navy text-white px-10 py-5 rounded-xl font-bold transition-all shadow-xl shadow-jci-blue/30">
                Register Membership
              </button>
              <button className="bg-jci-yellow hover:bg-jci-yellow-75 text-jci-black px-10 py-5 rounded-xl font-bold transition-all shadow-xl shadow-jci-yellow/30">
                Contact Chapters
              </button>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-jci-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-jci-teal/5 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default BrandShowcase;
