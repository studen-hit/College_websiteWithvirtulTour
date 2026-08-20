import { useState, useEffect } from "react";
import { GraduationCap, Search, Menu, X, ChevronDown } from "lucide-react";

interface NavbarProps {
  onFacultyLogin: () => void;
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Departments", href: "#departments" },
  { label: "Faculty", href: "#faculty" },
  { label: "Admissions", href: "#admissions" },
  { label: "Achievements", href: "#achievements" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onFacultyLogin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1B3A6B] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div
                className={`font-display font-800 text-sm leading-tight transition-colors ${
                  scrolled ? "text-[#1B3A6B]" : "text-white"
                }`}
              >
                Meridian
              </div>
              <div
                className={`text-[10px] font-medium tracking-widest uppercase transition-colors ${
                  scrolled ? "text-gray-500" : "text-blue-200"
                }`}
              >
                University
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-white/10 ${
                  scrolled
                    ? "text-gray-700 hover:text-[#1B3A6B] hover:bg-blue-50"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-lg transition-all hover:bg-white/10 ${
                scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white"
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={onFacultyLogin}
              className={`hidden sm:block px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                scrolled
                  ? "border-[#1B3A6B] text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white"
                  : "border-white/60 text-white hover:bg-white hover:text-[#1B3A6B]"
              }`}
            >
              Faculty Login
            </button>
            <a
              href="#admissions"
              className="hidden sm:block px-4 py-1.5 text-sm font-semibold rounded-lg bg-[#F26419] text-white hover:bg-orange-600 transition-all shadow-sm"
            >
              Apply Now
            </a>
            <button
              className={`lg:hidden p-2 rounded-lg ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="bg-white border-t border-gray-100 px-6 py-3">
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search programs, departments, faculty..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B3A6B]"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#1B3A6B] pt-20 px-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-white/90 font-medium text-lg hover:bg-white/10 rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => { onFacultyLogin(); setMobileOpen(false); }}
                className="w-full py-3 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                Faculty Login
              </button>
              <a
                href="#admissions"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 bg-[#F26419] text-white font-semibold rounded-xl text-center hover:bg-orange-600 transition-all"
              >
                Apply Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
