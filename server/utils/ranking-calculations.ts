/**
 * NIRF Ranking Parameter Calculation Formulas
 * 
 * This file contains utility functions to calculate NIRF ranking parameters
 * based on the official NIRF methodology.
 * 
 * Source: NIRF Methodology Document
 */

// Types for raw input data
export interface InstitutionRawData {
  // Basic institution information
  name: string;
  state: string;
  type: string; // Public, Private, etc.
  establishedYear: number;
  
  // Faculty data
  facultyCount: number;
  facultyWithPhD: number;
  facultyExperience: number; // Average experience in years
  sanctionedFacultyPositions: number;
  
  // Student data
  totalStudents: number;
  femaleStudents: number;
  scStStudents: number; // SC/ST students
  economicallyBackwardStudents: number;
  physicallyHandicappedStudents: number;
  phDStudents: number;
  
  // Geographic diversity
  studentsFromOtherStates: number;
  studentsFromAbroadCount: number;
  
  // Research & Publications
  researchPublications: number;
  citationsCount: number;
  patentsFiled: number;
  patentsGranted: number;
  sponsoredResearchFunding: number; // in lakhs
  consultancyEarnings: number; // in lakhs
  
  // Placement & Higher Studies
  graduatesInHigherStudies: number;
  graduatesPlaced: number;
  medianSalary: number; // in lakhs per annum
  
  // Graduation metrics
  totalGraduates: number;
  graduatesInStipulatedTime: number;
  
  // Perceptual ranking
  peerPerceptionScore: number; // Usually collected through surveys
}

/**
 * Teaching, Learning & Resources (TLR) - 100 marks
 */

// SS: Student Strength including PhD Students - 20 marks
export function calculateSSScore(data: InstitutionRawData): number {
  // Formula considers total student strength with higher weight for PhD students
  const basicStrength = data.totalStudents * 0.8;
  const phdStrength = data.phDStudents * 1.5; // PhD students get 1.5x weight
  
  // Normalize to a score out of 20
  // The normalization factor may vary year to year based on highest values
  const normalizationFactor = 0.05; // Example factor
  
  return Math.min(20, (basicStrength + phdStrength) * normalizationFactor);
}

// FSR: Faculty-Student Ratio - 30 marks
export function calculateFSRScore(data: InstitutionRawData): number {
  // FSR = N/F where N is total students and F is faculty count
  const fsr = data.totalStudents / Math.max(1, data.facultyCount);
  
  // NIRF gives full 30 marks for FSR <= 15
  if (fsr <= 15) return 30;
  
  // Linearly decreasing score for FSR > 15
  if (fsr > 50) return 0; // No marks for FSR > 50
  
  // Linear interpolation between FSR 15 and 50
  return 30 * (1 - (fsr - 15) / 35);
}

// FQE: Faculty Qualification & Experience - 20 marks
export function calculateFQEScore(data: InstitutionRawData): number {
  // FQE considers % of faculty with PhD and average experience
  const phdPercentage = (data.facultyWithPhD / Math.max(1, data.facultyCount)) * 100;
  
  // PhD Qualification (15 marks max)
  let phdScore = 0;
  if (phdPercentage >= 95) phdScore = 15;
  else if (phdPercentage >= 75) phdScore = 10 + (phdPercentage - 75) * 0.2;
  else if (phdPercentage >= 50) phdScore = 5 + (phdPercentage - 50) * 0.2;
  else phdScore = phdPercentage * 0.1;
  
  // Experience (5 marks max)
  let expScore = 0;
  if (data.facultyExperience >= 15) expScore = 5;
  else if (data.facultyExperience >= 10) expScore = 3 + (data.facultyExperience - 10) * 0.4;
  else if (data.facultyExperience >= 5) expScore = 2 + (data.facultyExperience - 5) * 0.2;
  else expScore = data.facultyExperience * 0.4;
  
  return phdScore + expScore;
}

// FRU: Faculty Recruitment & Utilization - 30 marks
export function calculateFRUScore(data: InstitutionRawData): number {
  // Percentage of faculty positions filled
  const filledPositions = data.facultyCount / Math.max(1, data.sanctionedFacultyPositions) * 100;
  
  // Full marks for >= 95% positions filled
  if (filledPositions >= 95) return 30;
  
  // No marks for < 40% positions filled
  if (filledPositions < 40) return 0;
  
  // Linear interpolation for values in between
  return 30 * (filledPositions - 40) / 55;
}

/**
 * Research and Professional Practice (RPC) - 100 marks
 */

// PU: Publications - 35 marks
export function calculatePUScore(data: InstitutionRawData): number {
  // Publications per faculty
  const pubPerFaculty = data.researchPublications / Math.max(1, data.facultyCount);
  
  // Normalization based on the highest value across all institutions
  // This is usually calculated relative to the top performer
  const maxPubPerFaculty = 7; // Example value for normalization
  
  return Math.min(35, (pubPerFaculty / maxPubPerFaculty) * 35);
}

