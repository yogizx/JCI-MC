import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Calendar, Clock, SlidersHorizontal, ChevronDown, Star, Filter } from 'lucide-react'

// Target event date — set to a future date for live countdown
const EVENT_DATE = new Date('2025-12-15T09:00:00')

function useCountdown(targetDate) {
  const calcTimeLeft = () => {
    const diff = targetDate - new Date()
    if (diff <= 0) return { days: '00', hours: '00', mins: '00', secs: '00' }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const secs = Math.floor((diff % (1000 * 60)) / 1000)
    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      mins: String(mins).padStart(2, '0'),
      secs: String(secs).padStart(2, '0'),
    }
  }
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft)
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])
  return timeLeft
}

const VERTICALS = ['All', 'Management', 'Training', 'Business', 'Community Development', 'Growth & Development', 'Internationalism']

const EVENTS = [
  {
    title: "Empowering Future Leaders Workshop",
    status: "ONGOING", statusCol: "bg-teal-50 text-teal-700 border-teal-200", statusDot: "bg-teal-500",
    category: "TRAINING", catCol: "bg-[#FBC764] text-[#6B4F12]",
    vertical: "Training",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop",
    date: "May 24, 2024", time: "10:00 AM - 04:00 PM", loc: "JCI Training Hall, Madurai",
    role: "GUEST OF HONOUR", name: "Dr. Sarah Michael",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    title: "Global Entrepreneur Summit 2024",
    status: "UPCOMING", statusCol: "bg-blue-50 text-blue-700 border-blue-200", statusDot: "bg-blue-500",
    category: "BUSINESS", catCol: "bg-[#00153D] text-white",
    vertical: "Business",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop",
    date: "June 12, 2024", time: "09:00 AM - 06:00 PM", loc: "Fortune Pandiyan Hotel, Madurai",
    role: "CHIEF GUEST", name: "Hon. Minister for Industry",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
  },
  {
    title: "Blood Donation Drive: LifeSavers 2024",
    status: "UPCOMING", statusCol: "bg-blue-50 text-blue-700 border-blue-200", statusDot: "bg-blue-500",
    category: "COMMUNITY", catCol: "bg-[#A0813D] text-white",
    vertical: "Community Development",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop",
    date: "June 20, 2024", time: "08:00 AM - 02:00 PM", loc: "Government Rajaji Hospital, Madurai",
    role: "COORDINATOR", name: "Jc. Dr. Anand Kumar",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    title: "Management Leadership Conclave",
    status: "UPCOMING", statusCol: "bg-blue-50 text-blue-700 border-blue-200", statusDot: "bg-blue-500",
    category: "MANAGEMENT", catCol: "bg-slate-700 text-white",
    vertical: "Management",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop",
    date: "July 05, 2024", time: "09:00 AM - 05:00 PM", loc: "Taj Gateway Hotel, Madurai",
    role: "KEYNOTE SPEAKER", name: "Jc. Meena Krishnan",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  },
  {
    title: "International Youth Exchange Program",
    status: "UPCOMING", statusCol: "bg-blue-50 text-blue-700 border-blue-200", statusDot: "bg-blue-500",
    category: "INTERNATIONAL", catCol: "bg-purple-700 text-white",
    vertical: "Internationalism",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop",
    date: "Aug 10, 2024", time: "10:00 AM - 04:00 PM", loc: "JCI Madurai HQ",
    role: "PROGRAM LEAD", name: "Jc. Ravi Shankar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    title: "NALANDA Personal Growth Workshop",
    status: "COMPLETED", statusCol: "bg-slate-100 text-slate-600 border-slate-200", statusDot: "bg-slate-400",
    category: "GROWTH", catCol: "bg-emerald-700 text-white",
    vertical: "Growth & Development",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    date: "Apr 15, 2024", time: "09:00 AM - 03:00 PM", loc: "JCI Training Centre, Madurai",
    role: "FACILITATOR", name: "Jc. Priya Devi",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=150"
  },
]

