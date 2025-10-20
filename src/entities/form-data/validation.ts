import * as yup from 'yup';
import type { PersonalInfo, FamilyFinancialInfo, SituationDescriptions } from './types';

export const personalInfoSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  nationalId: yup.string().required('National ID is required').matches(/^\d{9,12}$/, 'Invalid National ID format'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Gender is required'),
  address: yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  phone: yup.string().required('Phone is required').matches(/^[+]?[1-9][\d]{0,15}$/, 'Invalid phone number'),
  email: yup.string().required('Email is required').email('Invalid email format'),
});

export const familyFinancialInfoSchema = yup.object({
  maritalStatus: yup.string().oneOf(['single', 'married', 'divorced', 'widowed'], 'Invalid marital status').required('Marital status is required'),
  dependents: yup.number().required('Number of dependents is required').min(0, 'Dependents cannot be negative').max(20, 'Maximum 20 dependents allowed'),
  employmentStatus: yup.string().oneOf(['employed', 'unemployed', 'selfEmployed', 'retired', 'student'], 'Invalid employment status').required('Employment status is required'),
  monthlyIncome: yup.number().required('Monthly income is required').min(0, 'Income cannot be negative'),
  housingStatus: yup.string().oneOf(['owned', 'rented', 'homeless', 'other'], 'Invalid housing status').required('Housing status is required'),
});

export const situationDescriptionsSchema = yup.object({
  currentFinancialSituation: yup.string().required('Current financial situation is required').min(50, 'Please provide at least 50 characters'),
  employmentCircumstances: yup.string().required('Employment circumstances is required').min(50, 'Please provide at least 50 characters'),
  reasonForApplying: yup.string().required('Reason for applying is required').min(50, 'Please provide at least 50 characters'),
});

export const validatePersonalInfo = async (data: Partial<PersonalInfo>) => {
  try {
    await personalInfoSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};

export const validateFamilyFinancialInfo = async (data: Partial<FamilyFinancialInfo>) => {
  try {
    await familyFinancialInfoSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};

export const validateSituationDescriptions = async (data: Partial<SituationDescriptions>) => {
  try {
    await situationDescriptionsSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};
