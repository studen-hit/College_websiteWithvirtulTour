import { useState, useEffect, useRef } from "react";
import {
  ChevronRight, Award, Users, BookOpen, Building2, Star,
  Calendar, ArrowRight, MapPin, Phone, Mail,
  Play, CheckCircle,
  TrendingUp, Globe, Microscope, Cpu, FlaskConical
} from "lucide-react";

const stats = [
  { label: "Students Enrolled", value: 8420, suffix: "+" },
  { label: "Faculty Members", value: 312, suffix: "+" },
  { label: "Programs Offered", value: 48, suffix: "" },
  { label: "Years of Excellence", value: 35, suffix: "" },
  { label: "Placement Rate", value: 94, suffix: "%" },
  { label: "Research Papers", value: 1280, suffix: "+" },
];

const programs = [
  { name: "B.Sc Computer Science", dept: "Sciences", duration: "3 Years", icon: Cpu, color: "#1B3A6B", students: 420 },
  { name: "Bachelor of Commerce", dept: "Commerce", duration: "3 Years", icon: TrendingUp, color: "#2E86AB", students: 385 },
  { name: "B.Sc Biotechnology", dept: "Sciences", duration: "3 Years", icon: FlaskConical, color: "#22C55E", students: 218 },
  { name: "BA English Literature", dept: "Arts", duration: "3 Years", icon: BookOpen, color: "#F26419", students: 302 },
  { name: "BBA Management", dept: "Business", duration: "3 Years", icon: Globe, color: "#8B5CF6", students: 467 },
  { name: "B.Sc Physics", dept: "Sciences", duration: "3 Years", icon: Microscope, color: "#EC4899", students: 196 },
];

const events = [
  {
    date: "Aug 28, 2026",
    title: "Annual Tech Symposium",
    category: "Technology",
    desc: "Join us for three days of innovation, keynotes from industry leaders, and student project showcases.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=220&fit=crop&auto=format",
  },
  {
    date: "Sep 5, 2026",
    title: "Cultural Fest 2026",
    category: "Cultural",
    desc: "Meridian's biggest annual cultural extravaganza with performances from 40+ student clubs.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=220&fit=crop&auto=format",
  },
  {
    date: "Sep 18, 2026",
    title: "Placement Drive Q3",
    category: "Career",
    desc: "Over 60 top companies visiting campus for final-year students across all departments.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=220&fit=crop&auto=format",
  },
];

const testimonials = [
  {
    name: "Priya Subramaniam",
    program: "B.Sc CS, 2024",
    quote: "Meridian gave me the technical foundation and confidence to land my dream role at a top tech firm. The faculty are genuinely invested in your success.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Arjun Mehta",
    program: "BBA Management, 2023",
    quote: "The campus culture, mentorship, and industry exposure I got here is unmatched. Three years flew by, but I left fully prepared for the real world.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Deepika Nair",
    program: "B.Com, 2025",
    quote: "The placement team's network is incredible. I was placed at a Big Four firm three months before graduation.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
  },
];