// QP: Quality of Publications - 40 marks
export function calculateQPScore(data: InstitutionRawData): number {
  // Citations per paper is a key metric for quality
  const citationsPerPaper = data.citationsCount / Math.max(1, data.researchPublications);
  
  // Normalization based on the highest value across all institutions
  const maxCitationsPerPaper = 15; // Example value
  
  return Math.min(40, (citationsPerPaper / maxCitationsPerPaper) * 40);
}

// IPR: IPR and Patents - 15 marks
export function calculateIPRScore(data: InstitutionRawData): number {
  // Patents filed and granted per faculty
  const patentsPerFaculty = (data.patentsFiled + 2 * data.patentsGranted) / 
                            Math.max(1, data.facultyCount);
  
  // Normalization factor
  const maxPatentsPerFaculty = 1; // Example value
  
  return Math.min(15, (patentsPerFaculty / maxPatentsPerFaculty) * 15);
}

// FPPP: Footprint of Projects & Professional Practice - 10 marks
export function calculateFPPPScore(data: InstitutionRawData): number {
  // Combined sponsored research and consultancy earnings per faculty (in lakhs)
  const earningsPerFaculty = (data.sponsoredResearchFunding + data.consultancyEarnings) / 
                              Math.max(1, data.facultyCount);
  
  // Normalization factor
  const maxEarningsPerFaculty = 10; // Example value in lakhs
  
  return Math.min(10, (earningsPerFaculty / maxEarningsPerFaculty) * 10);
}

/**
 * Graduation Outcomes (GO) - 100 marks
 */

// GPH: Graduation Performance - 40 marks
export function calculateGPHScore(data: InstitutionRawData): number {
  // Percentage of students graduating in stipulated time
  const graduationRate = data.graduatesInStipulatedTime / 
                         Math.max(1, data.totalGraduates) * 100;
  
  // Full marks for >= 95% graduation rate
  if (graduationRate >= 95) return 40;
  
  // No marks for < 50% graduation rate
  if (graduationRate < 50) return 0;
  
  // Linear interpolation for values in between
  return 40 * (graduationRate - 50) / 45;
}

// GUE: University Examinations - 15 marks
export function calculateGUEScore(data: InstitutionRawData): number {
  // This metric is often based on performance in university exams
  // Simplified formula as this depends on university-specific data
  
  // Assuming a normalization from 0-15 based on average performance
  // This is a placeholder and should be replaced with actual calculation logic
  return 15 * (data.graduatesInStipulatedTime / Math.max(1, data.totalGraduates));
}

// MS: Median Salary - 25 marks
export function calculateMSScore(data: InstitutionRawData): number {
  // Median salary in lakhs per annum
  const salary = data.medianSalary;
  
  // Normalization based on a reference value
  const referenceSalary = 8; // Example value in lakhs
  
  if (salary >= 2 * referenceSalary) return 25;
  if (salary <= 0.5 * referenceSalary) return 0;
  
  // Linear interpolation for values in between
  return 25 * (salary - 0.5 * referenceSalary) / (1.5 * referenceSalary);
}

// GPHD: Graduating Students in PhD - 20 marks
export function calculateGPHDScore(data: InstitutionRawData): number {
  // Percentage of PhD graduates to total graduates
  const phdGraduatePercentage = (data.phDStudents / Math.max(1, data.totalGraduates)) * 100;
  
  // Normalization based on a reference value
  const referencePercentage = 20; // Example value
  
  return Math.min(20, (phdGraduatePercentage / referencePercentage) * 20);
}

/**
 * Outreach and Inclusivity (OI) - 100 marks
 */

// RD: Regional Diversity - 30 marks
export function calculateRDScore(data: InstitutionRawData): number {
  // Percentage of students from other states and countries
  const diversityPercentage = ((data.studentsFromOtherStates + 2 * data.studentsFromAbroadCount) / 
                               Math.max(1, data.totalStudents)) * 100;
  
  // Full marks for >= 50% diversity
  if (diversityPercentage >= 50) return 30;
  
  // No marks for < 5% diversity
  if (diversityPercentage < 5) return 0;
  
  // Linear interpolation for values in between
  return 30 * (diversityPercentage - 5) / 45;
}

// WD: Women Diversity - 30 marks
export function calculateWDScore(data: InstitutionRawData): number {
  // Percentage of women students
  const womenPercentage = (data.femaleStudents / Math.max(1, data.totalStudents)) * 100;
  
  // Full marks for >= 50% women
  if (womenPercentage >= 50) return 30;
  
  // Minimum marks (5) for >= 10% women
  if (womenPercentage < 10) return 0;
  
  // Linear interpolation for values in between
  return 5 + 25 * (womenPercentage - 10) / 40;
}

