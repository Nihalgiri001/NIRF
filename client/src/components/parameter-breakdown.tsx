import { RankingWithInstitution } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface ParameterBreakdownProps {
  ranking: RankingWithInstitution;
}

const ParameterBreakdown = ({ ranking }: ParameterBreakdownProps) => {
  // Helper function for formatting scores
  const formatScore = (score: number | null) => {
    if (score === null || score === undefined) return "N/A";
    return score.toFixed(2);
  };

  // Group parameters by category
  const tlrParams = [
    { name: "SS", label: "Student Strength", score: ranking.ssScore, total: 20 },
    { name: "FSR", label: "Faculty-Student Ratio", score: ranking.fsrScore, total: 30 },
    { name: "FQE", label: "Faculty Qualification & Experience", score: ranking.fqeScore, total: 20 },
    { name: "FRU", label: "Faculty Recruitment & Utilization", score: ranking.fruScore, total: 30 },
  ];

  const rpcParams = [
    { name: "PU", label: "Publications", score: ranking.puScore, total: 35 },
    { name: "QP", label: "Quality of Publications", score: ranking.qpScore, total: 40 },
    { name: "IPR", label: "IPR and Patents", score: ranking.iprScore, total: 15 },
    { name: "FPPP", label: "Footprint of Projects & Professional Practice", score: ranking.fpppScore, total: 10 },
  ];

  const goParams = [
    { name: "GPH", label: "Graduation Performance in Higher Studies", score: ranking.gphScore, total: 40 },
    { name: "GUE", label: "University Examinations", score: ranking.gueScore, total: 15 },
    { name: "MS", label: "Median Salary", score: ranking.msScore, total: 25 },
    { name: "GPHD", label: "Graduating Students in PhD", score: ranking.gphdScore, total: 20 },
  ];

  const oiParams = [
    { name: "RD", label: "Regional Diversity", score: ranking.rdScore, total: 30 },
    { name: "WD", label: "Women Diversity", score: ranking.wdScore, total: 30 },
    { name: "ESCS", label: "Economically & Socially Challenged Students", score: ranking.escsScore, total: 20 },
    { name: "PCS", label: "Facilities for Physically Challenged Students", score: ranking.pcsScore, total: 20 },
  ];

  // Main score categories
  const mainParams = [
    { name: "TLR", label: "Teaching, Learning & Resources", score: ranking.tlrScore, total: 100 },
    { name: "RPC", label: "Research and Professional Practice", score: ranking.rpcScore, total: 100 },
    { name: "GO", label: "Graduation Outcomes", score: ranking.goScore, total: 100 },
    { name: "OI", label: "Outreach and Inclusivity", score: ranking.oiScore, total: 100 },
    { name: "PR", label: "Perception", score: ranking.prScore, total: 100 },
  ];

  // Helper function to render a parameter row
  const renderParamRow = (param: { name: string; label: string; score: number | null; total: number }) => {
    const score = param.score || 0;
    const percentage = (score / param.total) * 100;
    
    return (
      <TableRow key={param.name}>
        <TableCell className="font-medium">{param.name}</TableCell>
        <TableCell>{param.label}</TableCell>
        <TableCell className="text-right">{formatScore(param.score)}</TableCell>
        <TableCell className="text-right">{param.total}</TableCell>
        <TableCell className="w-32">
          <Progress 
            value={percentage} 
            className="h-2"
          />
        </TableCell>
      </TableRow>
    );
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {mainParams.map((param) => (
            <div key={param.name} className="text-center p-2">
              <div className="text-sm font-medium text-neutral-600 mb-1">{param.name}</div>
              <div className="text-2xl font-bold text-primary">{formatScore(param.score)}</div>
              <div className="text-xs text-neutral-400">Out of {param.total}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Parameter breakdown tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TLR Parameters */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-md font-semibold mb-2">Teaching, Learning & Resources (TLR)</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Code</TableHead>
                <TableHead>Parameter</TableHead>
                <TableHead className="text-right w-16">Score</TableHead>
                <TableHead className="text-right w-16">Total</TableHead>
                <TableHead className="w-32">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tlrParams.map(renderParamRow)}
            </TableBody>
          </Table>
        </div>

        {/* RPC Parameters */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-md font-semibold mb-2">Research and Professional Practice (RPC)</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Code</TableHead>
                <TableHead>Parameter</TableHead>
                <TableHead className="text-right w-16">Score</TableHead>
                <TableHead className="text-right w-16">Total</TableHead>
                <TableHead className="w-32">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rpcParams.map(renderParamRow)}
            </TableBody>
          </Table>
        </div>

        {/* GO Parameters */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-md font-semibold mb-2">Graduation Outcomes (GO)</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Code</TableHead>
                <TableHead>Parameter</TableHead>
                <TableHead className="text-right w-16">Score</TableHead>
                <TableHead className="text-right w-16">Total</TableHead>
                <TableHead className="w-32">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goParams.map(renderParamRow)}
            </TableBody>
          </Table>
        </div>

        {/* OI Parameters */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-md font-semibold mb-2">Outreach and Inclusivity (OI)</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Code</TableHead>
                <TableHead>Parameter</TableHead>
                <TableHead className="text-right w-16">Score</TableHead>
                <TableHead className="text-right w-16">Total</TableHead>
                <TableHead className="w-32">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {oiParams.map(renderParamRow)}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ParameterBreakdown;