import React, { useState } from 'react';
import {
  Camera, Phone, Mail, MapPin, Edit3, Trash2, Plus, Download, Heart,
  Globe, Instagram, Linkedin, MessageSquare, UserPlus, Award, BookOpen,
  Shield, FileText, Briefcase, Building2, CheckCircle,
  MoreHorizontal, QrCode, CreditCard, Pencil, Facebook, Twitter, Youtube, X, Image as ImageIcon, MapPin as MapIcon
} from 'lucide-react';

// --- Reusable Sub-components ---
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ title, actionIcon: Icon, actionText, onAction }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">{title}</h3>
    {actionText ? (
      <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:opacity-70 transition-all">
        <Plus size={13}/> {actionText}
      </button>
    ) : (
      Icon && <Icon size={16} className="text-slate-400 hover:text-blue-500 cursor-pointer transition-colors" />
    )}
  </div>
);

export default function Profile() {
  const [children, setChildren] = useState([
    { name: 'Arjun Rajesh', dob: '12 Jan 2015', bloodGroup: 'B+' },
    { name: 'Meera Rajesh', dob: '05 Mar 2018', bloodGroup: 'O+' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', dob: '', bloodGroup: '' });

  const addChild = () => {
    if (children.length < 3) {
      setShowModal(true);
    } else {
      alert("Maximum 3 children are allowed.");
    }
  };

  const saveChild = (e) => {
    e.preventDefault();
    if (children.length < 3) {
      setChildren([...children, { ...formData, contact: '-' }]);
      setShowModal(false);
      setFormData({ name: '', dob: '', bloodGroup: '' });
    }
  };

  return (
    <div className="w-full max-w-full pb-10 overflow-x-hidden">
        
        {/* TOP: Profile Hero */}
        <Card className="mb-4">
          <div className="flex flex-col gap-6">
            {/* Avatar + Name Row */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-man-short-hair-dark-skin_113065-517.jpg"
                    alt="Rajesh Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                  <Camera size={14} />
                </button>
              </div>

              {/* Name + Info + Buttons */}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-slate-800">Rajesh Kumar</h1>
                  <CheckCircle size={20} className="text-emerald-500" fill="currentColor" />
                </div>
                <p className="text-sm text-slate-400 mb-3 font-medium">JCI Member ID: <span className="text-blue-600 font-bold">#4492-MD</span></p>
                
                <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-start gap-x-6 gap-y-2 text-sm text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-blue-500" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-blue-500" />
                    <span className="break-all">rajesh.kumar@example.com</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">Edit Profile</button>
                  <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95">Change Password</button>
                  <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95">
                    <CheckCircle size={14} /> Member Certificate
                  </button>
                </div>
              </div>
            </div>

            {/* Stats + QR row */}
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-between border-t border-slate-100 pt-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-6 flex-1 w-full">
                <StatItem label="Date of Birth" val="15 May 1988" />
                <StatItem label="Gender" val="Male" />
                <StatItem label="Marital Status" val="Married" />
                <StatItem label="Anniversary" val="22 Nov 2014" />
                <div className="col-span-2 md:col-span-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Blood Group</p>
                  <p className="text-sm font-bold text-red-500 flex items-center gap-1.5">
                    <Heart size={14} fill="currentColor" /> O Positive
                  </p>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="shrink-0 flex flex-col items-center gap-3 bg-slate-50 p-4 rounded-3xl border border-slate-100 w-full sm:w-auto">
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100">
                  <QrCode size={80} className="text-slate-900" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Digital Pass</p>
                  <p className="text-[9px] text-slate-300 font-bold">SCAN TO VERIFY</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Grid: Communication, ID, Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <Card>
            <SectionHeader title="Communication" actionIcon={MoreHorizontal} />
            <div className="space-y-3">
              <CommItem icon={<Phone size={14} className="text-blue-500" />} val="+91 98765 43210" badge="Primary" />
              <CommItem icon={<MessageSquare size={14} className="text-emerald-500" />} val="+91 98765 43210" badge="WhatsApp" />
              <CommItem icon={<Mail size={14} className="text-red-400" />} val="rajesh@corp.in" />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Government ID" />
            <div className="bg-slate-900 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Shield size={64} className="text-white" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-3">Aadhaar Card (India)</p>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-xl font-black text-white tracking-[0.3em] font-mono shrink-0">XXXX XXXX 8812</p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-2 w-fit border border-emerald-500/20">
                  <CheckCircle size={12} /> VERIFIED IDENTITY
                </div>
              </div>
            </div>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1">
            <SectionHeader title="Residential Address" actionIcon={Pencil} />
            <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  42, Temple View Apartment, Meenakshi Amman Temple St, Madurai, Tamil Nadu - 625001
                </p>
                <div className="mt-3 inline-block bg-white px-3 py-1 rounded-full border border-slate-200 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Owned Residence
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Business Overview Section */}
        <Card className="mb-4">
          <SectionHeader title="Business Overview" actionIcon={Edit3} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatItem label="Business Name" val="Skyline Design Studio" />
            <StatItem label="Business Role" val="Managing Director" />
            <StatItem label="Contact Number" val="+91 98765 12345" />
            <StatItem label="Email ID" val="contact@skylinedesign.in" />
            <div className="sm:col-span-2">
              <StatItem label="Business Address" val="78, Business Park Road, Anna Nagar, Madurai - 625020" />
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Location</p>
              <button className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 w-fit px-3 py-1.5 rounded-lg border border-blue-100">
                <MapIcon size={13} /> View Maps
              </button>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-2">Visiting Card</p>
              <div className="w-full h-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[10px] font-black cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all uppercase tracking-widest">
                <CreditCard size={14} className="mr-2" /> View Digital Card
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-4">Portfolio Gallery</p>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-40 sm:w-48 h-32 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shrink-0 group relative shadow-sm">
                  <img 
                    src={`https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="Business Portfolio"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ImageIcon size={20} className="text-white" />
                  </div>
                </div>
              ))}
              <button className="w-32 h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-600 transition-all shrink-0">
                <Plus size={20} />
                <span className="text-[10px] font-black mt-2 uppercase tracking-widest">Add Image</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Professional & Training Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card>
            <SectionHeader title="Professional Profile" actionText="Add Achievement" />
            <div className="space-y-4">
              <ProfRow icon="💼" title="Principal Architect" sub="Skyline Design Studio • Since 2015" />
              <ProfRow icon="🏢" title="Real Estate Consultant" sub="Freelance Portfolio • Zonal Member" />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Training Career" actionText="Add Certification" />
            <div className="space-y-4">
              <ProfRow icon="🎓" title="Effective Leadership (Level 2)" sub="JCI India Academy • Jan 2022" edit />
              <ProfRow icon="🌐" title="Public Speaking Masterclass" sub="Zonal Training Center • Aug 2021" edit />
            </div>
          </Card>
        </div>

        {/* Documents | Membership | Social */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <Card className="flex flex-col">
            <SectionHeader title="Vault" />
            <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center mb-4 border border-slate-100 flex-1">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                <FileText size={32} className="text-blue-500" />
              </div>
              <p className="text-xs font-bold text-slate-700 mb-1">Government_ID_v1.pdf</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Added 12 Mar 2024</p>
            </div>
            <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all border-dashed">
              + UPLOAD DOCUMENT
            </button>
          </Card>

          <Card>
            <SectionHeader title="Membership Statistics" />
            <div className="grid grid-cols-2 gap-3">
              <MiniBadge icon={<CreditCard size={16}/>} label="EXPIRY" val="Dec 2024" bg="bg-blue-50" text="text-blue-600" />
              <MiniBadge icon={<Award size={16}/>} label="ROLE" val="Secretary" bg="bg-orange-50" text="text-orange-600" />
              <MiniBadge icon={<BookOpen size={16}/>} label="EDU" val="B.Arch" bg="bg-emerald-50" text="text-emerald-700" />
              <MiniBadge icon={<Shield size={16}/>} label="VISIBILITY" val="Public" bg="bg-slate-900" text="text-slate-100" />
            </div>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <SectionHeader title="Connect with Me" />
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-6">
              <SocialCircle icon={<Globe size={18}/>} color="text-slate-500" />
              <SocialCircle icon={<Linkedin size={18}/>} color="text-blue-600" />
              <SocialCircle icon={<Instagram size={18}/>} color="text-pink-600" />
              <SocialCircle icon={<Facebook size={18}/>} color="text-blue-800" />
              <SocialCircle icon={<Twitter size={18}/>} color="text-sky-500" />
              <SocialCircle icon={<Youtube size={18}/>} color="text-red-600" />
            </div>
            <button className="w-full py-3 bg-blue-600 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
              <Edit3 size={14} /> Update Social Hub
            </button>
          </Card>
        </div>

        {/* Family Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <SectionHeader title="Family Registry" actionIcon={UserPlus} />
            <div className="w-full overflow-x-auto pb-2 no-scrollbar">
              <table className="w-full min-w-[550px] text-left border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="px-4 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Relation</th>
                    <th className="px-4 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Name</th>
                    <th className="px-4 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact/DOB</th>
                    <th className="px-4 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Blood</th>
                    <th className="px-4 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <FamilyRow relation="SPOUSE" name="Priya Rajesh" contact="+91 98765 99901" bloodGroup="A+" />
                  {children.map((child, idx) => (
                    <FamilyRow key={idx} relation={`CHILD ${idx + 1}`} name={child.name} contact={child.dob || '-'} bloodGroup={child.bloodGroup} />
                  ))}
                </tbody>
              </table>
            </div>
            {children.length < 3 && (
              <button
                onClick={addChild}
                className="mt-4 flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-all w-fit"
              >
                <Plus size={14} /> ADD CHILD
              </button>
            )}
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="bg-gradient-to-br from-red-50 to-white border-red-100 flex-1">
              <SectionHeader title="Blood Donation Log" actionIcon={Plus} />
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-red-500 shrink-0 border border-red-50">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800">LAST DONATED</p>
                  <p className="text-xs text-slate-500 font-medium">12 Aug 2023 • Apollo Hospitals</p>
                  <p className="text-[9px] text-red-500 font-black mt-1 uppercase tracking-widest">Thank you for saving lives!</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900 text-white flex-1">
              <SectionHeader title="Foundations" />
              <div className="space-y-4">
                <DLItem label="INDIA FOUNDATION" sub="Active Patron Member" active />
                <DLItem label="PHILANTHROPY" sub="School Support Drive" />
              </div>
            </Card>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Add Child Details</h3>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Member Family Services</p>
                </div>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all active:scale-95">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={saveChild} className="p-8 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2.5 ml-1">Child's Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter full legal name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2.5 ml-1">DOB</label>
                    <input 
                      required
                      type="date" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2.5 ml-1">Blood Group</label>
                    <select 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                    >
                      <option value="">Select Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                  >
                    Confirm Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

    </div>
  );
}

// --- Internal Utilities (Updated for responsiveness) ---
const StatItem = ({ label, val }) => (
  <div className="group">
    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1 group-hover:text-blue-500 transition-colors">{label}</p>
    <p className="text-sm font-bold text-slate-700">{val}</p>
  </div>
);

const CommItem = ({ icon, val, badge }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:translate-x-1 transition-transform">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">{icon}</div>
      <span className="text-sm text-slate-700 font-medium">{val}</span>
    </div>
    {badge && <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest scale-90">{badge}</span>}
  </div>
);

const ProfRow = ({ icon, title, sub, edit }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 bg-white hover:bg-slate-50 px-2 -mx-2 rounded-xl transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-xl">{icon}</div>
      <div>
        <p className="text-sm font-black text-slate-800 leading-tight">{title}</p>
        <p className="text-xs text-slate-400 font-medium mt-1">{sub}</p>
      </div>
    </div>
    {edit
      ? <div className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><Pencil size={14} /></div>
      : <div className="p-2 bg-red-50 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all cursor-pointer"><Trash2 size={14} /></div>
    }
  </div>
);

const MiniBadge = ({ icon, bg, text, label, val }) => (
  <div className={`${bg} p-4 rounded-2xl flex flex-col items-center text-center gap-3 border border-white shadow-sm hover:shadow-md transition-shadow group`}>
    <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${text} shadow-sm group-hover:scale-110 transition-transform`}>{icon}</div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
      <p className={`text-[11px] font-black ${text === 'text-slate-100' ? 'text-white' : 'text-slate-700'} leading-tight`}>{val}</p>
    </div>
  </div>
);

const SocialCircle = ({ icon, color = 'text-blue-500' }) => (
  <div className={`w-11 h-11 rounded-2xl bg-white border border-slate-100 ${color} flex items-center justify-center hover:bg-slate-900 hover:text-white hover:-translate-y-1 transition-all cursor-pointer shadow-sm`}>
    {icon}
  </div>
);

const FamilyRow = ({ relation, name, contact, bloodGroup }) => (
  <tr className="bg-white hover:bg-slate-50 transition-colors group">
    <td className="py-4 px-4 rounded-l-2xl border-y border-l border-slate-50">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{relation}</span>
    </td>
    <td className="py-4 px-4 border-y border-slate-50">
      <p className="text-sm font-bold text-slate-800">{name}</p>
    </td>
    <td className="py-4 px-4 border-y border-slate-50">
      <p className="text-sm text-slate-500 font-medium">{contact}</p>
    </td>
    <td className="py-4 px-4 border-y border-slate-50">
      <span className="bg-red-50 text-red-500 px-3 py-1 rounded-lg text-xs font-black">{bloodGroup}</span>
    </td>
    <td className="py-4 px-4 rounded-r-2xl border-y border-r border-slate-50 text-right">
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Pencil size={12} /></button>
        <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={12} /></button>
      </div>
    </td>
  </tr>
);

const DLItem = ({ label, sub, active }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/10 last:border-0 hover:bg-white/5 px-2 -mx-2 rounded-xl transition-all group">
    <div>
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${active ? 'text-blue-400' : 'text-emerald-400'}`}>{label}</p>
      <p className="text-xs text-slate-400 font-medium mt-0.5">{sub}</p>
    </div>
    <div className="p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-white transition-colors cursor-pointer">
      <Download size={16} />
    </div>
  </div>
);
