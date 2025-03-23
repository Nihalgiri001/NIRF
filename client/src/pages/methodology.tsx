import { Link } from "wouter";
import AnnouncementsCarousel from "@/components/announcements-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Methodology = () => {
  return (
    <div className="flex-grow bg-secondary-light">
      {/* Breadcrumbs */}
      <div className="bg-secondary py-2 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="text-sm text-neutral-500">
            <Link href="/" className="text-primary hover:underline">Home</Link> &gt; 
            <span className="text-neutral-500"> Methodology</span>
          </div>
        </div>
      </div>
      
      <AnnouncementsCarousel />
      
      <main id="main-content" className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-500">NIRF Ranking Methodology</h1>
          <p className="text-neutral-400 mt-2">Understanding the parameters and calculations behind NIRF rankings</p>
        </div>
        
        {/* Methodology Overview */}
        <div className="bg-white p-6 rounded shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Overview</h2>
          <p className="text-neutral-500 mb-4">
            The National Institutional Ranking Framework (NIRF) uses a methodology that combines multiple parameters to comprehensively 
            evaluate higher education institutions across India. The framework is designed to be fair, transparent, and data-driven.
          </p>
          <p className="text-neutral-500 mb-4">
            Rankings are released across multiple categories: Overall, Universities, Engineering, Management, Pharmacy, Medical, 
            Architecture, Law, Dental, and Research. Each category may have slight variations in how parameters are weighted 
            to account for discipline-specific considerations.
          </p>
          <p className="text-neutral-500">
            The NIRF methodology relies on five broad parameters, each with multiple sub-parameters:
          </p>
        </div>
        
        {/* Parameters Tabs */}
        <Tabs defaultValue="tlr" className="mb-6">
          <TabsList className="bg-secondary grid grid-cols-1 md:grid-cols-5 mb-4">
            <TabsTrigger value="tlr" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              TLR
            </TabsTrigger>
            <TabsTrigger value="rpc" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              RPC
            </TabsTrigger>
            <TabsTrigger value="go" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              GO
            </TabsTrigger>
            <TabsTrigger value="oi" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              OI
            </TabsTrigger>
            <TabsTrigger value="pr" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              PR
            </TabsTrigger>
          </TabsList>
          
          <div className="bg-white rounded shadow-sm">
            <TabsContent value="tlr" className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Teaching, Learning & Resources (TLR)</h3>
              <p className="text-neutral-500 mb-4">
                This parameter focuses on the core teaching and learning resources available to students and faculty. 
                It accounts for 30% of the total score.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Student Strength</h4>
                  <p className="text-sm text-neutral-500">Total student enrollment and diversity in student population.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Faculty-Student Ratio</h4>
                  <p className="text-sm text-neutral-500">Number of faculty members relative to student enrollment.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Faculty Qualifications and Experience</h4>
                  <p className="text-sm text-neutral-500">Quality of faculty based on qualifications and experience.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Financial Resources and Utilization</h4>
                  <p className="text-sm text-neutral-500">Budget allocation and utilization for academic activities.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rpc" className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Research and Professional Practice (RPC)</h3>
              <p className="text-neutral-500 mb-4">
                This parameter assesses the quality of research output and professional practice from the institution. 
                It accounts for 30% of the total score.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Publications</h4>
                  <p className="text-sm text-neutral-500">Number and quality of research publications in reputed journals.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Quality of Publications</h4>
                  <p className="text-sm text-neutral-500">Impact factor and citations of published research.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">IPR and Patents</h4>
                  <p className="text-sm text-neutral-500">Patents filed, granted, and commercialized.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Sponsored Research</h4>
                  <p className="text-sm text-neutral-500">Research projects funded by external agencies.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="go" className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Graduation Outcomes (GO)</h3>
              <p className="text-neutral-500 mb-4">
                This parameter focuses on student performance in terms of graduation rates and success in examinations.
                It accounts for 20% of the total score.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Graduation Rate</h4>
                  <p className="text-sm text-neutral-500">Percentage of students who successfully complete their programs.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Placement and Higher Studies</h4>
                  <p className="text-sm text-neutral-500">Percentage of graduates who secure employment or pursue higher education.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Median Salary</h4>
                  <p className="text-sm text-neutral-500">Median salary of graduated students.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">University Examinations</h4>
                  <p className="text-sm text-neutral-500">Performance in university examinations and other standardized tests.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="oi" className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Outreach and Inclusivity (OI)</h3>
              <p className="text-neutral-500 mb-4">
                This parameter measures the institution's efforts in outreach activities and ensuring diversity and inclusivity.
                It accounts for 10% of the total score.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Diversity</h4>
                  <p className="text-sm text-neutral-500">Representation of diverse groups (gender, region, economic background) in student and faculty.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Regional Diversity</h4>
                  <p className="text-sm text-neutral-500">Percentage of students from other states/countries.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Women Diversity</h4>
                  <p className="text-sm text-neutral-500">Percentage of women students and faculty.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Economically and Socially Challenged Students</h4>
                  <p className="text-sm text-neutral-500">Percentage of students from economically and socially backward communities.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Facilities for Physically Challenged Students</h4>
                  <p className="text-sm text-neutral-500">Infrastructure and support for differently-abled students.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pr" className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Perception (PR)</h3>
              <p className="text-neutral-500 mb-4">
                This parameter is based on the perception of the institution among its stakeholders.
                It accounts for 10% of the total score.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Peer Perception</h4>
                  <p className="text-sm text-neutral-500">Perception survey among academics and researchers.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Employer Perception</h4>
                  <p className="text-sm text-neutral-500">Feedback from employers who recruit graduates.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Public Perception</h4>
                  <p className="text-sm text-neutral-500">General public perception of the institution.</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-neutral-600">Competitiveness</h4>
                  <p className="text-sm text-neutral-500">Number of applicants per seat, indicating demand for the institution.</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Calculation and Data Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4">Calculation Methodology</h2>
            <p className="text-neutral-500 mb-3">
              The NIRF ranking calculation involves several steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-neutral-500">
              <li>Data collection from participating institutions</li>
              <li>Normalization of data to ensure fair comparison</li>
              <li>Application of parameter-specific weights</li>
              <li>Calculation of parameter-wise scores (scaled to 100)</li>
              <li>Calculation of overall score based on weighted parameters</li>
              <li>Ranking institutions based on overall scores</li>
            </ol>
            <p className="text-neutral-500 mt-4">
              The final score is the weighted average of all five parameter scores, with the weights varying slightly by category.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4">Data Collection Process</h2>
            <p className="text-neutral-500 mb-3">
              NIRF follows a rigorous data collection process:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-500">
              <li>Institutions register on the NIRF portal</li>
              <li>Submit data through online forms by the deadline</li>
              <li>Upload supporting documents</li>
              <li>Data verification by NIRF team</li>
              <li>Random physical verification of selected institutions</li>
              <li>Validation of submitted data against other public records</li>
            </ul>
            <p className="text-neutral-500 mt-4">
              False claims or misrepresentation of data can lead to disqualification from the ranking process.
            </p>
          </div>
        </div>
        
        {/* Weightage Chart */}
        <div className="bg-white p-6 rounded shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Parameter Weightages</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-secondary">
                  <th className="border border-neutral-200 px-4 py-2 text-left text-neutral-500">Parameter</th>
                  <th className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">Overall</th>
                  <th className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">Universities</th>
                  <th className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">Engineering</th>
                  <th className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">Management</th>
                  <th className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">Pharmacy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-neutral-200 px-4 py-2 text-neutral-500">Teaching, Learning & Resources (TLR)</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">30%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">30%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">30%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">30%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">30%</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="border border-neutral-200 px-4 py-2 text-neutral-500">Research and Professional Practice (RPC)</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">30%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">30%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">30%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">20%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">30%</td>
                </tr>
                <tr>
                  <td className="border border-neutral-200 px-4 py-2 text-neutral-500">Graduation Outcomes (GO)</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">20%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">20%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">20%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">25%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">20%</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="border border-neutral-200 px-4 py-2 text-neutral-500">Outreach and Inclusivity (OI)</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">10%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">10%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">10%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">10%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">10%</td>
                </tr>
                <tr>
                  <td className="border border-neutral-200 px-4 py-2 text-neutral-500">Perception (PR)</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">10%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">10%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">10%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">15%</td>
                  <td className="border border-neutral-200 px-4 py-2 text-center text-neutral-500">10%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-neutral-500 text-sm mt-4">
            Note: Weightages may vary slightly for other categories not shown in this table.
          </p>
        </div>
        
        {/* FAQ and Resources */}
        <div className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-xl font-semibold text-primary mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-neutral-700">How often are the NIRF rankings updated?</h3>
              <p className="text-neutral-500 mt-1">NIRF rankings are released annually, typically in the first half of the calendar year.</p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-700">Is participation in NIRF mandatory?</h3>
              <p className="text-neutral-500 mt-1">Participation is voluntary, but highly encouraged for all higher education institutions in India.</p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-700">How is data verified?</h3>
              <p className="text-neutral-500 mt-1">NIRF employs a multi-stage verification process including document validation and random on-site inspections.</p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-700">Can international universities participate?</h3>
              <p className="text-neutral-500 mt-1">NIRF is primarily designed for Indian institutions. International universities with Indian campuses may participate.</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-neutral-600">Resources</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-primary hover:underline">NIRF Handbook 2023</a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">Data Collection Format</a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">Technical Committee Reports</a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Methodology;
