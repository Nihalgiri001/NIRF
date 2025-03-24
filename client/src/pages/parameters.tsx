import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "@/components/calculator";

const Parameters = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">NIRF Ranking Parameters</h1>
      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
        <p className="text-neutral-600 text-center max-w-2xl mx-auto">
          Understand and calculate your institution's NIRF ranking using our comprehensive parameter breakdown and interactive calculator.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="tlr">
            <AccordionTrigger>Teaching, Learning & Resources (TLR) - 30%</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Student Strength (SS) - 25%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: SS = (N/Ns) × 15 + (Nw/N) × 5 + (Np/N) × 5
                    <br/>
                    N = Total student strength
                    <br/>
                    Ns = Sanctioned student strength
                    <br/>
                    Nw = Number of female students
                    <br/>
                    Np = Number of PhD students
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Faculty-Student Ratio (FSR) - 30%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: FSR = 30 × (F/N)
                    <br/>
                    F = Number of regular faculty
                    <br/>
                    N = Total student strength
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Faculty Qualifications (FQ) - 20%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: FQ = 10 × (F1/F) + 10 × (F2/F)
                    <br/>
                    F1 = Faculty with PhD or equivalent
                    <br/>
                    F2 = Faculty with M.Tech or equivalent
                    <br/>
                    F = Total regular faculty
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Financial Resources Utilization (FRU) - 25%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: Based on operational and capital expenditure per student
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rpc">
            <AccordionTrigger>Research and Professional Practice (RPC) - 30%</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Publications (PU) - 30%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: PU = 30 × (P/F)
                    <br/>
                    P = Number of publications in Scopus/Web of Science
                    <br/>
                    F = Total regular faculty
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Quality of Publications (QP) - 35%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: QP = 20 × (CC/P) + 15 × h-index
                    <br/>
                    CC = Total citation count
                    <br/>
                    P = Number of publications
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">IPR and Patents (IPR) - 15%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: IPR = 10 × (PG/F) + 5 × (PF/F)
                    <br/>
                    PG = Patents granted
                    <br/>
                    PF = Patents filed
                    <br/>
                    F = Total regular faculty
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Footprint of Projects (FPPP) - 20%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: Based on sponsored research and consultancy projects
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="go">
            <AccordionTrigger>Graduation Outcomes (GO) - 20%</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Placement and Higher Studies (GPH) - 40%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: GPH = 30 × (NP/N) + 10 × (NH/N)
                    <br/>
                    NP = Number of students placed
                    <br/>
                    NH = Number of students in higher studies
                    <br/>
                    N = Total graduating students
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">University Examinations (GUE) - 15%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: GUE = 15 × (Ng/N)
                    <br/>
                    Ng = Number of students graduating in minimum time
                    <br/>
                    N = Total student strength
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Median Salary (MS) - 25%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: Based on median salary of placed graduates
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">PhD Graduates (GPHD) - 20%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: GPHD = 20 × (Np/N)
                    <br/>
                    Np = Number of PhD graduates
                    <br/>
                    N = Total graduating students
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="oi">
            <AccordionTrigger>Outreach and Inclusivity (OI) - 10%</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Regional Diversity (RD) - 30%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: RD = 25 × (NOS/N) + 5 × (NF/N)
                    <br/>
                    NOS = Number of students from other states
                    <br/>
                    NF = Number of students from other countries
                    <br/>
                    N = Total student strength
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Women Diversity (WD) - 30%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: WD = 15 × (FSR) + 15 × (SW)
                    <br/>
                    FSR = Female to male faculty ratio
                    <br/>
                    SW = Female to male student ratio
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Economically & Socially Challenged Students (ESCS) - 20%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: Based on percentage of economically and socially backward students
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Facilities for Physically Challenged Students (PCS) - 20%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: Based on facilities and support provided
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pr">
            <AccordionTrigger>Perception (PR) - 10%</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Peer Perception - 100%</h3>
                  <p className="text-sm text-muted-foreground">
                    Formula: Based on survey of employers, academics, and public perception
                  </p>
                </div>
              </div>
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