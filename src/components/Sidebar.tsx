import {
  LayoutDashboard, Users, CalendarCheck, BarChart3, BookOpen,
  ClipboardList, Clock, FileText, Bell, Settings, LogOut,
  GraduationCap, ChevronLeft, ChevronRight, TrendingUp, Lightbulb
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "marks", label: "Marks", icon: BookOpen },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "timetable", label: "Timetable", icon: Clock },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "insights", label: "Smart Insights", icon: Lightbulb },
];

const bottomItems = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeView, onNavigate, onLogout, collapsed, onCollapse }: SidebarProps) {
  return (
    <aside
      className={`sidebar-transition bg-[#122847] flex flex-col h-full ${
        collapsed ? "w-16" : "w-60"
      } flex-shrink-0`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-lg bg-[#F26419] flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-white font-display font-bold text-sm">Meridian</div>
            <div className="text-blue-300 text-[10px] tracking-widest uppercase">Faculty Portal</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {!collapsed && (
          <p className="px-4 mb-2 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Main Menu</p>
        )}
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all text-sm font-medium
              ${collapsed ? "justify-center" : ""}
              ${activeView === id
                ? "bg-white/10 text-white border-r-2 border-[#F26419]"
                : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            title={collapsed ? label : undefined}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
            {!collapsed && id === "notifications" && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
            )}
          </button>
        ))}

        {!collapsed && (
          <p className="px-4 mt-4 mb-2 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Account</p>
        )}
        {bottomItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all text-sm font-medium
              ${collapsed ? "justify-center" : ""}
              ${activeView === id
                ? "bg-white/10 text-white border-r-2 border-[#F26419]"
                : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
            {!collapsed && id === "notifications" && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
            )}
          </button>
        ))}
      </nav>

      {/* Profile + Logout */}
      {!collapsed && (
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
              DR
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">Dr. Rajiv Sharma</div>
              <div className="text-white/40 text-[10px] truncate">Computer Science</div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => onLogout()}
        className={`flex items-center gap-3 px-4 py-3 text-white/60 hover:text-red-400 hover:bg-white/5 transition-all text-sm ${collapsed ? "justify-center" : ""} border-t border-white/10`}
      >
        <LogOut className="w-4 h-4 flex-shrink-0" />
        {!collapsed && <span>Logout</span>}
      </button>

      {/* Collapse toggle */}
      <button
        onClick={() => onCollapse(!collapsed)}
        className="flex items-center justify-center py-3 border-t border-white/10 text-white/40 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
