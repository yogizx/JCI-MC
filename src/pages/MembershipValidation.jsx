import { Search, Building, User, Mail, HelpCircle, ShieldCheck } from 'lucide-react'

export default function MembershipValidation() {
  return (
    <div className="min-h-screen pt-20 bg-[#F8F9FA] flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-white pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}></div>
      
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 w-full flex flex-col items-center">
        <span className="bg-[#FAF3E0] text-[#8B6D31] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          Verification Portal
        </span>
        
        <h1 className="text-4xl lg:text-6xl font-black text-[#00153D] text-center mb-6 tracking-tight">
          Membership Validation
        </h1>
        
        <p className="text-slate-500 text-center max-w-xl mb-12 leading-relaxed">
          Verify your credentials within the JCI ecosystem. <br /> Enter your official details to proceed.
        </p>

        {/* Validation Card */}
        <div className="w-full max-w-3xl bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 lg:p-16 relative overflow-hidden">
          {/* Subtle pattern decoration */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#F8F9FA] rounded-full opacity-50" />
          
          <div className="relative z-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Select Zone</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Globe size={18} />
                  </div>
                  <select className="w-full bg-[#F8F9FA] border-none rounded-xl py-4 pl-12 pr-6 appearance-none text-slate-600 font-medium focus:ring-2 focus:ring-[#A0813D]/20 transition-all">
                    <option>Choose Zone</option>
                    <option>Zone XVIII</option>
                    <option>Zone XIX</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">LO Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Building size={18} />
                  </div>
                  <select className="w-full bg-[#F8F9FA] border-none rounded-xl py-4 pl-12 pr-6 appearance-none text-slate-600 font-medium focus:ring-2 focus:ring-[#A0813D]/20 transition-all">
                    <option>Select Organization</option>
                    <option>JCI Madurai Central</option>
                    <option>JCI Madurai City</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Member Identification Number</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="e.g., JCI-MC-XXXXX" 
                  className="w-full bg-[#F8F9FA] border-none rounded-xl py-4 pl-12 pr-6 text-slate-600 font-medium focus:ring-2 focus:ring-[#A0813D]/20 transition-all"
                />
              </div>
            </div>
            
            <button className="w-full bg-[#8B6D31] hover:bg-[#725928] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-[#8B6D31]/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
              Validate Membership <ShieldCheck size={20} />
            </button>
          </div>
        </div>
        
        {/* Support Links */}
        <div className="mt-16 flex flex-wrap justify-center gap-12">
          <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-[#A0813D] transition-colors group">
            <HelpCircle size={18} className="text-[#A0813D] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Need assistance?</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-[#A0813D] transition-colors group">
            <Mail size={18} className="text-[#A0813D] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Contact Admin</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-[#A0813D] transition-colors group">
            <Search size={18} className="text-[#A0813D] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Membership FAQ</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// Missing icons from lucide
import { ChevronDown, Globe } from 'lucide-react'
