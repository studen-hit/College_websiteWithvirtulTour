import { useState } from "react";
import {
  Users, CalendarCheck, TrendingUp, BookOpen, AlertTriangle,
  CheckCircle, Clock, Bell, Search, ChevronDown, RefreshCw,
  Download, Lightbulb, ArrowUp, ArrowDown, Minus
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from "recharts";

const attendanceTrend = [
  { month: "Feb", present: 88, absent: 12 },
  { month: "Mar", present: 84, absent: 16 },
  { month: "Apr", present: 91, absent: 9 },
  { month: "May", present: 78, absent: 22 },
  { month: "Jun", present: 86, absent: 14 },
  { month: "Jul", present: 89, absent: 11 },
  { month: "Aug", present: 82, absent: 18 },
];

const subjectPerformance = [
  { subject: "Data Structures", avg: 74, highest: 96, lowest: 42 },
  { subject: "Algorithms", avg: 68, highest: 92, lowest: 38 },
  { subject: "DBMS", avg: 80, highest: 99, lowest: 55 },
  { subject: "OS", avg: 72, highest: 94, lowest: 44 },
  { subject: "Networks", avg: 65, highest: 88, lowest: 32 },
];

const pieData = [
  { name: "Good (≥75%)", value: 58, color: "#22C55E" },
  { name: "At Risk (60–74%)", value: 22, color: "#F59E0B" },
  { name: "Critical (<60%)", value: 10, color: "#EF4444" },
  { name: "Absent", value: 10, color: "#94A3B8" },
];

const weeklyAttendance = [
  { day: "Mon", attendance: 92 },
  { day: "Tue", attendance: 88 },
  { day: "Wed", attendance: 85 },
  { day: "Thu", attendance: 90 },
  { day: "Fri", attendance: 78 },
];

const atRiskStudents = [
  { name: "Kavya Reddy", roll: "CS22001", attendance: 58, marks: 44, status: "critical" },
  { name: "Aditya Kumar", roll: "CS22017", attendance: 63, marks: 52, status: "warning" },
  { name: "Sneha Pillai", roll: "CS22034", attendance: 71, marks: 61, status: "warning" },
  { name: "Rohan Desai", roll: "CS22045", attendance: 54, marks: 38, status: "critical" },
  { name: "Meera Nair", roll: "CS22062", attendance: 69, marks: 59, status: "warning" },
];

const semesterTimeline = [
  { month: "Feb", label: "Month 1", attendance: 88, marks: 72, done: true },
  { month: "Mar", label: "Month 2", attendance: 84, marks: 68, done: true },
  { month: "Apr", label: "Mid-Term", attendance: 91, marks: 76, done: true, highlight: true },
  { month: "May", label: "Month 4", attendance: 78, marks: 71, done: true },
  { month: "Jun", label: "Month 5", attendance: 86, marks: 74, done: true },
  { month: "Jul", label: "Month 6", attendance: 89, marks: 78, done: true },
  { month: "Aug", label: "Finals", attendance: 82, marks: 0, done: false, current: true },
];

const insights = [
  "12 students have shown a decline in attendance during the last 30 days.",
  "5 students may require academic support based on combined attendance and marks data.",
  "Class performance improved by 8% compared to the previous internal assessment.",
  "Assignment completion rate is at 91% — highest in the department this semester.",
];

const kpiCards = [
  { label: "Total Students", value: "90", icon: Users, color: "#1B3A6B", bg: "#EFF6FF", change: null },
  { label: "Avg Attendance", value: "84.3%", icon: CalendarCheck, color: "#22C55E", bg: "#F0FDF4", change: "+2.1%" },
  { label: "Below 75% Attendance", value: "14", icon: AlertTriangle, color: "#EF4444", bg: "#FEF2F2", change: "-3" },
  { label: "Avg Marks", value: "72.6", icon: BookOpen, color: "#F26419", bg: "#FFF7ED", change: "+4.2" },
  { label: "Assignment Done", value: "91%", icon: CheckCircle, color: "#8B5CF6", bg: "#F5F3FF", change: "+5%" },
  { label: "Class Rank", value: "#2", icon: TrendingUp, color: "#2E86AB", bg: "#EFF6FF", change: "↑1" },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "critical") return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />Critical
    </span>
  );
  if (status === "warning") return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-600 text-xs font-semibold rounded-full">
      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />Attention
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />Good
    </span>
  );
}

