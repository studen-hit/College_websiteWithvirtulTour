import { useState } from "react";
import { FileText, Download, Filter, ChevronRight, Calendar, Users, BarChart3, AlertTriangle } from "lucide-react";

const reportTypes = [
  { id: "attendance", label: "Attendance Report", icon: Calendar, color: "#1B3A6B", desc: "Daily, weekly, monthly attendance for the class or individual students." },
  { id: "performance", label: "Performance Report", icon: BarChart3, color: "#22C55E", desc: "Marks, grades, and subject-wise academic performance summary." },
  { id: "class", label: "Class Report", icon: Users, color: "#2E86AB", desc: "Comprehensive class overview including attendance and performance." },
  { id: "atrisk", label: "At-Risk Students", icon: AlertTriangle, color: "#EF4444", desc: "Students below 75% attendance or scoring under 50% marks." },
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState("attendance");
  const [dateFrom, setDateFrom] = useState("2026-02-01");
  const [dateTo, setDateTo] = useState("2026-08-20");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1500);
  };

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Report Generation</h1>
        <p className="text-gray-400 text-sm mt-0.5">Generate and export comprehensive academic reports</p>
      </div>

      {/* Report type selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reportTypes.map(({ id, label, icon: Icon, color, desc }) => (
          <button
            key={id}
            onClick={() => setSelectedType(id)}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              selectedType === id
                ? "border-[#1B3A6B] bg-[#1B3A6B]/5"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + "15" }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{label}</div>
                <div className="text-gray-400 text-xs mt-1 leading-relaxed">{desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <h3 className="font-display font-semibold text-gray-900 text-sm">Configure Report</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">From Date</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">To Date</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Class</label>
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all bg-white">
              <option>B.Sc CS — Section A</option>
              <option>B.Sc CS — Section B</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Subject</label>
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1B3A6B] transition-all bg-white">
              <option>All Subjects</option>
              <option>Data Structures</option>
              <option>Algorithms</option>
              <option>DBMS</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full py-3 bg-[#1B3A6B] text-white font-bold rounded-xl hover:bg-[#122847] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {generating ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
          ) : (
            <><FileText className="w-4 h-4" /> Generate Report</>
          )}
        </button>
      </div>

      {/* Generated report preview */}
      {generated && (
        <div className="bg-white rounded-2xl border border-green-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Attendance Report — B.Sc CS Section A</div>
              <div className="text-gray-400 text-xs">Feb 1 – Aug 20, 2026 · Generated just now</div>
            </div>
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">Ready</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Total Students", value: "90" },
              { label: "Avg Attendance", value: "84.3%" },
              { label: "Below 75%", value: "14" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-lg font-display font-bold text-[#1B3A6B]">{value}</div>
                <div className="text-gray-400 text-xs">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1B3A6B] text-white text-sm font-semibold rounded-xl hover:bg-[#122847] transition-all">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
