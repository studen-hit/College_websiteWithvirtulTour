import { useState } from "react";
import { Search, Filter, Plus, ChevronRight, TrendingUp, TrendingDown, Minus, X } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const studentsData = [
  { id: 1, name: "Aarav Sharma", roll: "CS22001", email: "aarav@meridian.edu.in", attendance: 92, avgMarks: 84, grade: "A", status: "good", trend: "up", assignments: 95 },
  { id: 2, name: "Priya Subramaniam", roll: "CS22002", email: "priya@meridian.edu.in", attendance: 88, avgMarks: 78, grade: "B+", status: "good", trend: "up", assignments: 90 },
  { id: 3, name: "Rohan Verma", roll: "CS22003", email: "rohan@meridian.edu.in", attendance: 76, avgMarks: 66, grade: "C+", status: "warning", trend: "down", assignments: 78 },
  { id: 4, name: "Kavya Reddy", roll: "CS22004", email: "kavya@meridian.edu.in", attendance: 58, avgMarks: 44, grade: "F", status: "critical", trend: "down", assignments: 55 },
  { id: 5, name: "Aditya Kumar", roll: "CS22005", email: "aditya@meridian.edu.in", attendance: 63, avgMarks: 52, grade: "D", status: "critical", trend: "stable", assignments: 62 },
  { id: 6, name: "Sneha Pillai", roll: "CS22006", email: "sneha@meridian.edu.in", attendance: 71, avgMarks: 61, grade: "C", status: "warning", trend: "up", assignments: 73 },
  { id: 7, name: "Arjun Mehta", roll: "CS22007", email: "arjun@meridian.edu.in", attendance: 84, avgMarks: 76, grade: "B", status: "good", trend: "up", assignments: 88 },
  { id: 8, name: "Deepika Nair", roll: "CS22008", email: "deepika@meridian.edu.in", attendance: 95, avgMarks: 91, grade: "A+", status: "good", trend: "up", assignments: 100 },
];

const performanceTrend = [
  { month: "Feb", marks: 68 },
  { month: "Mar", marks: 72 },
  { month: "Apr", marks: 76 },
  { month: "May", marks: 71 },
  { month: "Jun", marks: 78 },
  { month: "Jul", marks: 82 },
  { month: "Aug", marks: 84 },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; label: string; dot: string }> = {
    good: { bg: "bg-green-50", text: "text-green-700", label: "Good", dot: "bg-green-500" },
    warning: { bg: "bg-amber-50", text: "text-amber-700", label: "Attention", dot: "bg-amber-500" },
    critical: { bg: "bg-red-50", text: "text-red-700", label: "Critical", dot: "bg-red-500" },
  };
  const s = map[status] || map.good;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 ${s.bg} ${s.text} text-xs font-semibold rounded-full`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-green-500" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-gray-400" />;
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<typeof studentsData[0] | null>(null);

  const filtered = studentsData.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search);
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 max-w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">B.Sc CS — Section A · {studentsData.length} students</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1B3A6B] text-white text-sm font-semibold rounded-xl hover:bg-[#122847] transition-all shadow-sm">
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] bg-white transition-all"
          />
        </div>
        <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
          {[
            { id: "all", label: "All" },
            { id: "good", label: "Good" },
            { id: "warning", label: "At Risk" },
            { id: "critical", label: "Critical" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                filter === id ? "bg-[#1B3A6B] text-white" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all ${selected ? "flex-1" : "w-full"}`}>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Attendance</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Avg Marks</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Grade</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${selected?.id === s.id ? "bg-blue-50" : ""}`}
                  onClick={() => setSelected(selected?.id === s.id ? null : s)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                        s.status === "critical" ? "bg-red-400" : s.status === "warning" ? "bg-amber-400" : "bg-[#1B3A6B]"
                      }`}>
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{s.name}</div>
                        <div className="text-gray-400 text-xs">{s.roll}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-14 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s.attendance}%`,
                            backgroundColor: s.attendance >= 75 ? "#22C55E" : s.attendance >= 60 ? "#F59E0B" : "#EF4444",
                          }}
                        />
                      </div>
                      <span className={`text-xs font-semibold ${s.attendance >= 75 ? "text-green-600" : s.attendance >= 60 ? "text-amber-600" : "text-red-500"}`}>
                        {s.attendance}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <TrendIcon trend={s.trend} />
                      <span className="text-sm font-semibold text-gray-700">{s.avgMarks}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-sm font-bold text-[#1B3A6B]">{s.grade}</span>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-3.5">
                    <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${selected?.id === s.id ? "rotate-90" : ""}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100 text-sm text-gray-400">
            {filtered.length} of {studentsData.length} students
          </div>
        </div>

        {/* Student Detail Panel */}
        {selected && (
          <div className="w-80 flex-shrink-0 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  selected.status === "critical" ? "bg-red-400" : selected.status === "warning" ? "bg-amber-400" : "bg-white/20"
                }`}>
                  {selected.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-white font-display font-bold">{selected.name}</div>
                  <div className="text-blue-200 text-xs">{selected.roll} · {selected.email}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <div className="text-white font-bold text-lg">{selected.attendance}%</div>
                  <div className="text-blue-200 text-[10px]">Attendance</div>
                </div>
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <div className="text-white font-bold text-lg">{selected.avgMarks}</div>
                  <div className="text-blue-200 text-[10px]">Avg Marks</div>
                </div>
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <div className="text-white font-bold text-lg">{selected.grade}</div>
                  <div className="text-blue-200 text-[10px]">Grade</div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <h4 className="font-display font-semibold text-gray-700 text-sm mb-3">Performance Trend</h4>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#E2E8F0" />
                  <YAxis tick={{ fontSize: 9 }} stroke="#E2E8F0" domain={[50, 100]} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", fontSize: 11 }} />
                  <Line type="monotone" dataKey="marks" stroke="#1B3A6B" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Assignment Completion</span>
                  <span className="text-xs font-bold text-gray-900">{selected.assignments}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="h-full rounded-full bg-[#8B5CF6]" style={{ width: `${selected.assignments}%` }} />
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-[#1B3A6B] text-white text-xs font-semibold rounded-xl hover:bg-[#122847] transition-all">
                  Full Profile
                </button>
                <button className="flex-1 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-all">
                  Send Notice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
