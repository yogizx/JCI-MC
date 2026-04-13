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
    <div className="w-full max-w-full overflow-x-hidden">
        
        {/* TOP: Profile Hero */}
        <Card className="mb-4">
          <div className="flex flex-col gap-6">
            {/* Avatar + Name Row */}
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-man-short-hair-dark-skin_113065-517.jpg"
                    alt="Rajesh Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full shadow border border-slate-200 flex items-center justify-center text-slate-400">
                  <Camera size={13} />
                </button>
              </div>

              {/* Name + Info + Buttons */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-slate-800">Rajesh Kumar</h1>
                  <CheckCircle size={18} className="text-emerald-500" fill="currentColor" />
                </div>
                <p className="text-sm text-slate-400 mb-1">JCI Member ID: <span className="text-blue-600 font-semibold">#4492-MD</span></p>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <Phone size={13} /><span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Mail size={13} /><span>rajesh.kumar@example.com</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-semibold">Edit Profile</button>
                  <button className="border border-slate-200 text-slate-600 px-5 py-2 rounded-lg text-xs font-semibold">Change Password</button>
                  <button className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1">
                    <CheckCircle size={13} /> Member Certificate
                  </button>
                </div>
              </div>
            </div>

            {/* Stats + QR row — wraps on mobile */}
            <div className="flex flex-col sm:flex-row gap-6 sm:items-start sm:justify-between border-t border-slate-100 pt-5">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 flex-1">
                <StatItem label="Date of Birth" val="15 May 1988" />
                <StatItem label="Gender" val="Male" />
                <StatItem label="Marital Status" val="Married" />
                <StatItem label="Anniversary" val="22 Nov 2014" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Blood Group</p>
                  <p className="text-sm font-semibold text-red-500">O Positive</p>
                </div>
              </div>

              {/* QR */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="bg-slate-900 rounded-xl p-3">
                  <QrCode size={72} className="text-white" />
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider text-center">Digital Member Pass</p>
              </div>
            </div>
          </div>
        </Card>

        {/* ROW 1: Communication | Govt ID | Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <Card>
            <SectionHeader title="Communication" actionIcon={MoreHorizontal} />
            <div className="space-y-2">
              <CommItem icon={<Phone size={14} className="text-blue-500" />} val="+91 98765 43210" badge="Primary" />
              <CommItem icon={<MessageSquare size={14} className="text-emerald-500" />} val="+91 98765 43210" />
              <CommItem icon={<Mail size={14} className="text-red-400" />} val="rajesh@corp.in" />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Government ID" />
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Aadhaar Card</p>
              <p className="text-lg font-bold text-slate-700 tracking-widest font-mono mb-3">XXXX  XXXX  8812</p>
              <span className="bg-emerald-700 text-white text-[10px] font-semibold px-3 py-1 rounded-md flex items-center gap-1 w-fit">
                <CheckCircle size={11} /> VERIFIED
              </span>
            </div>
          </Card>

          <Card>
            <SectionHeader title="Residential Address" actionIcon={Pencil} />
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <MapPin size={15} />
              </div>
              <div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  42, Temple View Apartment,<br />
                  Meenakshi Amman Temple St,<br />
                  Madurai, Tamil Nadu - 625001
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-2">Owned Residence</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Business Overview Section */}
        <Card className="mb-4">
          <SectionHeader title="Business Overview" actionIcon={Edit3} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatItem label="Business Name" val="Skyline Design Studio" />
            <StatItem label="Business Role" val="Managing Director" />
            <StatItem label="Contact Number" val="+91 98765 12345" />
            <StatItem label="Email ID" val="contact@skylinedesign.in" />
            <div className="md:col-span-2">
              <StatItem label="Address" val="78, Business Park Road, Anna Nagar, Madurai - 625020" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Location</p>
              <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
                <MapIcon size={13} /> View on Google Maps
              </button>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Visiting Card</p>
              <div className="w-full h-20 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[10px] font-semibold cursor-pointer hover:bg-slate-100 transition-colors">
                <CreditCard size={16} className="mr-2" /> View Digital Card
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Business Portfolio Images</p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-32 h-24 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shrink-0 group relative">
                  <img 
                    src={`https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200`} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    alt="Business"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon size={16} className="text-white" />
                  </div>
                </div>
              ))}
              <button className="w-32 h-24 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all">
                <Plus size={16} />
                <span className="text-[9px] font-bold mt-1 uppercase">Add Photo</span>
              </button>
            </div>
          </div>
        </Card>

        {/* ROW 2: Professional Profile | Training Career */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <SectionHeader title="Professional Profile" actionText="Add New" />
            <div className="space-y-2">
              <ProfRow icon="💼" title="Principal Architect" sub="Skyline Design Studio" />
              <ProfRow icon="🏢" title="Real Estate Consultant" sub="Freelance Portfolio" />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Training Career" actionText="Add New" />
            <div className="space-y-2">
              <ProfRow icon="🎓" title="Effective Leadership (Level 2)" sub="JCI India Academy • 2022" edit />
              <ProfRow icon="🌐" title="Public Speaking Masterclass" sub="Zonal Training Center • 2021" edit />
            </div>
          </Card>
        </div>

        {/* ROW 3: Documents | Membership | Social */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <Card>
            <SectionHeader title="Documents Locker" />
            <div className="bg-slate-900 rounded-xl h-28 flex items-center justify-center mb-3">
              <FileText size={36} className="text-white/20" />
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500">Aadhaar_Main_v1.pdf</p>
              <Trash2 size={14} className="text-red-400 cursor-pointer" />
            </div>
            <button className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-xs text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all">
              + Upload New Document
            </button>
          </Card>

          <Card>
            <SectionHeader title="Membership Center" />
            <div className="grid grid-cols-2 gap-2">
              <MiniBadge icon={<CreditCard size={16}/>} label="Subscription" val="Expires Dec 2024" bg="bg-blue-50" text="text-blue-500" />
              <MiniBadge icon={<Award size={16}/>} label="Designation" val="Secretary" bg="bg-orange-50" text="text-orange-500" />
              <MiniBadge icon={<BookOpen size={16}/>} label="Education" val="B.Arch, M.Planning" bg="bg-emerald-50" text="text-emerald-600" />
              <MiniBadge icon={<Shield size={16}/>} label="Privacy" val="Manage Settings" bg="bg-slate-50" text="text-slate-500" />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Social Presence" />
            <div className="flex flex-wrap gap-3 mb-4">
              <SocialCircle icon={<Globe size={16}/>} color="text-slate-500" />
              <SocialCircle icon={<Linkedin size={16}/>} color="text-blue-600" />
              <SocialCircle icon={<Instagram size={16}/>} color="text-pink-500" />
              <SocialCircle icon={<Facebook size={16}/>} color="text-blue-700" />
              <SocialCircle icon={<Twitter size={16}/>} color="text-sky-500" />
              <SocialCircle icon={<Youtube size={16}/>} color="text-red-600" />
              <SocialCircle icon={<div className="font-bold text-[10px]">P</div>} color="text-red-700" />
            </div>
            <button className="w-full py-2.5 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold flex items-center justify-center gap-1 mb-4">
              <Pencil size={12} /> Edit Links
            </button>
            <p className="text-[10px] text-slate-400 text-center">Synced with JCI Global Directory</p>
          </Card>
        </div>

        {/* ROW 4: Family | Blood + Foundation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <SectionHeader title="Family Members" actionIcon={UserPlus} />
            {/* Scrollable on mobile */}
            <div className="w-full overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[420px] text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Relation</th>
                    <th className="pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                    <th className="pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Contact</th>
                    <th className="pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Blood</th>
                    <th className="pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <FamilyRow relation="Spouse" name="Priya Rajesh" contact="+91 98765 99901" bloodGroup="A Positive" />
                  {children.map((child, idx) => (
                    <FamilyRow key={idx} relation={`Child ${idx + 1}`} name={child.name} contact={child.dob || '-'} bloodGroup={child.bloodGroup} />
                  ))}
                </tbody>
              </table>
            </div>
            {children.length < 3 && (
              <button
                onClick={addChild}
                className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:opacity-70 transition-all"
              >
                <Plus size={13} /> Add Child
              </button>
            )}
          </Card>

          <div className="space-y-4">
            <Card>
              <SectionHeader title="Blood Donation" actionIcon={Plus} />
              <div className="bg-red-50 rounded-xl p-3 flex items-center gap-3 border border-red-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shrink-0">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Last Donated</p>
                  <p className="text-xs text-slate-500">12 Aug 2023 • Apollo Madurai</p>
                </div>
              </div>
            </Card>

            <Card>
              <SectionHeader title="Foundation Contribution" />
              <div className="space-y-2">
                <DLItem label="JCI INDIA FOUNDATION" sub="Patron Member Contribution" />
                <DLItem label="PHILANTHROPY WING" sub="School Rebuilding Fund" active />
              </div>
            </Card>
          </div>
        </div>

        {/* Add Child Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Add New Child</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={saveChild} className="p-6 space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter child's name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Date of Birth</label>
                    <input 
                      required
                      type="date" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Blood Group</label>
                    <select 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                  >
                    Save Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

    </div>
  );
}

// --- Internal Utilities ---
const StatItem = ({ label, val }) => (
  <div>
    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-slate-700">{val}</p>
  </div>
);

const CommItem = ({ icon, val, badge }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">{icon}</div>
      <span className="text-sm text-slate-700">{val}</span>
    </div>
    {badge && <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">{badge}</span>}
  </div>
);

const ProfRow = ({ icon, title, sub, edit }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-slate-700 leading-tight">{title}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    </div>
    {edit
      ? <Pencil size={14} className="text-slate-300 hover:text-blue-500 cursor-pointer" />
      : <Trash2 size={14} className="text-slate-300 hover:text-red-500 cursor-pointer" />
    }
  </div>
);

const MiniBadge = ({ icon, bg, text, label, val }) => (
  <div className={`${bg} p-3 rounded-xl flex flex-col items-center text-center gap-2 border border-white`}>
    <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center ${text} shadow-sm`}>{icon}</div>
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-[11px] font-semibold text-slate-600 leading-tight">{val}</p>
    </div>
  </div>
);

const SocialCircle = ({ icon, color = 'text-blue-500' }) => (
  <div className={`w-10 h-10 rounded-full bg-slate-50 border border-slate-200 ${color} flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer`}>
    {icon}
  </div>
);

const FamilyRow = ({ relation, name, contact, bloodGroup }) => (
  <tr className="border-b border-slate-50 last:border-0">
    <td className="py-2.5 text-xs font-semibold text-slate-500 pr-4">{relation}</td>
    <td className="py-2.5 text-sm text-slate-700 pr-4">{name}</td>
    <td className="py-2.5 text-sm text-slate-500 pr-4">{contact}</td>
    <td className="py-2.5 text-xs font-medium text-red-600 pr-4">{bloodGroup}</td>
    <td className="py-2.5 text-right">
      <div className="flex justify-end gap-3 text-slate-300">
        <Pencil size={13} className="hover:text-blue-500 cursor-pointer transition-colors" />
        <Trash2 size={13} className="hover:text-red-500 cursor-pointer transition-colors" />
      </div>
    </td>
  </tr>
);

const DLItem = ({ label, sub, active }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
    <div>
      <p className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-blue-600' : 'text-emerald-600'}`}>{label}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
    <Download size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" />
  </div>
);
