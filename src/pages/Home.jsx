import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Globe, UserCheck, Quote, ChevronRight, CheckCircle2, Star, Target, Lightbulb, MapPin, Phone, Mail } from 'lucide-react'
import homeHero from '../assets/home_hero.png'
import leaderPortrait from '../assets/leader_portrait.png'

const joinReasons = [
  {
    icon: <Users className="w-10 h-10 text-[#A0813D]" />,
    title: 'Leadership Development',
    desc: 'Gain hands-on experience and become a confident leader through projects and trainings.'
  },
  {
    icon: <Globe className="w-10 h-10 text-[#A0813D]" />,
    title: 'Global Networking',
    desc: 'Connect with enterprising leaders aged 18-40 across India and 115 countries.'
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-[#A0813D]" />,
    title: 'Skill Building',
    desc: 'Master soft skills, entrepreneurship, and more with expert-led programs like NALANDA, ABLE and many more.'
  },
  {
    icon: <Target className="w-10 h-10 text-[#A0813D]" />,
    title: 'Community Impact',
    desc: 'Lead sustainable projects like that are aligned with UNSDG.'
  },
  {
    icon: <Star className="w-10 h-10 text-[#A0813D]" />,
    title: 'Exciting Opportunities',
    desc: 'Attend global events, conventions, and conferences—like the JCI Area conferences & World Congress.'
  }
]

export default function Home() {
  return (
    <div className="pt-20 font-jakarta">
      {/* 1. Hero Section */}
      <section className="relative h-[600px] lg:h-[800px] flex items-center overflow-hidden">
        <img 
          src={homeHero} 
          alt="JCI Hero" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00153D] via-[#00153D]/60 to-transparent" />
        
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 w-full text-white">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 bg-[#A0813D] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-lg">
              JCI Madurai Central
            </span>
            <h1 className="text-5xl lg:text-8xl font-black leading-tight mb-10 tracking-tight flex flex-col gap-4">
              <span>Transforming</span>
              <span>Passion into <span className="text-[#A0813D]">Action</span></span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-medium flex flex-col gap-2">
              <span>Empower yourself.</span>
              <span>Impact your community.</span>
              <span>Shape the future.</span>
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                to="/vertical" 
                className="bg-[#A0813D] hover:bg-[#8B6D31] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_20px_40px_rgba(160,129,61,0.4)] hover:-translate-y-1"
              >
                Explore our programs <ArrowRight size={20} />
              </Link>
              <Link 
                to="/membership" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1"
              >
                Become A Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Welcome to JCI India */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F5F2EA] -z-10 transform skew-x-6 translate-x-12 opacity-50"></div>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <div className="absolute -inset-4 bg-[#A0813D]/10 rounded-[3rem] transform -rotate-3 blur-2xl"></div>
               <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" alt="JCI Community" className="rounded-[2.5rem] shadow-2xl relative z-10 w-full h-[550px] object-cover" />
               <div className="absolute -bottom-10 -right-10 bg-[#00153D] p-10 rounded-[2rem] shadow-2xl z-20 hidden xl:block border-4 border-white">
                  <p className="text-[#A0813D] text-5xl font-black mb-2 leading-none">1949</p>
                  <p className="text-white text-xs font-bold uppercase tracking-[0.2em] opacity-60">Established Year</p>
               </div>
            </div>
            
            <div>
              <span className="text-[#A0813D] font-black text-[16px] uppercase tracking-[0.4em] mb-6 inline-block">Introduction</span>
              <h2 className="text-4xl lg:text-6xl font-black text-[#00153D] leading-[1.1] mb-8 tracking-tight">Welcome to <br />JCI India</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
                We are a vibrant community of young leaders aged 18-40, active across 28 zones and 28 states in India. As part of a global network spanning 115 countries, JCI India empowers passionate individuals to become capable leaders in government, business, and civil society. 
              </p>
              
              <div className="space-y-6 mb-12">
                 <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-[#A0813D]/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[#A0813D]/20 flex items-center justify-center text-[#A0813D]"><CheckCircle2 size={24} /></div>
                    <p className="font-bold text-[#00153D]">Present in 28 states and 4 union territories</p>
                 </div>
                 <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-[#A0813D]/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[#00153D]/10 flex items-center justify-center text-[#00153D]"><CheckCircle2 size={24} /></div>
                    <p className="font-bold text-[#00153D]">Divided into 28 zones across the nation</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {val:'115+', label:'Locations'},
                  {val:'200K+', label:'Members'},
                  {val:'5000+', label:'Projects'},
                  {val:'1', label:'Only One organization'}
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-2xl font-black text-[#A0813D] mb-1">{s.val}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. National President Message */}
      <section className="py-32 bg-[#00153D] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
               <div className="absolute top-10 -left-10 w-full h-full border-2 border-[#A0813D]/40 rounded-[3rem] hidden lg:block"></div>
               <img src={leaderPortrait} alt="National President" className="rounded-[3rem] w-full h-[600px] object-cover shadow-2xl relative z-10" />
               <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-10 lg:translate-x-0 bg-[#A0813D] px-8 py-4 rounded-2xl shadow-xl z-20">
                  <p className="font-black text-sm uppercase tracking-[0.2em] text-white">Local Organization President</p>
               </div>
            </div>
            
            <div className="lg:col-span-7">
              <Quote className="text-[#A0813D] w-16 h-16 mb-8 mx-auto lg:mx-0 opacity-40 shrink-0" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#A0813D] mb-6 group">Our Local Organization President</h2>
              <h3 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">JFG Bharath N Acharya</h3>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-medium mb-10 italic border-l-4 border-[#A0813D] pl-8">
                <p>"My Dear Brothers and Sisters of JCI India,"</p>
                <p>"It is a great pleasure to share my thoughts with all of you as we begin this new journey together. The year 2026 is going to be an incredible time for our organization."</p>
                <p>"As your National President, I want us to focus on making this 'The Year of Legacy Reimagined.' This is our time to upgrade our standards, change how we lead, and show the world the true power of JCI India."</p>
              </div>
              {/* <button className="text-[#A0813D] font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:gap-5 transition-all mx-auto lg:mx-0">
                Read Full Message <ArrowRight size={18} />
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Join JCI India? */}
      <section className="py-32 bg-slate-50">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-[16px] font-black text-[#A0813D] uppercase tracking-[0.4em] mb-6">Connect & Grow</h2>
            <h3 className="text-4xl lg:text-6xl font-black text-[#00153D] tracking-tight mb-8 leading-tight">Why Join us?</h3>
            <p className="text-slate-500 text-xl font-medium leading-relaxed">Unlock your potential and make a difference. JCI Madurai Central offers a multitude of benefits shared across our global network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {joinReasons.map((item, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-[#A0813D]/20 group flex flex-col items-center text-center">
                <div className="mb-10 w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center group-hover:bg-[#00153D] transition-all duration-500 transform group-hover:-rotate-12 group-hover:scale-110">
                  <div className="group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-2xl font-black text-[#00153D] mb-6">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 lg:p-20 bg-white rounded-[4rem] shadow-xl border border-slate-100 flex flex-col lg:flex-row items-center gap-16">
             <div className="flex-1">
                <h3 className="text-3xl lg:text-5xl font-black text-[#00153D] mb-8 leading-[1.2]">Be the Change You <br /> Want to See</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10">
                  JCI India is where young leaders turn challenges into opportunities. Whether you’re passionate about community service, entrepreneurship, or global peace, your journey starts here. Join us today and amplify your impact!
                </p>
                <Link to="/membership" className="inline-flex bg-[#00153D] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#A0813D] transition-colors shadow-xl">Join Us Today</Link>
             </div>
             <div className="flex-1 w-full lg:w-auto relative grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                   <div className="h-64 rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                   <div className="h-48 rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                </div>
                <div className="space-y-4">
                   <div className="h-48 rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                   <div className="h-64 rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
