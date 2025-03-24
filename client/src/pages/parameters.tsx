
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from '../components/calculator';

const Parameters = () => {
  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-primary mb-8">NIRF Ranking Parameters</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="tlr">
            <AccordionTrigger>Teaching, Learning & Resources (TLR)</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                This parameter focuses on the core teaching, learning, and resource availability. 
                It includes Student-Faculty ratio, faculty qualifications, and financial resources.
                Weight: 30%
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rpc">
            <AccordionTrigger>Research and Professional Practice (RPC)</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Measures the quality and quantity of research output, patents, and funded research projects.
                Weight: 30%
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="go">
            <AccordionTrigger>Graduation Outcomes (GO)</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Evaluates the success rate of graduation, placement statistics, and higher education pursuit.
                Weight: 20%
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="oi">
            <AccordionTrigger>Outreach and Inclusivity (OI)</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Considers the institution's efforts in regional and gender diversity, and inclusivity measures.
                Weight: 10%
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pr">
            <AccordionTrigger>Perception (PR)</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Based on surveys from academic peers, employers, and public perception.
                Weight: 10%
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">Calculate NIRF Score</h2>
            <p className="text-muted-foreground mb-6">
              Enter your scores for each parameter (0-100) to calculate your total NIRF ranking score.
            </p>
            <Calculator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Parameters;
