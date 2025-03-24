
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const Calculator = () => {
  const [inputs, setInputs] = useState({
    // TLR Inputs
    totalStudents: 0,
    sanctionedStrength: 0,
    femaleStudents: 0,
    phdStudents: 0,
    facultyCount: 0,
    sanctionedFaculty: 0,
    phdFaculty: 0,
    facultyExperience: 0,
    
    // RPC Inputs
    publications: 0,
    qualityPublications: 0,
    citedPublications: 0,
    patents: 0,
    grantedPatents: 0,
    projectGrants: 0,
    consultancy: 0,
    
    // GO Inputs
    graduatesHigherStudies: 0,
    totalGraduates: 0,
    placedGraduates: 0,
    medianSalary: 0,
    phdGraduates: 0,
    
    // OI Inputs
    regionalStudents: 0,
    womenStudents: 0,
    economicallyDisadvantaged: 0,
    physicallyDisadvantaged: 0,
    
    // PR Input
    perceptionScore: 0
  });

  const calculateScores = () => {
    // TLR Calculations
    const ssScore = (inputs.totalStudents / inputs.sanctionedStrength) * 15 + 
                   (inputs.femaleStudents / inputs.totalStudents) * 5 + 
                   (inputs.phdStudents / inputs.totalStudents) * 5;
    
    const fsrScore = (inputs.facultyCount / inputs.sanctionedFaculty) * 25;
    
    const fqeScore = (inputs.phdFaculty / inputs.facultyCount) * 25;
    
    const fruScore = (inputs.facultyExperience / 10) * 25; // Assuming max experience is 10 years
    
    const tlrScore = (ssScore + fsrScore + fqeScore + fruScore) / 4;

    // RPC Calculations
    const puScore = (inputs.publications / inputs.facultyCount) * 25;
    
    const qpScore = (inputs.qualityPublications / inputs.publications) * 25 +
                   (inputs.citedPublications / inputs.publications) * 25;
    
    const iprScore = (inputs.patents * 15 + inputs.grantedPatents * 10) / 25;
    
    const fpppScore = (inputs.projectGrants + inputs.consultancy) / 25;
    
    const rpcScore = (puScore + qpScore + iprScore + fpppScore) / 4;

    // GO Calculations
    const gphScore = (inputs.graduatesHigherStudies / inputs.totalGraduates) * 25;
    
    const gueScore = (inputs.placedGraduates / inputs.totalGraduates) * 25;
    
    const msScore = Math.min((inputs.medianSalary / 10) * 25, 25); // Assuming 10LPA is max
    
    const gphdScore = (inputs.phdGraduates / inputs.totalGraduates) * 25;
    
    const goScore = (gphScore + gueScore + msScore + gphdScore) / 4;

    // OI Calculations
    const rdScore = (inputs.regionalStudents / inputs.totalStudents) * 25;
    
    const wdScore = (inputs.womenStudents / inputs.totalStudents) * 25;
    
    const escsScore = (inputs.economicallyDisadvantaged / inputs.totalStudents) * 25;
    
    const pcsScore = (inputs.physicallyDisadvantaged / inputs.totalStudents) * 25;
    
    const oiScore = (rdScore + wdScore + escsScore + pcsScore) / 4;

    // Calculate final score
    const totalScore = (tlrScore * 0.3) + (rpcScore * 0.3) + (goScore * 0.2) + 
                      (oiScore * 0.1) + (inputs.perceptionScore * 0.1);

    return {
      tlrScore: tlrScore.toFixed(2),
      rpcScore: rpcScore.toFixed(2),
      goScore: goScore.toFixed(2),
      oiScore: oiScore.toFixed(2),
      prScore: inputs.perceptionScore.toFixed(2),
      totalScore: totalScore.toFixed(2)
    };
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const totals = calculateScores();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TLR Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Teaching, Learning & Resources (TLR)</h3>
            <div className="space-y-4">
              <div>
                <Label>Total Students</Label>
                <Input 
                  type="number"
                  value={inputs.totalStudents}
                  onChange={(e) => handleInputChange('totalStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>Sanctioned Student Strength</Label>
                <Input 
                  type="number"
                  value={inputs.sanctionedStrength}
                  onChange={(e) => handleInputChange('sanctionedStrength', e.target.value)}
                />
              </div>
              <div>
                <Label>Female Students</Label>
                <Input 
                  type="number"
                  value={inputs.femaleStudents}
                  onChange={(e) => handleInputChange('femaleStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>PhD Students</Label>
                <Input 
                  type="number"
                  value={inputs.phdStudents}
                  onChange={(e) => handleInputChange('phdStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>Faculty Count</Label>
                <Input 
                  type="number"
                  value={inputs.facultyCount}
                  onChange={(e) => handleInputChange('facultyCount', e.target.value)}
                />
              </div>
              <div>
                <Label>Sanctioned Faculty</Label>
                <Input 
                  type="number"
                  value={inputs.sanctionedFaculty}
                  onChange={(e) => handleInputChange('sanctionedFaculty', e.target.value)}
                />
              </div>
              <div>
                <Label>PhD Faculty</Label>
                <Input 
                  type="number"
                  value={inputs.phdFaculty}
                  onChange={(e) => handleInputChange('phdFaculty', e.target.value)}
                />
              </div>
              <div>
                <Label>Average Faculty Experience (years)</Label>
                <Input 
                  type="number"
                  value={inputs.facultyExperience}
                  onChange={(e) => handleInputChange('facultyExperience', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RPC Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Research & Professional Practice (RPC)</h3>
            <div className="space-y-4">
              <div>
                <Label>Total Publications</Label>
                <Input 
                  type="number"
                  value={inputs.publications}
                  onChange={(e) => handleInputChange('publications', e.target.value)}
                />
              </div>
              <div>
                <Label>Quality Publications</Label>
                <Input 
                  type="number"
                  value={inputs.qualityPublications}
                  onChange={(e) => handleInputChange('qualityPublications', e.target.value)}
                />
              </div>
              <div>
                <Label>Cited Publications</Label>
                <Input 
                  type="number"
                  value={inputs.citedPublications}
                  onChange={(e) => handleInputChange('citedPublications', e.target.value)}
                />
              </div>
              <div>
                <Label>Patents Filed</Label>
                <Input 
                  type="number"
                  value={inputs.patents}
                  onChange={(e) => handleInputChange('patents', e.target.value)}
                />
              </div>
              <div>
                <Label>Patents Granted</Label>
                <Input 
                  type="number"
                  value={inputs.grantedPatents}
                  onChange={(e) => handleInputChange('grantedPatents', e.target.value)}
                />
              </div>
              <div>
                <Label>Project Grants (Lakhs)</Label>
                <Input 
                  type="number"
                  value={inputs.projectGrants}
                  onChange={(e) => handleInputChange('projectGrants', e.target.value)}
                />
              </div>
              <div>
                <Label>Consultancy Amount (Lakhs)</Label>
                <Input 
                  type="number"
                  value={inputs.consultancy}
                  onChange={(e) => handleInputChange('consultancy', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GO Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Graduation Outcomes (GO)</h3>
            <div className="space-y-4">
              <div>
                <Label>Graduates in Higher Studies</Label>
                <Input 
                  type="number"
                  value={inputs.graduatesHigherStudies}
                  onChange={(e) => handleInputChange('graduatesHigherStudies', e.target.value)}
                />
              </div>
              <div>
                <Label>Total Graduates</Label>
                <Input 
                  type="number"
                  value={inputs.totalGraduates}
                  onChange={(e) => handleInputChange('totalGraduates', e.target.value)}
                />
              </div>
              <div>
                <Label>Placed Graduates</Label>
                <Input 
                  type="number"
                  value={inputs.placedGraduates}
                  onChange={(e) => handleInputChange('placedGraduates', e.target.value)}
                />
              </div>
              <div>
                <Label>Median Salary (LPA)</Label>
                <Input 
                  type="number"
                  value={inputs.medianSalary}
                  onChange={(e) => handleInputChange('medianSalary', e.target.value)}
                />
              </div>
              <div>
                <Label>PhD Graduates</Label>
                <Input 
                  type="number"
                  value={inputs.phdGraduates}
                  onChange={(e) => handleInputChange('phdGraduates', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OI Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Outreach and Inclusivity (OI)</h3>
            <div className="space-y-4">
              <div>
                <Label>Regional Students</Label>
                <Input 
                  type="number"
                  value={inputs.regionalStudents}
                  onChange={(e) => handleInputChange('regionalStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>Women Students</Label>
                <Input 
                  type="number"
                  value={inputs.womenStudents}
                  onChange={(e) => handleInputChange('womenStudents', e.target.value)}
                />
              </div>
              <div>
                <Label>Economically Disadvantaged Students</Label>
                <Input 
                  type="number"
                  value={inputs.economicallyDisadvantaged}
                  onChange={(e) => handleInputChange('economicallyDisadvantaged', e.target.value)}
                />
              </div>
              <div>
                <Label>Physically Disadvantaged Students</Label>
                <Input 
                  type="number"
                  value={inputs.physicallyDisadvantaged}
                  onChange={(e) => handleInputChange('physicallyDisadvantaged', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PR Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Perception (PR)</h3>
            <div>
              <Label>Perception Score</Label>
              <Input 
                type="number"
                value={inputs.perceptionScore}
                onChange={(e) => handleInputChange('perceptionScore', e.target.value)}
                min="0"
                max="100"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Final Scores</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div>
              <Label>TLR Score (30%)</Label>
              <div className="text-2xl font-bold">{totals.tlrScore}</div>
            </div>
            <div>
              <Label>RPC Score (30%)</Label>
              <div className="text-2xl font-bold">{totals.rpcScore}</div>
            </div>
            <div>
              <Label>GO Score (20%)</Label>
              <div className="text-2xl font-bold">{totals.goScore}</div>
            </div>
            <div>
              <Label>OI Score (10%)</Label>
              <div className="text-2xl font-bold">{totals.oiScore}</div>
            </div>
            <div>
              <Label>PR Score (10%)</Label>
              <div className="text-2xl font-bold">{totals.prScore}</div>
            </div>
            <div>
              <Label>Total Score</Label>
              <div className="text-2xl font-bold text-primary">{totals.totalScore}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
