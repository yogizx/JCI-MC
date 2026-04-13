import { useState } from 'react'
import { Download, Search, FileText, BookOpen, Video, File, ExternalLink, Star, ChevronRight } from 'lucide-react'

const RESOURCES = [
  {
    id: 1,
    title: 'JCI India Constitution & Bylaws 2024',
    category: 'Governance',
    type: 'PDF',
    icon: <FileText size={18} />,
    iconBg: 'bg-red-50 text-red-500',
    desc: 'Official JCI India constitution, code of ethics, and organizational bylaws. Essential reading for all members.',
    size: '2.4 MB',
    downloads: 312,
    starred: true,
    url: '#',
  },
  {
    id: 2,
    title: 'NALANDA Program Guide 2024',
    category: 'Training',
    type: 'PDF',
    icon: <BookOpen size={18} />,
    iconBg: 'bg-blue-50 text-blue-600',
    desc: 'Complete guide to the NALANDA leadership development program — modules, schedule, assessment criteria.',
    size: '5.1 MB',
    downloads: 187,
    starred: false,
    url: '#',
  },
  {
    id: 3,
    title: 'Membership Application Form',
    category: 'Membership',
    type: 'PDF',
    icon: <File size={18} />,
    iconBg: 'bg-amber-50 text-amber-600',
    desc: 'Official membership application form for JCI Madurai Central. Fill, sign, and submit to the office.',
    size: '340 KB',
    downloads: 524,
    starred: false,
    url: '#',
  },
  {
    id: 4,
    title: 'Public Speaking Mastery — Video Series',
    category: 'Training',
    type: 'Video',
    icon: <Video size={18} />,
    iconBg: 'bg-purple-50 text-purple-600',
    desc: '12-part video series by JCI trainers covering speaking techniques, stage presence, and persuasion skills.',
    size: '—',
    downloads: 93,
    starred: true,
    url: '#',
  },
  {
    id: 5,
    title: 'JCI Annual Report 2023',
    category: 'Reports',
    type: 'PDF',
    icon: <FileText size={18} />,
    iconBg: 'bg-emerald-50 text-emerald-600',
    desc: "Highlights of JCI Madurai Central's 2023 activities — events conducted, projects completed, member growth.",
    size: '8.2 MB',
    downloads: 145,
    starred: false,
    url: '#',
  },
  {
    id: 6,
    title: 'Project Planning Template',
    category: 'Tools',
    type: 'DOCX',
    icon: <File size={18} />,
    iconBg: 'bg-teal-50 text-teal-600',
    desc: 'Standard JCI project planning template with SDG mapping, timeline, budget sheet, and impact metrics.',
    size: '180 KB',
    downloads: 267,
    starred: false,
    url: '#',
  },
  {
    id: 7,
    title: 'ABLE Entrepreneur Program Brochure',
    category: 'Training',
    type: 'PDF',
    icon: <BookOpen size={18} />,
    iconBg: 'bg-orange-50 text-orange-600',
    desc: 'Overview of the ABLE (A Better Leader Experience) program — eligibility, modules, and how to enroll.',
    size: '1.8 MB',
    downloads: 201,
    starred: true,
    url: '#',
  },
  {
    id: 8,
    title: 'JCI India Leadership Handbook',
    category: 'Governance',
    type: 'PDF',
    icon: <BookOpen size={18} />,
    iconBg: 'bg-indigo-50 text-indigo-600',
    desc: 'Comprehensive guide for chapter presidents and board members — roles, responsibilities, and best practices.',
    size: '6.7 MB',
    downloads: 128,
    starred: false,
    url: '#',
  },
]

const CATEGORIES = ['All', 'Governance', 'Training', 'Membership', 'Reports', 'Tools']
const TYPES = ['All', 'PDF', 'Video', 'DOCX']

export default function Resources() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [resources, setResources] = useState(RESOURCES)

  const filtered = resources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || r.category === category
    const matchType = typeFilter === 'All' || r.type === typeFilter
    return matchSearch && matchCat && matchType
  })

  const toggleStar = (id) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, starred: !r.starred } : r))
  }

  const starred = resources.filter(r => r.starred)

  return (
    <div className="max-w-[1200px] mx-auto pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#00153D] mb-2 tracking-tight">Resources Library</h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Official JCI documents, training materials, templates, and guides — all in one place.
          </p>
        </div>
        <div className="bg-[#F5F2EA] px-5 py-2.5 rounded-xl text-center">
          <p className="text-[10px] font-black text-[#A0813D] uppercase tracking-widest mb-0.5">Total Resources</p>
          <p className="text-xl font-black text-[#00153D]">{resources.length}</p>
        </div>
      </div>

      {/* Starred Resources */}
      {starred.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-black text-[#00153D] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Star size={14} className="text-[#A0813D] fill-[#A0813D]" /> Starred Resources
          </h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {starred.map(r => (
              <div key={r.id} className="bg-white border border-[#A0813D]/20 rounded-2xl p-5 min-w-[220px] max-w-[240px] shrink-0 flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${r.iconBg}`}>{r.icon}</div>
                <p className="text-sm font-bold text-[#00153D] leading-tight line-clamp-2">{r.title}</p>
                <p className="text-[11px] text-slate-400 font-medium">{r.type} · {r.size !== '—' ? r.size : 'Online'}</p>
                <a href={r.url} className="flex items-center gap-1 text-[11px] font-bold text-[#A0813D] hover:text-[#8B6D31] mt-1">
                  <Download size={12} /> Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3 flex items-center gap-3">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#A0813D] transition-colors shadow-sm cursor-pointer"
        >
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#A0813D] transition-colors shadow-sm cursor-pointer"
        >
          {TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Resource Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <p className="text-lg font-bold text-[#00153D] mb-2">No resources found</p>
          <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(r => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-[#A0813D]/20 transition-all flex gap-4"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${r.iconBg}`}>
                {r.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-bold text-[#00153D] leading-tight">{r.title}</h3>
                  <button
                    onClick={() => toggleStar(r.id)}
                    className={`shrink-0 mt-0.5 transition-colors ${r.starred ? 'text-[#A0813D]' : 'text-slate-300 hover:text-[#A0813D]'}`}
                  >
                    <Star size={15} className={r.starred ? 'fill-[#A0813D]' : ''} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{r.type}</span>
                  <span className="text-[10px] font-bold bg-[#F5F2EA] text-[#A0813D] px-2 py-0.5 rounded">{r.category}</span>
                  {r.size !== '—' && <span className="text-[10px] text-slate-400 font-medium">{r.size}</span>}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{r.desc}</p>
                <div className="flex items-center gap-4">
                  <a
                    href={r.url}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#00153D] hover:text-[#A0813D] transition-colors"
                  >
                    {r.type === 'Video' ? (
                      <><ExternalLink size={12} /> Watch Now</>
                    ) : (
                      <><Download size={12} /> Download</>
                    )}
                  </a>
                  <span className="text-[11px] text-slate-400">{r.downloads} downloads</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div className="mt-8 bg-[#F5F2EA] rounded-2xl p-6 flex items-start gap-3">
        <BookOpen size={18} className="text-[#A0813D] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-[#00153D] mb-1">Need a document not listed here?</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Contact the JCI Madurai Central office at <span className="font-bold text-[#A0813D]">info@jcimaduraicentral.org</span> or
            request resources through the <span className="font-bold text-[#00153D]">Support</span> link in the sidebar.
          </p>
        </div>
      </div>
    </div>
  )
}
