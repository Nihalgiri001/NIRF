import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Parameters = () => {
  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-primary mb-8">NIRF Ranking Parameters</h1>
      <p className="mb-6 text-muted-foreground">
        The National Institutional Ranking Framework (NIRF) evaluates institutions across five main parameters, 
        each comprising multiple sub-parameters. Below is a detailed explanation of each parameter and its 
        calculation methodology.
      </p>

      <Tabs defaultValue="overview" className="w-full mb-10">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tlr">TLR</TabsTrigger>
          <TabsTrigger value="rpc">RPC</TabsTrigger>
          <TabsTrigger value="go">GO</TabsTrigger>
          <TabsTrigger value="oi">OI</TabsTrigger>
          <TabsTrigger value="pr">PR</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>NIRF Ranking Framework</CardTitle>
              <CardDescription>
                The overall score is calculated from five main parameters, each with its own weight
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-md bg-blue-50">
                    <h3 className="font-bold text-xl mb-2 text-blue-800">Teaching, Learning & Resources (TLR)</h3>
                    <p className="text-sm mb-2">Weight: 30%</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Student Strength</li>
                      <li>Faculty-Student Ratio</li>
                      <li>Faculty Qualifications</li>
                      <li>Faculty Recruitment & Utilization</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-md bg-indigo-50">
                    <h3 className="font-bold text-xl mb-2 text-indigo-800">Research and Professional Practice (RPC)</h3>
                    <p className="text-sm mb-2">Weight: 30%</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Publications</li>
                      <li>Quality of Publications</li>
                      <li>IPR and Patents</li>
                      <li>Footprint of Projects</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-md bg-green-50">
                    <h3 className="font-bold text-xl mb-2 text-green-800">Graduation Outcomes (GO)</h3>
                    <p className="text-sm mb-2">Weight: 20%</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Graduation Performance</li>
                      <li>University Examinations</li>
                      <li>Median Salary</li>
                      <li>Graduating PhD Students</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-md bg-yellow-50">
                    <h3 className="font-bold text-xl mb-2 text-yellow-800">Outreach and Inclusivity (OI)</h3>
                    <p className="text-sm mb-2">Weight: 10%</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Regional Diversity</li>
                      <li>Women Diversity</li>
                      <li>Economically & Socially Challenged Students</li>
                      <li>Facilities for Physically Challenged Students</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-md bg-red-50">
                    <h3 className="font-bold text-xl mb-2 text-red-800">Perception (PR)</h3>
                    <p className="text-sm mb-2">Weight: 10%</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Perception among Peers</li>
                      <li>Academic Reputation</li>
                      <li>Employer Perception</li>
                      <li>Public Perception</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 border rounded-md bg-gray-50">
                  <h3 className="font-bold text-xl mb-2">Overall Score Calculation</h3>
                  <div className="bg-white p-3 rounded shadow-sm font-mono text-sm">
                    <p>Overall Score = (TLR × 0.30) + (RPC × 0.30) + (GO × 0.20) + (OI × 0.10) + (PR × 0.10)</p>
                    <p className="mt-2">Where:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>TLR = Teaching, Learning & Resources (100 marks)</li>
                      <li>RPC = Research and Professional Practice (100 marks)</li>
                      <li>GO = Graduation Outcomes (100 marks)</li>
                      <li>OI = Outreach and Inclusivity (100 marks)</li>
                      <li>PR = Perception (100 marks)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* TLR Tab */}
        <TabsContent value="tlr">
          <Card>
            <CardHeader>
              <CardTitle>Teaching, Learning & Resources (TLR)</CardTitle>
              <CardDescription>
                Weight: 30% (300/1000) | Main Parameter Score: 100 marks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p>
                  The TLR parameter evaluates the core educational resources, including faculty, infrastructure, 
                  and student strength. It consists of the following sub-parameters:
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ss">
                  <AccordionTrigger className="font-semibold">
                    SS: Student Strength (20 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This sub-parameter measures the total student strength of the institution, with higher 
                      weight given to PhD students to encourage research focus.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Basic Strength = totalStudents × 0.8</p>
                        <p>PhD Strength = phDStudents × 1.5</p>
                        <p>SS Score = min(20, (Basic Strength + PhD Strength) × normalizationFactor)</p>
                        <p className="text-xs mt-2 text-gray-500">* normalizationFactor is adjusted based on highest values across all institutions</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fsr">
                  <AccordionTrigger className="font-semibold">
                    FSR: Faculty-Student Ratio (30 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      FSR evaluates the ratio of faculty to students, with an optimal ratio considered as 1:15 or better. 
                      This encourages institutions to maintain adequate teaching staff for quality education.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>FSR = totalStudents / facultyCount</p>
                        <p>If FSR &le; 15: Score = 30 (full marks)</p>
                        <p>If FSR &gt; 50: Score = 0</p>
                        <p>Otherwise: Score = 30 × (1 - (FSR - 15) / 35)</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fqe">
                  <AccordionTrigger className="font-semibold">
                    FQE: Faculty Qualification & Experience (20 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This measures the quality of faculty based on their qualifications (particularly PhD) 
                      and years of experience in teaching and research.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>PhD Percentage = (facultyWithPhD / facultyCount) × 100</p>
                        <p className="mt-2">PhD Score (15 marks max):</p>
                        <ul className="list-disc list-inside ml-2">
                          <li>If PhD% &ge; 95: Score = 15</li>
                          <li>If PhD% &ge; 75: Score = 10 + (PhD% - 75) × 0.2</li>
                          <li>If PhD% &ge; 50: Score = 5 + (PhD% - 50) × 0.2</li>
                          <li>Otherwise: Score = PhD% × 0.1</li>
                        </ul>
                        
                        <p className="mt-2">Experience Score (5 marks max):</p>
                        <ul className="list-disc list-inside ml-2">
                          <li>If Avg Experience &ge; 15 years: Score = 5</li>
                          <li>If Avg Experience &ge; 10: Score = 3 + (Experience - 10) × 0.4</li>
                          <li>If Avg Experience &ge; 5: Score = 2 + (Experience - 5) × 0.2</li>
                          <li>Otherwise: Score = Experience × 0.4</li>
                        </ul>
                        
                        <p className="mt-2">FQE Total = PhD Score + Experience Score</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fru">
                  <AccordionTrigger className="font-semibold">
                    FRU: Faculty Recruitment & Utilization (30 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This evaluates how effectively institutions fill their sanctioned faculty positions, 
                      encouraging them to maintain full staffing levels.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Filled Positions % = (facultyCount / sanctionedFacultyPositions) × 100</p>
                        <p>If Filled Positions &ge; 95%: Score = 30 (full marks)</p>
                        <p>If Filled Positions &lt; 40%: Score = 0</p>
                        <p>Otherwise: Score = 30 × (Filled Positions - 40) / 55</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* RPC Tab */}
        <TabsContent value="rpc">
          <Card>
            <CardHeader>
              <CardTitle>Research and Professional Practice (RPC)</CardTitle>
              <CardDescription>
                Weight: 30% (300/1000) | Main Parameter Score: 100 marks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p>
                  The RPC parameter evaluates the research output and professional contributions of the institution. 
                  It consists of the following sub-parameters:
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="pu">
                  <AccordionTrigger className="font-semibold">
                    PU: Publications (35 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This measures the quantity of research publications per faculty, 
                      emphasizing consistent research output.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Publications Per Faculty = researchPublications / facultyCount</p>
                        <p>PU Score = min(35, (Publications Per Faculty / maxPublicationsPerFaculty) × 35)</p>
                        <p className="text-xs mt-2 text-gray-500">* maxPublicationsPerFaculty is based on the highest performing institution</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="qp">
                  <AccordionTrigger className="font-semibold">
                    QP: Quality of Publications (40 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This evaluates the impact and quality of research through citations 
                      and other quality metrics like impact factor.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Citations Per Paper = citationsCount / researchPublications</p>
                        <p>QP Score = min(40, (Citations Per Paper / maxCitationsPerPaper) × 40)</p>
                        <p className="text-xs mt-2 text-gray-500">* maxCitationsPerPaper is based on the highest performing institution</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ipr">
                  <AccordionTrigger className="font-semibold">
                    IPR: IPR and Patents (15 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This measures innovation through patents filed and granted, 
                      with greater weight given to granted patents.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Patents Per Faculty = (patentsFiled + 2 × patentsGranted) / facultyCount</p>
                        <p>IPR Score = min(15, (Patents Per Faculty / maxPatentsPerFaculty) × 15)</p>
                        <p className="text-xs mt-2 text-gray-500">* Note that granted patents are counted twice</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fppp">
                  <AccordionTrigger className="font-semibold">
                    FPPP: Footprint of Projects & Professional Practice (10 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This evaluates the sponsored research and consultancy projects undertaken by the institution, 
                      measured through financial metrics.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Earnings Per Faculty = (sponsoredResearchFunding + consultancyEarnings) / facultyCount</p>
                        <p>FPPP Score = min(10, (Earnings Per Faculty / maxEarningsPerFaculty) × 10)</p>
                        <p className="text-xs mt-2 text-gray-500">* Earnings are measured in lakhs of rupees</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* GO Tab */}
        <TabsContent value="go">
          <Card>
            <CardHeader>
              <CardTitle>Graduation Outcomes (GO)</CardTitle>
              <CardDescription>
                Weight: 20% (200/1000) | Main Parameter Score: 100 marks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p>
                  The GO parameter evaluates the outcomes and success of graduates from the institution. 
                  It consists of the following sub-parameters:
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="gph">
                  <AccordionTrigger className="font-semibold">
                    GPH: Graduation Performance (40 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This measures the percentage of students who graduate within the stipulated time, 
                      indicating program effectiveness.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Graduation Rate = (graduatesInStipulatedTime / totalGraduates) × 100</p>
                        <p>If Graduation Rate &ge; 95%: Score = 40 (full marks)</p>
                        <p>If Graduation Rate &lt; 50%: Score = 0</p>
                        <p>Otherwise: Score = 40 × (Graduation Rate - 50) / 45</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gue">
                  <AccordionTrigger className="font-semibold">
                    GUE: University Examinations (15 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This evaluates the performance of students in university examinations, 
                      indicating academic quality.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>GUE Score = 15 × (graduatesInStipulatedTime / totalGraduates)</p>
                        <p className="text-xs mt-2 text-gray-500">* This is a simplified formula that may vary based on specific university performance metrics</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ms">
                  <AccordionTrigger className="font-semibold">
                    MS: Median Salary (25 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This measures the median salary of graduates, indicating employment success and quality.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Reference Salary = 8 lakhs</p>
                        <p>If Salary &ge; 2 × Reference: Score = 25 (full marks)</p>
                        <p>If Salary &le; 0.5 × Reference: Score = 0</p>
                        <p>Otherwise: Score = 25 × (Salary - 0.5×Reference) / (1.5×Reference)</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gphd">
                  <AccordionTrigger className="font-semibold">
                    GPHD: Graduating Students in PhD (20 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This evaluates the percentage of PhD graduates to total graduates, 
                      indicating research focus.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>PhD Graduate % = (phDStudents / totalGraduates) × 100</p>
                        <p>GPHD Score = min(20, (PhD Graduate % / referencePercentage) × 20)</p>
                        <p className="text-xs mt-2 text-gray-500">* referencePercentage is typically 20%</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* OI Tab */}
        <TabsContent value="oi">
          <Card>
            <CardHeader>
              <CardTitle>Outreach and Inclusivity (OI)</CardTitle>
              <CardDescription>
                Weight: 10% (100/1000) | Main Parameter Score: 100 marks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p>
                  The OI parameter evaluates the institution's efforts towards diversity and inclusion. 
                  It consists of the following sub-parameters:
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="rd">
                  <AccordionTrigger className="font-semibold">
                    RD: Regional Diversity (30 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This measures the percentage of students from other states and countries, 
                      indicating geographical diversity.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Diversity % = ((studentsFromOtherStates + 2×studentsFromAbroad) / totalStudents) × 100</p>
                        <p>If Diversity % &ge; 50%: Score = 30 (full marks)</p>
                        <p>If Diversity % &lt; 5%: Score = 0</p>
                        <p>Otherwise: Score = 30 × (Diversity % - 5) / 45</p>
                        <p className="text-xs mt-2 text-gray-500">* Note that international students are counted with double weight</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="wd">
                  <AccordionTrigger className="font-semibold">
                    WD: Women Diversity (30 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This evaluates the percentage of women students, encouraging gender balance.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>Women % = (femaleStudents / totalStudents) × 100</p>
                        <p>If Women % &ge; 50%: Score = 30 (full marks)</p>
                        <p>If Women % &lt; 10%: Score = 0</p>
                        <p>Otherwise: Score = 5 + 25 × (Women % - 10) / 40</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="escs">
                  <AccordionTrigger className="font-semibold">
                    ESCS: Economically and Socially Challenged Students (20 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This measures the percentage of SC/ST and economically backward students, 
                      promoting social inclusivity.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>ESCS % = ((scStStudents + economicallyBackwardStudents) / totalStudents) × 100</p>
                        <p>If ESCS % &ge; 40%: Score = 20 (full marks)</p>
                        <p>If ESCS % &lt; 5%: Score = 0</p>
                        <p>Otherwise: Score = 20 × (ESCS % - 5) / 35</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pcs">
                  <AccordionTrigger className="font-semibold">
                    PCS: Facilities for Physically Challenged Students (20 marks)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      This evaluates the facilities and accommodation for physically challenged students.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm">Formula:</h4>
                      <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-2">
                        <p>PCS % = (physicallyHandicappedStudents / totalStudents) × 100</p>
                        <p>If PCS % &ge; 3%: Score = 20 (full marks)</p>
                        <p>If PCS % &lt; 0.5%: Score = 0</p>
                        <p>Otherwise: Score = 20 × (PCS % - 0.5) / 2.5</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* PR Tab */}
        <TabsContent value="pr">
          <Card>
            <CardHeader>
              <CardTitle>Perception (PR)</CardTitle>
              <CardDescription>
                Weight: 10% (100/1000) | Main Parameter Score: 100 marks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p>
                  The PR parameter evaluates the reputation and perception of the institution among peers, 
                  employers, and the public.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold">Perception Score Calculation</h3>
                  <p className="mt-2">
                    The perception score is collected through surveys of various stakeholders including:
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Academic peers and faculty</li>
                    <li>Employers and industry representatives</li>
                    <li>Research organizations</li>
                    <li>Civil society and public perception</li>
                  </ul>
                  
                  <div className="bg-white p-3 rounded shadow-sm font-mono text-sm mt-4">
                    <p>PR Score = peerPerceptionScore (collected through surveys)</p>
                    <p className="text-xs mt-2 text-gray-500">
                      * This is a direct input from survey data rather than calculated from raw metrics
                    </p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md bg-yellow-50">
                  <h3 className="font-semibold text-amber-800">Note on Perception Scores</h3>
                  <p className="mt-2 text-sm">
                    The perception component aims to reflect the reputation of the institution, which often lags 
                    behind actual performance improvements. Institutions should focus on long-term reputation 
                    building through consistent quality and outreach efforts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Parameters;