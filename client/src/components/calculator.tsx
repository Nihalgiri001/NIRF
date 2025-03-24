
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const Calculator = () => {
  const [scores, setScores] = useState({
    tlrScore: 0,
    rpcScore: 0, 
    goScore: 0,
    oiScore: 0,
    prScore: 0
  });

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setScores(prev => ({
      ...prev,
      [field]: Math.min(100, Math.max(0, numValue))
    }));
  };

  const calculateTotal = () => {
    return (
      scores.tlrScore * 0.3 + 
      scores.rpcScore * 0.3 + 
      scores.goScore * 0.2 + 
      scores.oiScore * 0.1 + 
      scores.prScore * 0.1
    ).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label>Teaching, Learning & Resources (30%)</Label>
          <Input
            type="number"
            value={scores.tlrScore}
            onChange={(e) => handleInputChange('tlrScore', e.target.value)}
            min="0"
            max="100"
          />
        </div>
        <div>
          <Label>Research & Professional Practice (30%)</Label>
          <Input
            type="number"
            value={scores.rpcScore}
            onChange={(e) => handleInputChange('rpcScore', e.target.value)}
            min="0"
            max="100"
          />
        </div>
        <div>
          <Label>Graduation Outcomes (20%)</Label>
          <Input
            type="number"
            value={scores.goScore}
            onChange={(e) => handleInputChange('goScore', e.target.value)}
            min="0"
            max="100"
          />
        </div>
        <div>
          <Label>Outreach and Inclusivity (10%)</Label>
          <Input
            type="number"
            value={scores.oiScore}
            onChange={(e) => handleInputChange('oiScore', e.target.value)}
            min="0"
            max="100"
          />
        </div>
        <div>
          <Label>Perception (10%)</Label>
          <Input
            type="number"
            value={scores.prScore}
            onChange={(e) => handleInputChange('prScore', e.target.value)}
            min="0"
            max="100"
          />
        </div>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <Label className="text-lg">Total NIRF Score</Label>
            <div className="text-3xl font-bold text-primary mt-2">{calculateTotal()}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
