import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Target, Eye, Users, Heart, Award, ShieldCheck, MapPin, Star, Bookmark, Briefcase, Zap, Clock } from 'lucide-react'

const localStats = [
  { val: '49 Yrs', label: 'Legacy Presence' },
  { val: 'Zone 18', label: 'Geographical Domain' },
  { val: '500+', label: 'Local Projects' },
  { val: 'ELITE', label: 'LOM Status' }
]

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 font-montserrat bg-[#FAFAFA]">
      <section className="relative h-[550px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#00153D]"></div>
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover brightness-[0.25] grayscale" alt="Bkg" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00153D] via-[#00153D]/95 to-transparent z-10" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 w-full text-white z-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 mb-10">
               <span className="px-6 py-2 bg-[#A0813D] text-[10px] font-black uppercase tracking-[0.4em] rounded-full">ESTABLISHED 1974</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter uppercase">Legacy of<br /> <span className="text-[#A0813D]">Madurai Central</span></h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed font-medium border-l-4 border-[#A0813D] pl-8">The premier local organization in the temple City @ Atens of the east, committed to developing leadership and professional excellence.</p>
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div>
              <p className="text-[#A0813D] font-black text-[11px] uppercase tracking-widest mb-6">Our History</p>
              <h2 className="text-4xl font-black text-[#00153D] mb-10">Crafting Leaders Since 1974</h2>
              <p className="text-slate-600 mb-8">JCI Madurai Central has been at the forefront of social and professional development in Madurai for almost five decades.</p>
              <div className="grid grid-cols-2 gap-6">
                 {localStats.map((s, i) => (
                   <div key={i} className="bg-slate-50 p-6 rounded-3xl">
                      <p className="text-3xl font-black text-[#00153D]">{s.val}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bg-[#00153D] rounded-[3rem] p-12 text-white flex flex-col justify-center">
              <h3 className="text-3xl font-black mb-6 uppercase">Join the Movement</h3>
              <p className="text-slate-300 mb-10">Step up, lead boldly, and leave a legacy. Join the world's leading network of young leaders.</p>
              <Link to="/membership" className="bg-[#A0813D] text-white px-8 py-4 rounded-xl font-black text-center uppercase tracking-widest">Apply Now</Link>
           </div>
        </div>
      </section>
    </div>
  )
}
