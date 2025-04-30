import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Calculator = () => {
  const [scores, setScores] = useState({});

  const handleInputChange = (param, subParam, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [param]: {
        ...prevScores[param],
        [subParam]: value,
      },
    }));
  };

  const renderInputField = (param, subParam, inputs) => (
    <AccordionItem value={subParam} key={subParam}>
      <AccordionTrigger>{subParam}</AccordionTrigger>
      <AccordionContent>
        {inputs.map((input) => (
          <div key={input} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{input}</label>
            <Input
              type="number"
              onChange={(e) => handleInputChange(param, subParam, { ...scores[param]?.[subParam], [input]: e.target.value })}
              className="w-full"
            />
          </div>
        ))}
        <div className="mt-4 text-sm font-medium text-primary">
          Score: {scores[param]?.[subParam]?.score || "Not calculated yet"}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  const parameters = {
    TLR: {
      "Student Strength (SS)": ["Total sanctioned Intake", "Total Student Strength", "Number of PHD students"],
      "Faculty Student Ratio (FSR)": ["Number of regular Faculty", "Total Student strength"],
      "Faculty Qualifications (FQE)": [
        "Total Regular Faculty",
        "Faculty with Ph. D",
        "Faculty with less than 8 Years experience",
        "Faculty with 8-15 year experience",
        "Faculty with greater than 15 years experience",
      ],
      "Financial Resource Utilization (FRU)": [
        "Total Annual Expenditure",
        "Average annual capital expenditure per student",
        "Average annual Operational expenditure per student",
      ],
    },
    RP: {
      "Publication (PU)": ["Number of publications", "Total Number of faculty"],
      "Quality of publications (QP)": [
        "Total Citation count",
        "Top 25 percentile citations",
        "Publications",
        "Faculty Ratio",
      ],
      "Intellectual Property Rights (IPR)": ["Patents granted", "Patents published"],
      "Footprints of projects and professional practice (FPPP)": [
        "Average Research Funding",
        "Average Consultancy Funding",
        "Average Executive Program Earnings",
      ],
    },
    GO: {
      "Placements and Higher Studies (GPH)": [
        "Total Graduating Students",
        "Graduating Students placed",
        "Graduating students Opted for Higher studies",
      ],
      "Metric for University Examinations (GUE)": [
        "Total Students",
        "Number of students passed",
        "Fraction of students Passed",
      ],
      "Median Salary (MS)": ["Average Salary", "Placement Percentile"],
      "PHD Graduation (GPHD)": ["Average Number of PHD students Graduated"],
    },
    OI: {
      "Regional Diversity (RD)": ["Total Students", "Students from Other State", "Students from Other countries"],
      "Women Diversity (WD)": [
        "Total Number of students",
        "Number of Women Students",
        "Total Number of Faculty",
        "Number of Women Faculty",
      ],
      "Economically and socially challenged (ESCS)": [
        "Total Number of UG Students",
        "Number of UG Students provided Fee reimbursement",
      ],
      "Perception Ranking (PR)": [],
    },
  };

  return (
    <div className="mt-8">
      {Object.entries(parameters).map(([param, subParams]) => (
        <div key={param} className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-4">{param}</h2>
          <Accordion type="single" collapsible>
            {Object.entries(subParams).map(([subParam, inputs]) =>
              renderInputField(param, subParam, inputs)
            )}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default Calculator;