export default function Events() {
  const countdown = useCountdown(EVENT_DATE)

  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedVertical, setSelectedVertical] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Filter events
  const filteredEvents = EVENTS.filter(ev => {
    const matchVertical = selectedVertical === 'All' || ev.vertical === selectedVertical
    const matchSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.loc.toLowerCase().includes(searchQuery.toLowerCase())
    const matchTimeFilter =
      activeFilter === 'All' ? true :
      activeFilter === 'Today' ? ev.status === 'ONGOING' :
      activeFilter === 'This Week' ? ev.status === 'UPCOMING' : true
    return matchVertical && matchSearch && matchTimeFilter
  })

  return (
    <div className="max-w-[1200px] mx-auto pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#00153D] mb-2 tracking-tight">Current Events</h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Explore ongoing and upcoming events that shape the leaders of tomorrow and drive community impact today.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          {['All', 'Today', 'This Week'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeFilter === f
                  ? 'bg-[#A0813D] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Event Hero with LIVE Countdown */}
      <div className="relative rounded-3xl overflow-hidden mb-10 min-h-[400px] lg:min-h-[480px] shadow-lg group flex items-center">
        <div className="absolute inset-0 bg-[#00153D]/80 mix-blend-multiply z-10 hidden sm:block pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00153D] via-[#00153D]/90 to-transparent z-10 pointer-events-none"></div>
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
          alt="JCI Annual Convention 2025"
          className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700 z-0"
          loading="lazy"
        />

        <div className="relative z-20 flex flex-col justify-center p-6 sm:p-10 md:p-14 w-full h-full">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
              <Star size={12} className="text-[#FBC764] fill-[#FBC764]" />
              <span className="text-[11px] font-black tracking-widest uppercase text-[#FBC764]">Featured Event</span>
            </div>
            <div className="flex items-center gap-2 bg-[#00153D]/50 w-fit px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] font-black tracking-widest uppercase text-white">
                <span className="text-white/50">Vertical:</span> Management & Leadership
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight mb-4 max-w-xl">
            JCI Annual Convention 2025
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-md leading-relaxed mb-6 hidden md:block font-medium">
            Join over 500 visionaries for the flagship gathering of JCI Madurai Central. A three-day immersive experience
            featuring leadership keynotes, strategic planning, and the prestigious excellence awards.
          </p>

          {/* LIVE Countdown */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { v: countdown.days, l: 'DAYS' },
              { v: countdown.hours, l: 'HOURS' },
              { v: countdown.mins, l: 'MINS' },
              { v: countdown.secs, l: 'SECS' },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/10 w-16 h-[70px] sm:w-[70px] sm:h-[75px] rounded-2xl flex flex-col items-center justify-center"
              >
                <span className="text-white text-xl sm:text-2xl font-bold font-mono tabular-nums">{t.v}</span>
                <span className="text-slate-300 text-[9px] tracking-[0.2em] uppercase font-bold mt-1">{t.l}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
            <button className="bg-[#A0813D] hover:bg-[#8B6D31] text-white px-8 py-3.5 rounded-xl font-black text-sm transition-colors shadow-[0_4px_20px_rgba(160,129,61,0.4)] uppercase tracking-wide">
              Secure Your Spot
            </button>
            <div className="flex items-center gap-4 bg-[#00153D]/60 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
                  className="w-9 h-9 rounded-full border-2 border-[#FBC764] object-cover"
                  alt="Chief Guest"
                />
                <div>
                  <p className="text-[10px] font-black tracking-widest text-[#FBC764] uppercase mb-0.5">Chief Guest</p>
                  <p className="text-white font-bold text-xs">Hon. Minister</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                  className="w-9 h-9 rounded-full border-2 border-teal-400 object-cover"
                  alt="Guest of Honour"
                />
                <div>
                  <p className="text-[10px] font-black tracking-widest text-teal-400 uppercase mb-0.5">Guest of Honour</p>
                  <p className="text-white font-bold text-xs">Dr. Sarah Michael</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-8 w-full">
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-3 flex items-center gap-3">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search events by name, category, or speaker..."
            className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-700 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 transition-colors shrink-0"
            >
              ✕
            </button>
          )}
        </div>

        {/* Vertical Dropdown — fixed with ref */}
        <div className="relative shrink-0 w-full md:w-auto" ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className={`bg-white rounded-xl shadow-sm border px-5 py-3 flex items-center justify-between min-w-[200px] cursor-pointer transition-all ${
              showDropdown ? 'border-[#A0813D] ring-2 ring-[#A0813D]/10' : 'border-slate-200 hover:border-[#A0813D]/40'
            }`}
          >
            <span className="text-sm font-bold text-slate-700">{selectedVertical}</span>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-200 ml-3 ${showDropdown ? 'rotate-180' : ''}`}
            />
          </div>

          {showDropdown && (
            <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[100] py-1">
              {VERTICALS.map((cat) => (
                <div
                  key={cat}
                  className={`px-5 py-2.5 text-sm font-semibold cursor-pointer transition-colors ${
                    selectedVertical === cat
                      ? 'bg-[#F5F2EA] text-[#A0813D]'
                      : 'text-slate-600 hover:bg-[#F5F2EA] hover:text-[#A0813D]'
                  }`}
                  onClick={() => {
                    setSelectedVertical(cat)
                    setShowDropdown(false)
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="bg-[#00153D] hover:bg-[#002766] transition-colors text-white px-4 py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 shrink-0">
          <SlidersHorizontal size={16} />
          <span className="text-xs font-bold hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          Showing <span className="font-bold text-[#00153D]">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
          {selectedVertical !== 'All' && <span> in <span className="text-[#A0813D] font-bold">{selectedVertical}</span></span>}
        </p>
        {(searchQuery || selectedVertical !== 'All' || activeFilter !== 'All') && (
          <button
            onClick={() => { setSearchQuery(''); setSelectedVertical('All'); setActiveFilter('All') }}
            className="text-xs font-bold text-slate-400 hover:text-[#A0813D] transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-lg font-bold text-[#00153D] mb-2">No events found</p>
          <p className="text-slate-500 text-sm">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredEvents.map((ev, i) => (
            <div
              key={i}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 hover:border-[#A0813D]/20 transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              <Link to="/portal/events/1" className="relative h-52 w-full overflow-hidden block">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className={`absolute top-4 left-4 ${ev.statusCol} border px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm backdrop-blur-sm bg-opacity-90`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${ev.statusDot} ${ev.status === 'ONGOING' ? 'animate-pulse' : ''}`}></span>
                  <span className="text-[11px] font-black tracking-widest uppercase">{ev.status}</span>
                </div>
                <div className={`absolute bottom-4 left-4 ${ev.catCol} px-3 py-1 rounded text-[11px] font-black uppercase tracking-wider shadow-md`}>
                  {ev.category}
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-1">
                <Link to="/portal/events/1">
                  <h3 className="font-bold text-[#00153D] text-lg leading-tight mb-4 line-clamp-2 min-h-[52px] hover:text-[#A0813D] transition-colors">
                    {ev.title}
                  </h3>
                </Link>

                <div className="space-y-2.5 mb-5 flex-1">
                  <div className="flex items-center gap-2.5 text-slate-500 text-xs font-semibold">
                    <Calendar size={13} className="text-[#A0813D] shrink-0" /> {ev.date}
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-500 text-xs font-semibold">
                    <Clock size={13} className="text-[#A0813D] shrink-0" /> {ev.time}
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-500 text-xs font-semibold">
                    <MapPin size={13} className="text-[#A0813D] mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{ev.loc}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-5 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full border border-slate-200 overflow-hidden shrink-0">
                    <img src={ev.avatar} className="w-full h-full object-cover" alt={ev.name} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">{ev.role}</p>
                    <p className="text-xs font-bold text-[#00153D]">{ev.name}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Link
                    to="/portal/events/1"
                    className="flex-1 border border-slate-200 text-[#00153D] py-3 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center"
                  >
                    Details
                  </Link>
                  <button
                    className={`flex-[1.5] py-3 rounded-xl text-xs font-bold transition-colors shadow-sm ${
                      ev.status === 'COMPLETED'
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-[#00153D] text-white hover:bg-[#A0813D]'
                    }`}
                    disabled={ev.status === 'COMPLETED'}
                  >
                    {ev.status === 'COMPLETED' ? 'Completed' : 'Register'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
