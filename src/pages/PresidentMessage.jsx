import React, { useEffect } from 'react'
import { Quote, Award, Heart, Globe, Users } from 'lucide-react'

export default function PresidentMessage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 font-montserrat bg-[#FAF9F6]">
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
             <div className="bg-[#00153D] rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="President" />
                <div className="p-10 bg-[#00153D] text-white">
                   <p className="text-[#A0813D] text-[10px] font-black uppercase tracking-widest mb-2">National President 2026</p>
                   <h2 className="text-3xl font-black">JFG Bharath N Acharya</h2>
                </div>
             </div>
          </div>
          <div className="lg:col-span-7 py-10">
             <Quote className="text-[#A0813D] mb-8 opacity-20" size={60} />
             <h1 className="text-4xl lg:text-6xl font-black text-[#00153D] mb-8 uppercase tracking-tighter">President's Message</h1>
             <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p className="font-black text-xl italic text-[#00153D]">"My Dear Brothers and Sisters of JCI India,"</p>
                <p>It is a great pleasure to share my thoughts with all of you as we begin this new journey together. The year 2026 is going to be an incredible time for our organization.</p>
                <p>As your National President, I want us to focus on making this <strong className="text-[#A0813D]">"The Year of Legacy Reimagined."</strong></p>
                <p>Please remember that I am always here for you. Do not just see me as your National President—think of me as your friend and your partner in service.</p>
                <p className="font-black text-[#00153D] uppercase tracking-widest pt-10">JFG Bharath N Acharya</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">National President, JCI India 2026</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
