import React, { useEffect, useMemo, useState } from "react";
import saran from "./assets/my-avatar.jpg";
import logo from "./assets/JCI Madurai Central.png";

import {
  Lock,
  Mail,
  Grid2X2,
  ArrowRight,
  BarChart3,
  Bell,
  Search,
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  HelpCircle,
  UserPlus,
  TrendingUp,
  Zap,
  MoreHorizontal,
  X,
  Briefcase,
  SlidersHorizontal,
  LayoutGrid,
  CreditCard,
  ShieldCheck,
  Sparkles,
  CalendarDays,
  ChevronDown,
  Calendar,
  Upload,
  ExternalLink,
  MapPin,
  Pencil,
  MoreVertical,
  Phone,
  Heart,
  User,
  ImagePlus,
  Link as LinkIcon,
  AlertCircle,
  Save,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const activityData = [
  {
    id: 1,
    name: "Marcus Thorne",
    action: "joined the Premium Tier",
    time: "2 mins ago",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    dot: "bg-green-500",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    action: "updated her Portfolio",
    time: "14 mins ago",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    dot: "bg-indigo-500",
  },
  {
    id: 3,
    name: "Arthur Pendragon",
    action: "published a new Listing",
    time: "1 hour ago",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    dot: "bg-amber-500",
  },
  {
    id: 4,
    name: "Sasha K.",
    action: "joined Technology Category",
    time: "3 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    dot: "bg-green-500",
  },
];

const categoryData = [
  { name: "Technology & SaaS", value: 42, color: "from-indigo-600 to-violet-500" },
  { name: "Creative Arts", value: 28, color: "from-violet-600 to-purple-500" },
  { name: "Healthcare", value: 15, color: "from-fuchsia-500 to-pink-500" },
  { name: "Financial Services", value: 15, color: "from-slate-700 to-slate-800" },
];

const stats = [
  {
    title: "Total Members",
    value: "12,842",
    icon: Users,
    badge: "+ 12%",
    badgeClass: "bg-green-100 text-green-700",
    iconWrap: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Active Members",
    value: "10,790",
    icon: Zap,
    badge: "84% Engagement",
    badgeClass: "bg-indigo-100 text-indigo-700",
    iconWrap: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Weekly New Joins",
    value: "+428",
    icon: UserPlus,
    badge: "",
    badgeClass: "",
    iconWrap: "bg-pink-100 text-pink-600",
  },
  {
    title: "Top Category Growth",
    value: "LGB",
    icon: TrendingUp,
    badge: "",
    badgeClass: "",
    iconWrap: "bg-amber-100 text-amber-600",
  },
];

const chartData = {
  "this-year": {
    label: "This Year",
    subtitle: "Last 12 months performance",
    points: [
      { x: 0, y: 76 },
      { x: 14, y: 62 },
      { x: 28, y: 48 },
      { x: 42, y: 56 },
      { x: 56, y: 34 },
      { x: 70, y: 26 },
      { x: 84, y: 18 },
      { x: 100, y: 10 },
    ],
    labels: ["JAN", "MAR", "MAY", "JUL", "SEP", "DEC"],
    markerIndex: 6,
  },
  "last-2-years": {
    label: "Last 2 Years",
    subtitle: "Performance across last 24 months",
    points: [
      { x: 0, y: 82 },
      { x: 14, y: 70 },
      { x: 28, y: 60 },
      { x: 42, y: 66 },
      { x: 56, y: 44 },
      { x: 70, y: 36 },
      { x: 84, y: 28 },
      { x: 100, y: 16 },
    ],
    labels: ["2024", "Q2", "Q3", "2025", "Q2", "NOW"],
    markerIndex: 5,
  },
  "last-3-years": {
    label: "Last 3 Years",
    subtitle: "Performance across last 36 months",
    points: [
      { x: 0, y: 88 },
      { x: 14, y: 74 },
      { x: 28, y: 68 },
      { x: 42, y: 58 },
      { x: 56, y: 48 },
      { x: 70, y: 34 },
      { x: 84, y: 24 },
      { x: 100, y: 14 },
    ],
    labels: ["2023", "2024", "MID", "2025", "MID", "TODAY"],
    markerIndex: 6,
  },
};

function buildSmoothPath(points, width = 1000, height = 260) {
  const scaled = points.map((p) => ({ x: (p.x / 100) * width, y: (p.y / 100) * height }));
  if (scaled.length < 2) return "";
  let d = `M ${scaled[0].x} ${scaled[0].y}`;
  for (let i = 0; i < scaled.length - 1; i++) {
    const p0 = scaled[i === 0 ? i : i - 1];
    const p1 = scaled[i];
    const p2 = scaled[i + 1];
    const p3 = scaled[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const FILE_LIMITS_MB = {
  profileImage: 2,
  visitingCard: 3,
  businessGallery: 5,
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function isFileSizeValid(file, limitMb) {
  return file && file.size <= limitMb * 1024 * 1024;
}

function getMissingProfileFields(profile) {
  const missing = [];

  if (!profile?.phone) missing.push("Phone");
  if (!profile?.email) missing.push("Email");
  if (!profile?.dob) missing.push("Date of Birth");
  if (!profile?.bloodGroup) missing.push("Blood Group");

  if (!profile?.business?.name) missing.push("Business Name");
  if (!profile?.business?.contactNo) missing.push("Business Contact No");
  if (!profile?.business?.address) missing.push("Business Address");
  if (!profile?.business?.email) missing.push("Business Email");
  if (profile?.business?.type === "Business") {
    if (!profile?.business?.name) missing.push("Business Name");
    if (!profile?.business?.contactNo) missing.push("Business Phone");
    if (!profile?.business?.address) missing.push("Business Address");
  }

  if (profile?.business?.type === "Salaried") {
    if (!profile?.business?.name) missing.push("Company Name");
    if (!profile?.business?.address) missing.push("Company Address");
  }

  const social = profile?.socialLinks || {};
  if (!social.facebook && !social.instagram && !social.youtube && !social.linkedin && !social.pinterest) {
    missing.push("Social Media Links");
  }

  if (profile?.family?.maritalStatus === "Married") {
    if (!profile?.family?.spouse?.name) missing.push("Spouse Name");
    if (!profile?.family?.spouse?.dob) missing.push("Spouse DOB");
    if (!profile?.family?.spouse?.bloodGroup) missing.push("Spouse Blood Group");
    if (!profile?.family?.anniversary) missing.push("Anniversary Date");
  }

  return missing;
}

function LoginPage({ onLogin, onGoogleLogin }) {
  const [email, setEmail] = useState("admin@jci.com");
  const [password, setPassword] = useState("123456");

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side: Logo / Branding */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-[#f8f9ff] p-12 lg:flex">
        <div className="max-w-[400px] text-center">
          <img src={logo} alt="JCI Madurai Central Logo" className="mx-auto mb-8 w-64 object-contain" />
          <h2 className="text-[2.5rem] font-bold tracking-tight text-[#1f2430]">
            JCI Madurai Central
          </h2>
          <p className="mt-4 text-[1.1rem] text-[#6b7280]">
            Empowering young leaders to create positive change in our community.
          </p>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <section className="w-full max-w-[460px] rounded-[30px] border border-[#e5e8f0] bg-[#fbfbfd] px-5 py-8 shadow-[0_20px_60px_rgba(25,30,60,0.08)] sm:px-7 sm:py-10 md:px-12">
          <div className="mb-7 lg:hidden">
            <img src={logo} alt="JCI Logo" className="h-16 object-contain" />
          </div>
          
          <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[2.4rem]">
            Admin Portal
          </h1>

          <p className="mt-3 text-[15px] leading-7 text-[#8c90a0] sm:text-[16px]">
            Please sign in to access the JCI Madurai Central management dashboard.
          </p>

          <div className="mt-8 space-y-6 sm:mt-10">
            <div>
              <label className="mb-3 block text-[13px] font-semibold text-[#7c8191]">
                Email Address
              </label>

              <div className="flex h-[54px] items-center gap-3 rounded-[14px] border border-[#ebedf4] bg-white px-4 shadow-sm transition focus-within:border-[#cec6ff] focus-within:ring-4 focus-within:ring-[#ece9ff] sm:h-[58px]">
                <Mail className="h-5 w-5 text-[#a8acb8]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#4d5364] outline-none placeholder:text-[#b5b9c6] sm:text-[15px]"
                  placeholder="admin@jcimaduraicentral.com"
                />
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="block text-[13px] font-semibold text-[#7c8191]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[13px] font-semibold text-[#6b57f5] transition hover:opacity-80"
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex h-[54px] items-center gap-3 rounded-[14px] border border-[#ebedf4] bg-white px-4 shadow-sm transition focus-within:border-[#cec6ff] focus-within:ring-4 focus-within:ring-[#ece9ff] sm:h-[58px]">
                <Lock className="h-5 w-5 text-[#a8acb8]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#4d5364] outline-none placeholder:text-[#b5b9c6] sm:text-[15px]"
                  placeholder="Enter password"
                />
              </div>
            </div>
          </div>

          <label className="mt-6 flex items-center gap-3 text-[14px] text-[#9499a8] sm:mt-7">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#d7dbe7] text-[#5b3df5]"
            />
            Keep me signed in
          </label>

          <button
            onClick={onLogin}
            className="mt-6 flex h-[54px] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#5b3df5] to-[#6c40f6] text-[14px] font-semibold text-white shadow-[0_18px_30px_rgba(91,61,245,0.30)] transition hover:-translate-y-0.5 sm:mt-7 sm:h-[58px] sm:text-[15px]"
          >
            Sign in to Portal
          </button>

          <div className="my-6 flex items-center gap-4 text-[13px] text-[#b0b4c0] sm:my-8">
            <div className="h-px flex-1 bg-[#eceef4]" />
            <span>Or access with</span>
            <div className="h-px flex-1 bg-[#eceef4]" />
          </div>

          <button
            type="button"
            onClick={onGoogleLogin}
            className="flex h-[52px] w-full items-center justify-center gap-3 rounded-[16px] border border-[#e3e7f0] bg-white text-[13px] font-semibold text-[#2b2f3a] shadow-sm transition hover:border-[#cfd6e6] hover:bg-[#fafbff] sm:h-[56px] sm:text-[14px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.2 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2c-2.1 1.6-4.6 2.4-7.3 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6 7.1l.1-.1 6.2 5.2C35.2 40.5 44 34 44 24c0-1.3-.1-2.3-.4-3.5z"/>
            </svg>
            Google Workspace
          </button>
        </section>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left transition sm:px-4 sm:py-3 ${
        active ? "text-[#5442ef]" : "text-[#697386] hover:text-[#1e2430]"
      }`}
    >
      <span className="flex items-center gap-3 text-[14px] font-medium sm:text-[15px]">
        <Icon className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
        {label}
      </span>
      {active ? <span className="h-6 w-1 rounded-full bg-[#5b3df5]" /> : null}
    </button>
  );
}

function SettingsToggleBlock({
  activePage,
  onNavigate,
  showSettingsPage,
  setShowSettingsPage,
}) {
  return (
    <div className="mt-2 rounded-2xl border border-[#e7eaf2] bg-white px-3 py-3 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Settings className="h-[16px] w-[16px] text-[#697386] sm:h-[18px] sm:w-[18px]" />
          <span className="text-[14px] font-medium text-[#697386] sm:text-[15px]">Settings</span>
        </div>

        <button
          type="button"
          onClick={() => {
            const nextValue = !showSettingsPage;
            setShowSettingsPage(nextValue);

            if (!nextValue && activePage === "settings") {
              onNavigate("dashboard");
            }
          }}
          className={`relative h-7 w-14 rounded-full transition ${
            showSettingsPage ? "bg-[#5b3df5]" : "bg-[#d7dbe7]"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
              showSettingsPage ? "left-8" : "left-1"
            }`}
          />
        </button>
      </div>

      {showSettingsPage && (
        <button
          type="button"
          onClick={() => onNavigate("settings")}
          className={`mt-3 flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left transition sm:px-4 sm:py-3 ${
            activePage === "settings"
              ? "text-[#5442ef]"
              : "text-[#697386] hover:text-[#1e2430]"
          }`}
        >
          <span className="flex items-center gap-3 text-[14px] font-medium sm:text-[15px]">
            <Settings className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
            Settings Page
          </span>
          {activePage === "settings" ? (
            <span className="h-6 w-1 rounded-full bg-[#5b3df5]" />
          ) : null}
        </button>
      )}
    </div>
  );
}

const initialMembers = [
  {
    name: "Sarankumar R",
    role: "Member Contribution",
    avatar: saran,
    dot: "bg-emerald-500",
    tags: ["LGB", "Business"],
    about: "",
    profile: {
      profileImage: saran,
      memberId: "MBR-1001",
      businessName: "faithandlifetech",
      businessRole: "IT Professional",
      phone: "+91 98765 43210",
      email: "sarankumar@faithandlifetech.com",
      dob: "1998-06-14",
      bloodGroup: "O+",
      business: {
        name: "Faith and Life Tech",
        contactNo: "+91 98765 43210",
        address: "Anna Nagar, Chennai, Tamil Nadu, India",
        email: "business@faithandlifetech.com",
        mapLocation: "https://maps.google.com/?q=Anna+Nagar+Chennai",
        visitingCardImage: "",
      },
      family: {
        maritalStatus: "Married",
        spouse: {
          name: "Samantha S",
          dob: "1999-02-10",
          bloodGroup: "A+",
        },
        anniversary: "2014-08-21",
        childrenCount: 2,
        children: [
          { name: "Swetha", dob: "2016-04-18" },
          { name: "Santhosh", dob: "2019-09-05" },
        ],
      },
      socialLinks: {
        facebook: "",
        instagram: "",
        youtube: "",
        linkedin: "",
        pinterest: "",
      },
      businessGallery: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
      ],
    }
  },
  {
    name: "Sarah Lindholm",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    dot: "bg-emerald-500",
    tags: ["LGB", "Business"],
    about: "",
    profile: {
      profileImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      businessName: "Vespera Tech",
      businessRole: "Global Head of Strategic Operations",
      phone: "+91 98765 43210",
      email: "elena@vespera.tech",
      address: "Anna Nagar, Chennai, Tamil Nadu, India",
      family: {
        maritalStatus: "Married",
        spouseName: "David Rodriguez",
        spouseRole: "Entrepreneur",
        anniversary: "21 Aug 2014",
        children: [
          { name: "Sophia Rodriguez", relation: "Daughter", dob: "18 Apr 2016" },
          { name: "Ethan Rodriguez", relation: "Son", dob: "05 Sep 2019" },
        ],
      },
      businessGallery: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    name: "Sarah Lindholm",
    role: "Member Contribution",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    dot: "bg-sky-500",
    tags: ["JAC", "Salaried"],
    about: "",
    profile: {
      profileImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      businessName: "Northgrid Labs",
      businessRole: "Frontend Architecture Lead",
      phone: "+91 98765 43210",
      email: "sarah@northgrid.io",
      address: "T. Nagar, Chennai, Tamil Nadu, India",
      family: {
        maritalStatus: "Single",
        spouseName: "",
        spouseRole: "",
        anniversary: "",
        children: [],
      },
      businessGallery: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
];

function MemberCard({ member, onViewProfile, onDelete }) {
  return (
    <div className="rounded-[22px] bg-white px-4 py-5 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:px-5 sm:py-6">
      <div className="relative mx-auto h-[70px] w-[70px] sm:h-[78px] sm:w-[78px]">
        <img
          src={
            member.avatar ||
            member.profile?.profileImage ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
          }
          alt={member.name}
          className="h-full w-full rounded-full object-cover"
        />
        <span
          className={`absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white sm:h-3.5 sm:w-3.5 ${member.dot}`}
        />
      </div>

      <h3 className="mt-4 text-center text-[1.4rem] font-bold leading-[1.05] tracking-[-0.04em] text-[#1f2430] sm:mt-5 sm:text-[1.7rem]">
        {member.name.split(" ")[0]}
        <span className="block">{member.name.split(" ").slice(1).join(" ")}</span>
      </h3>

      <p className="mt-2 text-center text-[12px] text-[#6e76a0] sm:text-[13px] font-medium text-emerald-600 uppercase tracking-widest">{member.role}</p>

      <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-4">
        {(member.tags || []).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[#f4f5f8] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7c8393] sm:text-[10px]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Removed about text as requested */}

      <div className="mt-5 flex flex-col gap-3 sm:mt-6">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onViewProfile(member)}
            className="rounded-full border border-[#d7dbe4] bg-white py-2 text-[11px] font-semibold text-[#666f80] sm:py-2.5 sm:text-[12px] hover:bg-gray-50"
          >
            View Profile
          </button>
        </div>

        <button
          onClick={() => onDelete(member)}
          className="w-full rounded-full border border-red-200 bg-red-50 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-100 sm:py-2.5 sm:text-[12px]"
        >
          Delete Member
        </button>
      </div>
    </div>
  );
}

function AddMemberModal({ onClose, onAdd }) {
  const TAG_TYPE_OPTIONS = ["Category", "Segment"];
  const CATEGORY_OPTIONS = ["LGB", "Members", "Appointee", "JAC", "Past President"];
  const SEGMENT_OPTIONS = ["Business", "Salaried"];
  const ROLE_OPTIONS = ["President", "Secretary", "Treasurer", "Member", "Coordinator"];
  const BLOOD_GROUP_OPTIONS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const BUSINESS_PROFILE_OPTIONS = ["Business", "Salaried"];
  const TRAINER_OPTIONS = ["Zone Trainer", "National Trainer", "Author", "Others", "NA"];
  const MARITAL_STATUS_OPTIONS = ["Single", "Married"];
  const CHILD_GENDER_OPTIONS = ["M", "F"];

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    role: "",
    profileImage: "",
    dob: "",
    phone: "",
    email: "",
    bloodGroup: "",
    businessProfile: "",
    tagType: "",
    tagValue: "",
    trainerDetails: "",
    maritalStatus: "Single",
    spouseName: "",
    spouseDob: "",
    spouseBloodGroup: "",
    anniversary: "",
    childrenCount: "0",
    child1Name: "",
    child1Dob: "",
    child1BloodGroup: "",
    child1Gender: "",
    child2Name: "",
    child2Dob: "",
    child2BloodGroup: "",
    child2Gender: "",
    businessName: "",
    businessDesignation: "",
    businessEmail: "",
    businessAddress: "",
    businessPhone: "",
    businessWebsite: "",
    companyName: "",
    salariedDesignation: "",
    companyAddress: "",
    officialEmail: "",
    businessCardImage: "",
    visitingCardImage: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    gender: "",
    otherSocialName: "",
    otherSocialLink: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const [businessGallery, setBusinessGallery] = useState([]);
  const [errors, setErrors] = useState({});

  const inputClass = (hasError = false) =>
    `w-full rounded-2xl border px-3 py-2.5 text-[13px] outline-none transition sm:px-4 sm:py-3 sm:text-[14px] ${
      hasError
        ? "border-red-300 bg-red-50"
        : "border-[#e8ebf2] bg-white focus:border-[#5b3df5]"
    }`;

  const labelClass = "mb-2 block text-[12px] font-semibold text-[#6b7280] sm:text-[13px]";

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
  };

  const fileToBase64Local = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleProfileImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Profile image must be less than 2MB");
      e.target.value = "";
      return;
    }

    const base64 = await fileToBase64Local(file);
    setField("profileImage", base64);
  };

  const handleSingleFile = async (e, fieldName, maxMb = 3) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxMb * 1024 * 1024) {
      alert(`File must be less than ${maxMb}MB`);
      e.target.value = "";
      return;
    }

    const base64 = await fileToBase64Local(file);
    setField(fieldName, base64);
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const converted = await Promise.all(
      files.slice(0, 4).map(async (file) => {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Each business image must be less than 5MB");
        }
        return await fileToBase64Local(file);
      })
    ).catch((err) => {
      alert(err.message);
      return null;
    });

    if (converted) {
      setBusinessGallery(converted);
    }
  };

  const validateStep = () => {
    const nextErrors = {};

    if (step === 1) {
      if (!form.name.trim()) nextErrors.name = true;
      if (!form.role.trim()) nextErrors.role = true;
      if (!form.dob) nextErrors.dob = true;
      if (!form.phone.trim()) nextErrors.phone = true;
      if (!form.email.trim()) nextErrors.email = true;
      if (!form.bloodGroup) nextErrors.bloodGroup = true;
      if (!form.businessProfile) nextErrors.businessProfile = true;
      if (!form.tagValue) nextErrors.tagValue = true;
      if (!form.gender) nextErrors.gender = true;
    }

    if (step === 2 && form.maritalStatus === "Married") {
      if (!form.spouseName.trim()) nextErrors.spouseName = true;
      if (!form.spouseDob) nextErrors.spouseDob = true;
      if (!form.spouseBloodGroup) nextErrors.spouseBloodGroup = true;
      if (!form.anniversary) nextErrors.anniversary = true;

      if (form.childrenCount === "1" || form.childrenCount === "2") {
        if (!form.child1Name.trim()) nextErrors.child1Name = true;
        if (!form.child1Dob) nextErrors.child1Dob = true;
        if (!form.child1BloodGroup) nextErrors.child1BloodGroup = true;
        if (!form.child1Gender) nextErrors.child1Gender = true;
      }

      if (form.childrenCount === "2") {
        if (!form.child2Name.trim()) nextErrors.child2Name = true;
        if (!form.child2Dob) nextErrors.child2Dob = true;
        if (!form.child2BloodGroup) nextErrors.child2BloodGroup = true;
        if (!form.child2Gender) nextErrors.child2Gender = true;
      }
    }

    if (step === 3) {
      if (form.businessProfile === "Business") {
        if (!form.businessName.trim()) nextErrors.businessName = true;
        if (!form.businessDesignation.trim()) nextErrors.businessDesignation = true;
        if (!form.businessEmail.trim()) nextErrors.businessEmail = true;
        if (!form.businessAddress.trim()) nextErrors.businessAddress = true;
        if (!form.businessPhone.trim()) nextErrors.businessPhone = true;
      }

      if (form.businessProfile === "Salaried") {
        if (!form.companyName.trim()) nextErrors.companyName = true;
        if (!form.salariedDesignation.trim()) nextErrors.salariedDesignation = true;
        if (!form.companyAddress.trim()) nextErrors.companyAddress = true;
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const goBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    setStep(4);
    const finalErrors = {};

    if (!form.name.trim()) finalErrors.name = true;
    if (!form.role.trim()) finalErrors.role = true;
    if (!form.phone.trim()) finalErrors.phone = true;
    if (!form.email.trim()) finalErrors.email = true;
    if (!form.businessProfile) finalErrors.businessProfile = true;

    setErrors(finalErrors);
    if (Object.keys(finalErrors).length) return;

    const fallbackAvatar =
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80";

    const finalProfileImage = form.profileImage || fallbackAvatar;

    const children = [];

    if (form.maritalStatus === "Married") {
      if (form.childrenCount === "1" || form.childrenCount === "2") {
        children.push({
          name: form.child1Name,
          dob: form.child1Dob,
          bloodGroup: form.child1BloodGroup,
          gender: form.child1Gender,
        });
      }

      if (form.childrenCount === "2") {
        children.push({
          name: form.child2Name,
          dob: form.child2Dob,
          bloodGroup: form.child2BloodGroup,
          gender: form.child2Gender,
        });
      }
    }

    const newMember = {
      name: form.name.trim(),
      role: form.role.trim(),
      avatar: finalProfileImage,
      dot: "bg-emerald-500",
      tags: [form.tagValue].filter(Boolean),
      about: "New member added to the directory.",
      profile: {
        profileImage: finalProfileImage,
        memberId: "",
        businessName: form.businessProfile === "Business" ? form.businessName.trim() : form.companyName.trim(),
        businessRole: form.businessProfile === "Business" ? form.businessDesignation.trim() : form.salariedDesignation.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        dob: form.dob,
        bloodGroup: form.bloodGroup,
        business: {
          type: form.businessProfile,
          name: form.businessProfile === "Business" ? form.businessName.trim() : form.companyName.trim(),
          contactNo: form.businessProfile === "Business" ? form.businessPhone.trim() : "",
          address: form.businessProfile === "Business" ? form.businessAddress.trim() : form.companyAddress.trim(),
          email: form.businessProfile === "Business" ? form.businessEmail.trim() : form.officialEmail.trim(),
          website: form.businessProfile === "Business" ? form.businessWebsite.trim() : "",
          visitingCardImage: form.businessProfile === "Salaried" ? form.visitingCardImage : form.businessCardImage,
        },
        family: {
          maritalStatus: form.maritalStatus,
          spouse: form.maritalStatus === "Married" ? {
            name: form.spouseName.trim(),
            dob: form.spouseDob,
            bloodGroup: form.spouseBloodGroup,
          } : { name: "", dob: "", bloodGroup: "" },
          anniversary: form.maritalStatus === "Married" ? form.anniversary : "",
          childrenCount: Number(form.childrenCount),
          children,
        },
        socialLinks: {
          facebook: form.facebook?.trim() || "",
          instagram: form.instagram?.trim() || "",
          youtube: form.youtube?.trim() || "",
          linkedin: form.linkedin?.trim() || "",
          pinterest: form.otherSocialLink?.trim() || "",
        },
        businessGallery,
      },
    };

    onAdd(newMember);
    onClose();
  };

  const renderUploadBox = (title, subtitle, onChange, preview) => (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[22px] border border-dashed border-[#d7dbe4] bg-[#fafbff] px-3 py-3 transition hover:border-[#5b3df5] sm:gap-4 sm:px-4 sm:py-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f1edff] text-[#5b3df5] sm:h-12 sm:w-12">
          <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#1f2430] sm:text-[14px]">{title}</p>
          <p className="text-[11px] text-[#7b8494] sm:text-[12px]">{subtitle}</p>
        </div>
      </div>
      <input type="file" className="hidden" onChange={onChange} />
      <span className="rounded-full bg-[#5b3df5] px-3 py-1.5 text-[11px] font-semibold text-white sm:px-4 sm:py-2 sm:text-[12px]">
        Upload
      </span>
      {preview ? (
        <img
          src={preview}
          alt={title}
          className="h-10 w-10 rounded-xl object-cover ring-1 ring-[#e8ebf2] sm:h-12 sm:w-12"
        />
      ) : null}
    </label>
  );

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-[rgba(15,23,42,0.45)] backdrop-blur-[6px] px-3 py-4 sm:px-4 sm:py-6">
      <div className="relative max-h-[94vh] w-full max-w-[95%] overflow-y-auto rounded-[30px] bg-white p-4 shadow-[0_40px_100px_rgba(37,34,79,0.28)] ring-1 ring-[#e8ebf2] sm:max-w-[980px] sm:p-6 md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[1.6rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[2rem]">
              Add New Member
            </h2>
            <p className="mt-1 text-[13px] text-[#7c8393] sm:text-[14px]">
              Step {step} of 4
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f5f8] text-[#5f6778] ring-1 ring-[#eceff5] sm:h-11 sm:w-11"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 sm:mt-6 sm:gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className={`rounded-2xl px-2 py-2 text-center text-[11px] font-semibold sm:px-4 sm:py-3 sm:text-[13px] ${
                step === item
                  ? "bg-[#5b3df5] text-white"
                  : "bg-[#f5f6fa] text-[#7b8494]"
              }`}
            >
              Section {item}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="mt-6 sm:mt-8">
            <h3 className="text-[1.1rem] font-bold text-[#1f2430] sm:text-[1.25rem]">Personal Profile</h3>

            <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>1. Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass(errors.name)}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className={labelClass}>2. Contribution</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className={inputClass(errors.role)}
                >
                  <option value="">Select role</option>
                  {ROLE_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>3. Profile Picture</label>
                {renderUploadBox(
                  "Upload Profile Picture",
                  "JPG / PNG, max 2MB",
                  handleProfileImage,
                  form.profileImage
                )}
              </div>

              <div>
                <label className={labelClass}>4. Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  max={today}
                  onChange={handleChange}
                  className={inputClass(errors.dob)}
                />
              </div>

              <div>
                <label className={labelClass}>5. Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={inputClass(errors.gender)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>6. Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass(errors.phone)}
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className={labelClass}>7. Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass(errors.email)}
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className={labelClass}>8. Member Blood Group</label>
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className={inputClass(errors.bloodGroup)}
                >
                  <option value="">Select blood group</option>
                  {BLOOD_GROUP_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>9. Business Profile</label>
                <select
                  name="businessProfile"
                  value={form.businessProfile}
                  onChange={handleChange}
                  className={inputClass(errors.businessProfile)}
                >
                  <option value="">Select profile</option>
                  {BUSINESS_PROFILE_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              {/* Removed Tag Type field as requested */}

              <div>
                <label className={labelClass}>10. Membership Categories</label>
                <select
                  name="tagValue"
                  value={form.tagValue}
                  onChange={handleChange}
                  className={inputClass(errors.tagValue)}
                >
                  <option value="">Select category</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>11. Trainer Details</label>
                <select
                  name="trainerDetails"
                  value={form.trainerDetails}
                  onChange={handleChange}
                  className={inputClass()}
                >
                  <option value="">Select trainer detail</option>
                  {TRAINER_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 sm:mt-8">
            <h3 className="text-[1.1rem] font-bold text-[#1f2430] sm:text-[1.25rem]">Family Profile</h3>

            <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClass}>Marital Status</label>
                <select
                  name="maritalStatus"
                  value={form.maritalStatus}
                  onChange={handleChange}
                  className={inputClass()}
                >
                  {MARITAL_STATUS_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              {form.maritalStatus === "Married" && (
                <>
                  <div>
                    <label className={labelClass}>1. Spouse Name</label>
                    <input
                      name="spouseName"
                      value={form.spouseName}
                      onChange={handleChange}
                      className={inputClass(errors.spouseName)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>2. Spouse DOB</label>
                    <input
                      type="date"
                      name="spouseDob"
                      value={form.spouseDob}
                      max={today}
                      onChange={handleChange}
                      className={inputClass(errors.spouseDob)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>3. Spouse Blood Group</label>
                    <select
                      name="spouseBloodGroup"
                      value={form.spouseBloodGroup}
                      onChange={handleChange}
                      className={inputClass(errors.spouseBloodGroup)}
                    >
                      <option value="">Select blood group</option>
                      {BLOOD_GROUP_OPTIONS.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>4. Date of Anniversary</label>
                    <input
                      type="date"
                      name="anniversary"
                      value={form.anniversary}
                      max={today}
                      onChange={handleChange}
                      className={inputClass(errors.anniversary)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>Children Count</label>
                    <select
                      name="childrenCount"
                      value={form.childrenCount}
                      onChange={handleChange}
                      className={inputClass()}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>

                  {(form.childrenCount === "1" || form.childrenCount === "2") && (
                    <>
                      <div>
                        <label className={labelClass}>Child 1 Name</label>
                        <input
                          name="child1Name"
                          value={form.child1Name}
                          onChange={handleChange}
                          className={inputClass(errors.child1Name)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Child 1 DOB</label>
                        <input
                          type="date"
                          name="child1Dob"
                          value={form.child1Dob}
                          max={today}
                          onChange={handleChange}
                          className={inputClass(errors.child1Dob)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Child 1 Blood Group</label>
                        <select
                          name="child1BloodGroup"
                          value={form.child1BloodGroup}
                          onChange={handleChange}
                          className={inputClass(errors.child1BloodGroup)}
                        >
                          <option value="">Select blood group</option>
                          {BLOOD_GROUP_OPTIONS.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>Child 1 Gender</label>
                        <select
                          name="child1Gender"
                          value={form.child1Gender}
                          onChange={handleChange}
                          className={inputClass(errors.child1Gender)}
                        >
                          <option value="">Select gender</option>
                          {CHILD_GENDER_OPTIONS.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {form.childrenCount === "2" && (
                    <>
                      <div>
                        <label className={labelClass}>Child 2 Name</label>
                        <input
                          name="child2Name"
                          value={form.child2Name}
                          onChange={handleChange}
                          className={inputClass(errors.child2Name)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Child 2 DOB</label>
                        <input
                          type="date"
                          name="child2Dob"
                          value={form.child2Dob}
                          max={today}
                          onChange={handleChange}
                          className={inputClass(errors.child2Dob)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Child 2 Blood Group</label>
                        <select
                          name="child2BloodGroup"
                          value={form.child2BloodGroup}
                          onChange={handleChange}
                          className={inputClass(errors.child2BloodGroup)}
                        >
                          <option value="">Select blood group</option>
                          {BLOOD_GROUP_OPTIONS.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>Child 2 Gender</label>
                        <select
                          name="child2Gender"
                          value={form.child2Gender}
                          onChange={handleChange}
                          className={inputClass(errors.child2Gender)}
                        >
                          <option value="">Select gender</option>
                          {CHILD_GENDER_OPTIONS.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </>
              )}

              {form.maritalStatus === "Single" && (
                <div className="md:col-span-2 rounded-2xl bg-[#f7f8fc] px-3 py-3 text-[13px] text-[#6b7280] sm:px-4 sm:py-4 sm:text-[14px]">
                  Single selected. Click Next to continue.
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 sm:mt-8">
            <h3 className="text-[1.1rem] font-bold text-[#1f2430] sm:text-[1.25rem]">Business Profile</h3>

            <div className="mt-4 sm:mt-6">
              {form.businessProfile === "Business" && (
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>1. Business Name</label>
                    <input
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      className={inputClass(errors.businessName)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>2. Designation</label>
                    <input
                      name="businessDesignation"
                      value={form.businessDesignation}
                      onChange={handleChange}
                      className={inputClass(errors.businessDesignation)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>3. Email</label>
                    <input
                      name="businessEmail"
                      value={form.businessEmail}
                      onChange={handleChange}
                      className={inputClass(errors.businessEmail)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>4. Address</label>
                    <input
                      name="businessAddress"
                      value={form.businessAddress}
                      onChange={handleChange}
                      className={inputClass(errors.businessAddress)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>5. Business Phone</label>
                    <input
                      name="businessPhone"
                      value={form.businessPhone}
                      onChange={handleChange}
                      className={inputClass(errors.businessPhone)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>6. Business Website</label>
                    <input
                      name="businessWebsite"
                      value={form.businessWebsite}
                      onChange={handleChange}
                      className={inputClass()}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>7. Business Name Card</label>
                    {renderUploadBox(
                      "Upload Business Name Card",
                      "JPG / PNG / PDF",
                      (e) => handleSingleFile(e, "businessCardImage", 3),
                      form.businessCardImage
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>8. Business Images</label>
                    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[22px] border border-dashed border-[#d7dbe4] bg-[#fafbff] px-3 py-3 transition hover:border-[#5b3df5] sm:gap-4 sm:px-4 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f1edff] text-[#5b3df5] sm:h-12 sm:w-12">
                          <ImagePlus className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#1f2430] sm:text-[14px]">Upload Business Images</p>
                          <p className="text-[11px] text-[#7b8494] sm:text-[12px]">Maximum 4 images</p>
                        </div>
                      </div>
                      <input type="file" multiple className="hidden" onChange={handleGalleryUpload} />
                      <span className="rounded-full bg-[#5b3df5] px-3 py-1.5 text-[11px] font-semibold text-white sm:px-4 sm:py-2 sm:text-[12px]">
                        Upload
                      </span>
                    </label>

                    {businessGallery.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3 md:grid-cols-4">
                        {businessGallery.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Business ${index + 1}`}
                            className="h-20 w-full rounded-2xl object-cover ring-1 ring-[#e8ebf2] sm:h-24"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {form.businessProfile === "Salaried" && (
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>1. Company Name</label>
                    <input
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      className={inputClass(errors.companyName)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>2. Designation</label>
                    <input
                      name="salariedDesignation"
                      value={form.salariedDesignation}
                      onChange={handleChange}
                      className={inputClass(errors.salariedDesignation)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>3. Location / Address</label>
                    <input
                      name="companyAddress"
                      value={form.companyAddress}
                      onChange={handleChange}
                      className={inputClass(errors.companyAddress)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>4. Official Email (Optional)</label>
                    <input
                      name="officialEmail"
                      value={form.officialEmail}
                      onChange={handleChange}
                      className={inputClass()}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>5. Visiting Card Image (Optional)</label>
                    {renderUploadBox(
                      "Upload Visiting Card",
                      "Optional",
                      (e) => handleSingleFile(e, "visitingCardImage", 3),
                      form.visitingCardImage
                    )}
                  </div>
                </div>
              )}

              {!form.businessProfile && (
                <div className="rounded-2xl bg-[#f7f8fc] px-3 py-3 text-[13px] text-[#6b7280] sm:px-4 sm:py-4 sm:text-[14px]">
                  First choose “Business Profile” in Section 1.
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mt-6 sm:mt-8">
            <h3 className="text-[1.1rem] font-bold text-[#1f2430] sm:text-[1.25rem]">Social Profile</h3>

            <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>1. Facebook</label>
                <input
                  name="facebook"
                  value={form.facebook}
                  onChange={handleChange}
                  className={inputClass()}
                  placeholder="Facebook URL"
                />
              </div>

              <div>
                <label className={labelClass}>2. Insta</label>
                <input
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  className={inputClass()}
                  placeholder="Instagram URL"
                />
              </div>

              <div>
                <label className={labelClass}>3. Youtube</label>
                <input
                  name="youtube"
                  value={form.youtube}
                  onChange={handleChange}
                  className={inputClass()}
                  placeholder="YouTube URL"
                />
              </div>

              <div>
                <label className={labelClass}>4. LinkedIn</label>
                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  className={inputClass()}
                  placeholder="LinkedIn URL"
                />
              </div>

              <div>
                <label className={labelClass}>5. Others - Name</label>
                <input
                  name="otherSocialName"
                  value={form.otherSocialName}
                  onChange={handleChange}
                  className={inputClass()}
                  placeholder="Eg: Twitter"
                />
              </div>

              <div>
                <label className={labelClass}>Others - Link</label>
                <input
                  name="otherSocialLink"
                  value={form.otherSocialLink}
                  onChange={handleChange}
                  className={inputClass()}
                  placeholder="Paste URL"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef1f6] pt-5 sm:mt-8 sm:pt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold sm:px-5 sm:py-3 sm:text-[14px] ${
              step === 1
                ? "cursor-not-allowed bg-[#f1f3f7] text-[#a3aab8]"
                : "bg-[#eef1ff] text-[#4e3ae9]"
            }`}
          >
            Back
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {step < 4 ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-full bg-gradient-to-r from-[#4e3ae9] to-[#6a42f5] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_14px_22px_rgba(78,58,233,0.22)] sm:px-6 sm:py-3 sm:text-[14px]"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-full bg-gradient-to-r from-[#4e3ae9] to-[#6a42f5] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_14px_22px_rgba(78,58,233,0.22)] sm:px-6 sm:py-3 sm:text-[14px]"
              >
                Save Member
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberProfileModal({ member, onClose, onSave }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(member);

  useEffect(() => {
    setDraft(member);
  }, [member]);

  if (!member || !draft) return null;

  const gallery = draft.profile?.businessGallery || [];
  const missingFields = getMissingProfileFields(draft.profile);

  const nextImage = () => {
    if (!gallery.length) return;
    setActiveImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    if (!gallery.length) return;
    setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const updateDraft = (path, value) => {
    setDraft((prev) => {
      const clone = structuredClone(prev);
      const keys = path.split(".");
      let ref = clone;
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
      ref[keys[keys.length - 1]] = value;
      return clone;
    });
  };

  const renderValue = (value, fallback = "Not added") => {
    return value ? value : <span className="text-red-500">{fallback}</span>;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(15,23,42,0.35)] backdrop-blur-[6px] px-3 py-4 sm:px-4 sm:py-6">
      <div className="relative max-h-[94vh] w-full max-w-[95%] overflow-y-auto rounded-[34px] bg-[#f6f7fb] p-4 shadow-[0_40px_100px_rgba(37,34,79,0.28)] ring-1 ring-[#e8ebf2] sm:max-w-[1180px] sm:p-6 md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#697386] shadow-sm ring-1 ring-[#eceff5] sm:h-12 sm:w-12"
          >
            ✕
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                if (isEditing) {
                  onSave(draft);
                }
                setIsEditing((prev) => !prev);
              }}
              className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-[#5d6575] shadow-sm ring-1 ring-[#eceff5] sm:px-5 sm:py-3 sm:text-[12px]"
            >
              {isEditing ? "SAVE" : "EDIT"}
            </button>

            <button className="rounded-full bg-gradient-to-r from-[#5b3df5] to-[#6a42f5] px-4 py-2 text-[11px] font-semibold text-white shadow-[0_16px_26px_rgba(91,61,245,0.25)] sm:px-6 sm:py-3 sm:text-[12px]">
              ADMIN ACTIONS
            </button>
          </div>
        </div>

        {missingFields.length > 0 && (
          <div className="mt-4 rounded-[24px] border border-amber-200 bg-amber-50 px-4 py-3 sm:mt-6 sm:px-5 sm:py-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500 sm:h-5 sm:w-5" />
              <div>
                <p className="text-[13px] font-semibold text-amber-700 sm:text-[14px]">
                  Missing Details
                </p>
                <p className="mt-1 text-[12px] text-amber-700 sm:text-[13px]">
                  {missingFields.join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-1 lg:grid-cols-[320px_1fr]">
          <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-6">
            <div className="mx-auto relative h-[140px] w-[140px] overflow-hidden rounded-[28px] ring-4 ring-white shadow-lg sm:h-[170px] sm:w-[170px]">
              <img
                src={draft.profile?.profileImage || draft.avatar}
                alt={draft.name}
                className="h-full w-full object-cover"
              />

              {isEditing && (
                <>
                  <label className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-[#5b3df5] px-2 py-0.5 text-[10px] font-semibold text-white shadow sm:px-3 sm:py-1 sm:text-[11px]">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const base64 = await fileToBase64(file);
                        updateDraft("profile.profileImage", base64);
                      }}
                      className="hidden"
                    />
                  </label>

                  {draft.profile?.profileImage && (
                    <button
                      onClick={() => updateDraft("profile.profileImage", "")}
                      className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] sm:top-2 sm:right-2 sm:h-7 sm:w-7 sm:text-[12px]"
                    >
                      ✕
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="mt-5 text-center space-y-2 sm:mt-6">
              {isEditing ? (
                <>
                  <input
                    value={draft.name || ""}
                    onChange={(e) => updateDraft("name", e.target.value)}
                    placeholder="Enter Name"
                    className="w-full text-center text-[1.5rem] font-bold rounded-2xl border border-[#e8ebf2] px-2 py-1.5 outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[2rem]"
                  />
                  <input
                    value={draft.profile?.businessRole || ""}
                    onChange={(e) => updateDraft("profile.businessRole", e.target.value)}
                    placeholder="Enter Role"
                    className="w-full text-center text-[13px] font-medium text-[#6a42f5] rounded-2xl border border-[#e8ebf2] px-2 py-1.5 outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[15px]"
                  />
                  <input
                    value={draft.profile?.businessName || ""}
                    onChange={(e) => updateDraft("profile.businessName", e.target.value)}
                    placeholder="Enter Business Name"
                    className="w-full text-center text-[13px] text-[#7d8595] rounded-2xl border border-[#e8ebf2] px-2 py-1.5 outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[15px]"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-[1.8rem] font-bold leading-[1.02] tracking-[-0.05em] text-[#161c31] sm:text-[2.3rem]">
                    {draft.name}
                  </h2>
                  <p className="mt-2 text-[13px] font-medium text-[#6a42f5] sm:text-[15px]">
                    {draft.profile?.businessRole}
                  </p>
                  <p className="mt-1 text-[13px] text-[#7d8595] sm:text-[15px]">
                    {draft.profile?.businessName}
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 space-y-4 border-t border-[#edf0f5] pt-5 sm:mt-8 sm:space-y-5 sm:pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa2b0] sm:text-[11px]">Phone</p>
                {isEditing ? (
                  <input
                    value={draft.profile?.phone || ""}
                    onChange={(e) => updateDraft("profile.phone", e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-1.5 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[15px]"
                  />
                ) : (
                  <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.phone)}</p>
                )}
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa2b0] sm:text-[11px]">Email</p>
                {isEditing ? (
                  <input
                    value={draft.profile?.email || ""}
                    onChange={(e) => updateDraft("profile.email", e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-1.5 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[15px]"
                  />
                ) : (
                  <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.email)}</p>
                )}
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa2b0] sm:text-[11px]">Member ID</p>
                {isEditing ? (
                  <input
                    value={draft.profile?.memberId || ""}
                    onChange={(e) => updateDraft("profile.memberId", e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-1.5 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[15px]"
                  />
                ) : (
                  <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.memberId)}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-7">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a42f5] sm:mb-4 sm:text-[12px]">
                Business Overview
              </div>

              {isEditing ? (
                <textarea
                  value={draft.about || ""}
                  onChange={(e) => updateDraft("about", e.target.value)}
                  className="min-h-[100px] w-full rounded-2xl border border-[#e8ebf2] px-3 py-2 text-[14px] outline-none focus:border-[#5b3df5] sm:min-h-[110px] sm:px-4 sm:py-3 sm:text-[16px]"
                />
              ) : (
                <p className="text-[14px] leading-7 text-[#616979] sm:text-[16px] sm:leading-8">{renderValue(draft.about)}</p>
              )}
            </div>

            <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-7">
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a42f5] sm:mb-5 sm:text-[12px]">
                  Family Details
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Marital Status</p>
                    {isEditing ? (
                      <select
                        value={draft.profile?.family?.maritalStatus || "Single"}
                        onChange={(e) => updateDraft("profile.family.maritalStatus", e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:mt-2 sm:px-4 sm:py-3 sm:text-[15px]"
                      >
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.family?.maritalStatus)}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Member DOB</p>
                    {isEditing ? (
                      <input
                        type="date"
                        value={draft.profile?.dob || ""}
                        onChange={(e) => updateDraft("profile.dob", e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                      />
                    ) : (
                      <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.dob)}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Blood Group</p>
                    {isEditing ? (
                      <select
                        value={draft.profile?.bloodGroup || ""}
                        onChange={(e) => updateDraft("profile.bloodGroup", e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-[#e8ebf2] bg-white px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.bloodGroup)}</p>
                    )}
                  </div>

                  {draft.profile?.family?.maritalStatus === "Married" && (
                    <>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Spouse Name</p>
                        {isEditing ? (
                          <input
                            value={draft.profile?.family?.spouse?.name || ""}
                            onChange={(e) => updateDraft("profile.family.spouse.name", e.target.value)}
                            className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                          />
                        ) : (
                          <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.family?.spouse?.name)}</p>
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Spouse DOB</p>
                        {isEditing ? (
                          <input
                            type="date"
                            value={draft.profile?.family?.spouse?.dob || ""}
                            onChange={(e) => updateDraft("profile.family.spouse.dob", e.target.value)}
                            className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                          />
                        ) : (
                          <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.family?.spouse?.dob)}</p>
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Spouse Blood Group</p>
                        {isEditing ? (
                          <select
                            value={draft.profile?.family?.spouse?.bloodGroup || ""}
                            onChange={(e) => updateDraft("profile.family.spouse.bloodGroup", e.target.value)}
                            className="mt-1 w-full rounded-2xl border border-[#e8ebf2] bg-white px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                          >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        ) : (
                          <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.family?.spouse?.bloodGroup)}</p>
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Anniversary</p>
                        {isEditing ? (
                          <input
                            type="date"
                            value={draft.profile?.family?.anniversary || ""}
                            onChange={(e) => updateDraft("profile.family.anniversary", e.target.value)}
                            className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                          />
                        ) : (
                          <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.family?.anniversary)}</p>
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Children</p>
                        {isEditing ? (
                          <div className="mt-1 space-y-3 sm:mt-2">
                            <select
                              value={String(
                                draft.profile?.family?.childrenCount ??
                                  (draft.profile?.family?.children?.length ?? 0)
                              )}
                              onChange={(e) => {
                                const count = Number(e.target.value);
                                const currentChildren = draft.profile?.family?.children || [];
                                let nextChildren = [...currentChildren];

                                if (count === 0) nextChildren = [];
                                if (count === 1) nextChildren = [nextChildren[0] || { name: "", dob: "" }];
                                if (count === 2)
                                  nextChildren = [
                                    nextChildren[0] || { name: "", dob: "" },
                                    nextChildren[1] || { name: "", dob: "" },
                                  ];

                                updateDraft("profile.family.childrenCount", count);
                                updateDraft("profile.family.children", nextChildren);
                              }}
                              className="w-full rounded-2xl border border-[#e8ebf2] bg-white px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                            >
                              <option value="0">No Child</option>
                              <option value="1">1 Child</option>
                              <option value="2">2 Children</option>
                            </select>

                            {(draft.profile?.family?.children || []).map((child, index) => (
                              <div key={index} className="rounded-2xl bg-[#f5f6fa] px-3 py-3 sm:px-4 sm:py-4">
                                <p className="mb-2 text-[12px] font-semibold text-[#1f2430] sm:mb-3 sm:text-[13px]">
                                  Child {index + 1}
                                </p>

                                <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
                                  <input
                                    value={child.name || ""}
                                    onChange={(e) => {
                                      const nextChildren = [...(draft.profile?.family?.children || [])];
                                      nextChildren[index] = {
                                        ...nextChildren[index],
                                        name: e.target.value,
                                      };
                                      updateDraft("profile.family.children", nextChildren);
                                    }}
                                    placeholder={`Child ${index + 1} Name`}
                                    className="w-full rounded-2xl border border-[#e8ebf2] bg-white px-2 py-2 text-[12px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[13px]"
                                  />

                                  <input
                                    type="date"
                                    value={child.dob || ""}
                                    onChange={(e) => {
                                      const nextChildren = [...(draft.profile?.family?.children || [])];
                                      nextChildren[index] = {
                                        ...nextChildren[index],
                                        dob: e.target.value,
                                      };
                                      updateDraft("profile.family.children", nextChildren);
                                    }}
                                    className="w-full rounded-2xl border border-[#e8ebf2] bg-white px-2 py-2 text-[12px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[13px]"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-1 space-y-2 sm:mt-2">
                            {(draft.profile?.family?.children || []).length > 0 ? (
                              (draft.profile?.family?.children || []).map((child, index) => (
                                <div key={index} className="rounded-2xl bg-[#f5f6fa] px-3 py-2 sm:px-4 sm:py-3">
                                  <p className="text-[13px] font-semibold text-[#1f2430] sm:text-[14px]">{child.name}</p>
                                  <p className="mt-1 text-[12px] text-[#7c8393] sm:text-[13px]">DOB: {child.dob}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-[13px] text-red-500 sm:text-[14px]">Child details not added</p>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-7">
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a42f5] sm:mb-5 sm:text-[12px]">
                  Business Details
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Business Name</p>
                    {isEditing ? (
                      <input
                        value={draft.profile?.business?.name || ""}
                        onChange={(e) => updateDraft("profile.business.name", e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                      />
                    ) : (
                      <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.business?.name)}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Business Contact No</p>
                    {isEditing ? (
                      <input
                        value={draft.profile?.business?.contactNo || ""}
                        onChange={(e) => updateDraft("profile.business.contactNo", e.target.value)}
                        placeholder="Enter business contact number"
                        className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                      />
                    ) : (
                      <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.business?.contactNo)}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Business Address</p>
                    {isEditing ? (
                      <textarea
                        value={draft.profile?.business?.address || ""}
                        onChange={(e) => updateDraft("profile.business.address", e.target.value)}
                        placeholder="Enter business address"
                        rows={2}
                        className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[15px]"
                      />
                    ) : (
                      <p className="mt-1 text-[13px] leading-6 text-[#4f5666] sm:text-[15px] sm:leading-7">
                        {renderValue(draft.profile?.business?.address)}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Business Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={draft.profile?.business?.email || ""}
                        onChange={(e) => updateDraft("profile.business.email", e.target.value)}
                        placeholder="Enter business email"
                        className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                      />
                    ) : (
                      <p className="mt-1 text-[13px] text-[#4f5666] sm:text-[15px]">{renderValue(draft.profile?.business?.email)}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">Google Map Location</p>
                    {isEditing ? (
                      <input
                        value={draft.profile?.business?.mapLocation || ""}
                        onChange={(e) => updateDraft("profile.business.mapLocation", e.target.value)}
                        placeholder="Paste Google Maps URL"
                        className="mt-1 w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[13px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2"
                      />
                    ) : draft.profile?.business?.mapLocation ? (
                      <a
                        href={draft.profile.business.mapLocation}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-[#5b3df5] sm:gap-2 sm:text-[15px]"
                      >
                        Open Location <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    ) : (
                      <p className="mt-1 text-[13px] text-red-500 sm:text-[15px]">Map location not added</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-7">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a42f5] sm:mb-5 sm:text-[12px]">
                Visiting Card
              </div>

              {isEditing ? (
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const base64 = await fileToBase64(file);
                      updateDraft("profile.business.visitingCardImage", base64);
                    }}
                    className="block w-full text-[12px] sm:text-[14px]"
                  />

                  {draft.profile?.business?.visitingCardImage ? (
                    <div className="relative overflow-hidden rounded-[24px]">
                      <img
                        src={draft.profile.business.visitingCardImage}
                        className="max-h-[280px] w-full object-contain bg-[#f8f9fc] sm:max-h-[320px]"
                      />
                      <button
                        onClick={() => updateDraft("profile.business.visitingCardImage", "")}
                        className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] sm:right-3 sm:top-3 sm:h-7 sm:w-7 sm:text-[12px]"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <p className="text-[13px] text-[#7c8393] sm:text-[14px]">Upload visiting card image</p>
                  )}
                </div>
              ) : draft.profile?.business?.visitingCardImage ? (
                <div className="overflow-hidden rounded-[24px]">
                  <img
                    src={draft.profile.business.visitingCardImage}
                    alt="Visiting Card"
                    className="max-h-[280px] w-full object-contain bg-[#f8f9fc] sm:max-h-[320px]"
                  />
                </div>
              ) : (
                <div className="rounded-2xl bg-[#f7f8fb] px-3 py-6 text-center text-[13px] text-red-500 sm:px-4 sm:py-10 sm:text-[14px]">
                  Visiting card not uploaded.
                </div>
              )}
            </div>

            <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-7">
              <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a42f5] sm:text-[12px]">
                  Business Gallery
                </div>

                {!isEditing && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button onClick={prevImage} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6f7fb] text-[#5f6778] ring-1 ring-[#eceff5] sm:h-10 sm:w-10">‹</button>
                    <button onClick={nextImage} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6f7fb] text-[#5f6778] ring-1 ring-[#eceff5] sm:h-10 sm:w-10">›</button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (!files.length) return;
                      const base64Images = await Promise.all(files.slice(0, 4).map(fileToBase64));
                      updateDraft("profile.businessGallery", base64Images);
                    }}
                    className="block w-full text-[12px] sm:text-[14px]"
                  />

                  {(draft.profile?.businessGallery || []).length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
                      {(draft.profile.businessGallery || []).map((img, index) => (
                        <div key={index} className="relative">
                          <img src={img} className="h-16 w-full rounded-xl object-cover sm:h-20" />
                          <button
                            onClick={() => {
                              const updated = [...draft.profile.businessGallery];
                              updated.splice(index, 1);
                              updateDraft("profile.businessGallery", updated);
                            }}
                            className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[8px] sm:h-5 sm:w-5 sm:text-[10px]"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-[#7c8393] sm:text-[14px]">Upload up to 4 images</p>
                  )}
                </div>
              ) : gallery.length > 0 ? (
                <>
                  <div className="overflow-hidden rounded-[24px]">
                    <img src={gallery[activeImage]} alt="Business" className="h-[240px] w-full object-cover sm:h-[320px]" />
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
                    {gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`overflow-hidden rounded-2xl ring-2 ${
                          activeImage === index ? "ring-[#5b3df5]" : "ring-transparent"
                        }`}
                      >
                        <img src={image} alt={`thumb-${index}`} className="h-14 w-full object-cover sm:h-20" />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-2xl bg-[#f7f8fb] px-3 py-6 text-center text-[13px] text-red-500 sm:px-4 sm:py-10 sm:text-[14px]">
                  No gallery images uploaded.
                </div>
              )}
            </div>

            <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-7">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a42f5] sm:mb-5 sm:text-[12px]">
                Social Media Links
              </div>

              {isEditing ? (
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  {[
                    ["facebook", "Facebook"],
                    ["instagram", "Instagram"],
                    ["youtube", "YouTube"],
                    ["linkedin", "LinkedIn"],
                    ["pinterest", "Pinterest"],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b0] sm:text-[11px]">
                        {label}
                      </p>
                      <input
                        value={draft.profile?.socialLinks?.[key] || ""}
                        onChange={(e) => updateDraft(`profile.socialLinks.${key}`, e.target.value)}
                        placeholder={`Enter ${label} URL`}
                        className="w-full rounded-2xl border border-[#e8ebf2] px-2 py-2 text-[12px] outline-none focus:border-[#5b3df5] sm:px-3 sm:py-2 sm:text-[14px]"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    ["Facebook", draft.profile?.socialLinks?.facebook],
                    ["Instagram", draft.profile?.socialLinks?.instagram],
                    ["YouTube", draft.profile?.socialLinks?.youtube],
                    ["LinkedIn", draft.profile?.socialLinks?.linkedin],
                    ["Pinterest", draft.profile?.socialLinks?.pinterest],
                  ].map(([label, link]) =>
                    link ? (
                      <a
                        key={label}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-[#f3f4f8] px-3 py-1.5 text-[12px] font-semibold text-[#4f5666] sm:px-4 sm:py-2 sm:text-[13px]"
                      >
                        {label}
                      </a>
                    ) : (
                      <span
                        key={label}
                        className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[12px] font-semibold text-red-500 sm:px-4 sm:py-2 sm:text-[13px]"
                      >
                        {label} not added
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MembersPage({
  onLogout,
  onNavigate,
  activePage,
  showSettingsPage,
  setShowSettingsPage,
}) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("membersData");
    return savedMembers ? JSON.parse(savedMembers) : initialMembers;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");
  
  useEffect(() => {
    localStorage.setItem("membersData", JSON.stringify(members));
  }, [members]);

  const filteredMembers = useMemo(() => {
    let result = members;
    
    if (selectedTag !== "All") {
      result = result.filter((member) => {
        const tags = member.tags || [];
        if (selectedTag === "Past President") {
          return tags.includes("Past President") || member.role?.toLowerCase().includes("president");
        }
        return tags.includes(selectedTag);
      });
    }

    const value = searchTerm.trim().toLowerCase();
    if (!value) return result;

    return result.filter((member) => {
      const text = [
        member.name,
        member.role,
        member.about,
        ...(member.tags || []),
        member.profile?.businessName,
        member.profile?.businessRole,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(value);
    });
  }, [members, searchTerm, selectedTag]);

  const handleAddMember = (newMember) => {
    setMembers((prev) => [...prev, newMember]);
  };

  const handleDeleteMember = (memberToDelete) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${memberToDelete.name}?`
    );
    if (!confirmDelete) return;

    setMembers((prev) =>
      prev.filter((member) => member.name !== memberToDelete.name)
    );
  };

  const handleSaveMember = (updatedMember) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.name === updatedMember.name ? updatedMember : member
      )
    );
    setSelectedMember(updatedMember);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f4f5f7] text-[#1f2430]">
      <div className="flex h-screen overflow-hidden">
        {/* Mobile menu button - moved to top-right */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 z-50 rounded-full bg-[#5b3df5] p-3 text-white shadow-lg lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Sidebar - responsive */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-[260px] transform border-r border-[#edf0f5] bg-[#f7f9fc] px-4 py-5 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:px-5 sm:py-6`}>
          <div className="flex h-full flex-col">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_12px_26px_rgba(31,36,48,0.08)] sm:h-11 sm:w-11">
                  <img src={logo} alt="JCI Logo" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1f2430] sm:text-[15px]">JCI Madurai Central</p>
                  <p className="text-[11px] text-[#8c90a0] sm:text-[12px]">Admin Portal</p>
                </div>
              </div>

              <nav className="mt-8 space-y-1 sm:mt-10 sm:space-y-2">
                <SidebarItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={activePage === "dashboard"}
                  onClick={() => {
                    onNavigate("dashboard");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={Users}
                  label="Members"
                  active={activePage === "members"}
                  onClick={() => {
                    onNavigate("members");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={FolderKanban}
                  label="Member Classification"
                  active={activePage === "Memberclassification"}
                  onClick={() => {
                    onNavigate("Memberclassification");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={CalendarDays}
                  label="Events"
                  active={activePage === "events"}
                  onClick={() => {
                    onNavigate("events");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={BarChart3}
                  label="Analytics"
                  active={activePage === "analytics"}
                  onClick={() => {
                    onNavigate("analytics");
                    setMobileMenuOpen(false);
                  }}
                />
                <SettingsToggleBlock
                  activePage={activePage}
                  onNavigate={(page) => {
                    onNavigate(page);
                    setMobileMenuOpen(false);
                  }}
                  showSettingsPage={showSettingsPage}
                  setShowSettingsPage={setShowSettingsPage}
                />
              </nav>
            </div>

            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="mt-auto flex h-[50px] w-full items-center justify-center rounded-full bg-[#ff1a12] text-[14px] font-semibold text-white shadow-[0_20px_30px_rgba(255,26,18,0.22)] sm:h-[56px] sm:text-[16px]"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="h-screen flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-7 xl:px-10">
          <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[1.6rem] font-bold tracking-[-0.05em] leading-none text-[#1f2430] sm:text-[1.8rem] lg:text-[2.2rem]">
                Members Directory
              </h1>
              <p className="mt-2 text-[13px] text-[#6f7787] sm:mt-3 sm:text-[14px] lg:text-[1rem]">
                Manage your directory members and add new profiles easily.
              </p>
              
              <div className="mt-5 flex h-[44px] w-full max-w-[320px] items-center gap-3 rounded-full bg-white px-4 shadow-sm ring-1 ring-[#eceef4] sm:mt-6 sm:h-[50px]">
                <Search className="h-3.5 w-3.5 text-[#9aa2b0] sm:h-4 sm:w-4" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-[13px] text-[#4d5364] outline-none placeholder:text-[#b5b9c6] sm:text-[14px]"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 sm:items-end">
              <div className="flex items-center gap-3 sm:gap-4">
                <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#636b7b] shadow-sm ring-1 ring-[#eceef4] transition hover:bg-[#fafbff] sm:h-12 sm:w-12">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#5b3df5] sm:top-3.5 sm:right-3.5"></span>
                </button>
                <div className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-[#eceef4] sm:px-5 sm:py-2">
                  <img
                    src={saran}
                    alt="Sarankumar R"
                    className="h-8 w-8 rounded-full border border-[#f0f2f5] object-cover sm:h-10 sm:w-10"
                  />
                  <span className="text-[14px] font-bold text-[#1f2430] sm:text-[16px]">Sarankumar R</span>
                </div>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4e3ae9] to-[#6a42f5] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_14px_22px_rgba(78,58,233,0.22)] transition hover:-translate-y-0.5 sm:w-auto sm:px-8 sm:py-3.5"
              >
                <span className="text-xl">+</span> Add Member
              </button>
            </div>
          </section>

          <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
            {["All", "LGB", "Members", "Appointee", "JAC", "Past President", "Business", "Salaried"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:py-2 sm:text-[12px] ${
                  selectedTag === tag
                    ? "bg-[#5b3df5] text-white"
                    : "bg-white text-[#767d8b] ring-1 ring-[#eceef4]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <section className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredMembers.map((member, index) => (
              <MemberCard
                key={`${member.name}-${index}`}
                member={member}
                onViewProfile={setSelectedMember}
                onDelete={handleDeleteMember}
              />
            ))}

            <button
              onClick={() => setShowAddModal(true)}
              className="flex min-h-[340px] flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-[#d7dbe4] bg-white px-4 py-5 text-center shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] transition hover:-translate-y-1 hover:border-[#5b3df5] sm:min-h-[370px] sm:px-5 sm:py-6"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1edff] text-[1.8rem] font-bold text-[#5b3df5] sm:h-16 sm:w-16 sm:text-[2rem]">
                +
              </span>
              <h3 className="mt-3 text-[1.1rem] font-bold text-[#1f2430] sm:mt-4 sm:text-[1.2rem]">Add Member</h3>
              <p className="mt-2 max-w-[160px] text-[12px] leading-6 text-[#707785] sm:max-w-[180px] sm:text-[13px]">
                Click here to add a new member card dynamically.
              </p>
            </button>
          </section>

          <div className="mt-8 flex items-center justify-center gap-3 text-[14px] text-[#6f7787] sm:mt-10 sm:gap-4 sm:text-[16px]">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#666f80] shadow-sm ring-1 ring-[#eceef4] hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4e3ae9] text-white shadow-md sm:h-9 sm:w-9">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#666f80] shadow-sm ring-1 ring-[#eceef4] hover:bg-gray-50">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#666f80] shadow-sm ring-1 ring-[#eceef4] hover:bg-gray-50">
              3
            </button>
            <span className="text-[#9aa2b0]">...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#666f80] shadow-sm ring-1 ring-[#eceef4] hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </main>

        {selectedMember && (
          <MemberProfileModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            onSave={handleSaveMember}
          />
        )}

        {showAddModal && (
          <AddMemberModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddMember}
          />
        )}
      </div>
    </div>
  );
}

function StatCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="rounded-[26px] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:px-5 sm:py-5 md:px-6">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.iconWrap} sm:h-11 sm:w-11`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        {item.badge ? (
          <div className={`rounded-full px-2 py-0.5 text-[10px] font-semibold leading-none sm:px-3 sm:py-1 sm:text-[11px] ${item.badgeClass}`}>
            {item.badge}
          </div>
        ) : null}
      </div>
      <p className="mt-4 text-[13px] text-[#575d6b] sm:mt-5 sm:text-[15px]">{item.title}</p>
      <h3 className="mt-1 text-[1.8rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[2rem] md:text-[2.25rem]">{item.value}</h3>
    </div>
  );
}

function GrowthChart() {
  const [selectedRange, setSelectedRange] = useState("this-year");
  const currentChart = chartData[selectedRange];
  const path = useMemo(() => buildSmoothPath(currentChart.points, 1000, 260), [currentChart]);
  const markerPoint = currentChart.points[currentChart.markerIndex] || currentChart.points[0];
  const markerX = (markerPoint.x / 100) * 1000;
  const markerY = (markerPoint.y / 100) * 260;
  const ranges = [
    { key: "this-year", label: "This Year" },
    { key: "last-2-years", label: "Last 2 Years" },
    { key: "last-3-years", label: "Last 3 Years" },
  ];

  return (
    <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-[1.5rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.8rem] md:text-[2rem]">
            Member Growth
          </h3>
          <p className="mt-1 text-[13px] text-[#7d8493] sm:text-[14px] md:text-[15px]">
            {currentChart.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-full bg-[#f1f2f6] p-1 text-[10px] font-semibold sm:text-[11px] md:text-[12px]">
          {ranges.map((range) => (
            <button
              key={range.key}
              type="button"
              onClick={() => setSelectedRange(range.key)}
              className={`rounded-full px-2 py-1 transition sm:px-3 sm:py-1.5 md:px-4 ${
                selectedRange === range.key
                  ? "bg-[#4c39ea] text-white shadow"
                  : "text-[#6f7787]"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[18px] sm:mt-6 md:mt-7">
        <svg viewBox="0 0 1000 320" className="w-full overflow-visible">
          <defs>
            <linearGradient id="areaFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b3df5" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#5b3df5" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={`${path} L 1000 290 L 0 290 Z`} fill="url(#areaFade)" />
          <path d={path} fill="none" stroke="#4f35ec" strokeWidth="5" strokeLinecap="round" />
          <circle cx={markerX} cy={markerY} r="6" fill="#4f35ec" />
          <line x1="0" y1="290" x2="1000" y2="290" stroke="#eceef4" strokeWidth="2" />
        </svg>

        <div className="mt-1 grid grid-cols-6 text-center text-[9px] font-bold tracking-[0.18em] text-[#8d93a2] sm:text-[10px] md:text-[11px]">
          {currentChart.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryDistribution() {
  return (
    <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-8">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <h3 className="text-[1.5rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.8rem] md:text-[2rem]">Category Distribution</h3>
        <button className="rounded-full p-1 text-[#737b8a] hover:bg-[#f4f5f8] sm:p-2">
          <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5 md:mt-8 md:space-y-6">
        {categoryData.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-[#363c48] sm:gap-3 sm:text-[14px] md:text-[15px]">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#e5e8ef] sm:h-2.5">
              <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="rounded-[30px] bg-[#f3f6f9] p-4 shadow-[0_8px_24px_rgba(25,30,60,0.03)] ring-1 ring-[#edf0f5] sm:p-5 md:p-6 lg:p-8">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <h3 className="text-[1.5rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.8rem] md:text-[2rem]">Recent Activity</h3>
        <button className="text-[12px] font-semibold text-[#4f35ec] sm:text-[13px]">View all</button>
      </div>

      <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5 md:mt-8">
        {activityData.map((item) => (
          <div key={item.id} className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12" />
              <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white sm:h-3.5 sm:w-3.5 ${item.dot}`} />
            </div>
            <div>
              <p className="text-[13px] text-[#505664] sm:text-[14px] md:text-[16px]">
                <span className="font-semibold text-[#1f2430]">{item.name}</span> {item.action}
              </p>
              <p className="mt-1 text-[11px] text-[#8b92a1] sm:text-[12px] md:text-[13px]">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hide Member Audit Needed section as requested */}
      {/* <div className="mt-6 rounded-[24px] border border-[#ddd9ff] bg-[linear-gradient(135deg,rgba(114,91,255,0.08),rgba(166,142,255,0.12))] p-4 sm:mt-8 sm:p-5">
        <h4 className="text-[1rem] font-bold text-[#4c39ea] sm:text-[1.1rem] md:text-[1.15rem]">Member Audit Needed</h4>
        <p className="mt-2 text-[12px] text-[#7a70dd] sm:text-[13px] md:text-[14px]">
          14 new members are pending verification to maintain directory quality.
        </p>
        <button className="mt-4 h-10 w-full rounded-xl bg-gradient-to-r from-[#4e3ae9] to-[#5f44f4] text-[12px] font-semibold text-white shadow-[0_16px_28px_rgba(78,58,233,0.25)] sm:mt-5 sm:h-12 sm:text-[13px] md:text-[14px]">
          Start Verification
        </button>
      </div> */}
    </div>
  );
}

function AnalyticsPage({ onLogout, onNavigate, activePage, showSettingsPage, setShowSettingsPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#f4f5f7] text-[#1f2430]">
      <div className="flex h-screen overflow-hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 z-50 rounded-full bg-[#5b3df5] p-3 text-white shadow-lg lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <aside className={`fixed inset-y-0 left-0 z-40 w-[260px] transform border-r border-[#edf0f5] bg-[#f7f9fc] px-4 py-5 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:px-5 sm:py-6`}>
          <div className="flex h-full flex-col">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5b3df5] text-white shadow-[0_12px_26px_rgba(91,61,245,0.35)] sm:h-11 sm:w-11">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1f2430] sm:text-[15px]">JCI Madurai Central</p>
                  <p className="text-[11px] text-[#8c90a0] sm:text-[12px]">Admin Portal</p>
                </div>
              </div>

              <nav className="mt-8 space-y-1 sm:mt-10 sm:space-y-2">
                <SidebarItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={activePage === "dashboard"}
                  onClick={() => {
                    onNavigate("dashboard");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={Users}
                  label="Members"
                  active={activePage === "members"}
                  onClick={() => {
                    onNavigate("members");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={FolderKanban}
                  label="Memberclassification"
                  active={activePage === "Memberclassification"}
                  onClick={() => {
                    onNavigate("Memberclassification");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={CalendarDays}
                  label="Events"
                  active={activePage === "events"}
                  onClick={() => {
                    onNavigate("events");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={BarChart3}
                  label="Analytics"
                  active={activePage === "analytics"}
                  onClick={() => {
                    onNavigate("analytics");
                    setMobileMenuOpen(false);
                  }}
                />
                <SettingsToggleBlock
                  activePage={activePage}
                  onNavigate={(page) => {
                    onNavigate(page);
                    setMobileMenuOpen(false);
                  }}
                  showSettingsPage={showSettingsPage}
                  setShowSettingsPage={setShowSettingsPage}
                />
              </nav>
            </div>

            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="mt-auto flex h-[50px] w-full items-center justify-center rounded-full bg-[#ff1a12] text-[14px] font-semibold text-white shadow-[0_20px_30px_rgba(255,26,18,0.22)] sm:h-[56px] sm:text-[16px]"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="h-screen flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-7 xl:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[1.8rem] font-bold tracking-[-0.05em] leading-none sm:text-[2rem] md:text-[2.2rem] lg:text-[2.5rem]">
                Directory Analytics
              </h1>
              <p className="mt-1 text-[12px] text-[#8e95a3] sm:mt-2 sm:text-[13px] md:text-[14px]">
                Real-time ecosystem performance data
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex h-[44px] flex-1 max-w-[320px] items-center gap-2 rounded-full bg-[#f1f3f7] px-3 ring-1 ring-[#eceff4] sm:h-[48px] sm:gap-3 sm:px-4 md:h-[52px]">
                <Search className="h-3.5 w-3.5 text-[#a3a9b6] sm:h-4 sm:w-4" />
                <input
                  placeholder="Search reports..."
                  className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#b5bbc7] sm:text-[13px] md:text-[14px]"
                />
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <button className="flex items-center gap-1 rounded-full bg-[#0f1739] px-3 py-2 text-[11px] font-semibold text-white shadow-[0_12px_20px_rgba(15,23,57,0.18)] transition hover:scale-105 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[12px] md:px-5 md:py-3 md:text-[13px]">
                  <span>↓</span> Export
                </button>
                
                <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#636b7b] shadow-sm ring-1 ring-[#eceef4] transition hover:bg-[#fafbff] sm:h-12 sm:w-12">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#5b3df5] sm:top-3.5 sm:right-3.5"></span>
                </button>
                
                <div className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-[#eceef4] sm:px-5 sm:py-2">
                  <img
                    src={saran}
                    alt="Sarankumar R"
                    className="h-8 w-8 rounded-full border border-[#f0f2f5] object-cover sm:h-10 sm:w-10"
                  />
                  <span className="text-[14px] font-bold text-[#1f2430] sm:text-[16px]">Sarankumar R</span>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-3">
            <div className="rounded-[26px] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:px-5 sm:py-5 md:px-6 md:py-6">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f96a4] sm:text-[11px] md:text-[12px]">
                    Total Membership
                  </p>
                  <div className="mt-3 sm:mt-4 md:mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a0a7b4] sm:text-[11px]">This Year</p>
                    <h3 className="mt-1 text-[2.2rem] font-bold tracking-[-0.05em] text-[#141a2d] leading-none sm:mt-2 sm:text-[2.5rem] md:text-[3rem]">
                      12,482
                    </h3>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3 sm:mt-4 sm:gap-4 md:mt-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a0a7b4] sm:text-[11px]">Last Year</p>
                      <p className="mt-1 text-[1.5rem] font-bold tracking-[-0.04em] text-[#1f2430] leading-none sm:mt-2 sm:text-[1.8rem] md:text-[2rem]">
                        10,240
                      </p>
                    </div>
                    <div className="inline-flex rounded-full bg-[#eef9f1] px-2 py-1 text-[10px] font-semibold text-[#39a35f] sm:px-3 sm:py-1.5 sm:text-[11px] md:text-[12px]">
                      ↗ +21.9%
                    </div>
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#f1edff] text-[#5b3df5] sm:h-10 sm:w-10 md:h-11 md:w-11">
                  <Users className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                </div>
              </div>
            </div>

            <div className="rounded-[26px] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:px-5 sm:py-5 md:px-6 md:py-6">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f96a4] sm:text-[11px] md:text-[12px]">
                    Active Projects
                  </p>
                  <h3 className="mt-4 text-[2.2rem] font-bold tracking-[-0.05em] text-[#141a2d] sm:mt-5 sm:text-[2.5rem] md:mt-6 md:text-[3rem]">
                    892
                  </h3>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#f1edff] text-[#5b3df5] sm:h-10 sm:w-10 md:h-11 md:w-11">
                  <Zap className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                </div>
              </div>
              <div className="mt-4 inline-flex rounded-full bg-[#f3edff] px-2 py-1 text-[10px] font-semibold text-[#6a42f5] sm:mt-5 sm:px-3 sm:py-1.5 sm:text-[11px] md:mt-6 md:text-[12px]">
                ● 124 pending review
              </div>
            </div>

            <div className="rounded-[26px] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:px-5 sm:py-5 md:px-6 md:py-6">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f96a4] sm:text-[11px] md:text-[12px]">
                    Direct Revenue
                  </p>
                  <h3 className="mt-4 text-[2.2rem] font-bold tracking-[-0.05em] text-[#141a2d] sm:mt-5 sm:text-[2.5rem] md:mt-6 md:text-[3rem]">
                    ₹42,800
                  </h3>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#f1edff] text-[#5b3df5] sm:h-10 sm:w-10 md:h-11 md:w-11">
                  <TrendingUp className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                </div>
              </div>
              <div className="mt-4 inline-flex rounded-full bg-[#f3edff] px-2 py-1 text-[10px] font-semibold text-[#6a42f5] sm:mt-5 sm:px-3 sm:py-1.5 sm:text-[11px] md:mt-6 md:text-[12px]">
                ↗ Projected 12% growth
              </div>
            </div>
          </section>

          <section className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-2">
            <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.3rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.5rem] md:text-[1.7rem] lg:text-[1.9rem]">
                  Categories of Members
                </h3>
                <button className="text-[#8f96a4] text-[16px] leading-none sm:text-[17px] md:text-[18px]">•••</button>
              </div>

              <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5 md:mt-7 md:space-y-6">
                {[
                  { name: "LGB", value: "4,820", width: "w-[96%]", color: "bg-[#5b3df5]" },
                  { name: "Members", value: "4,120", width: "w-[82%]", color: "bg-[#7161f5]" },
                  { name: "Appointee", value: "3,450", width: "w-[69%]", color: "bg-[#8c7dfc]" },
                  { name: "JAC", value: "2,910", width: "w-[58%]", color: "bg-[#a69cfe]" },
                  { name: "Past President", value: "1,840", width: "w-[42%]", color: "bg-[#94a3b8]" },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between text-[13px] font-medium text-[#1f2430] sm:text-[14px]">
                      <span>{item.name}</span>
                      <span className="text-[#a1a8b5] font-semibold">{item.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#f1f3f7] sm:h-2.5">
                      <div className={`h-full ${item.width} rounded-full ${item.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.3rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.5rem] md:text-[1.6rem] lg:text-[1.7rem]">
                  Segment of Members
                </h3>
                <button className="text-[#8f96a4] text-[16px] leading-none sm:text-[17px] md:text-[18px]">•••</button>
              </div>

              <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-[13px] font-medium text-[#1f2430] sm:text-[14px]">
                    <span>Business</span>
                    <span className="text-[#a1a8b5] font-semibold">1,200</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f1f3f7] sm:h-2.5">
                    <div className="h-full w-[62%] rounded-full bg-[#5b3df5]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-[13px] font-medium text-[#1f2430] sm:text-[14px]">
                    <span>Salaried</span>
                    <span className="text-[#a1a8b5] font-semibold">940</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f1f3f7] sm:h-2.5">
                    <div className="h-full w-[48%] rounded-full bg-[#8c7dfc]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-2">
            <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-[1.3rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.5rem] md:text-[1.6rem] lg:text-[1.8rem]">
                    User Engagement
                  </h3>
                  <p className="mt-1 text-[12px] text-[#98a0ae] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                    Multi-vector activity metrics
                  </p>
                </div>

                <div className="flex items-center rounded-full bg-[#f1f3f7] p-1 text-[10px] font-bold text-[#7a8190] sm:text-[11px] md:text-[12px]">
                  <button className="rounded-full px-3 py-1.5 transition-all hover:text-[#1f2430] sm:px-4">7D</button>
                  <button className="rounded-full bg-white px-3 py-1.5 text-[#5b3df5] shadow-[0_2px_8px_rgba(91,61,245,0.12)] sm:px-4">
                    30D
                  </button>
                </div>
              </div>

              <div className="mt-5 flex justify-center sm:mt-6 md:mt-7">
                <svg viewBox="0 0 220 220" className="h-[160px] w-[160px] sm:h-[180px] sm:w-[180px] md:h-[200px] md:w-[200px] lg:h-[210px] lg:w-[210px]">
                  <circle cx="110" cy="110" r="76" fill="none" stroke="#eceef4" />
                  <circle cx="110" cy="110" r="48" fill="none" stroke="#eceef4" />
                  <polygon
                    points="110,48 174,95 150,164 70,164 46,95"
                    fill="rgba(91,61,245,0.14)"
                    stroke="#4f35ec"
                    strokeWidth="3"
                  />
                  <circle cx="110" cy="48" r="4" fill="#4f35ec" />
                  <circle cx="174" cy="95" r="4" fill="#4f35ec" />
                  <circle cx="150" cy="164" r="4" fill="#4f35ec" />
                  <circle cx="70" cy="164" r="4" fill="#4f35ec" />
                  <circle cx="46" cy="95" r="4" fill="#4f35ec" />
                  <text x="95" y="22" fontSize="10" fill="#98a0ae">REVENUE</text>
                  <text x="178" y="100" fontSize="10" fill="#98a0ae">POSTS</text>
                  <text x="145" y="196" fontSize="10" fill="#98a0ae">REFERRALS</text>
                  <text x="27" y="196" fontSize="10" fill="#98a0ae">UPGRADES</text>
                  <text x="10" y="103" fontSize="10" fill="#98a0ae">LOGIN</text>
                </svg>
              </div>

              <div className="mt-4 flex items-center justify-between text-[12px] font-semibold text-[#565e6d] sm:mt-5 sm:text-[13px] md:mt-6 md:text-[14px]">
                <span>Overall Participation Rate</span>
                <span className="text-[1.5rem] font-bold tracking-[-0.04em] text-[#4f35ec] sm:text-[1.8rem] md:text-[2rem]">
                  78%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8ebf2] sm:mt-3 sm:h-2.5">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#4e3ae9] to-[#6a42f5]" />
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-[1.3rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.5rem] md:text-[1.6rem] lg:text-[1.7rem]">
                  Events Vertical
                </h3>
                <button className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#4f35ec] sm:text-[11px] md:text-[12px]">
                  Detailed Report →
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#a1a8b5] sm:mt-5 sm:text-[11px] md:mt-6 md:text-[12px]">
                <span>Vertical</span>
                <span className="text-right">Count</span>
              </div>

              <div className="mt-4 space-y-2 text-[13px] text-[#3c4350] sm:mt-5 sm:text-[14px] md:mt-6 md:text-[15px]">
                {[
                  { name: "Management", count: 48 },
                  { name: "Training", count: 36 },
                  { name: "Business", count: 29 },
                  { name: "Community Development", count: 24 },
                  { name: "Public Relationship & Marketing", count: 18 },
                  { name: "Growth & Development", count: 16 },
                  { name: "Internationalism", count: 12 },
                  { name: "Junior Jaycee", count: 20 },
                  { name: "Lady Jaycee", count: 15 }
                ].map((vertical) => (
                  <div 
                    key={vertical.name}
                    onClick={() => onNavigate("events", vertical.name)}
                    className="grid grid-cols-[1.6fr_0.5fr] items-center rounded-xl p-2 transition-all hover:bg-[#f1edff] cursor-pointer group"
                  >
                    <span className="font-medium group-hover:text-[#5b3df5]">{vertical.name}</span>
                    <span className="text-[#8b92a1] group-hover:text-[#5b3df5] font-semibold">{vertical.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-5 rounded-[34px] bg-[linear-gradient(135deg,#0f153d_0%,#1d1d66_55%,#262669_100%)] p-5 text-white shadow-[0_24px_50px_rgba(15,21,61,0.24)] sm:mt-6 sm:p-6 md:p-7 lg:p-8 xl:p-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/85 sm:gap-3 sm:px-4 sm:py-2 sm:text-[10px]">
                  AI Insights
                  <span className="h-px w-6 bg-white/20 sm:w-8 md:w-10" />
                </div>

                <h3 className="mt-5 text-[2rem] font-bold leading-[0.94] tracking-[-0.06em] sm:mt-6 sm:text-[2.5rem] md:mt-7 md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]">
                  Strategic Growth Opportunity
                </h3>

                <p className="mt-4 max-w-[520px] text-[14px] leading-7 text-white/82 sm:mt-5 sm:text-[15px] sm:leading-8 md:mt-6 md:text-[16px] md:leading-9 lg:text-[17px]">
                  Member retention in <span className="font-semibold text-white">Software Engineering</span> has peaked at 94%. We recommend deploying aggressive referral incentives for Q3.
                </p>

                <button className="mt-5 rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold text-[#141a42] shadow-lg sm:mt-6 sm:px-6 sm:py-3 sm:text-[13px] md:mt-7 md:px-7 md:py-3.5 md:text-[14px] lg:mt-8 lg:px-8 lg:py-4">
                  Launch Campaign
                </button>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm sm:p-6 md:p-7">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 sm:text-[11px] md:text-[12px]">
                  Predictive Model
                </div>

                <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5 md:mt-6 md:space-y-4">
                  <div className="h-2.5 rounded-full bg-white/10 sm:h-3">
                    <div className="h-full w-[72%] rounded-full bg-[#4f35ec]" />
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 sm:h-3">
                    <div className="h-full w-[56%] rounded-full bg-[#7d57ff]" />
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 sm:h-3">
                    <div className="h-full w-[36%] rounded-full bg-white/90" />
                  </div>
                </div>

                <div className="mt-6 text-[3rem] font-bold leading-none tracking-[-0.06em] sm:mt-7 sm:text-[3.5rem] md:mt-8 md:text-[3.8rem] lg:text-[4.2rem]">
                  94.2%
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/62 sm:mt-2.5 sm:text-[11px] md:mt-3 md:text-[12px]">
                  Confidence Score
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SettingsPage({ onLogout, onNavigate, activePage, showSettingsPage, setShowSettingsPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#f4f5f7] text-[#1f2430]">
      <div className="flex h-screen overflow-hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 z-50 rounded-full bg-[#5b3df5] p-3 text-white shadow-lg lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <aside className={`fixed inset-y-0 left-0 z-40 w-[260px] transform border-r border-[#edf0f5] bg-[#f7f9fc] px-4 py-5 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:px-5 sm:py-6`}>
          <div className="flex h-full flex-col">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5b3df5] text-white shadow-[0_12px_26px_rgba(91,61,245,0.35)] sm:h-11 sm:w-11">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1f2430] sm:text-[15px]">The Curator</p>
                  <p className="text-[11px] text-[#8c90a0] sm:text-[12px]">Premium Network</p>
                </div>
              </div>

              <nav className="mt-8 space-y-1 sm:mt-10 sm:space-y-2">
                <SidebarItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={activePage === "dashboard"}
                  onClick={() => {
                    onNavigate("dashboard");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={Users}
                  label="Members"
                  active={activePage === "members"}
                  onClick={() => {
                    onNavigate("members");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={FolderKanban}
                  label="Memberclassification"
                  active={activePage === "Memberclassification"}
                  onClick={() => {
                    onNavigate("Memberclassification");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={CalendarDays}
                  label="Events"
                  active={activePage === "events"}
                  onClick={() => {
                    onNavigate("events");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={BarChart3}
                  label="Analytics"
                  active={activePage === "analytics"}
                  onClick={() => {
                    onNavigate("analytics");
                    setMobileMenuOpen(false);
                  }}
                />
                <div className="mt-2 rounded-2xl border border-[#e7eaf2] bg-white px-3 py-3 sm:px-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Settings className="h-[16px] w-[16px] text-[#697386] sm:h-[18px] sm:w-[18px]" />
                      <span className="text-[14px] font-medium text-[#697386] sm:text-[15px]">Settings</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nextValue = !showSettingsPage;
                        setShowSettingsPage(nextValue);
                        if (!nextValue && activePage === "settings") {
                          onNavigate("dashboard");
                        }
                      }}
                      className={`relative h-7 w-14 rounded-full transition ${
                        showSettingsPage ? "bg-[#5b3df5]" : "bg-[#d7dbe7]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                          showSettingsPage ? "left-8" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                  {showSettingsPage && (
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate("settings");
                        setMobileMenuOpen(false);
                      }}
                      className={`mt-3 flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left transition sm:px-4 sm:py-3 ${
                        activePage === "settings"
                          ? "text-[#5442ef]"
                          : "text-[#697386] hover:text-[#1e2430]"
                      }`}
                    >
                      <span className="flex items-center gap-3 text-[14px] font-medium sm:text-[15px]">
                        <Settings className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
                        Settings Page
                      </span>
                      {activePage === "settings" ? (
                        <span className="h-6 w-1 rounded-full bg-[#5b3df5]" />
                      ) : null}
                    </button>
                  )}
                </div>
              </nav>
            </div>

            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="mt-auto flex h-[50px] w-full items-center justify-center rounded-full bg-[#ff1a12] text-[14px] font-semibold text-white shadow-[0_20px_30px_rgba(255,26,18,0.22)] sm:h-[56px] sm:text-[16px]"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="h-screen flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-7 xl:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-[#6f7787] sm:text-[14px] md:text-[15px]">
              <button className="text-[#5b3df5] font-semibold">Directory</button>
              <button>Analytics</button>
              <button>Resources</button>
              <button>Support</button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#636b7b] shadow-sm ring-1 ring-[#eceef4] transition hover:bg-[#fafbff] sm:h-12 sm:w-12">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#5b3df5] sm:top-3.5 sm:right-3.5"></span>
              </button>
              <div className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-[#eceef4] sm:px-5 sm:py-2">
                <img
                  src={saran}
                  alt="Sarankumar R"
                  className="h-8 w-8 rounded-full border border-[#f0f2f5] object-cover sm:h-10 sm:w-10"
                />
                <span className="text-[14px] font-bold text-[#1f2430] sm:text-[16px]">Sarankumar R</span>
              </div>
            </div>
          </div>

          <section className="mt-5 sm:mt-6 md:mt-7 lg:mt-8">
            <h1 className="text-[2rem] font-bold tracking-[-0.05em] leading-none sm:text-[2.5rem] md:text-[2.8rem] lg:text-[3rem]">
              Profile Settings
            </h1>
            <p className="mt-2 max-w-[760px] text-[14px] text-[#6f7787] sm:mt-2.5 sm:text-[15px] md:mt-3 md:text-[16px] lg:text-[1.1rem]">
              Manage your public presence and personal information across the Lumina Directory network.
            </p>
          </section>

          <section className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex justify-center sm:justify-start">
                  <div className="h-24 w-24 overflow-hidden rounded-[24px] bg-[#0f1728] shadow-lg sm:h-28 sm:w-28 md:h-[108px] md:w-[108px]">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                      alt="Elena"
                      className="h-full w-full object-cover opacity-85"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-3 sm:space-y-4">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa2b0] sm:mb-2 sm:text-[11px]">
                      Full Name
                    </p>
                    <div className="rounded-2xl bg-[#f3f5f8] px-4 py-3 text-[14px] font-semibold text-[#414958] sm:px-5 sm:py-4 sm:text-[15px] md:text-[16px]">
                      Elena Rodriguez
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa2b0] sm:mb-2 sm:text-[11px]">
                      Business Email
                    </p>
                    <div className="rounded-2xl bg-[#f3f5f8] px-4 py-3 text-[14px] font-semibold text-[#414958] sm:px-5 sm:py-4 sm:text-[15px] md:text-[16px]">
                      elena@lumina.design
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa2b0] sm:mb-2 sm:text-[11px]">
                      Professional Bio
                    </p>
                    <div className="rounded-2xl bg-[#f3f5f8] px-4 py-3 text-[14px] leading-6 text-[#414958] sm:px-5 sm:py-4 sm:text-[15px] sm:leading-7 md:text-[16px]">
                      Creative Director at Lumina specializing in high-fidelity interface design and digital brand identity systems.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end sm:mt-6 md:mt-7">
                <button className="rounded-full bg-gradient-to-r from-[#4e3ae9] to-[#6a42f5] px-5 py-2.5 text-[12px] font-semibold text-white shadow-[0_16px_28px_rgba(78,58,233,0.25)] sm:px-6 sm:py-3 sm:text-[13px] md:px-7 md:py-3.5 md:text-[14px] lg:px-8 lg:py-4">
                  Save Profile Changes
                </button>
              </div>
            </div>

            <div className="rounded-[30px] bg-gradient-to-br from-[#5b3df5] to-[#7b4dff] p-5 text-white shadow-[0_20px_40px_rgba(91,61,245,0.24)] sm:p-6 md:p-7">
              <div className="inline-flex rounded-full bg-white/15 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] sm:px-3 sm:py-1 sm:text-[10px]">
                Current Plan
              </div>

              <h3 className="mt-5 text-[1.6rem] font-bold tracking-[-0.04em] sm:mt-6 sm:text-[1.8rem] md:mt-7 md:text-[2rem] lg:text-[2.2rem]">Enterprise</h3>
              <p className="mt-1 text-[13px] text-white/80 sm:mt-2 sm:text-[14px] md:text-[15px]">Advanced features for power curators.</p>

              <div className="mt-5 rounded-[24px] bg-white/10 p-4 ring-1 ring-white/10 sm:mt-6 sm:p-5 md:mt-7 md:p-6 lg:mt-8">
                <p className="text-[12px] font-semibold sm:text-[13px]">Visa ending in 4242</p>
                <p className="mt-1 text-[11px] text-white/70 sm:text-[12px]">Expires 09/27</p>
              </div>

              <button className="mt-5 w-full rounded-full bg-white px-5 py-3 text-[12px] font-semibold text-[#5b3df5] sm:mt-6 sm:py-3.5 sm:text-[13px] md:mt-7 md:py-4 md:text-[14px] lg:mt-8">
                Download Invoice
              </button>
            </div>
          </section>

          <section className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
              <div className="flex items-center gap-2 text-[#5b3df5] sm:gap-3">
                <Lock className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                <h3 className="text-[1.3rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.5rem] md:text-[1.6rem] lg:text-[1.8rem]">
                  Security & Authentication
                </h3>
              </div>

              <div className="mt-4 rounded-[22px] bg-[#f4f6f9] px-4 py-4 sm:mt-5 sm:px-5 sm:py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[14px] font-semibold text-[#2a3140] sm:text-[15px] md:text-[16px]">Two-Factor Authentication</p>
                    <p className="mt-1 text-[12px] text-[#7a8190] sm:text-[13px] md:text-[14px]">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <div className="relative h-7 w-12 rounded-full bg-[#5b3df5] sm:h-8 sm:w-14">
                    <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4 sm:grid-cols-2">
                <button className="rounded-2xl border border-[#eceff5] bg-white px-4 py-3 text-[13px] font-semibold text-[#5f6778] sm:px-5 sm:py-4 sm:text-[14px] md:text-[15px]">
                  Change Password
                </button>
                <button className="rounded-2xl border border-[#eceff5] bg-white px-4 py-3 text-[13px] font-semibold text-[#5f6778] sm:px-5 sm:py-4 sm:text-[14px] md:text-[15px]">
                  Logout All Devices
                </button>
              </div>

              <div className="mt-5 sm:mt-6 md:mt-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa2b0] sm:text-[11px]">
                  Active Sessions
                </p>

                <div className="mt-3 space-y-4 sm:mt-4 sm:space-y-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[13px] font-semibold text-[#303746] sm:text-[14px] md:text-[15px]">
                        MacBook Pro · San Francisco, US
                      </p>
                      <p className="mt-1 text-[11px] text-[#8b92a1] sm:text-[12px] md:text-[13px]">Current Session</p>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#4e3ae9] sm:text-[12px]">
                      Active
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[13px] font-semibold text-[#303746] sm:text-[14px] md:text-[15px]">
                        iPhone 15 Pro · Austin, US
                      </p>
                      <p className="mt-1 text-[11px] text-[#8b92a1] sm:text-[12px] md:text-[13px]">3 hours ago</p>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8190] sm:text-[12px]">
                      Revoke
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
                <h3 className="text-[1.3rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.4rem] md:text-[1.5rem] lg:text-[1.6rem]">
                  Alert Preferences
                </h3>

                <div className="mt-4 space-y-3 text-[13px] text-[#4f5666] sm:mt-5 sm:space-y-4 sm:text-[14px] md:text-[15px]">
                  <div className="flex items-center justify-between">
                    <span>Email Digest</span>
                    <span className="flex h-4 w-4 items-center justify-center rounded-md bg-[#5b3df5] text-white text-[10px] sm:h-5 sm:w-5">✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Push Notifications</span>
                    <span className="flex h-4 w-4 items-center justify-center rounded-md bg-[#5b3df5] text-white text-[10px] sm:h-5 sm:w-5">✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SMS Alerts</span>
                    <span className="flex h-4 w-4 items-center justify-center rounded-md border border-[#dfe3ec] text-[#a0a7b5] sm:h-5 sm:w-5"></span>
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.3rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.4rem] md:text-[1.5rem] lg:text-[1.6rem]">Team</h3>
                  <button className="text-[11px] font-bold text-[#5b3df5] sm:text-[12px]">Manage All</button>
                </div>

                <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                      alt="Marcus"
                      className="h-10 w-10 rounded-xl object-cover sm:h-11 sm:w-11 md:h-12 md:w-12"
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-[#2f3644] sm:text-[14px] md:text-[15px]">Marcus Chen</p>
                      <p className="text-[11px] text-[#8b92a1] sm:text-[12px] md:text-[13px]">Admin</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                      alt="Sarah"
                      className="h-10 w-10 rounded-xl object-cover sm:h-11 sm:w-11 md:h-12 md:w-12"
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-[#2f3644] sm:text-[14px] md:text-[15px]">Sarah Jenkins</p>
                      <p className="text-[11px] text-[#8b92a1] sm:text-[12px] md:text-[13px]">Editor</p>
                    </div>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-2xl border border-dashed border-[#d9deea] px-4 py-3 text-[12px] font-semibold text-[#5f6778] sm:mt-5 sm:py-4 sm:text-[13px] md:text-[14px]">
                  + Invite Member
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function EventsPage({ onLogout, onNavigate, activePage, showSettingsPage, setShowSettingsPage, eventCategoryFilter = "All", setEventCategoryFilter }) {
  const [eventForm, setEventForm] = useState({
    name: "",
    category: "Management",
    venue: "",
    location: "",
    dateTime: "",
    chiefGuest: "",
    guestOfHonor: "",
  });
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEventChange = (key, value) => {
    setEventForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleCreateEvent = () => {
    if (
      !eventForm.name.trim() ||
      !eventForm.category.trim() ||
      !eventForm.venue.trim() ||
      !eventForm.location.trim() ||
      !eventForm.dateTime.trim() ||
      !eventForm.chiefGuest.trim() ||
      !eventForm.guestOfHonor.trim()
    ) {
      alert("Please fill all event details.");
      return;
    }
    alert("Event created successfully.");
  };

  const eventCards = [
    {
      id: 1,
      status: "LIVE",
      tag: "MANAGEMENT",
      statusClass: "bg-[#ff5c5c] text-white",
      tagClass: "bg-[#111827] text-white",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
      title: "Strategic Board Meet 2024",
      meta: "Conference Hall A · 10:00 AM",
      action: "arrow",
    },
    {
      id: 2,
      status: "IN 2 DAYS",
      tag: "TRAINING",
      statusClass: "bg-[#5b3df5] text-white",
      tagClass: "bg-[#111827] text-white",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
      title: "Leadership Excellence Workshop",
      meta: "Oct 26, 2024 · 02:00 PM",
      guest: "Trainer: Dr. Elena Vance",
      action: "edit",
    },
    {
      id: 3,
      status: "UPCOMING",
      tag: "BUSINESS",
      statusClass: "bg-[#10b981] text-white",
      tagClass: "bg-[#111827] text-white",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
      title: "MSME Networking Summit",
      meta: "Trade Center · Nov 05",
      action: "arrow",
    },
    {
      id: 4,
      status: "PLANNED",
      tag: "COMMUNITY Development",
      statusClass: "bg-[#f59e0b] text-white",
      tagClass: "bg-[#111827] text-white",
      image: "https://images.unsplash.com/photo-1559027615-cd942b03fb51?auto=format&fit=crop&w=900&q=80",
      title: "City Wellness Initiative",
      meta: "Central Park · Nov 12",
      action: "arrow",
    },
    {
      id: 5,
      status: "UPCOMING",
      tag: "Growth & Development",
      statusClass: "bg-[#eb4899] text-white",
      tagClass: "bg-[#111827] text-white",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      title: "Career 180 Seminar",
      meta: "Town Hall · Nov 18",
      action: "arrow",
    },
    {
      id: 6,
      status: "INTERNATIONAL",
      tag: "Internationalism",
      statusClass: "bg-[#3b82f6] text-white",
      tagClass: "bg-[#111827] text-white",
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=80",
      title: "Global Youth Exchange",
      meta: "Virtual · Dec 02",
      action: "arrow",
    },
    {
      id: 7,
      status: "LIVE",
      tag: "Junior Jaycee",
      statusClass: "bg-[#8b5cf6] text-white",
      tagClass: "bg-[#111827] text-white",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
      title: "NextGen Leaders Camp",
      meta: "Academy Grounds · Dec 10",
      action: "arrow",
    },
  ];

  const filteredCards = eventCategoryFilter === "All" || !eventCategoryFilter
    ? eventCards 
    : eventCards.filter(card => card.tag.toUpperCase() === eventCategoryFilter.toUpperCase());

  return (
    <div className="h-screen overflow-hidden bg-[#f4f5f7] text-[#1f2430]">
      <div className="flex h-screen overflow-hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 z-50 rounded-full bg-[#5b3df5] p-3 text-white shadow-lg lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <aside className={`fixed inset-y-0 left-0 z-40 w-[260px] transform border-r border-[#edf0f5] bg-[#f7f9fc] px-4 py-5 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:px-5 sm:py-6`}>
          <div className="flex h-full flex-col">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-[0_12px_26px_rgba(91,61,245,0.15)] sm:h-11 sm:w-11">
                  <img src={logo} alt="JCI Logo" className="h-8 w-8 object-contain" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#1f2430] sm:text-[15px]">JCI Madurai Central</p>
                  <p className="text-[11px] font-medium text-[#5b3df5] sm:text-[12px]">Admin Portal</p>
                </div>
              </div>

              <nav className="mt-8 space-y-1 sm:mt-10 sm:space-y-2">
                <SidebarItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={activePage === "dashboard"}
                  onClick={() => {
                    onNavigate("dashboard");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={Users}
                  label="Members"
                  active={activePage === "members"}
                  onClick={() => {
                    onNavigate("members");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={FolderKanban}
                  label="Memberclassification"
                  active={activePage === "Memberclassification"}
                  onClick={() => {
                    onNavigate("Memberclassification");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={CalendarDays}
                  label="Events"
                  active={activePage === "events"}
                  onClick={() => {
                    onNavigate("events");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={BarChart3}
                  label="Analytics"
                  active={activePage === "analytics"}
                  onClick={() => {
                    onNavigate("analytics");
                    setMobileMenuOpen(false);
                  }}
                />
                <SettingsToggleBlock
                  activePage={activePage}
                  onNavigate={(page) => {
                    onNavigate(page);
                    setMobileMenuOpen(false);
                  }}
                  showSettingsPage={showSettingsPage}
                  setShowSettingsPage={setShowSettingsPage}
                />
              </nav>
            </div>

            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="mt-auto flex h-[50px] w-full items-center justify-center rounded-full bg-[#ff1a12] text-[14px] font-semibold text-white shadow-[0_20px_30px_rgba(255,26,18,0.22)] sm:h-[56px] sm:text-[16px]"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="h-screen flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-7 xl:px-8">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-[1.8rem] font-bold tracking-[-0.05em] text-[#1f2430] sm:text-[2rem] md:text-[2.25rem]">
                  Event Management
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex h-[44px] flex-1 min-w-[240px] items-center gap-2 rounded-full bg-[#f4f5f8] px-3 ring-1 ring-[#eceff4] sm:h-[48px] sm:gap-3 sm:px-4">
                  <Search className="h-3.5 w-3.5 text-[#9aa2b0] sm:h-4 sm:w-4" />
                  <input
                    className="w-full bg-transparent text-[12px] text-[#48505f] outline-none placeholder:text-[#b0b6c2] sm:text-[13px] md:text-[14px]"
                    placeholder="Search events or guests..."
                  />
                </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#636b7b] shadow-sm ring-1 ring-[#eceef4] transition hover:bg-[#fafbff] sm:h-12 sm:w-12">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#5b3df5] sm:top-3.5 sm:right-3.5"></span>
                </button>
                <div className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-[#eceef4] sm:px-5 sm:py-2">
                  <img
                    src={saran}
                    alt="Sarankumar R"
                    className="h-8 w-8 rounded-full border border-[#f0f2f5] object-cover sm:h-10 sm:w-10"
                  />
                  <span className="text-[14px] font-bold text-[#1f2430] sm:text-[16px]">Sarankumar R</span>
                </div>
              </div>
              </div>
            </div>

            <div className="mt-5 rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:mt-6 sm:p-5 md:p-6">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-2 text-[1.2rem] font-bold tracking-[-0.03em] text-[#1f2430] sm:text-[1.3rem] md:text-[1.4rem]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ede9ff] text-[#5b3df5] text-[14px] sm:h-6 sm:w-6">
                        +
                      </span>
                      Plan New Event
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:mb-2 sm:text-[11px]">
                        Event Name
                      </label>
                      <input
                        type="text"
                        value={eventForm.name}
                        onChange={(e) => handleEventChange("name", e.target.value)}
                        placeholder="e.g. Annual Tech Summit 2024"
                        className="h-[46px] w-full rounded-2xl bg-[#f5f6f8] px-3 text-[13px] text-[#495160] outline-none sm:h-[50px] sm:px-4 sm:text-[14px] md:h-[52px]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:mb-2 sm:text-[11px]">
                        Vertical Category
                      </label>
                      <select
                        value={eventForm.category}
                        onChange={(e) => handleEventChange("category", e.target.value)}
                        className="h-[46px] w-full rounded-2xl bg-[#f5f6f8] px-3 text-[13px] text-[#495160] outline-none sm:h-[50px] sm:px-4 sm:text-[14px] md:h-[52px]"
                      >
                        <option>Management</option>
                        <option>Training</option>
                        <option>Business</option>
                        <option>Community Development</option>
                        <option>Public Relationship & Marketing</option>
                        <option>Growth & Development</option>
                        <option>Internationalism</option>
                        <option>Junior Jaycee</option>
                        <option>Lady Jaycee</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:mb-2 sm:text-[11px]">
                        Venue / Platform
                      </label>
                      <input
                        type="text"
                        value={eventForm.venue}
                        onChange={(e) => handleEventChange("venue", e.target.value)}
                        placeholder="Grand Hyatt or Zoom Link"
                        className="h-[46px] w-full rounded-2xl bg-[#f5f6f8] px-3 text-[13px] text-[#495160] outline-none sm:h-[50px] sm:px-4 sm:text-[14px] md:h-[52px]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:mb-2 sm:text-[11px]">
                        Location
                      </label>
                      <input
                        type="text"
                        value={eventForm.location}
                        onChange={(e) => handleEventChange("location", e.target.value)}
                        placeholder="e.g. Madurai, Tamil Nadu"
                        className="h-[46px] w-full rounded-2xl bg-[#f5f6f8] px-3 text-[13px] text-[#495160] outline-none sm:h-[50px] sm:px-4 sm:text-[14px] md:h-[52px]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:mb-2 sm:text-[11px]">
                        Date &amp; Time
                      </label>
                      <input
                        type="datetime-local"
                        value={eventForm.dateTime}
                        onChange={(e) => handleEventChange("dateTime", e.target.value)}
                        className="h-[46px] w-full rounded-2xl bg-[#f5f6f8] px-3 text-[13px] text-[#495160] outline-none sm:h-[50px] sm:px-4 sm:text-[14px] md:h-[52px]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:mb-2 sm:text-[11px]">
                        Chief Guest
                      </label>
                      <input
                        type="text"
                        value={eventForm.chiefGuest}
                        onChange={(e) => handleEventChange("chiefGuest", e.target.value)}
                        placeholder="Dr. Elena Vance"
                        className="h-[46px] w-full rounded-2xl bg-[#f5f6f8] px-3 text-[13px] text-[#495160] outline-none sm:h-[50px] sm:px-4 sm:text-[14px] md:h-[52px]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:mb-2 sm:text-[11px]">
                        Guest of Honor
                      </label>
                      <input
                        type="text"
                        value={eventForm.guestOfHonor}
                        onChange={(e) => handleEventChange("guestOfHonor", e.target.value)}
                        placeholder="Marc Benioff"
                        className="h-[46px] w-full rounded-2xl bg-[#f5f6f8] px-3 text-[13px] text-[#495160] outline-none sm:h-[50px] sm:px-4 sm:text-[14px] md:h-[52px]"
                      />
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-5">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:mb-2 sm:text-[11px]">
                      Event Banner
                    </label>

                    <label className="flex h-[120px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#d9dee8] bg-[#fcfcfd] text-center transition hover:bg-[#f8f8fc] sm:h-[130px] md:h-[148px]">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        className="hidden"
                        onChange={handleBannerChange}
                      />
                      {bannerPreview ? (
                        <img
                          src={bannerPreview}
                          alt="Event Banner Preview"
                          className="h-full w-full rounded-[24px] object-cover"
                        />
                      ) : (
                        <>
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f6f8] text-[#606978] sm:h-10 sm:w-10 md:h-11 md:w-11">
                            <Upload className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                          </div>
                          <p className="mt-2 text-[12px] font-semibold text-[#2f3644] sm:mt-2.5 sm:text-[13px] md:mt-3 md:text-[14px]">
                            Click or drag banner to upload
                          </p>
                          <p className="mt-1 text-[10px] text-[#9aa2b0] sm:text-[11px] md:text-[12px]">
                            Optimal size 1920×1080 (PNG, JPG)
                          </p>
                          {bannerFile && (
                            <p className="mt-1 text-[11px] font-medium text-[#5b3df5] sm:mt-2 sm:text-[12px]">
                              {bannerFile.name}
                            </p>
                          )}
                        </>
                      )}
                    </label>
                  </div>

                  <button
                    onClick={handleCreateEvent}
                    className="mt-5 flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5b3df5] to-[#6c40f6] px-5 text-[13px] font-semibold text-white shadow-[0_18px_30px_rgba(91,61,245,0.22)] sm:mt-6 sm:h-[52px] sm:text-[14px] md:h-[54px]"
                  >
                    Create New Event
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="rounded-[24px] bg-[#f8f9fb] px-4 py-3 ring-1 ring-[#eff1f5] sm:px-5 sm:py-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:text-[11px]">
                        Live Now
                      </p>
                      <p className="mt-1 text-[1.6rem] font-bold leading-none tracking-[-0.04em] text-[#5b3df5] sm:mt-2 sm:text-[1.8rem] md:text-[2rem] lg:text-[2.2rem]">
                        02
                      </p>
                    </div>

                    <div className="rounded-[24px] bg-[#f8f9fb] px-4 py-3 ring-1 ring-[#eff1f5] sm:px-5 sm:py-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] sm:text-[11px]">
                        This Month
                      </p>
                      <p className="mt-1 text-[1.6rem] font-bold leading-none tracking-[-0.04em] text-[#1f2430] sm:mt-2 sm:text-[1.8rem] md:text-[2rem] lg:text-[2.2rem]">
                        14
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[28px] bg-[#f8f9fb] p-4 ring-1 ring-[#eff1f5] sm:p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[1rem] font-bold tracking-[-0.03em] text-[#1f2430] sm:text-[1.1rem] md:text-[1.15rem]">
                        Highlights
                      </h3>
                      <Sparkles className="h-3.5 w-3.5 text-[#7c68ff] sm:h-4 sm:w-4" />
                    </div>

                    <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                      <div className="flex gap-2 sm:gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                          alt="summit"
                          className="h-12 w-12 rounded-2xl object-cover sm:h-13 sm:w-13 md:h-14 md:w-14"
                        />
                        <div>
                          <p className="text-[11px] font-bold leading-5 text-[#2f3644] sm:text-[12px] md:text-[13px]">
                            TOP ATTENDED
                            <br />
                            Global AI Summit 2023
                          </p>
                          <p className="mt-1 text-[10px] text-[#8b92a1] sm:text-[11px] md:text-[12px]">1,240 Registrations</p>
                        </div>
                      </div>

                      <div className="flex gap-2 sm:gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80"
                          alt="shared"
                          className="h-12 w-12 rounded-2xl object-cover sm:h-13 sm:w-13 md:h-14 md:w-14"
                        />
                        <div>
                          <p className="text-[11px] font-bold leading-5 text-[#2f3644] sm:text-[12px] md:text-[13px]">
                            MOST SHARED
                            <br />
                            Summer Founders Gala
                          </p>
                          <p className="mt-1 text-[10px] text-[#8b92a1] sm:text-[11px] md:text-[12px]">450 Photos Uploaded</p>
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 text-[11px] font-semibold text-[#4b5563] sm:mt-5 sm:text-[12px] md:text-[13px]">
                      View History Report ↗
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-6 sm:mt-7 md:mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-[1.5rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.8rem] md:text-[2rem]">
                      Active Schedule
                    </h2>
                    {eventCategoryFilter !== "All" && (
                      <button 
                        onClick={() => setEventCategoryFilter("All")}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#f1edff] px-3 py-1 text-[11px] font-bold text-[#5b3df5] transition hover:bg-[#e6e0ff]"
                      >
                        {eventCategoryFilter} <span className="text-[14px]">×</span>
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-[12px] text-[#8b92a1] sm:text-[13px] md:text-[14px]">
                    Manage ongoing and upcoming events in your directory.
                  </p>
                </div>

                <div className="inline-flex rounded-full bg-[#f3f4f6] p-1 ring-1 ring-[#ebeef3]">
                  <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#1f2430] shadow-sm sm:px-4 sm:py-2 sm:text-[12px]">
                    Grid
                  </button>
                  <button className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#8b92a1] sm:px-4 sm:py-2 sm:text-[12px]">
                    Timeline
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="overflow-hidden rounded-[26px] bg-white shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3]"
                  >
                    <div className="relative">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-[150px] w-full object-cover sm:h-[160px] md:h-[180px]"
                      />
                      <div className="absolute left-3 top-3 flex gap-2 sm:left-4 sm:top-4">
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] sm:px-3 sm:py-1 sm:text-[10px] ${card.statusClass}`}>
                          {card.status}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] sm:px-3 sm:py-1 sm:text-[10px] ${card.tagClass}`}>
                          {card.tag}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <h3 className="text-[1.15rem] font-bold leading-7 tracking-[-0.03em] text-[#1f2430] sm:text-[1.25rem] md:text-[1.35rem]">
                        {card.title}
                      </h3>

                      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#6f7787] sm:gap-2 sm:text-[12px] md:text-[13px]">
                        <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {card.meta}
                      </p>

                      {card.avatars && (
                        <div className="mt-4 flex items-center justify-between sm:mt-5">
                          <div className="flex -space-x-1.5 sm:-space-x-2">
                            {card.avatars.map((avatar, index) => (
                              <img
                                key={index}
                                src={avatar}
                                alt="attendee"
                                className="h-6 w-6 rounded-full border-2 border-white object-cover sm:h-7 sm:w-7 md:h-8 md:w-8"
                              />
                            ))}
                            <div className="flex h-6 min-w-[28px] items-center justify-center rounded-full border-2 border-white bg-[#f3f4f6] px-1.5 text-[10px] font-semibold text-[#667085] sm:h-7 sm:min-w-[32px] sm:px-2 sm:text-[11px] md:h-8">
                              {card.extra}
                            </div>
                          </div>
                          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f6f8] text-[#4f5665] sm:h-9 sm:w-9 md:h-10 md:w-10">
                            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      )}

                      {card.guest && (
                        <div className="mt-4 flex items-center justify-between sm:mt-5">
                          <p className="text-[10px] font-medium text-[#8b92a1] sm:text-[11px] md:text-[12px]">{card.guest}</p>
                          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f6f8] text-[#4f5665] sm:h-9 sm:w-9 md:h-10 md:w-10">
                            <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      )}

                      {card.capacity && (
                        <div className="mt-4 flex items-center justify-between sm:mt-5">
                          <p className="text-[10px] font-medium text-[#8b92a1] sm:text-[11px] md:text-[12px]">{card.capacity}</p>
                          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f6f8] text-[#4f5665] sm:h-9 sm:w-9 md:h-10 md:w-10">
                            <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Memberclassification({
  onLogout,
  onNavigate,
  activePage,
  showSettingsPage,
  setShowSettingsPage,
}) {
  const segments = [
    {
      name: "LGB",
      members: 452,
      growth: "+8%",
      growthClass: "text-emerald-500 bg-emerald-50",
      bar: "bg-[#6D5EF7]",
      iconWrap: "bg-[#f2efff] text-[#6D5EF7]",
      icon: <Users className="h-4 w-4" />,
      action: "View Members",
      group: "categories",
    },
    {
      name: "Members",
      members: 500,
      growth: "+6%",
      growthClass: "text-emerald-500 bg-emerald-50",
      bar: "bg-[#10b981]",
      iconWrap: "bg-[#ecfdf5] text-[#10b981]",
      icon: <Users className="h-4 w-4" />,
      action: "View Members",
      group: "categories",
    },
    {
      name: "Appointee",
      members: 126,
      growth: "+5%",
      growthClass: "text-emerald-500 bg-emerald-50",
      bar: "bg-[#3B82F6]",
      iconWrap: "bg-[#eef5ff] text-[#3B82F6]",
      icon: <Briefcase className="h-4 w-4" />,
      action: "View Members",
      group: "categories",
    },
    {
      name: "JAC",
      members: 89,
      growth: "-2%",
      growthClass: "text-rose-500 bg-rose-50",
      bar: "bg-[#A855F7]",
      iconWrap: "bg-[#f5edff] text-[#A855F7]",
      icon: <Sparkles className="h-4 w-4" />,
      action: "View Members",
      group: "categories",
    },
    {
      name: "Past President",
      members: 34,
      growth: "Stable",
      growthClass: "text-slate-500 bg-slate-100",
      bar: "bg-[#64748B]",
      iconWrap: "bg-[#f1f5f9] text-[#64748B]",
      icon: <ShieldCheck className="h-4 w-4" />,
      action: "View Members",
      group: "categories",
    },
    {
      name: "Business",
      members: 156,
      growth: "+8%",
      growthClass: "text-emerald-500 bg-emerald-50",
      bar: "bg-[#06B6D4]",
      iconWrap: "bg-[#ecfeff] text-[#06B6D4]",
      icon: <CreditCard className="h-4 w-4" />,
      action: "View Members",
      group: "segment",
    },
    {
      name: "Salaried",
      members: 284,
      growth: "+4%",
      growthClass: "text-emerald-500 bg-emerald-50",
      bar: "bg-[#10B981]",
      iconWrap: "bg-[#ecfdf5] text-[#10B981]",
      icon: <Briefcase className="h-4 w-4" />,
      action: "View Members",
      group: "segment",
    },
  ];

  const updates = [
    {
      title: "New Member in JAC",
      subtitle: "Jon Sen Smith joined 2 hours ago",
      time: "2m ago",
    },
    {
      title: "Category Renamed",
      subtitle: "LGB updated to LGB Member",
      time: "5h ago",
    },
  ];

  const [activeCategoryTab, setActiveCategoryTab] = useState("categories");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredSegments = segments.filter(
    (item) => item.group === activeCategoryTab
  );

  return (
    <div className="h-screen w-full overflow-hidden bg-[#eef0f5] p-0 lg:p-2 sm:p-3">
      <div className="h-screen w-full overflow-hidden rounded-none border-0 bg-white shadow-none lg:h-[calc(100vh-1rem)] lg:rounded-[22px] lg:border lg:border-[#dfe3ee] lg:shadow-[0_20px_60px_rgba(25,30,60,0.08)] sm:lg:h-[calc(100vh-1.5rem)]">
        <div className="flex h-full w-full overflow-hidden">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="fixed right-4 top-4 z-50 rounded-full bg-[#5b3df5] p-3 text-white shadow-lg lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Mobile Overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
           className={`fixed inset-y-0 left-0 z-40 h-full w-[260px] transform border-r border-[#edf0f5] bg-[#f7f9fc] px-4 py-5 transition-transform duration-300 ease-in-out sm:px-5 sm:py-6 lg:static lg:z-auto lg:h-auto lg:self-stretch lg:translate-x-0 ${
  mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
}`}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5b3df5] text-white shadow-[0_12px_26px_rgba(91,61,245,0.35)] sm:h-11 sm:w-11">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1f2430] sm:text-[15px]">
                    JCI Madurai Central
                  </p>
                  <p className="text-[11px] text-[#8c90a0] sm:text-[12px]">
                    Admin Portal
                  </p>
                </div>
              </div>

              <nav className="mt-8 space-y-1 sm:mt-10 sm:space-y-2">
                <SidebarItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={activePage === "dashboard"}
                  onClick={() => {
                    onNavigate("dashboard");
                    setMobileMenuOpen(false);
                  }}
                />

                <SidebarItem
                  icon={Users}
                  label="Members"
                  active={activePage === "members"}
                  onClick={() => {
                    onNavigate("members");
                    setMobileMenuOpen(false);
                  }}
                />

                <SidebarItem
                  icon={FolderKanban}
                  label="Member Classification"
                  active={activePage === "Memberclassification"}
                  onClick={() => {
                    onNavigate("Memberclassification");
                    setMobileMenuOpen(false);
                  }}
                />

                <SidebarItem
                  icon={CalendarDays}
                  label="Events"
                  active={activePage === "events"}
                  onClick={() => {
                    onNavigate("events");
                    setMobileMenuOpen(false);
                  }}
                />

                <SidebarItem
                  icon={BarChart3}
                  label="Analytics"
                  active={activePage === "analytics"}
                  onClick={() => {
                    onNavigate("analytics");
                    setMobileMenuOpen(false);
                  }}
                />

                <SettingsToggleBlock
                  activePage={activePage}
                  onNavigate={(page) => {
                    onNavigate(page);
                    setMobileMenuOpen(false);
                  }}
                  showSettingsPage={showSettingsPage}
                  setShowSettingsPage={setShowSettingsPage}
                />
              </nav>

              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="mt-auto flex h-[50px] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#FF0000] to-[#FF0000] text-[14px] font-semibold text-white shadow-[0_20px_30px_rgba(78,58,233,0.25)] sm:h-[56px] sm:text-[16px]"
              >
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 h-full w-full flex-1 overflow-y-auto overflow-x-hidden bg-[#f5f7fb] px-4 py-4 pt-20 sm:px-5 sm:py-5 sm:pt-20 md:px-6 md:py-6 md:pt-24 lg:pt-6">
            <div className="mx-auto w-full max-w-none">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex h-[44px] w-full max-w-[430px] items-center gap-2 rounded-full border border-[#edf0f6] bg-white px-3 shadow-sm sm:gap-3 sm:px-4">
                  <Search className="h-3.5 w-3.5 text-[#9ca3b1] sm:h-4 sm:w-4" />
                  <input
                    className="w-full bg-transparent text-[13px] text-[#4b5563] outline-none placeholder:text-[#b3bac6] sm:text-[14px]"
                    placeholder="Search categories..."
                  />
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#636b7b] shadow-sm ring-1 ring-[#eceef4] transition hover:bg-[#fafbff] sm:h-12 sm:w-12">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#5b3df5] sm:top-3.5 sm:right-3.5"></span>
                  </button>
                  <div className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-[#eceef4] sm:px-5 sm:py-2">
                    <img
                      src={saran}
                      alt="Sarankumar R"
                      className="h-8 w-8 rounded-full border border-[#f0f2f5] object-cover sm:h-10 sm:w-10"
                    />
                    <span className="text-[14px] font-bold text-[#1f2430] sm:text-[16px]">Sarankumar R</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-[1.6rem] font-bold leading-none tracking-[-0.04em] text-[#1f2430] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.1rem]">
                    Category Management
                  </h1>
                  <p className="mt-1.5 text-[12px] text-[#7b8393] sm:mt-2 sm:text-[13px] md:text-[14px]">
                    Organize and curate your business directory&apos;s expertise
                    segments.
                  </p>
                </div>

                <button className="rounded-full bg-gradient-to-r from-[#5b3df5] to-[#6b4cf6] px-5 py-2 text-[12px] font-semibold text-white shadow-[0_18px_30px_rgba(91,61,245,0.28)] sm:px-6 sm:py-2.5 sm:text-[13px] md:text-[14px]">
                  + Add New Category
                </button>
              </div>

              <section className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative overflow-hidden rounded-[20px] bg-white p-4 shadow-sm ring-1 ring-[#edf0f5] sm:p-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#a3a9b7] sm:text-[12px]">
                    Total Categories
                  </p>
                  <h3 className="mt-2 text-[1.8rem] font-bold text-[#1f2430] sm:text-[2rem] md:text-[2.2rem]">
                    32
                  </h3>
                  <p className="mt-4 text-[11px] font-semibold text-[#6b5bf6] sm:mt-5 sm:text-[12px] md:mt-6">
                    ↗ Active Growth
                  </p>
                  <div className="absolute bottom-2 right-3 text-[56px] font-bold leading-none text-[#f3f4f8] sm:bottom-3 sm:right-4 sm:text-[64px] md:text-[72px]">
                    △
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[20px] bg-white p-4 shadow-sm ring-1 ring-[#edf0f5] sm:p-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#a3a9b7] sm:text-[12px]">
                    Growth Momentum
                  </p>
                  <h3 className="mt-2 text-[1.8rem] font-bold text-[#1f2430] sm:text-[2rem] md:text-[2.2rem]">
                    +18%
                  </h3>
                  <p className="mt-4 text-[11px] font-semibold text-[#6b5bf6] sm:mt-5 sm:text-[12px] md:mt-6">
                    Last 30 Days
                  </p>
                  <div className="absolute bottom-2 right-3 text-[48px] font-bold leading-none text-[#f3f4f8] sm:bottom-3 sm:right-4 sm:text-[56px] md:text-[62px]">
                    ✦
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[20px] bg-white p-4 shadow-sm ring-1 ring-[#edf0f5] sm:p-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#a3a9b7] sm:text-[12px]">
                    Top Performing
                  </p>
                  <h3 className="mt-2 text-[1.8rem] font-bold text-[#1f2430] sm:text-[2rem] md:text-[2.1rem]">
                    LGB Member
                  </h3>
                  <p className="mt-4 text-[11px] font-semibold text-[#6b5bf6] sm:mt-5 sm:text-[12px] md:mt-6">
                    ★ 452 Active Members
                  </p>
                  <div className="absolute bottom-2 right-3 text-[52px] font-bold leading-none text-[#f3f4f8] sm:bottom-3 sm:right-4 sm:text-[58px] md:text-[62px]">
                    ✓
                  </div>
                </div>
              </section>

              <section className="mt-5 sm:mt-6">
                <div className="flex items-center gap-2 rounded-2xl bg-[#f3f5f9] p-1.5 ring-1 ring-[#e7ebf3] sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveCategoryTab("categories")}
                    className={`rounded-xl px-4 py-2 text-[12px] font-semibold transition sm:px-5 sm:py-2.5 sm:text-[13px] md:text-[14px] ${
                      activeCategoryTab === "categories"
                        ? "bg-[#5b3df5] text-white shadow-[0_10px_24px_rgba(91,61,245,0.28)]"
                        : "text-[#8f97a8] hover:text-[#2c3445]"
                    }`}
                  >
                    Categories
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryTab("segment")}
                    className={`rounded-xl px-4 py-2 text-[12px] font-semibold transition sm:px-5 sm:py-2.5 sm:text-[13px] md:text-[14px] ${
                      activeCategoryTab === "segment"
                        ? "bg-[#5b3df5] text-white shadow-[0_10px_24px_rgba(91,61,245,0.28)]"
                        : "text-[#8f97a8] hover:text-[#2c3445]"
                    }`}
                  >
                    Segment
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredSegments.map((segment) => (
                    <div
                      key={segment.name}
                      className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-[#edf0f5] sm:p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${segment.iconWrap} sm:h-11 sm:w-11 md:h-12 md:w-12`}
                        >
                          {segment.icon}
                        </div>
                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-semibold sm:px-3 sm:py-1 sm:text-[11px] md:text-[12px] ${segment.growthClass}`}
                        >
                          {segment.growth}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[1.1rem] font-bold tracking-[-0.03em] text-[#1f2430] sm:mt-5 sm:text-[1.2rem]">
                        {segment.name}
                      </h3>

                      <p className="mt-1 text-[11px] text-[#8b93a3] sm:text-[12px]">
                        {segment.members} members total
                      </p>

                      <div className="mt-4 h-2 rounded-full bg-[#edf0f5] sm:mt-5">
                        <div className={`h-2 w-[72%] rounded-full ${segment.bar}`} />
                      </div>

                      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#eef1f6] py-2 text-[12px] font-semibold text-[#3b4354] sm:mt-5 sm:py-2.5 sm:text-[13px]">
                        ✎ Manage
                      </button>

                      <button className="mt-2 w-full text-center text-[11px] font-medium text-[#8a91a2] sm:mt-3 sm:text-[12px]">
                        {segment.action}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}



function DashboardPage({ onLogout, onNavigate, activePage, showSettingsPage, setShowSettingsPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#f4f5f7] text-[#1f2430]">
      <div className="flex h-screen overflow-hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 z-50 rounded-full bg-[#5b3df5] p-3 text-white shadow-lg lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <aside className={`fixed inset-y-0 left-0 z-40 w-[260px] transform border-r border-[#edf0f5] bg-[#f7f9fc] px-4 py-5 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:px-5 sm:py-6`}>
          <div className="flex h-full flex-col">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5b3df5] text-white shadow-[0_12px_26px_rgba(91,61,245,0.35)] sm:h-11 sm:w-11">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1f2430] sm:text-[15px]">JCI Madurai Central</p>
                  <p className="text-[11px] text-[#8c90a0] sm:text-[12px]">Admin Portal</p>
                </div>
              </div>

              <nav className="mt-8 space-y-1 sm:mt-10 sm:space-y-2">
                <SidebarItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={activePage === "dashboard"}
                  onClick={() => {
                    onNavigate("dashboard");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={Users}
                  label="Members"
                  active={activePage === "members"}
                  onClick={() => {
                    onNavigate("members");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={FolderKanban}
                  label="Member Classification"
                  active={activePage === "Memberclassification"}
                  onClick={() => {
                    onNavigate("Memberclassification");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={CalendarDays}
                  label="Events"
                  active={activePage === "events"}
                  onClick={() => {
                    onNavigate("events");
                    setMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={BarChart3}
                  label="Analytics"
                  active={activePage === "analytics"}
                  onClick={() => {
                    onNavigate("analytics");
                    setMobileMenuOpen(false);
                  }}
                />
                <SettingsToggleBlock
                  activePage={activePage}
                  onNavigate={(page) => {
                    onNavigate(page);
                    setMobileMenuOpen(false);
                  }}
                  showSettingsPage={showSettingsPage}
                  setShowSettingsPage={setShowSettingsPage}
                />
              </nav>
            </div>

            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="mt-auto flex h-[50px] w-full items-center justify-center rounded-full bg-[#ff1a12] text-[14px] font-semibold text-white shadow-[0_20px_30px_rgba(255,26,18,0.22)] sm:h-[56px] sm:text-[16px]"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="h-screen flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-7 xl:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex h-[48px] w-full max-w-[540px] items-center gap-2 rounded-full border border-[#eff1f5] bg-[#f8f9fb] px-3 shadow-inner sm:gap-3 sm:px-4 md:px-5">
              <Search className="h-4 w-4 text-[#9ca3b1] sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
              <input className="w-full bg-transparent text-[13px] text-[#48505f] outline-none placeholder:text-[#afb5c2] sm:text-[14px] md:text-[15px]" placeholder="Search members or data..." />
            </div>

            <div className="flex items-center justify-end gap-3 sm:gap-4">
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#636b7b] shadow-sm ring-1 ring-[#eceef4] transition hover:bg-[#fafbff] sm:h-12 sm:w-12">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#5b3df5] sm:top-3.5 sm:right-3.5"></span>
              </button>
              <div className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-[#eceef4] sm:px-5 sm:py-2">
                <img
                  src={saran}
                  alt="Sarankumar R"
                  className="h-8 w-8 rounded-full border border-[#f0f2f5] object-cover sm:h-10 sm:w-10"
                />
                <span className="text-[14px] font-bold text-[#1f2430] sm:text-[16px]">Sarankumar R</span>
              </div>
            </div>
          </div>

          <section className="mt-5 sm:mt-6 md:mt-7 lg:mt-8">
            <h1 className="text-[2rem] font-bold tracking-[-0.05em] leading-none sm:text-[2.5rem] md:text-[2.8rem] lg:text-[3.2rem]">Welcome, Sarankumar R</h1>
            <p className="mt-2 text-[1.1rem] text-[#6f7787] sm:mt-2.5 sm:text-[1.2rem] md:mt-3 md:text-[1.25rem] lg:text-[1.35rem]">
              Your directory ecosystem is growing at a record pace this week.
            </p>
          </section>

          <section className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => <StatCard key={item.title} item={item} />)}
          </section>

          <section className="mt-5 sm:mt-6 md:mt-7 lg:mt-8">
            <GrowthChart />
          </section>

          <section className="mt-5 space-y-6 sm:mt-6 sm:space-y-7 md:mt-7 md:space-y-8">
            <section className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-2">
              {/* Categories of Members Section */}
              <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.3rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.5rem] md:text-[1.7rem] lg:text-[1.9rem]">
                    Categories of Members
                  </h3>
                  <button className="text-[#8f96a4] text-[16px] leading-none sm:text-[17px] md:text-[18px]">•••</button>
                </div>

                <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5 md:mt-7 md:space-y-6">
                  {[
                    { name: "LGB", value: "4,820", width: "w-[96%]", color: "from-[#4e3ae9] to-[#6a42f5]" },
                    { name: "Members", value: "4,120", width: "w-[82%]", color: "from-[#6a5af9] to-[#8d88ff]" },
                    { name: "Appointee", value: "3,450", width: "w-[69%]", color: "from-[#7a73ff] to-[#9c97ff]" },
                    { name: "JAC", value: "2,910", width: "w-[58%]", color: "from-[#828cff] to-[#a4aeff]" },
                    { name: "Past President", value: "1,840", width: "w-[42%]", color: "from-[#8b96b8] to-[#b2bdd3]" },
                  ].map((item) => (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between text-[12px] font-medium text-[#3b4250] sm:text-[13px] md:text-[14px]">
                        <span>{item.name}</span>
                        <span className="text-[#9aa2b0]">{item.value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#e8ebf2] sm:h-2.5">
                        <div className={`h-full ${item.width} rounded-full bg-gradient-to-r ${item.color}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Segment of Members Section */}
              <div className="rounded-[30px] bg-white p-4 shadow-[0_8px_24px_rgba(25,30,60,0.04)] ring-1 ring-[#efeff3] sm:p-5 md:p-6 lg:p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.3rem] font-bold tracking-[-0.04em] text-[#1f2430] sm:text-[1.5rem] md:text-[1.6rem] lg:text-[1.7rem]">
                    Segment of Members
                  </h3>
                  <button className="text-[#8f96a4] text-[16px] leading-none sm:text-[17px] md:text-[18px]">•••</button>
                </div>

                <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-[12px] font-medium text-[#3b4250] sm:text-[13px] md:text-[14px]">
                      <span>Business</span>
                      <span className="text-[#9aa2b0]">1,200</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#e8ebf2] sm:h-2.5">
                      <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#4e3ae9] to-[#6a42f5]" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-[12px] font-medium text-[#3b4250] sm:text-[13px] md:text-[14px]">
                      <span>Salaried</span>
                      <span className="text-[#9aa2b0]">940</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#e8ebf2] sm:h-2.5">
                      <div className="h-full w-[48%] rounded-full bg-gradient-to-r from-[#7a73ff] to-[#9c97ff]" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <RecentActivity />
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [eventCategoryFilter, setEventCategoryFilter] = useState("All");

  const handleNavigate = (page, filter = "All") => {
    setActivePage(page);
    setEventCategoryFilter(filter);
  };

  useEffect(() => {
    if (!showSettingsPage && activePage === "settings") {
      setActivePage("dashboard");
    }
  }, [showSettingsPage, activePage]);

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={() => setIsLoggedIn(true)}
        onGoogleLogin={() => setIsLoggedIn(true)}
      />
    );
  }

  if (activePage === "members") {
    return (
      <MembersPage
        onLogout={() => setIsLoggedIn(false)}
        onNavigate={handleNavigate}
        activePage={activePage}
        showSettingsPage={showSettingsPage}
        setShowSettingsPage={setShowSettingsPage}
      />
    );
  }

  if (activePage === "events") {
    return (
      <EventsPage
        onLogout={() => setIsLoggedIn(false)}
        onNavigate={handleNavigate}
        activePage={activePage}
        showSettingsPage={showSettingsPage}
        setShowSettingsPage={setShowSettingsPage}
        eventCategoryFilter={eventCategoryFilter}
        setEventCategoryFilter={setEventCategoryFilter}
      />
    );
  }

  if (activePage === "analytics") {
    return (
      <AnalyticsPage
        onLogout={() => setIsLoggedIn(false)}
        onNavigate={handleNavigate}
        activePage={activePage}
        showSettingsPage={showSettingsPage}
        setShowSettingsPage={setShowSettingsPage}
      />
    );
  }

  if (activePage === "Memberclassification") {
    return (
      <Memberclassification
        onLogout={() => setIsLoggedIn(false)}
        onNavigate={handleNavigate}
        activePage={activePage}
        showSettingsPage={showSettingsPage}
        setShowSettingsPage={setShowSettingsPage}
      />
    );
  }

  if (activePage === "settings" && showSettingsPage) {
    return (
      <SettingsPage
        onLogout={() => setIsLoggedIn(false)}
        onNavigate={handleNavigate}
        activePage={activePage}
        showSettingsPage={showSettingsPage}
        setShowSettingsPage={setShowSettingsPage}
      />
    );
  }

  return (
    <DashboardPage
      onLogout={() => setIsLoggedIn(false)}
      onNavigate={handleNavigate}
      activePage={activePage}
      showSettingsPage={showSettingsPage}
      setShowSettingsPage={setShowSettingsPage}
    />
  );
}