export default function Dashboard() {
  const [activeInsight, setActiveInsight] = useState(0);

  return (
    <div className="p-6 max-w-full space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">Semester 1, 2026–27 · B.Sc CS — Section A</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search student..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[#1B3A6B] w-48"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-all bg-white">
            <RefreshCw className="w-4 h-4 text-gray-500" />
            <span className="hidden sm:inline text-gray-600">Refresh</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[#1B3A6B] text-white rounded-xl hover:bg-[#122847] transition-all shadow-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map(({ label, value, icon: Icon, color, bg, change }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon className="w-4.5 h-4.5" style={{ color }} />
              </div>
              {change && (
                <span className={`text-xs font-semibold ${change.startsWith("+") || change.startsWith("↑") ? "text-green-600" : "text-red-500"}`}>
                  {change}
                </span>
              )}
            </div>
            <div className="font-display font-extrabold text-2xl text-gray-900">{value}</div>
            <div className="text-gray-400 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Smart Insights */}
      <div className="bg-gradient-to-r from-[#1B3A6B] to-[#2a5298] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-amber-300" />
          <span className="text-white font-semibold text-sm">Smart Insights</span>
          <span className="ml-auto text-white/40 text-xs">{activeInsight + 1}/{insights.length}</span>
        </div>
        <p className="text-blue-100 text-sm leading-relaxed mb-4">{insights[activeInsight]}</p>
        <div className="flex gap-1.5">
          {insights.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveInsight(i)}
              className={`h-1 rounded-full transition-all ${i === activeInsight ? "bg-white w-6" : "bg-white/30 w-2"}`}
            />
          ))}
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Attendance Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-bold text-gray-900">Monthly Attendance Trend</h3>
              <p className="text-gray-400 text-xs">Feb – Aug 2026</p>
            </div>
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none text-gray-600">
              <option>This Semester</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={attendanceTrend}>
              <defs>
                <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B3A6B" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1B3A6B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#E2E8F0" />
              <YAxis tick={{ fontSize: 11 }} stroke="#E2E8F0" domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Area type="monotone" dataKey="present" stroke="#1B3A6B" strokeWidth={2.5} fill="url(#presentGrad)" name="Present %" />
              <Area type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} fill="none" strokeDasharray="4 3" name="Absent %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Donut */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <h3 className="font-display font-bold text-gray-900 mb-1">Attendance Distribution</h3>
          <p className="text-gray-400 text-xs mb-4">Current semester status</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-gray-600">{name}</span>
                </div>
                <span className="font-semibold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Subject Performance */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-bold text-gray-900">Subject-wise Performance</h3>
              <p className="text-gray-400 text-xs">Average marks by subject</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subjectPerformance} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="#E2E8F0" />
              <YAxis tick={{ fontSize: 11 }} stroke="#E2E8F0" domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Bar dataKey="avg" fill="#1B3A6B" radius={[5, 5, 0, 0]} name="Avg Marks" />
              <Bar dataKey="highest" fill="#22C55E" radius={[5, 5, 0, 0]} name="Highest" />
              <Bar dataKey="lowest" fill="#EF4444" radius={[5, 5, 0, 0]} name="Lowest" />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Attendance */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <h3 className="font-display font-bold text-gray-900 mb-1">This Week</h3>
          <p className="text-gray-400 text-xs mb-4">Daily attendance rate</p>
          <div className="space-y-3">
            {weeklyAttendance.map(({ day, attendance }) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-500 w-8">{day}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${attendance}%`,
                      backgroundColor: attendance >= 85 ? "#22C55E" : attendance >= 75 ? "#F59E0B" : "#EF4444",
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700 w-9 text-right">{attendance}%</span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <div className="text-xs text-gray-400 mb-2">This week's average</div>
            <div className="text-2xl font-display font-extrabold text-gray-900">86.6%</div>
            <div className="flex items-center gap-1 text-green-600 text-xs font-semibold mt-1">
              <ArrowUp className="w-3 h-3" /> 2.3% vs last week
            </div>
          </div>
        </div>
      </div>

      {/* Students Requiring Attention */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="font-display font-bold text-gray-900">Students Requiring Attention</h3>
            <p className="text-gray-400 text-xs">Based on attendance + performance thresholds</p>
          </div>
          <button className="text-xs text-[#1B3A6B] font-semibold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Roll No.</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Marks</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {atRiskStudents.map((s) => (
                <tr key={s.roll} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${s.status === "critical" ? "bg-red-400" : "bg-amber-400"}`}>
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium text-sm text-gray-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{s.roll}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-semibold ${s.attendance < 60 ? "text-red-500" : "text-amber-500"}`}>{s.attendance}%</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-semibold ${s.marks < 50 ? "text-red-500" : "text-amber-500"}`}>{s.marks}/100</span>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs text-[#1B3A6B] font-semibold hover:underline">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Semester Insight */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#1B3A6B]/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#1B3A6B]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-gray-900">Semester Insight</h3>
            <p className="text-gray-400 text-xs">Class Performance — Semester 1, 2026</p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xl font-display font-extrabold text-[#1B3A6B]">82<span className="text-gray-400 text-base font-medium">/100</span></div>
            <div className="text-green-600 text-xs font-semibold">Good Performance</div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-7">
          {[
            { label: "Attendance", value: "86%", color: "#22C55E" },
            { label: "Avg Marks", value: "74%", color: "#1B3A6B" },
            { label: "Assignment Done", value: "91%", color: "#8B5CF6" },
            { label: "At-Risk Students", value: "5", color: "#EF4444" },
            { label: "Overall Score", value: "82%", color: "#F26419" },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center bg-gray-50 rounded-xl p-3">
              <div className="text-xl font-display font-extrabold" style={{ color }}>{value}</div>
              <div className="text-gray-400 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-gray-200" />
          <div className="flex justify-between relative">
            {semesterTimeline.map((t) => (
              <div key={t.month} className="flex flex-col items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 text-xs font-bold transition-all ${
                    t.current
                      ? "bg-[#F26419] border-[#F26419] text-white shadow-lg scale-110"
                      : t.highlight
                      ? "bg-[#1B3A6B] border-[#1B3A6B] text-white"
                      : t.done
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-gray-200 border-gray-300 text-gray-400"
                  }`}
                >
                  {t.current ? "●" : t.done ? "✓" : "○"}
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-semibold text-gray-700">{t.label}</div>
                  <div className="text-[9px] text-gray-400">{t.month}</div>
                  {t.done && (
                    <div className="text-[9px] text-green-600 font-semibold">{t.attendance}%</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
