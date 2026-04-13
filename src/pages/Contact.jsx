import { useState } from 'react'
import { MapPin, Mail, Phone, Globe, Users, Camera, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import homeHero from '../assets/home_hero.png'

const MADURAI_MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.64574452645417!2d78.11762394858893!3d9.906289562766407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5d5f7f96449%3A0x61c62719909f77ad!2sGokulnath%20R!5e0!3m2!1sen!2sin!4v1776107960972!5m2!1sen!2sin'

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Full name is required'
  else if (form.name.trim().length < 3) errors.name = 'Name must be at least 3 characters'
  if (!form.email.trim()) errors.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address'
  if (!form.subject.trim()) errors.subject = 'Subject is required'
  if (!form.message.trim()) errors.message = 'Message is required'
  else if (form.message.trim().length < 20) errors.message = 'Message must be at least 20 characters'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const newErrors = validate({ ...form })
    setErrors(prev => ({ ...prev, [field]: newErrors[field] }))
  }

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value }
    setForm(updated)
    if (touched[field]) {
      const newErrors = validate(updated)
      setErrors(prev => ({ ...prev, [field]: newErrors[field] }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const allTouched = { name: true, email: true, subject: true, message: true }
    setTouched(allTouched)
    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus('loading')
    // Simulate async form submission
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTouched({})
    setTimeout(() => setStatus('idle'), 5000)
  }

  const Field = ({ label, field, type = 'text', placeholder, rows }) => {
    const hasError = touched[field] && errors[field]
    const isValid = touched[field] && !errors[field] && form[field]

    return (
      <div>
        <label className="block text-xs font-bold text-[#00153D] mb-2 tracking-tight">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {rows ? (
            <textarea
              value={form[field]}
              onChange={e => handleChange(field, e.target.value)}
              onBlur={() => handleBlur(field)}
              placeholder={placeholder}
              rows={rows}
              className={`w-full bg-[#F4F4F4] rounded-xl py-3.5 px-4 text-sm transition-all text-slate-700 resize-none outline-none border-2 ${
                hasError
                  ? 'border-red-400 bg-red-50/30 focus:ring-0'
                  : isValid
                  ? 'border-emerald-400 focus:border-emerald-400'
                  : 'border-transparent focus:border-[#A0813D] focus:bg-white'
              }`}
            />
          ) : (
            <input
              type={type}
              value={form[field]}
              onChange={e => handleChange(field, e.target.value)}
              onBlur={() => handleBlur(field)}
              placeholder={placeholder}
              className={`w-full bg-[#F4F4F4] rounded-xl py-3.5 px-4 text-sm transition-all text-slate-700 outline-none border-2 ${
                hasError
                  ? 'border-red-400 bg-red-50/30 focus:ring-0'
                  : isValid
                  ? 'border-emerald-400 focus:border-emerald-400'
                  : 'border-transparent focus:border-[#A0813D] focus:bg-white'
              }`}
            />
          )}
          {isValid && (
            <CheckCircle2
              size={16}
              className={`absolute right-3 top-3.5 text-emerald-500 pointer-events-none ${rows ? 'top-3.5' : 'top-1/2 -translate-y-1/2'}`}
            />
          )}
        </div>
        {hasError && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <AlertCircle size={13} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-500 font-medium">{errors[field]}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="pt-20 bg-[#F4F4F4] min-h-screen font-montserrat">

      {/* Hero */}
      <section className="relative bg-[#00153D] pt-24 pb-48 lg:pb-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={homeHero} alt="Madurai" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000B24] via-[#00153D]/80 to-transparent mix-blend-multiply" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-[#A0813D] text-[11px] font-black uppercase tracking-[0.3em] rounded-full mb-6 shadow-lg">
              JCI Madurai Central
            </span>
            <h1 className="text-4xl lg:text-7xl font-bold text-white leading-tight mb-4 tracking-tighter">
              Get in <span className="text-[#FBC764]">Touch</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-lg font-medium">
              Building a legacy of leadership and community impact. Reach out to us to become part of the change in Madurai.
            </p>
          </div>
        </div>
      </section>

      {/* Overlapping Cards */}
      <section className="relative z-20 -mt-32 lg:-mt-48 pb-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">

            {/* Left Column */}
            <div className="space-y-6">
              {/* Direct Channels */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-bold text-[#00153D] mb-8 tracking-tight">Direct Channels</h2>
                <div className="space-y-7">
                  {[
                    {
                      icon: <MapPin size={16} className="text-[#8B7355]" />,
                      // title: 'Headquarters',
                      title: 'Address',
                      lines: ['4691, Villapuram Housing Board,', 'Jaihindpuram Main Road, Madurai 625011'],
                    },
                    {
                      icon: <Phone size={16} className="text-[#8B7355]" />,
                      title: 'Phone & Mobile',
                      lines: ['+91 99433 64066'],
                      // lines: ['+91 99433 64066', '+91 99433 64066'],
                    },
                    {
                      icon: <Mail size={16} className="text-[#8B7355]" />,
                      title: 'Email Inquiries',
                      lines: ['maduraicentraljci@gmail.com'],
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F5F2EA] flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#00153D] text-sm mb-1.5 tracking-tight">{item.title}</h3>
                        {item.lines.map((l, li) => (
                          <p key={li} className="text-slate-500 text-sm leading-relaxed">{l}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stay Connected */}
              <div className="bg-[#000F29] rounded-2xl p-8 shadow-xl text-white">
                <h3 className="text-[#FBC764] font-bold text-lg mb-6 tracking-tight">Stay Connected</h3>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Office Hours</h4>
                    <p className="text-sm font-semibold mb-1">Mon – Sat</p>
                    <p className="text-sm text-slate-300">09:00 AM – 06:00 PM</p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Follow Us</h4>
                    <div className="flex gap-3">
                      <a href="https://www.facebook.com/JCIMaduraiCentral23" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors">
                        {/* Facebook SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12a10 10 0 1 0-11.563 9.878v-6.988H7.9V12h2.537V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988A10.003 10.003 0 0 0 22 12z"/>
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/jcimaduraicentral" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:to-[#bc1888] transition-colors">
                        {/* Instagram SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.07 1.645.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.265-.058 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.609.074-3.057.436-4.199 1.578C1.712 2.792 1.35 4.24 1.276 5.849 1.218 7.13 1.204 7.538 1.204 12s.014 4.87.072 6.151c.074 1.609.436 3.057 1.578 4.199 1.142 1.142 2.59 1.504 4.199 1.578C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.609-.074 3.057-.436 4.199-1.578 1.142-1.142 1.504-2.59 1.578-4.199.058-1.281.072-1.689.072-6.151s-.014-4.87-.072-6.151c-.074-1.609-.436-3.057-1.578-4.199-1.142-1.142-2.59-1.504-4.199-1.578C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#A0813D] transition-colors">
                        <Globe size={16} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-[12px] text-slate-400 font-medium leading-relaxed">
                      For urgent matters, WhatsApp us at <span className="text-[#FBC764] font-bold">+91 99433 64066</span> — we respond within 2 hours.
                    </p>
                </div>
              </div>
            </div>

            {/* Right Column — Form */}
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl">

              {/* Success State */}
              {status === 'success' && (
                <div className="flex flex-col items-center text-center py-12 animate-in fade-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-[#00153D] mb-3">Message Sent!</h3>
                  <p className="text-slate-500 leading-relaxed max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 bg-[#00153D] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#A0813D] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

              {status !== 'success' && (
                <>
                  <h2 className="text-2xl font-bold text-[#00153D] mb-3 tracking-tight">Send a Message</h2>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Have a question or want to collaborate? Our team will get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Full Name" field="name" placeholder="John Doe" />
                      <Field label="Email Address" field="email" type="email" placeholder="john@example.com" />
                    </div>
                    <Field label="Subject" field="subject" placeholder="How can we help you?" />
                    <Field label="Message" field="message" placeholder="Write your message here... (min. 20 characters)" rows={6} />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="bg-[#000F29] hover:bg-[#A0813D] text-white text-sm font-bold py-4 px-8 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Submit Inquiry
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                      <p className="text-[12px] text-slate-400">
                        We respond within <span className="font-bold text-slate-600">24 hours</span> on business days.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Real Google Maps Section */}
      <section className="bg-[#F4F4F4] pb-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[#8B7355] text-[11px] font-bold uppercase tracking-widest mb-2">Find Us</p>
              <h2 className="text-3xl font-bold text-[#00153D] tracking-tight">Visit Our Central Hub</h2>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Madurai,Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#8B7355] text-sm font-bold hover:gap-3 transition-all border-b border-transparent hover:border-[#8B7355] pb-0.5"
            >
              Get Directions <ArrowRight size={16} />
            </a>
          </div>

          {/* Real Google Maps Embed */}
          <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <iframe
              title="JCI Madurai Central Location"
              src={MADURAI_MAP_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Address below map */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl px-8 py-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#A0813D]" />
              </div>
              <div>
                <p className="font-bold text-[#00153D] text-sm">4691, Villapuram Housing Board</p>
                <p className="text-slate-500 text-xs">Jaihindpuram Main Road, Madurai 625011</p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Madurai,Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#00153D] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#A0813D] transition-colors shadow-sm"
            >
              <MapPin size={14} /> Open in Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