// ESCS: Economically and Socially Challenged Students - 20 marks
export function calculateESCSScore(data: InstitutionRawData): number {
  // Percentage of SC/ST and economically backward students
  const escsPercentage = ((data.scStStudents + data.economicallyBackwardStudents) / 
                         Math.max(1, data.totalStudents)) * 100;
  
  // Full marks for >= 40% ESCS students
  if (escsPercentage >= 40) return 20;
  
  // No marks for < 5% ESCS students
  if (escsPercentage < 5) return 0;
  
  // Linear interpolation for values in between
  return 20 * (escsPercentage - 5) / 35;
}

// PCS: Facilities for Physically Challenged Students - 20 marks
export function calculatePCSScore(data: InstitutionRawData): number {
  // Percentage of physically handicapped students
  const pcsPercentage = (data.physicallyHandicappedStudents / 
                         Math.max(1, data.totalStudents)) * 100;
  
  // This is often combined with facilities availability assessment
  // Simplified scoring model
  if (pcsPercentage >= 3) return 20;
  if (pcsPercentage < 0.5) return 0;
  
  // Linear interpolation for values in between
  return 20 * (pcsPercentage - 0.5) / 2.5;
}

/**
 * Perception (PR) - 100 marks
 */

// PR: Perception - 100 marks
export function calculatePRScore(data: InstitutionRawData): number {
  // Perception is typically measured through surveys of employers, academics, etc.
  // The score is directly collected rather than calculated
  
  return data.peerPerceptionScore;
}

/**
 * Aggregate Score Calculations - 1000 marks total
 */

// Calculate TLR Score (Teaching, Learning & Resources) - 30% weight
export function calculateTLRScore(data: InstitutionRawData): number {
  const ss = calculateSSScore(data);
  const fsr = calculateFSRScore(data);
  const fqe = calculateFQEScore(data);
  const fru = calculateFRUScore(data);
  
  return ss + fsr + fqe + fru;
}

// Calculate RPC Score (Research and Professional Practice) - 30% weight
export function calculateRPCScore(data: InstitutionRawData): number {
  const pu = calculatePUScore(data);
  const qp = calculateQPScore(data);
  const ipr = calculateIPRScore(data);
  const fppp = calculateFPPPScore(data);
  
  return pu + qp + ipr + fppp;
}

// Calculate GO Score (Graduation Outcomes) - 20% weight
export function calculateGOScore(data: InstitutionRawData): number {
  const gph = calculateGPHScore(data);
  const gue = calculateGUEScore(data);
  const ms = calculateMSScore(data);
  const gphd = calculateGPHDScore(data);
  
  return gph + gue + ms + gphd;
}

// Calculate OI Score (Outreach and Inclusivity) - 10% weight
export function calculateOIScore(data: InstitutionRawData): number {
  const rd = calculateRDScore(data);
  const wd = calculateWDScore(data);
  const escs = calculateESCSScore(data);
  const pcs = calculatePCSScore(data);
  
  return rd + wd + escs + pcs;
}

// Calculate Overall Score - 1000 marks
export function calculateOverallScore(data: InstitutionRawData): number {
  const tlr = calculateTLRScore(data) * 3; // 30% weight (300 marks)
  const rpc = calculateRPCScore(data) * 3; // 30% weight (300 marks)
  const go = calculateGOScore(data) * 2;   // 20% weight (200 marks)
  const oi = calculateOIScore(data);       // 10% weight (100 marks)
  const pr = calculatePRScore(data);       // 10% weight (100 marks)
  
  return tlr + rpc + go + oi + pr;
}

// Calculate scores for rankings table (out of 100 each)
export function calculateRankingScores(data: InstitutionRawData) {
  return {
    ssScore: calculateSSScore(data),
    fsrScore: calculateFSRScore(data),
    fqeScore: calculateFQEScore(data),
    fruScore: calculateFRUScore(data),
    tlrScore: calculateTLRScore(data),
    
    puScore: calculatePUScore(data),
    qpScore: calculateQPScore(data),
    iprScore: calculateIPRScore(data),
    fpppScore: calculateFPPPScore(data),
    rpcScore: calculateRPCScore(data),
    
    gphScore: calculateGPHScore(data),
    gueScore: calculateGUEScore(data),
    msScore: calculateMSScore(data),
    gphdScore: calculateGPHDScore(data),
    goScore: calculateGOScore(data),
    
    rdScore: calculateRDScore(data),
    wdScore: calculateWDScore(data),
    escsScore: calculateESCSScore(data),
    pcsScore: calculatePCSScore(data),
    oiScore: calculateOIScore(data),
    
    prScore: calculatePRScore(data),
    
    totalScore: calculateOverallScore(data) / 10, // Overall score normalized to 100
  };
}