const facilities = [
  { name: "Central Library", desc: "1.2 lakh+ volumes, e-resources", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=260&fit=crop&auto=format" },
  { name: "Computer Labs", desc: "6 labs, 500+ workstations", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=260&fit=crop&auto=format" },
  { name: "Sports Complex", desc: "Olympic pool, multi-sport arena", img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=260&fit=crop&auto=format" },
  { name: "Smart Classrooms", desc: "AI-enabled interactive boards", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=260&fit=crop&auto=format" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const startTime = performance.now();
        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

interface HomePageProps {
  onFacultyLogin: () => void;
}

export default function HomePage({ onFacultyLogin }: HomePageProps) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2040 0%, #1B3A6B 50%, #2a5298 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop&auto=format')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2040]/60 via-[#1B3A6B]/40 to-[#1B3A6B]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-blue-200 text-xs font-semibold px-4 py-2 rounded-full border border-white/20 mb-8">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full pulse-dot" />
            Admissions Open for 2026–27
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Shape Your Future at<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-orange-300">
              Meridian University
            </span>
          </h1>

          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A premier institution committed to academic excellence, innovation, and holistic development.
            Join 8,400+ students pursuing their passion.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#programs"
              className="px-8 py-3.5 bg-white text-[#1B3A6B] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Programs
            </a>
            <a
              href="#admissions"
              className="px-8 py-3.5 bg-[#F26419] text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Apply Now <ArrowRight className="inline w-4 h-4 ml-1" />
            </a>
            <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white transition-colors">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
              <span className="text-sm font-medium">Virtual Tour</span>
            </button>
          </div>

          {/* Quick stats row */}
          <div className="mt-16 grid grid-cols-3 md:grid-cols-6 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-display font-extrabold text-white">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-blue-200 text-[11px] mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#F26419] font-semibold text-sm tracking-widest uppercase mb-3">About Meridian</p>
            <h2 className="font-display text-4xl font-extrabold text-[#1B3A6B] mb-6 leading-tight">
              35 Years of Transforming Lives Through Education
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 1991, Meridian University has grown from a single faculty to a vibrant multi-disciplinary institution. We are NAAC A+ accredited with a legacy of producing industry leaders, researchers, and changemakers.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "NAAC Grade", value: "A+" },
                { label: "NIRF Rank", value: "#82" },
                { label: "Departments", value: "18" },
                { label: "Collaborations", value: "60+" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#F8F9FC] rounded-xl p-4">
                  <div className="text-2xl font-display font-extrabold text-[#1B3A6B]">{value}</div>
                  <div className="text-gray-500 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
            <a href="#about" className="inline-flex items-center gap-2 text-[#1B3A6B] font-semibold hover:gap-3 transition-all">
              Learn more about us <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=450&fit=crop&auto=format"
              alt="Meridian University campus building"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#1B3A6B] text-white rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-display font-extrabold">#1</div>
              <div className="text-blue-200 text-sm">State University Rankings 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-24 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#F26419] font-semibold text-sm tracking-widest uppercase mb-3">Academic Programs</p>
            <h2 className="font-display text-4xl font-extrabold text-[#1B3A6B] mb-4">Find Your Path</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Choose from 48 undergraduate and postgraduate programs designed to meet industry demands and fuel intellectual growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: p.color + "15" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: p.color }} />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{p.name}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{p.dept}</span>
                    <span className="text-xs text-gray-400">{p.duration}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-5">{p.students} students currently enrolled in this program.</p>
                  <a
                    href="#programs"
                    className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                    style={{ color: p.color }}
                  >
                    Learn More <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <a href="#programs" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1B3A6B] text-[#1B3A6B] font-semibold rounded-xl hover:bg-[#1B3A6B] hover:text-white transition-all">
              View All 48 Programs <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-24 bg-[#1B3A6B] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-orange-300 font-semibold text-sm tracking-widest uppercase mb-3">Recognition & Awards</p>
            <h2 className="font-display text-4xl font-extrabold mb-4">Achievements That Define Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Best University Award", org: "Ministry of Education, 2025", color: "#F59E0B" },
              { icon: Star, title: "NAAC A+ Accreditation", org: "National Assessment Council", color: "#22C55E" },
              { icon: TrendingUp, title: "94% Placement Rate", org: "Academic Year 2025–26", color: "#3B82F6" },
              { icon: Globe, title: "60+ Global Tie-ups", org: "International University Partners", color: "#EC4899" },
            ].map(({ icon: Icon, title, org, color }) => (
              <div key={title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: color + "25" }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-1">{title}</h3>
                <p className="text-blue-200 text-sm">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#F26419] font-semibold text-sm tracking-widest uppercase mb-3">Campus Life</p>
            <h2 className="font-display text-4xl font-extrabold text-[#1B3A6B] mb-4">World-Class Facilities</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((f) => (
              <div key={f.name} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="bg-gray-200 aspect-[4/3]">
                  <img
                    src={f.img}
                    alt={f.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/80 via-transparent to-transparent flex items-end p-5">
                  <div>
                    <h3 className="text-white font-display font-bold text-lg">{f.name}</h3>
                    <p className="text-blue-200 text-sm">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-24 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#F26419] font-semibold text-sm tracking-widest uppercase mb-3">What's Happening</p>
              <h2 className="font-display text-4xl font-extrabold text-[#1B3A6B]">Events & News</h2>
            </div>
            <a href="#events" className="hidden sm:inline-flex items-center gap-1 text-[#1B3A6B] font-semibold hover:gap-2 transition-all">
              View all <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((e) => (
              <div key={e.title} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all group">
                <div className="bg-gray-100 h-48 relative overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-[#1B3A6B]">
                    {e.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {e.date}
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{e.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{e.desc}</p>
                  <a href="#events" className="text-[#1B3A6B] text-sm font-semibold hover:underline inline-flex items-center gap-1">
                    Read More <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#F26419] font-semibold text-sm tracking-widest uppercase mb-3">Student Stories</p>
            <h2 className="font-display text-4xl font-extrabold text-[#1B3A6B]">What Our Alumni Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#F8F9FC] rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.program}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="admissions" className="py-20 bg-gradient-to-r from-[#1B3A6B] to-[#2a5298]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-5">
            Start Your Journey With Us
          </h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
            Applications for the 2026–27 academic year are now open. Secure your place at Meridian University today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="px-8 py-3.5 bg-[#F26419] text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg">
              Apply Now
            </a>
            <a href="#contact" className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all">
              Contact College
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0f2040] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#F26419] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-white">Meridian University</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Shaping minds, building futures since 1991. NAAC A+ accredited institution of higher learning.
            </p>
            <div className="flex gap-3">
              {["f", "t", "in", "li", "yt"].map((label, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white/70 text-[10px] font-bold">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {["Home", "About Us", "Programs", "Admissions", "Events", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wider">Programs</h4>
            <ul className="space-y-2.5">
              {["B.Sc Computer Science", "BBA Management", "B.Com", "BA English", "M.Sc Physics", "MBA"].map((prog) => (
                <li key={prog}>
                  <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{prog}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F26419] flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm">12 University Avenue, Knowledge Park, Bangalore – 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F26419] flex-shrink-0" />
                <span className="text-white/50 text-sm">+91 80 4567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F26419] flex-shrink-0" />
                <span className="text-white/50 text-sm">admissions@meridian.edu.in</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs">© 2026 Meridian University. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
