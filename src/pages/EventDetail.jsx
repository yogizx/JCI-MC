import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { 
  Calendar, MapPin, Clock, User, ArrowRight, CheckCircle2, 
  Navigation, Mail, Phone, ExternalLink, ArrowLeft, 
  Share2, Users, Download, Info, Heart
} from 'lucide-react'

export default function EventDetail() {
  const location = useLocation();
  const isPortal = location.pathname.startsWith('/portal');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eventData = {
    title: "Vision 2024: Empowering Tomorrow's Leaders",
    category: "Leadership Summit",
    status: "Registration Open",
    date: "October 24, 2024",
    time: "09:00 AM - 05:00 PM IST",
    venue: "The Grand Regency",
    address: "124/A, Anna Nagar Main Road, Madurai, TN 625020",
    chiefGuest: {
      name: "Dr. Arul Prakash",
      role: "Chairman, Madurai Tech Hub"
    },
    guestOfHonor: {
      name: "JCI Sen. Ramesh Kumar",
      role: "Former Zone President"
    },
    description: `Welcome to the cornerstone event of JCI Madurai's calendar year. The Vision 2024 Leadership Summit is meticulously designed for young active citizens who aspire to create a lasting impact in their communities. This full-day intensive summit brings together industry titans, community organizers, and social entrepreneurs to share insights on the evolving landscape of leadership in the digital age.

    Participants will engage in three distinct tracks: Strategic Networking, Crisis Management, and Sustainable Community Development. Through interactive workshops and panel discussions, we aim to equip our members with the practical tools necessary to bridge the gap between vision and execution. Join us for a day of inspiration, collaboration, and elevated authority as we chart the course for Madurai's future leaders.`,
    highlights: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop"
    ]
  }

  return (
    <div className={`min-h-screen ${isPortal ? 'bg-transparent pb-20' : 'bg-slate-50'}`}>
      {!isPortal && (
        <div className="bg-white border-b border-slate-200 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <Link to="/portal/events" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
              <ArrowLeft size={16} /> Back to Events
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-b-[4rem] bg-slate-900 border-b border-slate-200 h-[450px] lg:h-[550px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Event Backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              {eventData.category}
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              {eventData.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-[1.1] mb-8">
            {eventData.title}
          </h1>

          <div className="absolute bottom-[-60px] lg:right-10 pointer-events-none opacity-10 hidden lg:block">
            <h2 className="text-[120px] font-black text-white leading-none tracking-tighter uppercase whitespace-nowrap">
              Legacy 2024
            </h2>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Info Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard 
                icon={<Calendar className="text-blue-500" />}
                label="Date & Time"
                val={eventData.date}
                sub={eventData.time}
              />
              <InfoCard 
                icon={<MapPin className="text-red-500" />}
                label="Venue"
                val={eventData.venue}
                sub="Anna Nagar, Madurai"
              />
              <InfoCard 
                icon={<Users className="text-purple-500" />}
                label="Chief Guest"
                val={eventData.chiefGuest.name}
                sub={eventData.chiefGuest.role}
              />
              <InfoCard 
                icon={<Heart className="text-pink-500" />}
                label="Guest of Honor"
                val={eventData.guestOfHonor.name}
                sub={eventData.guestOfHonor.role}
              />
            </div>

            {/* Event Description */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                   <h3 className="text-2xl font-bold text-slate-800">Event Description</h3>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                    {eventData.description}
                  </p>
                </div>
            </div>

            {/* Highlights Gallery */}
            <div className="space-y-6">
                <div className="flex items-end justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                      <h3 className="text-2xl font-bold text-slate-800">Past Event Highlights</h3>
                   </div>
                   <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {eventData.highlights.map((img, idx) => (
                    <div key={idx} className="aspect-video bg-slate-200 rounded-[2rem] overflow-hidden group border border-white shadow-md">
                      <img 
                        src={img} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt="Highlight"
                      />
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Location & Ticket Card */}
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl lg:sticky lg:top-24">
              <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                Location & Venue
              </h4>
              
              <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{eventData.venue}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {eventData.address}
                  </p>
                </div>
              </div>

              {/* Mini Map Placeholder */}
              <div className="rounded-[2.5rem] h-48 bg-slate-200 overflow-hidden relative mb-8 group cursor-pointer border border-slate-100 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale opacity-80"
                  alt="Map"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-500/20">
                      <MapPin size={24} className="text-blue-600 fill-blue-600" />
                   </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                   <Calendar size={18} /> Register for Event
                </button>
                <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2">
                   <Navigation size={18} /> Get Directions
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Organizer Contact</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Phone size={14}/></div>
                    <span className="text-xs font-bold text-slate-600">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Mail size={14}/></div>
                    <span className="text-xs font-bold text-slate-600">events@jcimadurai.org</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Box */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
               <h4 className="text-2xl font-bold mb-4">Secure Your Spot</h4>
               <p className="text-blue-100 text-sm leading-relaxed mb-10 opacity-80">
                 Limited seats available for the most anticipated leadership event of the year.
               </p>
               <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
                  Register Now
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon, label, val, sub }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center gap-5 hover:border-blue-200 transition-colors group">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-800">{val}</p>
        {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
