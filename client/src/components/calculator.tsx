
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

export const Calculator = () => {
  const [subParams, setSubParams] = useState({
    // TLR
    totalStudents: 0,
    sanctionedStrength: 0,
    femaleStudents: 0,
    phdStudents: 0,
    facultyCount: 0,
    sanctionedFaculty: 0,
    phdFaculty: 0,
    experiencedFaculty: 0,
    
    // RPC
    publications: 0,
    qualityPublications: 0,
    citationsCount: 0,
    patentsFiled: 0,
    patentsGranted: 0,
    sponsoredResearch: 0,
    consultancyProjects: 0,
    
    // GO
    graduatesHigherStudies: 0,
    totalGraduates: 0,
    placedGraduates: 0,
    medianSalary: 0,
    graduatedPhDs: 0,
    
    // OI
    otherStateStudents: 0,
    internationalStudents: 0,
    womenStudents: 0,
    economicallyChallenged: 0,
    physicallyHandicapped: 0,
    
    // PR
    employerRating: 0,
    academicRating: 0,
    publicPerception: 0
  });

  const calculateSubScores = () => {
    // TLR Calculations (30%)
    const ssScore = (subParams.totalStudents / subParams.sanctionedStrength) * 15 + 
                   (subParams.femaleStudents / subParams.totalStudents) * 5 +
                   (subParams.phdStudents / subParams.totalStudents) * 5;
    
    const fsrScore = (subParams.facultyCount / subParams.sanctionedFaculty) * 20 +
                    (subParams.phdFaculty / subParams.facultyCount) * 10;
    
    const fqeScore = (subParams.experiencedFaculty / subParams.facultyCount) * 20;
    
    const tlrScore = (ssScore + fsrScore + fqeScore) / 3;

    // RPC Calculations (30%)
    const pubScore = (subParams.publications / subParams.facultyCount) * 30;
    const qpScore = (subParams.qualityPublications * subParams.citationsCount) / subParams.publications * 20;
    const iprScore = ((subParams.patentsGranted * 5) + subParams.patentsFiled) * 10;
    const fpppScore = (subParams.sponsoredResearch + subParams.consultancyProjects) * 15;
    
    const rpcScore = (pubScore + qpScore + iprScore + fpppScore) / 4;

    // GO Calculations (20%)
    const gphScore = (subParams.graduatesHigherStudies / subParams.totalGraduates) * 40;
    const placementScore = (subParams.placedGraduates / subParams.totalGraduates) * 40;
    const salaryScore = subParams.medianSalary * 10;
    const phdScore = subParams.graduatedPhDs * 10;
    
    const goScore = (gphScore + placementScore + salaryScore + phdScore) / 4;

    // OI Calculations (10%)
    const rdScore = ((subParams.otherStateStudents + subParams.internationalStudents) / subParams.totalStudents) * 30;
    const wdScore = (subParams.womenStudents / subParams.totalStudents) * 30;
    const escsScore = (subParams.economicallyChallenged / subParams.totalStudents) * 20;
    const pcsScore = (subParams.physicallyHandicapped / subParams.totalStudents) * 20;
    
    const oiScore = (rdScore + wdScore + escsScore + pcsScore) / 4;

    // PR Calculations (10%)
    const prScore = (subParams.employerRating + subParams.academicRating + subParams.publicPerception) / 3;

    // Final NIRF Score
    const finalScore = (tlrScore * 0.3) + (rpcScore * 0.3) + (goScore * 0.2) + (oiScore * 0.1) + (prScore * 0.1);

    return {
      tlr: { total: tlrScore.toFixed(2), ss: ssScore.toFixed(2), fsr: fsrScore.toFixed(2), fqe: fqeScore.toFixed(2) },
      rpc: { total: rpcScore.toFixed(2), pub: pubScore.toFixed(2), qp: qpScore.toFixed(2), ipr: iprScore.toFixed(2), fppp: fpppScore.toFixed(2) },
      go: { total: goScore.toFixed(2), gph: gphScore.toFixed(2), placement: placementScore.toFixed(2), salary: salaryScore.toFixed(2), phd: phdScore.toFixed(2) },
      oi: { total: oiScore.toFixed(2), rd: rdScore.toFixed(2), wd: wdScore.toFixed(2), escs: escsScore.toFixed(2), pcs: pcsScore.toFixed(2) },
      pr: { total: prScore.toFixed(2) },
      final: finalScore.toFixed(2)
    };
  };

  const handleInputChange = (field: keyof typeof subParams, value: string) => {
    const numValue = parseFloat(value) || 0;
    setSubParams(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const scores = calculateSubScores();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TLR Inputs */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Teaching Learning & Resources</h3>
            <div className="space-y-4">
              <div>
                <Label>Total Students</Label>
                <Input
                  type="number"
                  value={subParams.totalStudents}
                  onChange={(e) => handleInputChange('totalStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>Sanctioned Student Strength</Label>
                <Input
                  type="number"
                  value={subParams.sanctionedStrength}
                  onChange={(e) => handleInputChange('sanctionedStrength', e.target.value)}
                />
              </div>
              <div>
                <Label>Female Students</Label>
                <Input
                  type="number"
                  value={subParams.femaleStudents}
                  onChange={(e) => handleInputChange('femaleStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>PhD Students</Label>
                <Input
                  type="number"
                  value={subParams.phdStudents}
                  onChange={(e) => handleInputChange('phdStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>Faculty Count</Label>
                <Input
                  type="number"
                  value={subParams.facultyCount}
                  onChange={(e) => handleInputChange('facultyCount', e.target.value)}
                />
              </div>
              <div>
                <Label>Faculty with PhD</Label>
                <Input
                  type="number"
                  value={subParams.phdFaculty}
                  onChange={(e) => handleInputChange('phdFaculty', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RPC Inputs */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Research & Professional Practice</h3>
            <div className="space-y-4">
              <div>
                <Label>Publications</Label>
                <Input
                  type="number"
                  value={subParams.publications}
                  onChange={(e) => handleInputChange('publications', e.target.value)}
                />
              </div>
              <div>
                <Label>Quality Publications</Label>
                <Input
                  type="number"
                  value={subParams.qualityPublications}
                  onChange={(e) => handleInputChange('qualityPublications', e.target.value)}
                />
              </div>
              <div>
                <Label>Citations Count</Label>
                <Input
                  type="number"
                  value={subParams.citationsCount}
                  onChange={(e) => handleInputChange('citationsCount', e.target.value)}
                />
              </div>
              <div>
                <Label>Patents Filed</Label>
                <Input
                  type="number"
                  value={subParams.patentsFiled}
                  onChange={(e) => handleInputChange('patentsFiled', e.target.value)}
                />
              </div>
              <div>
                <Label>Patents Granted</Label>
                <Input
                  type="number"
                  value={subParams.patentsGranted}
                  onChange={(e) => handleInputChange('patentsGranted', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GO Inputs */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Graduation Outcomes</h3>
            <div className="space-y-4">
              <div>
                <Label>Graduates in Higher Studies</Label>
                <Input
                  type="number"
                  value={subParams.graduatesHigherStudies}
                  onChange={(e) => handleInputChange('graduatesHigherStudies', e.target.value)}
                />
              </div>
              <div>
                <Label>Total Graduates</Label>
                <Input
                  type="number"
                  value={subParams.totalGraduates}
                  onChange={(e) => handleInputChange('totalGraduates', e.target.value)}
                />
              </div>
              <div>
                <Label>Placed Graduates</Label>
                <Input
                  type="number"
                  value={subParams.placedGraduates}
                  onChange={(e) => handleInputChange('placedGraduates', e.target.value)}
                />
              </div>
              <div>
                <Label>Median Salary (LPA)</Label>
                <Input
                  type="number"
                  value={subParams.medianSalary}
                  onChange={(e) => handleInputChange('medianSalary', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OI Inputs */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Outreach and Inclusivity</h3>
            <div className="space-y-4">
              <div>
                <Label>Other State Students</Label>
                <Input
                  type="number"
                  value={subParams.otherStateStudents}
                  onChange={(e) => handleInputChange('otherStateStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>International Students</Label>
                <Input
                  type="number"
                  value={subParams.internationalStudents}
                  onChange={(e) => handleInputChange('internationalStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>Women Students</Label>
                <Input
                  type="number"
                  value={subParams.womenStudents}
                  onChange={(e) => handleInputChange('womenStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>Economically Challenged</Label>
                <Input
                  type="number"
                  value={subParams.economicallyChallenged}
                  onChange={(e) => handleInputChange('economicallyChallenged', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PR Inputs */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Perception Ratings</h3>
            <div className="space-y-4">
              <div>
                <Label>Employer Rating (0-100)</Label>
                <Input
                  type="number"
                  value={subParams.employerRating}
                  onChange={(e) => handleInputChange('employerRating', e.target.value)}
                />
              </div>
              <div>
                <Label>Academic Rating (0-100)</Label>
                <Input
                  type="number"
                  value={subParams.academicRating}
                  onChange={(e) => handleInputChange('academicRating', e.target.value)}
                />
              </div>
              <div>
                <Label>Public Perception (0-100)</Label>
                <Input
                  type="number"
                  value={subParams.publicPerception}
                  onChange={(e) => handleInputChange('publicPerception', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Display */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">NIRF Ranking Scores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium">TLR (30%)</h4>
              <p>Student Strength: {scores.tlr.ss}</p>
              <p>Faculty Ratio: {scores.tlr.fsr}</p>
              <p>Faculty Quality: {scores.tlr.fqe}</p>
              <p className="font-semibold">Total: {scores.tlr.total}</p>
            </div>
            <div>
              <h4 className="font-medium">RPC (30%)</h4>
              <p>Publications: {scores.rpc.pub}</p>
              <p>Quality: {scores.rpc.qp}</p>
              <p>IPR: {scores.rpc.ipr}</p>
              <p>FPPP: {scores.rpc.fppp}</p>
              <p className="font-semibold">Total: {scores.rpc.total}</p>
            </div>
            <div>
              <h4 className="font-medium">GO (20%)</h4>
              <p>Higher Studies: {scores.go.gph}</p>
              <p>Placement: {scores.go.placement}</p>
              <p>Salary: {scores.go.salary}</p>
              <p>PhD: {scores.go.phd}</p>
              <p className="font-semibold">Total: {scores.go.total}</p>
            </div>
            <div>
              <h4 className="font-medium">OI (10%)</h4>
              <p>Regional Diversity: {scores.oi.rd}</p>
              <p>Women Diversity: {scores.oi.wd}</p>
              <p>Economic Diversity: {scores.oi.escs}</p>
              <p>Physical Diversity: {scores.oi.pcs}</p>
              <p className="font-semibold">Total: {scores.oi.total}</p>
            </div>
            <div>
              <h4 className="font-medium">PR (10%)</h4>
              <p className="font-semibold">Total: {scores.pr.total}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-primary">Final NIRF Score: {scores.final}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
