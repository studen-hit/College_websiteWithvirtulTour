import Toggle from "../components/Toggle";
import { User, Lock, Bell, Palette, Shield, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <User className="w-4 h-4 text-[#1B3A6B]" />
          <h3 className="font-display font-bold text-gray-900">Profile</h3>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] flex items-center justify-center text-white text-xl font-bold">
            DR
          </div>
          <div>
            <div className="font-semibold text-gray-900">Dr. Rajiv Sharma</div>
            <div className="text-gray-400 text-sm">Computer Science · Associate Professor</div>
            <button className="text-xs text-[#1B3A6B] font-semibold mt-1 hover:underline">Change photo</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: "Dr. Rajiv Sharma" },
            { label: "Faculty ID", value: "FAC-2021-042" },
            { label: "Email", value: "r.sharma@meridian.edu.in" },
            { label: "Phone", value: "+91 98765 43210" },
            { label: "Department", value: "Computer Science" },
            { label: "Designation", value: "Associate Professor" },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
              <input
                defaultValue={value}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all"
              />
            </div>
          ))}
        </div>
        <button className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-[#1B3A6B] text-white text-sm font-semibold rounded-xl hover:bg-[#122847] transition-all">
          <Save className="w-3.5 h-3.5" /> Save Changes
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <Bell className="w-4 h-4 text-[#1B3A6B]" />
          <h3 className="font-display font-bold text-gray-900">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Low attendance alerts", desc: "Notify when student drops below 75%", defaultOn: true },
            { label: "Performance alerts", desc: "Notify when marks drop significantly", defaultOn: true },
            { label: "Assignment reminders", desc: "Daily deadline reminders", defaultOn: false },
            { label: "Timetable changes", desc: "Notify on schedule updates", defaultOn: true },
            { label: "College announcements", desc: "Important notices from administration", defaultOn: true },
          ].map(({ label, desc, defaultOn }) => (
            <div key={label} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium text-gray-900">{label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
              </div>
              <Toggle defaultChecked={defaultOn} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <Palette className="w-4 h-4 text-[#1B3A6B]" />
          <h3 className="font-display font-bold text-gray-900">Appearance</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">Dark Mode</div>
              <div className="text-xs text-gray-400">Switch to dark theme</div>
            </div>
            <Toggle defaultChecked={false} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">Compact Sidebar</div>
              <div className="text-xs text-gray-400">Collapse sidebar by default</div>
            </div>
            <Toggle defaultChecked={false} size="sm" />
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <Lock className="w-4 h-4 text-[#1B3A6B]" />
          <h3 className="font-display font-bold text-gray-900">Password</h3>
        </div>
        <div className="space-y-3">
          {["Current Password", "New Password", "Confirm New Password"].map((label) => (
            <div key={label}>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
              <input type="password" placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all" />
            </div>
          ))}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1B3A6B] text-white text-sm font-semibold rounded-xl hover:bg-[#122847] transition-all">
            <Save className="w-3.5 h-3.5" /> Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
