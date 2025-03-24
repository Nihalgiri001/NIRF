
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const Calculator = () => {
  const [scores, setScores] = useState({
    // TLR scores
    ssScore: 0,
    fsrScore: 0,
    fqeScore: 0,
    fruScore: 0,
    
    // RPC scores
    puScore: 0,
    qpScore: 0,
    iprScore: 0,
    fpppScore: 0,
    
    // GO scores
    gphScore: 0,
    gueScore: 0,
    msScore: 0,
    gphdScore: 0,
    
    // OI scores
    rdScore: 0,
    wdScore: 0,
    escsScore: 0,
    pcsScore: 0,
    
    // Perception score
    prScore: 0,
  });

  const calculateTotalScores = () => {
    // Calculate main parameter scores (weighted averages)
    const tlrScore = (scores.ssScore + scores.fsrScore + scores.fqeScore + scores.fruScore) / 4;
    const rpcScore = (scores.puScore + scores.qpScore + scores.iprScore + scores.fpppScore) / 4;
    const goScore = (scores.gphScore + scores.gueScore + scores.msScore + scores.gphdScore) / 4;
    const oiScore = (scores.rdScore + scores.wdScore + scores.escsScore + scores.pcsScore) / 4;
    
    // Calculate total score (with NIRF weights)
    const totalScore = (tlrScore * 0.3) + (rpcScore * 0.3) + (goScore * 0.2) + (oiScore * 0.1) + (scores.prScore * 0.1);
    
    return {
      tlrScore: tlrScore.toFixed(2),
      rpcScore: rpcScore.toFixed(2),
      goScore: goScore.toFixed(2),
      oiScore: oiScore.toFixed(2),
      prScore: scores.prScore.toFixed(2),
      totalScore: totalScore.toFixed(2)
    };
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setScores(prev => ({
      ...prev,
      [field]: Math.min(100, Math.max(0, numValue)) // Clamp between 0 and 100
    }));
  };

  const totals = calculateTotalScores();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TLR Section */}
        <div className="space-y-4">
          <h3 className="font-semibold">Teaching, Learning & Resources (TLR)</h3>
          <div>
            <Label>Student Strength Score</Label>
            <Input 
              type="number" 
              value={scores.ssScore} 
              onChange={(e) => handleInputChange('ssScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Faculty-Student Ratio Score</Label>
            <Input 
              type="number" 
              value={scores.fsrScore} 
              onChange={(e) => handleInputChange('fsrScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Faculty Qualification Score</Label>
            <Input 
              type="number" 
              value={scores.fqeScore} 
              onChange={(e) => handleInputChange('fqeScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Faculty Recruitment Score</Label>
            <Input 
              type="number" 
              value={scores.fruScore} 
              onChange={(e) => handleInputChange('fruScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* RPC Section */}
        <div className="space-y-4">
          <h3 className="font-semibold">Research & Professional Practice (RPC)</h3>
          <div>
            <Label>Publications Score</Label>
            <Input 
              type="number" 
              value={scores.puScore} 
              onChange={(e) => handleInputChange('puScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Quality of Publications Score</Label>
            <Input 
              type="number" 
              value={scores.qpScore} 
              onChange={(e) => handleInputChange('qpScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>IPR Score</Label>
            <Input 
              type="number" 
              value={scores.iprScore} 
              onChange={(e) => handleInputChange('iprScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Footprint of Projects Score</Label>
            <Input 
              type="number" 
              value={scores.fpppScore} 
              onChange={(e) => handleInputChange('fpppScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* GO Section */}
        <div className="space-y-4">
          <h3 className="font-semibold">Graduation Outcomes (GO)</h3>
          <div>
            <Label>Higher Studies Score</Label>
            <Input 
              type="number" 
              value={scores.gphScore} 
              onChange={(e) => handleInputChange('gphScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>University Exam Score</Label>
            <Input 
              type="number" 
              value={scores.gueScore} 
              onChange={(e) => handleInputChange('gueScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Median Salary Score</Label>
            <Input 
              type="number" 
              value={scores.msScore} 
              onChange={(e) => handleInputChange('msScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>PhD Graduates Score</Label>
            <Input 
              type="number" 
              value={scores.gphdScore} 
              onChange={(e) => handleInputChange('gphdScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* OI Section */}
        <div className="space-y-4">
          <h3 className="font-semibold">Outreach and Inclusivity (OI)</h3>
          <div>
            <Label>Regional Diversity Score</Label>
            <Input 
              type="number" 
              value={scores.rdScore} 
              onChange={(e) => handleInputChange('rdScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Women Diversity Score</Label>
            <Input 
              type="number" 
              value={scores.wdScore} 
              onChange={(e) => handleInputChange('wdScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Economically Challenged Students Score</Label>
            <Input 
              type="number" 
              value={scores.escsScore} 
              onChange={(e) => handleInputChange('escsScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Facilities for Challenged Students Score</Label>
            <Input 
              type="number" 
              value={scores.pcsScore} 
              onChange={(e) => handleInputChange('pcsScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* PR Section */}
        <div className="space-y-4">
          <h3 className="font-semibold">Perception (PR)</h3>
          <div>
            <Label>Perception Score</Label>
            <Input 
              type="number" 
              value={scores.prScore} 
              onChange={(e) => handleInputChange('prScore', e.target.value)}
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <Card>
        <CardContent className="pt-6">
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
