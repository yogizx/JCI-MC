import React, { useEffect } from 'react'
import { Globe, Users, Target } from 'lucide-react'

export default function AboutJCI() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 font-montserrat px-6">
      <section className="py-24 max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl font-black text-[#00153D] uppercase tracking-tighter">About <span className="text-[#A0813D]">JCI</span></h1>
        <p className="text-xl text-slate-600 leading-relaxed font-medium">
          Junior Chamber International (JCI) is a worldwide community of young active citizens ages between 18-40 who share the belief that in order to create positive change, engaging in activities ranging from community development to international projects.
        </p>
        <div className="bg-[#FAF9F6] p-10 rounded-3xl border border-slate-100">
           <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-[#00153D] rounded-2xl flex items-center justify-center text-[#A0813D]"><Globe size={32}/></div>
              <p className="text-lg font-black text-[#00153D] italic">"With over 5,000 Local Organizations in more than 100 countries and territories, JCI forms a vibrant international community of nearly 200,000 active citizens."</p>
           </div>
        </div>
        <p className="text-slate-600 font-medium">
          All members belong to a JCI Local Organization where they focus on finding solutions to improve their local community. Local Organizations are affiliated to National Organizations where members coordinate activities on national and international scales.
        </p>
      </section>
    </div>
  )
}
