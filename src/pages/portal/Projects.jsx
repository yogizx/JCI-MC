import { useState } from 'react'
import { MapPin, Users, Calendar, ChevronRight, Target, Leaf, Heart, BookOpen, Globe, Plus, CheckCircle2 } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    title: 'Clean City Madurai',
    category: 'Community',
    sdg: 'SDG 11 — Sustainable Cities',
    icon: <Leaf size={20} />,
    iconBg: 'bg-emerald-50 text-emerald-600',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
    desc: 'Weekend cleanliness drive across Madurai city zones. Members volunteer to clean public spaces, plant trees, and spread awareness.',
    status: 'ACTIVE',
    statusCol: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    members: 24,
    location: 'Madurai City Zones',
    nextDate: 'Oct 20, 2024',
    joined: true,
  },
  {
    id: 2,
    title: 'NALANDA Learning Circles',
    category: 'Education',
    sdg: 'SDG 4 — Quality Education',
    icon: <BookOpen size={20} />,
    iconBg: 'bg-blue-50 text-blue-600',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop',
    desc: 'Free skill development sessions for underprivileged youth aged 14–25. Topics include digital literacy, communication, and entrepreneurship.',
    status: 'ACTIVE',
    statusCol: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    members: 18,
    location: 'JCI Training Hall',
    nextDate: 'Oct 25, 2024',
    joined: false,
  },
  {
    id: 3,
    title: 'LifeSavers Blood Drive',
    category: 'Health',
    sdg: 'SDG 3 — Good Health',
    icon: <Heart size={20} />,
    iconBg: 'bg-red-50 text-red-500',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop',
    desc: 'Quarterly blood donation camps at Government Rajaji Hospital. JCI members coordinate donor registration, refreshments, and follow-up.',
    status: 'UPCOMING',
    statusCol: 'bg-blue-50 text-blue-700 border-blue-200',
    members: 32,
    location: 'Rajaji Hospital, Madurai',
    nextDate: 'Nov 05, 2024',
    joined: false,
  },
  {
    id: 4,
    title: 'Entrepreneur Incubator 2024',
    category: 'Business',
    sdg: 'SDG 8 — Decent Work',
    icon: <Target size={20} />,
    iconBg: 'bg-amber-50 text-amber-600',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop',
    desc: 'Mentoring program for early-stage startups run by JCI members. 10 startups selected for a 3-month mentorship with industry leaders.',
    status: 'ACTIVE',
    statusCol: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    members: 12,
    location: 'JCI HQ + Online',
    nextDate: 'Every Saturday',
    joined: true,
  },
  {
    id: 5,
    title: 'Global Peace Day Rally',
    category: 'Internationalism',
    sdg: 'SDG 16 — Peace & Justice',
    icon: <Globe size={20} />,
    iconBg: 'bg-purple-50 text-purple-600',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop',
    desc: 'Annual peace rally and cultural exchange event involving JCI chapters from 5 cities. Celebrating unity and international cooperation.',
    status: 'PLANNING',
    statusCol: 'bg-amber-50 text-amber-700 border-amber-200',
    members: 45,
    location: 'Gandhi Museum, Madurai',
    nextDate: 'Dec 01, 2024',
    joined: false,
  },
  {
    id: 6,
    title: 'Rural Digital Literacy Drive',
    category: 'Community',
    sdg: 'SDG 10 — Reduced Inequalities',
    icon: <Users size={20} />,
    iconBg: 'bg-teal-50 text-teal-600',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop',
    desc: 'Teaching basic smartphone and internet skills to rural communities in villages around Madurai district. Partner NGOs provide infrastructure.',
    status: 'COMPLETED',
    statusCol: 'bg-slate-100 text-slate-600 border-slate-200',
    members: 20,
    location: 'Madurai District Villages',
    nextDate: 'Completed Sep 2024',
    joined: false,
  },
]

const CATEGORIES = ['All', 'Community', 'Education', 'Health', 'Business', 'Internationalism']

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [projects, setProjects] = useState(PROJECTS)

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const joinedCount = projects.filter(p => p.joined).length

  const toggleJoin = (id) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== id) return p
      if (p.status === 'COMPLETED') return p
      return { ...p, joined: !p.joined, members: p.joined ? p.members - 1 : p.members + 1 }
    }))
  }

  return (
    <div className="max-w-[1200px] mx-auto pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#00153D] mb-2 tracking-tight">Impact Projects</h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Browse and join community-driven projects aligned with the UN Sustainable Development Goals.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#F5F2EA] px-5 py-2.5 rounded-xl text-center">
            <p className="text-[10px] font-black text-[#A0813D] uppercase tracking-widest mb-0.5">Joined</p>
            <p className="text-xl font-black text-[#00153D]">{joinedCount}</p>
          </div>
          <div className="bg-[#F5F2EA] px-5 py-2.5 rounded-xl text-center">
            <p className="text-[10px] font-black text-[#A0813D] uppercase tracking-widest mb-0.5">Total</p>
            <p className="text-xl font-black text-[#00153D]">{projects.length}</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-[#00153D] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#A0813D]/40 hover:text-[#A0813D]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {filtered.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className={`absolute top-4 left-4 ${project.statusCol} border px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest backdrop-blur-sm`}>
                {project.status}
              </div>
              {project.joined && (
                <div className="absolute top-4 right-4 bg-[#A0813D] text-white px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-black">
                  <CheckCircle2 size={11} /> Joined
                </div>
              )}
              <div className="absolute bottom-4 left-4">
                <span className="text-[11px] font-bold text-white/80 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  {project.sdg}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${project.iconBg}`}>
                  {project.icon}
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{project.category}</span>
              </div>

              <h3 className="text-lg font-bold text-[#00153D] mb-3 leading-tight">{project.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">{project.desc}</p>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Users size={13} className="text-[#A0813D] shrink-0" />
                  <span>{project.members} members participating</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <MapPin size={13} className="text-[#A0813D] shrink-0" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Calendar size={13} className="text-[#A0813D] shrink-0" />
                  <span>Next: {project.nextDate}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button className="flex-1 border border-slate-200 text-[#00153D] py-3 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1">
                  Details <ChevronRight size={13} />
                </button>
                <button
                  onClick={() => toggleJoin(project.id)}
                  disabled={project.status === 'COMPLETED'}
                  className={`flex-[1.5] py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 ${
                    project.status === 'COMPLETED'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : project.joined
                      ? 'bg-[#F5F2EA] text-[#A0813D] border border-[#A0813D]/30 hover:bg-red-50 hover:text-red-500 hover:border-red-200'
                      : 'bg-[#00153D] text-white hover:bg-[#A0813D]'
                  }`}
                >
                  {project.status === 'COMPLETED' ? 'Completed' : project.joined ? (
                    <><CheckCircle2 size={13} /> Joined</>
                  ) : (
                    <><Plus size={13} /> Join Project</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
