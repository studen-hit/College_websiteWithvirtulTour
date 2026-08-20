import { useState } from "react";
import { GraduationCap, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";

interface FacultyLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function FacultyLogin({ onLogin, onBack }: FacultyLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "linear-gradient(135deg, #0f2040 0%, #1B3A6B 100%)" }}
    >
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=900&fit=crop&auto=format')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </button>
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#F26419] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-display font-bold text-xl">Meridian University</div>
              <div className="text-blue-300 text-xs tracking-widest uppercase">Faculty Portal</div>
            </div>
          </div>
          <h2 className="text-white font-display text-4xl font-extrabold leading-tight mb-4">
            Empower Your<br />Classroom with Data
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed mb-8">
            Track attendance, analyze performance, generate reports, and support every student on their academic journey.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Students Tracked", value: "8,420+" },
              { label: "Reports Generated", value: "2,100+" },
              { label: "Active Faculty", value: "312" },
              { label: "Classes Monitored", value: "640" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-white font-display font-bold text-xl">{value}</div>
                <div className="text-blue-200 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center gap-2 text-white/40 text-xs">
          <ShieldCheck className="w-4 h-4" />
          Secured with 256-bit SSL encryption. All data is encrypted at rest.
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
          {/* Tab switcher */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  tab === t
                    ? "bg-white text-[#1B3A6B] shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <>
              <div className="mb-6">
                <h3 className="font-display font-bold text-2xl text-[#1B3A6B]">Welcome back</h3>
                <p className="text-gray-400 text-sm mt-1">Sign in to your faculty dashboard</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email / Faculty ID</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dr.sharma@meridian.edu.in"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 accent-[#1B3A6B] rounded"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-[#1B3A6B] font-medium hover:underline">Forgot password?</a>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#1B3A6B] text-white font-bold rounded-xl hover:bg-[#122847] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : "Sign In to Dashboard"}
                </button>
              </form>
              <p className="text-center text-xs text-gray-400 mt-6">
                Having trouble? Contact <a href="mailto:support@meridian.edu.in" className="text-[#1B3A6B] font-medium">IT Support</a>
              </p>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-display font-bold text-2xl text-[#1B3A6B]">Create Account</h3>
                <p className="text-gray-400 text-sm mt-1">Register as a faculty member</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                    <input placeholder="Dr. Jane Smith" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Faculty ID</label>
                    <input placeholder="FAC-2026-001" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" placeholder="you@meridian.edu.in" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                    <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all bg-white">
                      <option>Computer Science</option>
                      <option>Commerce</option>
                      <option>Sciences</option>
                      <option>Arts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Designation</label>
                    <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all bg-white">
                      <option>Professor</option>
                      <option>Assoc. Professor</option>
                      <option>Asst. Professor</option>
                      <option>Lecturer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all" />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#1B3A6B] text-white font-bold rounded-xl hover:bg-[#122847] transition-all shadow-lg mt-2 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : "Create Account"}
                </button>
              </form>
            </>
          )}

          <button
            onClick={onBack}
            className="lg:hidden flex items-center gap-1 text-gray-400 text-sm mt-5 hover:text-gray-600 transition-colors mx-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to website
          </button>
        </div>
      </div>
    </div>
  );
}
