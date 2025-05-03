import { useState } from "react";
import Modal from "@/components/ui/modal";
import { parseExcelFile } from "@/lib/excel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParameterHoverData from "@/components/parameter-hover-data";
import Calculator from "@/components/calculator";

const Parameters = () => {
  const [parameterScores, setParameterScores] = useState({
    SS: 0,
    FSR: 0,
    FQE: 0,
    FRU: 0,
    PU: 0,
    QP: 0,
    IPR: 0,
    FPPP: 0,
    GPH: 0,
    GUE: 0,
    MS: 0,
    GPHD: 0,
    RD: 0,
    WD: 0,
    ESCS: 0,
    PR: 0,
  });

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">NIRF Ranking Parameters</h1>
      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
        <p className="text-neutral-600 text-center max-w-2xl mx-auto">
          Understand and calculate your institution's NIRF ranking using our comprehensive parameter breakdown and interactive calculator.
        </p>
      </div>

      <Tabs defaultValue="formulas" className="mb-8">
        <TabsList className="grid w-full md:w-[600px] grid-cols-3 mx-auto mb-4">
          <TabsTrigger value="formulas">Parameter Formulas</TabsTrigger>
          <TabsTrigger value="data">Parameter Top Rankings</TabsTrigger>
          <TabsTrigger value="inputs">Parameter Input Fields</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formulas" className="grid grid-cols-1 gap-8">
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

              <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Parameter Scores</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      {Object.keys(parameterScores).map((param) => (
                        <th key={param} className="p-2 text-center font-medium text-gray-700 border-b">{param}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(parameterScores).map((score, index) => (
                        <td key={index} className="p-2 text-center text-gray-900">{score}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-2">Parameters</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="font-medium text-gray-700">TLR (Teaching, Learning & Resources)</span>
                      <span className="text-gray-900">{
                        parameterScores.SS +
                        parameterScores.FSR +
                        parameterScores.FQE +
                        parameterScores.FRU
                      }</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-gray-700">RP (Research and Professional Practice)</span>
                      <span className="text-gray-900">{
                        parameterScores.PU +
                        parameterScores.QP +
                        parameterScores.IPR +
                        parameterScores.FPPP
                      }</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-gray-700">GO (Graduation Outcomes)</span>
                      <span className="text-gray-900">{
                        parameterScores.GPH +
                        parameterScores.GUE +
                        parameterScores.MS +
                        parameterScores.GPHD
                      }</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-gray-700">OI (Outreach and Inclusivity)</span>
                      <span className="text-gray-900">{
                        parameterScores.RD +
                        parameterScores.WD +
                        parameterScores.ESCS +
                        parameterScores.PR
                      }</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="grid grid-cols-1 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-6">Parameter Performance Data</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Click on any parameter code below to see the top 10 institutions ranked by that specific parameter.
            </p>
            <ParametersTopRankings />
          </div>
        </TabsContent>
        
        <TabsContent value="inputs" className="grid grid-cols-1 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-6">Required Input Fields for NIRF Parameters</h3>
            <p className="text-sm text-muted-foreground mb-6">
              The following input fields are required to calculate the NIRF parameters. Institutions need to provide this data for ranking calculations.
            </p>
            
            {/* Basic Institution Information */}
            <div className="border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-lg text-primary mb-3">Basic Institution Information</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 text-left">Field Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Institution Name</td>
                    <td className="p-2">Full name of the institution</td>
                    <td className="p-2">Text</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">State</td>
                    <td className="p-2">State where institution is located</td>
                    <td className="p-2">Text</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Type</td>
                    <td className="p-2">Institution type (Public, Private, etc.)</td>
                    <td className="p-2">Text</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Year Established</td>
                    <td className="p-2">Year the institution was established</td>
                    <td className="p-2">Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* SS - Student Strength Parameter Inputs */}
            <div className="border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-lg text-primary mb-3">Student Strength (SS) Parameter Inputs</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 text-left">Field Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Total Student Strength (N)</td>
                    <td className="p-2">Total number of students enrolled</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Sanctioned Student Strength (Ns)</td>
                    <td className="p-2">AICTE/UGC approved student intake</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Female Students (Nw)</td>
                    <td className="p-2">Number of female students</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">PhD Students (Np)</td>
                    <td className="p-2">Number of students enrolled in PhD programs</td>
                    <td className="p-2">Number</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* FSR - Faculty Student Ratio Parameter Inputs */}
            <div className="border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-lg text-primary mb-3">Faculty-Student Ratio (FSR) Parameter Inputs</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 text-left">Field Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Faculty Count (F)</td>
                    <td className="p-2">Number of full-time faculty members</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Sanctioned Faculty Positions</td>
                    <td className="p-2">Number of faculty positions approved</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Total Student Strength (N)</td>
                    <td className="p-2">Total number of students enrolled</td>
                    <td className="p-2">Number</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* FQE - Faculty Qualification & Experience Parameter Inputs */}
            <div className="border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-lg text-primary mb-3">Faculty Qualification & Experience (FQE) Parameter Inputs</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 text-left">Field Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Faculty Count (F)</td>
                    <td className="p-2">Number of full-time faculty members</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Faculty with PhD (F1)</td>
                    <td className="p-2">Number of faculty with PhD or equivalent degree</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Faculty Experience</td>
                    <td className="p-2">Average experience of faculty in years</td>
                    <td className="p-2">Years</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Research & Publications Parameter Inputs */}
            <div className="border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-lg text-primary mb-3">Research & Publications Parameter Inputs (PU, QP, IPR, FPPP)</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 text-left">Field Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Research Publications (P)</td>
                    <td className="p-2">Number of research papers published in Scopus/Web of Science</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Citations Count (CC)</td>
                    <td className="p-2">Total citations received for publications</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Patents Filed (PF)</td>
                    <td className="p-2">Number of patents filed in last 3 years</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Patents Granted (PG)</td>
                    <td className="p-2">Number of patents granted in last 3 years</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Sponsored Research Funding</td>
                    <td className="p-2">Amount received from sponsored research projects</td>
                    <td className="p-2">Lakhs</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Consultancy Earnings</td>
                    <td className="p-2">Amount earned from consultancy projects</td>
                    <td className="p-2">Lakhs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Graduation Outcomes Parameter Inputs */}
            <div className="border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-lg text-primary mb-3">Graduation Outcomes Parameter Inputs (GPH, GUE, MS, GPHD)</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 text-left">Field Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Total Graduates (N)</td>
                    <td className="p-2">Total number of students who graduated</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Graduates Placed (NP)</td>
                    <td className="p-2">Number of graduates who secured employment</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Graduates in Higher Studies (NH)</td>
                    <td className="p-2">Number of graduates who enrolled for higher studies</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Graduates in Stipulated Time (Ng)</td>
                    <td className="p-2">Number of students who graduated in minimum time</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Median Salary</td>
                    <td className="p-2">Median salary of placed graduates</td>
                    <td className="p-2">Lakhs per annum</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">PhD Graduates (Np)</td>
                    <td className="p-2">Number of PhD degrees awarded</td>
                    <td className="p-2">Number</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Outreach & Inclusivity Parameter Inputs */}
            <div className="border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-lg text-primary mb-3">Outreach & Inclusivity Parameter Inputs (RD, WD, ESCS, PCS)</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 text-left">Field Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Students from Other States (NOS)</td>
                    <td className="p-2">Number of students from other states</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">International Students (NF)</td>
                    <td className="p-2">Number of students from other countries</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Female Students (Nw)</td>
                    <td className="p-2">Number of female students</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Economically Backward Students</td>
                    <td className="p-2">Number of economically weaker section students</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">SC/ST Students</td>
                    <td className="p-2">Number of SC/ST students</td>
                    <td className="p-2">Number</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Physically Handicapped Students</td>
                    <td className="p-2">Number of differently-abled students</td>
                    <td className="p-2">Number</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Perception Parameter Inputs */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-lg text-primary mb-3">Perception (PR) Parameter Inputs</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 text-left">Field Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 font-medium">Peer Perception Score</td>
                    <td className="p-2">Score based on survey of employers, academics, and other stakeholders</td>
                    <td className="p-2">Score (0-100)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ParametersTopRankings = () => {
  const [selectedParam, setSelectedParam] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const handleParamClick = async (paramName) => {
    setSelectedParam(paramName);
    try {
      const data = await parseExcelFile(paramName);
      if (!data) {
        throw new Error("Failed to parse Excel file. Please check the file format.");
      }
      setExcelData(data);
    } catch (error) {
      console.error(error);
      alert("An error occurred while parsing the Excel file. Please try again.");
    }
  };

  const closeModal = () => {
    setSelectedParam(null);
    setExcelData(null);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* TLR Parameters */}
      <div className="bg-white p-4 rounded border">
        <h4 className="font-medium mb-3">TLR Parameters</h4>
        <div className="space-y-2">
          <div onClick={() => handleParamClick("SS")}><ParameterHoverData paramName="SS">SS</ParameterHoverData> - Student Strength</div>
          <div onClick={() => handleParamClick("FSR")}><ParameterHoverData paramName="FSR">FSR</ParameterHoverData> - Faculty-Student Ratio</div>
          <div onClick={() => handleParamClick("FQE")}><ParameterHoverData paramName="FQE">FQE</ParameterHoverData> - Faculty Qualifications</div>
          <div onClick={() => handleParamClick("FRU")}><ParameterHoverData paramName="FRU">FRU</ParameterHoverData> - Financial Resources</div>
        </div>
      </div>

      {/* RPC Parameters */}
      <div className="bg-white p-4 rounded border">
        <h4 className="font-medium mb-3">RPC Parameters</h4>
        <div className="space-y-2">
          <div onClick={() => handleParamClick("PU")}><ParameterHoverData paramName="PU">PU</ParameterHoverData> - Publications</div>
          <div onClick={() => handleParamClick("QP")}><ParameterHoverData paramName="QP">QP</ParameterHoverData> - Quality of Publications</div>
          <div onClick={() => handleParamClick("IPR")}><ParameterHoverData paramName="IPR">IPR</ParameterHoverData> - IPR and Patents</div>
          <div onClick={() => handleParamClick("FPPP")}><ParameterHoverData paramName="FPPP">FPPP</ParameterHoverData> - Footprint of Projects</div>
        </div>
      </div>

      {/* GO Parameters */}
      <div className="bg-white p-4 rounded border">
        <h4 className="font-medium mb-3">GO Parameters</h4>
        <div className="space-y-2">
          <div onClick={() => handleParamClick("GPH")}><ParameterHoverData paramName="GPH">GPH</ParameterHoverData> - Placement & Higher Studies</div>
          <div onClick={() => handleParamClick("GUE")}><ParameterHoverData paramName="GUE">GUE</ParameterHoverData> - University Examinations</div>
          <div onClick={() => handleParamClick("MS")}><ParameterHoverData paramName="MS">MS</ParameterHoverData> - Median Salary</div>
          <div onClick={() => handleParamClick("GPHD")}><ParameterHoverData paramName="GPHD">GPHD</ParameterHoverData> - PhD Graduates</div>
        </div>
      </div>

      {/* OI & PR Parameters */}
      <div className="bg-white p-4 rounded border">
        <h4 className="font-medium mb-3">OI & PR Parameters</h4>
        <div className="space-y-2">
          <div onClick={() => handleParamClick("RD")}><ParameterHoverData paramName="RD">RD</ParameterHoverData> - Regional Diversity</div>
          <div onClick={() => handleParamClick("WD")}><ParameterHoverData paramName="WD">WD</ParameterHoverData> - Women Diversity</div>
          <div onClick={() => handleParamClick("ESCS")}><ParameterHoverData paramName="ESCS">ESCS</ParameterHoverData> - Econ. & Social Inclusion</div>
          <div onClick={() => handleParamClick("PR")}><ParameterHoverData paramName="PR">PR</ParameterHoverData> - Perception</div>
        </div>
      </div>

      {selectedParam && (
        <Modal isOpen={!!selectedParam} onClose={closeModal}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{selectedParam} Data</h2>
            <pre>{JSON.stringify(excelData, null, 2)}</pre>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Parameters;