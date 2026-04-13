import { Link } from 'react-router-dom'
import { Briefcase, GraduationCap, Building2, Users, TrendingUp, Globe } from 'lucide-react'
import homeHero from '../assets/home_hero.png'

const verticalCards = [
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: 'Management',
    desc: 'Strategic organizational leadership and governance ensuring operational excellence and visionary direction for our local organization.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: 'Training',
    desc: 'Empowering members through high-impact workshops and skill development programs led by certified national and international trainers.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    title: 'Business',
    desc: 'Creating a robust ecosystem for networking, entrepreneurial mentorship, and cross-border business opportunities for our members.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Community Development',
    desc: 'Driving sustainable social impact projects that address local needs and contribute to the United Nations Sustainable Development Goals.',
    img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1931&auto=format&fit=crop'
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Growth & Development',
    desc: 'Focusing on individual leadership potential, membership expansion, and the holistic evolution of our future leaders.',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'Internationalism',
    desc: 'Leveraging JCI\'s global network to foster international cooperation, cultural exchange, and global leadership opportunities.',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
  }
]

export default function Vertical() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center overflow-hidden bg-[#00153D]">
        <div className="absolute inset-0 opacity-40">
           <img 
            src={homeHero} 
            alt="Hero Background" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00153D] via-[#00153D]/80 to-transparent" />
        
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 w-full text-white text-center">
          <span className="inline-block px-4 py-1.5 bg-[#A0813D] text-[11px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
            Our Strategic Focus
          </span>
          <h1 className="text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tight">
            Verticals of Excellence
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Driving transformative change through six pillars of development, empowering young leaders to create sustainable impact.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {verticalCards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-60 overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-[#00153D] flex items-center justify-center text-[#A0813D] shadow-xl">
                    {card.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-[#00153D] mb-4 uppercase">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {card.desc}
                  </p>
                  <Link to="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00153D] border-b-2 border-transparent hover:border-[#A0813D] pb-1 transition-all">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="bg-[#F8F9FA] rounded-[40px] overflow-hidden shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto overflow-hidden p-8">
                 <div className="absolute inset-4 border-2 border-[#A0813D]/30 rounded-3xl z-10" />
                 <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Ready to Lead" 
                  className="w-full h-full object-cover rounded-2xl" 
                />
              </div>
              <div className="p-12 lg:p-24 flex flex-col justify-center">
                <h2 className="text-4xl lg:text-5xl font-black text-[#00153D] mb-6 uppercase tracking-tighter leading-tight">
                  Ready to Lead with Us?
                </h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                  Our verticals are designed to provide diverse pathways for impact. Whether you are looking to sharpen your business acumen or drive community change, JCI Madurai Central provides the platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/membership" className="bg-[#00153D] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-xs shadow-xl shadow-blue-900/20 hover:scale-105 transition-transform">
                    Apply for Membership
                  </Link>
                  <Link to="/contact" className="border-2 border-[#00153D] text-[#00153D] px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#00153D] hover:text-white transition-all">
                    View Recent Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
