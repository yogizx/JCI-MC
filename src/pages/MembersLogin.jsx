import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Lock, Shield, User } from 'lucide-react'

const links = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Vertical', to: '/vertical' },
  { name: 'Join Us', to: '/membership' },
  { name: 'Membership', to: '/check-membership' },
  { name: 'Contact', to: '/contact' },
]

export default function MembersLogin() {
  const navigate = useNavigate()
  const [memberId, setMemberId] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = (event) => {
    event.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      navigate('/portal')
    }, 1200)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#eef1f9] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl font-bold tracking-tight text-blue-900">
            JCI Madurai Central
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-700"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Link
            to="/login"
            className="rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Members Login
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2 2 7h2v13h16V7h2L12 2Zm0 2.2L20 8H4l8-3.8ZM8 11h2v6H8v-6Zm6 0h2v6h-2v-6ZM2 20h20v2H2v-2Z" />
                  </svg>
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">JCI Madurai Central Portal</span>
              </div>

              <h1 className="text-4xl font-extrabold text-slate-900">Member Access</h1>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                Welcome back. Enter your credentials to access the leadership dashboard.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Shield size={30} />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="memberId" className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Username or Member ID
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={16} />
                </span>
                <input
                  id="memberId"
                  value={memberId}
                  onChange={(event) => setMemberId(event.target.value)}
                  type="text"
                  required
                  placeholder="Enter your ID"
                  className="w-full rounded-xl border border-blue-100 bg-blue-50 px-10 py-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <button type="button" className="text-xs font-semibold text-blue-700 hover:text-blue-800">
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="........"
                  className="w-full rounded-xl border border-blue-100 bg-blue-50 px-10 py-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-blue-700"
              />
              Remember my session
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-4 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {loading ? 'Authenticating...' : 'Login to Dashboard'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">New Here?</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <Link
            to="/contact"
            className="block rounded-xl border border-slate-200 bg-slate-50 py-3.5 text-center text-sm font-bold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
          >
            Request Access
          </Link>

          <div className="mt-6 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <p className="mt-1">Authorized JCI Madurai personnel only</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-500">
            <a href="#" className="transition hover:text-blue-700">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-blue-700">
              Platform Status
            </a>
            <Link to="/contact" className="transition hover:text-blue-700">
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-bold text-slate-800">Youth Leadership</p>
          <div className="flex flex-wrap items-center justify-center gap-4 font-semibold">
            <a href="#" className="transition hover:text-blue-700">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-blue-700">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-blue-700">
              FAQ
            </a>
            <a href="#" className="transition hover:text-blue-700">
              Cookie Policy
            </a>
          </div>
          <p className="text-center sm:text-right"> 2026 JCI Madurai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
