import { RankingWithInstitution } from "@shared/schema";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ParameterBreakdownProps {
  ranking: RankingWithInstitution;
}

const ParameterBreakdown = ({ ranking }: ParameterBreakdownProps) => {
  // Helper function for formatting scores
  const formatScore = (score: number | null) => {
    if (score === null || score === undefined) return "N/A";
    return score.toFixed(2);
  };

  // Color mapping for different parameter categories
  const colors = {
    tlr: "#1a73e8", // Blue
    rpc: "#4285f4", // Lighter blue
    go: "#34a853",  // Green
    oi: "#fbbc05",  // Yellow/Gold
    pr: "#ea4335",  // Red
  };
  
  // Color mapping for scores based on performance
  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "#34a853"; // Green for excellent
    if (percentage >= 60) return "#4285f4"; // Blue for good
    if (percentage >= 40) return "#fbbc05"; // Yellow for average
    return "#ea4335"; // Red for below average
  };

  // Group parameters by category with proper formatting for charts
  const tlrParams = [
    { name: "SS", fullName: "Student Strength", score: ranking.ssScore || 0, total: 20, fill: getScoreColor(ranking.ssScore || 0, 20) },
    { name: "FSR", fullName: "Faculty-Student Ratio", score: ranking.fsrScore || 0, total: 30, fill: getScoreColor(ranking.fsrScore || 0, 30) },
    { name: "FQE", fullName: "Faculty Qualification & Experience", score: ranking.fqeScore || 0, total: 20, fill: getScoreColor(ranking.fqeScore || 0, 20) },
    { name: "FRU", fullName: "Faculty Recruitment & Utilization", score: ranking.fruScore || 0, total: 30, fill: getScoreColor(ranking.fruScore || 0, 30) },
  ];

  const rpcParams = [
    { name: "PU", fullName: "Publications", score: ranking.puScore || 0, total: 35, fill: getScoreColor(ranking.puScore || 0, 35) },
    { name: "QP", fullName: "Quality of Publications", score: ranking.qpScore || 0, total: 40, fill: getScoreColor(ranking.qpScore || 0, 40) },
    { name: "IPR", fullName: "IPR and Patents", score: ranking.iprScore || 0, total: 15, fill: getScoreColor(ranking.iprScore || 0, 15) },
    { name: "FPPP", fullName: "Footprint of Projects & Practice", score: ranking.fpppScore || 0, total: 10, fill: getScoreColor(ranking.fpppScore || 0, 10) },
  ];

  const goParams = [
    { name: "GPH", fullName: "Graduation Performance", score: ranking.gphScore || 0, total: 40, fill: getScoreColor(ranking.gphScore || 0, 40) },
    { name: "GUE", fullName: "University Examinations", score: ranking.gueScore || 0, total: 15, fill: getScoreColor(ranking.gueScore || 0, 15) },
    { name: "MS", fullName: "Median Salary", score: ranking.msScore || 0, total: 25, fill: getScoreColor(ranking.msScore || 0, 25) },
    { name: "GPHD", fullName: "Graduating Students in PhD", score: ranking.gphdScore || 0, total: 20, fill: getScoreColor(ranking.gphdScore || 0, 20) },
  ];

  const oiParams = [
    { name: "RD", fullName: "Regional Diversity", score: ranking.rdScore || 0, total: 30, fill: getScoreColor(ranking.rdScore || 0, 30) },
    { name: "WD", fullName: "Women Diversity", score: ranking.wdScore || 0, total: 30, fill: getScoreColor(ranking.wdScore || 0, 30) },
    { name: "ESCS", fullName: "Econ. & Social Inclusion", score: ranking.escsScore || 0, total: 20, fill: getScoreColor(ranking.escsScore || 0, 20) },
    { name: "PCS", fullName: "Facilities for PH Students", score: ranking.pcsScore || 0, total: 20, fill: getScoreColor(ranking.pcsScore || 0, 20) },
  ];

  // Main score categories
  const mainParams = [
    { name: "TLR", fullName: "Teaching, Learning & Resources", score: ranking.tlrScore, total: 100, fill: colors.tlr },
    { name: "RPC", fullName: "Research and Professional Practice", score: ranking.rpcScore, total: 100, fill: colors.rpc },
    { name: "GO", fullName: "Graduation Outcomes", score: ranking.goScore, total: 100, fill: colors.go },
    { name: "OI", fullName: "Outreach and Inclusivity", score: ranking.oiScore, total: 100, fill: colors.oi },
    { name: "PR", fullName: "Perception", score: ranking.prScore, total: 100, fill: colors.pr },
  ];
  
  // Custom tooltip for bar charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm text-xs">
          <p className="font-bold">{payload[0].payload.fullName}</p>
          <p>Score: {payload[0].value.toFixed(2)}</p>
          <p>Total: {payload[0].payload.total}</p>
          <p>Percentage: {((payload[0].value / payload[0].payload.total) * 100).toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">
        {ranking.institution.name} - Parameter Breakdown
      </h2>
      <p className="text-sm text-neutral-500">
        Rank {ranking.rank} | Year {ranking.year} | Total Score: {ranking.totalScore.toFixed(2)}
      </p>

      {/* Main scores summary chart */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Overall Scores by Category</h3>
        
        {/* Main parameters bar chart */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mainParams}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="score" name="Score" radius={[5, 5, 0, 0]}>
                {mainParams.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4">
          {mainParams.map((param) => (
            <div key={param.name} className="text-center p-2">
              <div className="text-sm font-medium text-neutral-600 mb-1">{param.name}</div>
              <div className="text-2xl font-bold" style={{ color: param.fill }}>{formatScore(param.score)}</div>
              <div className="text-xs text-neutral-400">Out of {param.total}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Parameter breakdown charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TLR Parameters */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-md font-semibold mb-4">Teaching, Learning & Resources (TLR)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tlrParams}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'dataMax']} />
                <YAxis type="category" dataKey="name" width={40} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {tlrParams.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
            {tlrParams.map((param) => (
              <div key={param.name} className="flex justify-between">
                <span className="font-semibold">{param.name}:</span>
                <span className="text-right">{formatScore(param.score)} / {param.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RPC Parameters */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-md font-semibold mb-4">Research and Professional Practice (RPC)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rpcParams}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'dataMax']} />
                <YAxis type="category" dataKey="name" width={40} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {rpcParams.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
            {rpcParams.map((param) => (
              <div key={param.name} className="flex justify-between">
                <span className="font-semibold">{param.name}:</span>
                <span className="text-right">{formatScore(param.score)} / {param.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GO Parameters */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-md font-semibold mb-4">Graduation Outcomes (GO)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={goParams}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'dataMax']} />
                <YAxis type="category" dataKey="name" width={40} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {goParams.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
            {goParams.map((param) => (
              <div key={param.name} className="flex justify-between">
                <span className="font-semibold">{param.name}:</span>
                <span className="text-right">{formatScore(param.score)} / {param.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* OI Parameters */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-md font-semibold mb-4">Outreach and Inclusivity (OI)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={oiParams}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'dataMax']} />
                <YAxis type="category" dataKey="name" width={40} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {oiParams.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
            {oiParams.map((param) => (
              <div key={param.name} className="flex justify-between">
                <span className="font-semibold">{param.name}:</span>
                <span className="text-right">{formatScore(param.score)} / {param.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Color legend */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h3 className="text-md font-semibold mb-2">Score Range Color Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2" style={{ backgroundColor: "#34a853" }}></div>
            <span className="text-sm">Excellent (≥80%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2" style={{ backgroundColor: "#4285f4" }}></div>
            <span className="text-sm">Good (60-79%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2" style={{ backgroundColor: "#fbbc05" }}></div>
            <span className="text-sm">Average (40-59%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2" style={{ backgroundColor: "#ea4335" }}></div>
            <span className="text-sm">Below Average (&lt;40%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterBreakdown;