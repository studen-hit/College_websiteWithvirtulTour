import { useState } from "react";
import { Search, Check, X, ChevronLeft, ChevronRight, Save, CheckSquare, Users } from "lucide-react";

const students = [
  { id: 1, name: "Aarav Sharma", roll: "CS22001", attendance: 92 },
  { id: 2, name: "Priya Subramaniam", roll: "CS22002", attendance: 88 },
  { id: 3, name: "Rohan Verma", roll: "CS22003", attendance: 76 },
  { id: 4, name: "Kavya Reddy", roll: "CS22004", attendance: 58 },
  { id: 5, name: "Aditya Kumar", roll: "CS22005", attendance: 63 },
  { id: 6, name: "Sneha Pillai", roll: "CS22006", attendance: 71 },
  { id: 7, name: "Arjun Mehta", roll: "CS22007", attendance: 84 },
  { id: 8, name: "Deepika Nair", roll: "CS22008", attendance: 95 },
  { id: 9, name: "Vikram Singh", roll: "CS22009", attendance: 80 },
  { id: 10, name: "Meera Krishnan", roll: "CS22010", attendance: 69 },
];

export default function AttendancePage() {
  const [date, setDate] = useState("2026-08-20");
  const [subject, setSubject] = useState("Data Structures");
  const [statuses, setStatuses] = useState<Record<number, "present" | "absent">>({});
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  const toggle = (id: number) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === "present" ? "absent" : "present",
    }));
  };

  const markAll = (status: "present" | "absent") => {
    const next: Record<number, "present" | "absent"> = {};
    students.forEach((s) => { next[s.id] = status; });
    setStatuses(next);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = Object.values(statuses).filter((v) => v === "present").length;
  const absentCount = Object.values(statuses).filter((v) => v === "absent").length;

  return (
    <div className="p-6 max-w-full space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">Mark and track daily class attendance</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all bg-white"
            >
              <option>Data Structures</option>
              <option>Algorithms</option>
              <option>DBMS</option>
              <option>Operating Systems</option>
              <option>Computer Networks</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Class</label>
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all bg-white">
              <option>B.Sc CS — Section A</option>
              <option>B.Sc CS — Section B</option>
              <option>BCA — Section A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: students.length, color: "#1B3A6B", bg: "#EFF6FF" },
          { label: "Present", value: presentCount, color: "#22C55E", bg: "#F0FDF4" },
          { label: "Absent", value: absentCount, color: "#EF4444", bg: "#FEF2F2" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-display font-extrabold" style={{ color }}>{value}</div>
            <div className="text-gray-400 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search student or roll no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl w-full focus:outline-none focus:border-[#1B3A6B] transition-all"
            />
          </div>
          <button
            onClick={() => markAll("present")}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all font-medium"
          >
            <CheckSquare className="w-3.5 h-3.5" /> Mark All Present
          </button>
          <button
            onClick={() => markAll("absent")}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-medium"
          >
            <X className="w-3.5 h-3.5" /> Mark All Absent
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Roll No.</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Overall %</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Today</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((s, i) => {
              const status = statuses[s.id];
              return (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] flex items-center justify-center text-white text-xs font-bold">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium text-sm text-gray-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 font-mono">{s.roll}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-16">
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
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setStatuses((prev) => ({ ...prev, [s.id]: "present" }))}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all ${
                          status === "present"
                            ? "bg-green-500 border-green-500 text-white shadow-md"
                            : "border-gray-200 text-gray-400 hover:border-green-400 hover:text-green-500"
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setStatuses((prev) => ({ ...prev, [s.id]: "absent" }))}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all ${
                          status === "absent"
                            ? "bg-red-500 border-red-500 text-white shadow-md"
                            : "border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-500"
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between p-4 border-t border-gray-100">
          <span className="text-sm text-gray-400">Showing {filtered.length} of {students.length} students</span>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
              saved
                ? "bg-green-500 text-white"
                : "bg-[#1B3A6B] text-white hover:bg-[#122847]"
            }`}
          >
            {saved ? (
              <><Check className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> Save Attendance</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
