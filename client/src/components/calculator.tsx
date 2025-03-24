
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const Calculator = () => {
  const [scores, setScores] = useState({
    ssScore: 0,
    fsrScore: 0,
    fqeScore: 0,
    fruScore: 0,
    puScore: 0,
    qpScore: 0,
    iprScore: 0,
    fpppScore: 0,
    gphScore: 0,
    gueScore: 0,
    msScore: 0,
    gphdScore: 0,
    rdScore: 0,
    wdScore: 0,
    escsScore: 0,
    pcsScore: 0,
    prScore: 0,
  });

  const calculateTotalScores = () => {
    const tlrScore = (scores.ssScore + scores.fsrScore + scores.fqeScore + scores.fruScore) / 4;
    const rpcScore = (scores.puScore + scores.qpScore + scores.iprScore + scores.fpppScore) / 4;
    const goScore = (scores.gphScore + scores.gueScore + scores.msScore + scores.gphdScore) / 4;
    const oiScore = (scores.rdScore + scores.wdScore + scores.escsScore + scores.pcsScore) / 4;
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
      [field]: Math.min(100, Math.max(0, numValue))
    }));
  };

  const totals = calculateTotalScores();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calculator components moved from calculator.tsx */}
        {/* ... Rest of the calculator components ... */}
      </div>
    </div>
  );
};
