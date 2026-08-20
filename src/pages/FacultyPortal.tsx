import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import AttendancePage from "./AttendancePage";
import StudentsPage from "./StudentsPage";
import ReportsPage from "./ReportsPage";
import SettingsPage from "./SettingsPage";
import { Bell, Search, HelpCircle, Menu } from "lucide-react";
import Toggle from "../components/Toggle";

interface FacultyPortalProps {
  onLogout: () => void;
}

const notifications = [
  { id: 1, text: "Kavya Reddy's attendance dropped to 58%", time: "2h ago", unread: true },
  { id: 2, text: "3 new assignment submissions in Data Structures", time: "4h ago", unread: true },
  { id: 3, text: "Timetable updated for next week", time: "1d ago", unread: false },
];

export default function FacultyPortal({ onLogout }: FacultyPortalProps) {
  const [activeView, setActiveView] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case "dashboard": return <Dashboard />;
      case "attendance": return <AttendancePage />;
      case "students": return <StudentsPage />;
      case "reports": return <ReportsPage />;
      case "settings": return <SettingsPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <div className="w-16 h-16 rounded-2xl bg-[#1B3A6B]/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h2 className="font-display text-xl font-bold text-gray-700 mb-2">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h2>
            <p className="text-gray-400 text-sm">This section is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FC] overflow-hidden">
      {/* Mobile overlay */}
      {mobileSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${mobileSidebar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static z-40 h-full transition-transform duration-300`}>
        <Sidebar
          activeView={activeView}
          onNavigate={(view) => { setActiveView(view); setMobileSidebar(false); }}
          onLogout={onLogout}
          collapsed={collapsed}
          onCollapse={setCollapsed}
        />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 gap-3 flex-shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
            onClick={() => setMobileSidebar(true)}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
            <span className="text-[#1B3A6B] font-medium">Faculty Portal</span>
            <span>/</span>
            <span className="capitalize">{activeView}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Quick search..."
                className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-[#1B3A6B] w-44 transition-all"
              />
            </div>

            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all text-gray-500 relative" onClick={() => setShowNotifs(!showNotifs)}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all text-gray-500">
              <HelpCircle className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-gray-100 ml-1">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] flex items-center justify-center text-white text-xs font-bold">
                DR
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-gray-900 leading-none">Dr. Sharma</div>
                <div className="text-[10px] text-gray-400">CS Dept</div>
              </div>
            </div>
          </div>

          {/* Notification Dropdown */}
          {showNotifs && (
            <div className="absolute top-14 right-4 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="font-display font-bold text-sm text-gray-900">Notifications</span>
                <span className="text-xs text-[#1B3A6B] font-semibold cursor-pointer">Mark all read</span>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${n.unread ? "bg-blue-50/40" : ""}`}>
                  <div className="flex items-start gap-3">
                    {n.unread && <div className="w-2 h-2 bg-[#1B3A6B] rounded-full mt-1 flex-shrink-0" />}
                    <div>
                      <p className="text-xs text-gray-700 leading-relaxed">{n.text}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
