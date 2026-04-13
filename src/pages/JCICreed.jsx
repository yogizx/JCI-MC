import React, { useEffect } from 'react'
import { Heart, Globe, Shield, Star, Briefcase, ShieldCheck, Quote } from 'lucide-react'

export default function JCICreed() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const creedLines = [
    { text: "That faith in God gives meaning and purpose to human life", icon: <ShieldCheck size={28} /> },
    { text: "That the brotherhood of man transcends the sovereignty of nations", icon: <Globe size={28} /> },
    { text: "That economic justice can best be won by free men through free enterprise", icon: <Briefcase size={28} /> },
    { text: "That government should be of laws rather than of men", icon: <Shield size={28} /> },
    { text: "That earth’s great treasure lies in human personality", icon: <Star size={28} /> },
    { text: "And that service to humanity is the best work of life", highlight: true, icon: <Heart size={28} /> }
  ]

  return (
    <div className="pt-20 font-montserrat min-h-screen bg-[#FAFAFA]">
      {/* 1. Elegant Header */}
      <section className="py-24 text-center">
        <div className="max-w-[1440px] mx-auto px-6">
          <span className="text-[#A0813D] font-black text-[10px] uppercase tracking-[0.6em] mb-4 inline-block animate-fade-in">
            Universal Protocol
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#00153D] tracking-tighter uppercase mb-6">
            The JCI <span className="text-[#A0813D]">Creed</span>
          </h1>
          <div className="w-16 h-1 bg-[#A0813D] mx-auto rounded-full mb-10"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs max-w-lg mx-auto leading-relaxed">
            The foundational beliefs that guide our actions and inspire our community worldwide.
          </p>
        </div>
      </section>

      {/* 2. Focused Creed List */}
      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          
          <div className="text-center mb-16 relative">
            <Quote className="text-[#A0813D]/10 absolute -top-10 left-1/2 -translate-x-1/2" size={100} />
            <p className="text-2xl font-black text-[#00153D] uppercase tracking-[0.4em] relative z-10">We Believe</p>
          </div>

          {creedLines.map((line, i) => (
            <div 
              key={i} 
              className={`group p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col items-center text-center gap-6 ${
                line.highlight 
                  ? 'bg-[#00153D] border-[#00153D] shadow-2xl scale-105' 
                  : 'bg-white border-slate-100 hover:border-[#A0813D]/40 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                line.highlight 
                  ? 'bg-[#A0813D] text-[#00153D] rotate-12' 
                  : 'bg-slate-50 text-[#A0813D] group-hover:bg-[#A0813D] group-hover:text-white group-hover:-rotate-12'
              }`}>
                {line.icon}
              </div>
              <p className={`text-xl md:text-2xl font-black leading-tight tracking-tight ${
                line.highlight ? 'text-white' : 'text-[#00153D]'
              }`}>
                {line.text}
              </p>
            </div>
          ))}

          {/* Legacy Footer Note */}
          <div className="mt-20 pt-20 border-t border-slate-100 text-center">
             <img src="https://jci.cc/wp-content/themes/jci/assets/img/logo-jci-blue.png" className="h-8 mx-auto grayscale opacity-20 mb-8" alt="JCI Logo" />
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Standardified Since 1944 • International Protocol</p>
          </div>
        </div>
      </section>
    </div>
  )
}
