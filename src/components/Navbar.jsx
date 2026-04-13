import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'About Us', 
    path: '/about',
    dropdown: [
      { name: 'About JCI', path: '/about/jci' },
      { name: 'National President Message', path: '/about/president-message' },
      { name: 'JCI Creed', path: '/about/creed' },
      { name: 'About JCI Madurai central', path: '/about' },
    ]
  },
  { name: 'Verticals', path: '/vertical' },
  { name: 'Join Us', path: '/membership' },
  { name: 'Check Membership', path: '/check-membership' },
  { name: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    setOpen(false)
    setAboutDropdownOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAboutDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownRef])

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-black tracking-tight text-[#00153D] lg:text-2xl">
              JCI Madurai Central
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex lg:gap-8 justify-center flex-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path
              const hasDropdown = link.dropdown

              if (hasDropdown) {
                return (
                  <div 
                    key={link.path} 
                    className="relative" 
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                    ref={dropdownRef}
                  >
                    <button
                      className={`flex items-center gap-1 text-sm font-semibold transition-colors hover:text-[#00153D] ${
                        active || aboutDropdownOpen ? 'text-[#00153D]' : 'text-slate-600'
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                      {(active || aboutDropdownOpen) && (
                        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#A0813D]" />
                      )}
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top transform ${
                      aboutDropdownOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'
                    }`}>
                      <div className="py-2">
                        {link.dropdown.map((subItem, idx) => (
                          <Link
                            key={idx}
                            to={subItem.path}
                            className="block px-6 py-3 text-sm font-bold text-slate-600 hover:bg-[#F5F2EA] hover:text-[#A0813D] transition-colors border-b border-slate-50 last:border-0"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-semibold transition-colors hover:text-[#00153D] ${
                    active ? 'text-[#00153D]' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#A0813D]" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/login"
              className="rounded-lg bg-[#00153D] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-opacity-90 active:scale-95"
            >
              Members Login
            </Link>
          </div>

          <button
            className="rounded-md p-2 text-slate-700 md:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute left-0 top-full w-full border-t border-slate-100 bg-white px-6 pb-6 pt-4 shadow-xl md:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const active = location.pathname === link.path
              const hasDropdown = link.dropdown

              if (hasDropdown) {
                return (
                  <div key={link.path} className="space-y-2">
                    <p className="text-base font-bold text-slate-400 uppercase tracking-widest text-[10px]">{link.name}</p>
                    <div className="pl-4 space-y-3">
                      {link.dropdown.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          className="block text-base font-bold text-slate-600"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-bold ${
                    active ? 'text-[#00153D]' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
            <Link
              to="/login"
              className="mt-4 inline-block w-full rounded-lg bg-[#00153D] py-3 text-center text-base font-bold text-white"
            >
              Members Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
