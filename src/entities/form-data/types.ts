export type Gender = 'male' | 'female' | 'other';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type EmploymentStatus = 'employed' | 'unemployed' | 'selfEmployed' | 'retired' | 'student';
export type HousingStatus = 'owned' | 'rented' | 'homeless' | 'other';

export interface PersonalInfo {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

export interface FamilyFinancialInfo {
  maritalStatus: MaritalStatus;
  dependents: number;
  employmentStatus: EmploymentStatus;
  monthlyIncome: number;
  housingStatus: HousingStatus;
}

export interface SituationDescriptions {
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export interface ApplicationFormData {
  personalInfo: PersonalInfo;
  familyFinancialInfo: FamilyFinancialInfo;
  situationDescriptions: SituationDescriptions;
}

export interface FormStep {
  step: number;
  title: string;
  isCompleted: boolean;
  isValid: boolean;
}

export interface AIAssistanceState {
  isGenerating: boolean;
  suggestion: string | null;
  error: string | null;
  fieldName: string | null;
}
