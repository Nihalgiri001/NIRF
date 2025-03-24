import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from '../components/calculator';

const Parameters = () => {
  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-primary mb-8">NIRF Ranking Parameters</h1>
      <p className="mb-6 text-muted-foreground">
        The National Institutional Ranking Framework (NIRF) evaluates institutions across five main parameters, 
        each comprising multiple sub-parameters. Below is a detailed explanation of each parameter and its 
        calculation methodology.
      </p>

      <div className="grid grid-cols-1 gap-8">
        {/* Parameter descriptions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">Calculate NIRF Score</h2>
          <p className="text-muted-foreground mb-6">
            Use the calculator below to compute NIRF scores based on the parameters described above.
          </p>
          <Calculator />
        </div>
      </div>
    </div>
  );
};

export default Parameters;