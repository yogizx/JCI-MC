import React, { useEffect } from 'react'
import { Check, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import henryImg from '../assets/Henry Giessenbier.jpg'

export default function JCICreed() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const creedLines = [
    "That faith in God gives meaning and purpose to human life",
    "That the brotherhood of man transcends the sovereignty of nations",
    "That economic justice can best be won by free men through free enterprise",
    "That government should be of laws rather than of men",
    "That earth's great treasure lies in human personality",
    "And that service to humanity is the best work of life"
  ]

  return (
    <div className="pt-32 pb-24 font-jakarta bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Founder Portrait */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm aspect-[3/4] overflow-hidden shadow-sm mb-6">
              <img 
                src={henryImg} 
                alt="Henry Giessenbier" 
                className="w-full h-full object-cover grayscale-[0.2]"
              />
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-[#00153D] tracking-tight mb-2">Henry Giessenbier</h2>
              <p className="text-[#00153D] font-bold text-base mb-1 tracking-wide">Founder</p>
              <p className="text-slate-500 text-md font-medium">Junior Chamber International</p>
            </div>
          </div>

          {/* Right Column: Creed Content */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold text-[#00153D] mb-12 tracking-tight">JCI Creed</h1>
              
              <div className="relative mb-14">
                <p className="text-2xl font-bold text-[#2563EB] pb-4 px-1 inline-block">We believe</p>
                <div className="absolute bottom-0 left-0 w-24 h-[3px] bg-[#2563EB]"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-100 -z-10"></div>
              </div>

              <div className="space-y-8">
                {creedLines.map((line, i) => (
                  <div key={i} className="flex items-start gap-5 animate-in fade-in slide-in-from-left duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="mt-1 w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                      <Check size={14} className="text-white stroke-[4px]" />
                    </div>
                    <p className="text-lg md:text-xl font-bold text-[#1e293b] leading-snug">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="flex justify-start lg:justify-end pt-8">
               <Link 
                to="/membership" 
                className="bg-[#FBC764] hover:bg-[#F9BC45] text-[#00153D] px-8 py-5 rounded-full font-bold text-lg flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95"
               >
                 <div className="w-10 h-10 rounded-full bg-[#00153D]/10 flex items-center justify-center">
                    <UserPlus size={20} className="text-[#00153D]" />
                 </div>
                 Become A Member
               </Link>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  )
}
