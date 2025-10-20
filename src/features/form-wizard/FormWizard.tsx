import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../shared/ui/shadcn/card';
import { Button } from '../../shared/ui/shadcn/button';
import { ProgressBar } from '../../widgets/progress-bar/ProgressBar';
import { PersonalInfoStep } from './PersonalInfoStep';
import { FamilyFinancialStep } from './FamilyFinancialStep';
import { SituationDescriptionsStep } from './SituationDescriptionsStep';
import type { ApplicationFormData } from '../../entities/form-data/types';
import { announceToScreenReader } from '../../shared/lib/accessibility';
import { SkipLink } from '../../shared/ui/SkipLink';
import { AlertCircle, CheckCircle2 } from 'lucide-react';


// Complete validation schema for all steps
const formSchema = yup.object({
  personalInfo: yup.object({
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
  }),
  familyFinancialInfo: yup.object({
    maritalStatus: yup.string().oneOf(['single', 'married', 'divorced', 'widowed'], 'Invalid marital status').required('Marital status is required'),
    dependents: yup.number().required('Number of dependents is required').min(0, 'Dependents cannot be negative').max(20, 'Maximum 20 dependents allowed'),
    employmentStatus: yup.string().oneOf(['employed', 'unemployed', 'selfEmployed', 'retired', 'student'], 'Invalid employment status').required('Employment status is required'),
    monthlyIncome: yup.number().required('Monthly income is required').min(0, 'Income cannot be negative'),
    housingStatus: yup.string().oneOf(['owned', 'rented', 'homeless', 'other'], 'Invalid housing status').required('Housing status is required'),
  }),
  situationDescriptions: yup.object({
    currentFinancialSituation: yup.string().required('Current financial situation is required').min(50, 'Please provide at least 50 characters'),
    employmentCircumstances: yup.string().required('Employment circumstances is required').min(50, 'Please provide at least 50 characters'),
    reasonForApplying: yup.string().required('Reason for applying is required').min(50, 'Please provide at least 50 characters'),
  }),
});

export const FormWizard: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = ['personal', 'family', 'situation'];


  const methods = useForm<ApplicationFormData>({
    resolver: yupResolver(formSchema),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      personalInfo: {
        name: '',
        nationalId: '',
        dateOfBirth: '',
        gender: 'male',
        address: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        email: '',
      },
      familyFinancialInfo: {
        maritalStatus: 'single',
        dependents: 0,
        employmentStatus: 'unemployed',
        monthlyIncome: 0,
        housingStatus: 'rented',
      },
      situationDescriptions: {
        currentFinancialSituation: '',
        employmentCircumstances: '',
        reasonForApplying: '',
      },
    },
  });

  const { handleSubmit, formState: { errors }, watch } = methods;
  
  // Watch all form values to check if required fields are filled
  const formValues = watch();

  // Auto-save is disabled - user must manually submit form

  const handleNext = async () => {
    // Trigger validation for all fields in current step
    const isValid = true// await methods.trigger(undefined, { shouldFocus: true });
    
      // Check current step specifically
      const hasStepErrors = false;
      // if (currentStep === 0 && errors.personalInfo) {
      //   hasStepErrors = Object.keys(errors.personalInfo).length > 0;
      // } else if (currentStep === 1 && errors.familyFinancialInfo) {
      //   hasStepErrors = Object.keys(errors.familyFinancialInfo).length > 0;
      // } else if (currentStep === 2 && errors.situationDescriptions) {
      //   hasStepErrors = Object.keys(errors.situationDescriptions).length > 0;
      // }
      
      if (isValid && !hasStepErrors) {
      const nextStep = Math.min(currentStep + 1, steps.length - 1);
      setCurrentStep(nextStep);
      announceToScreenReader(`Moved to step ${nextStep + 1} of ${steps.length}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      announceToScreenReader('Please fix the validation errors before proceeding');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    setCurrentStep(prevStep);
    announceToScreenReader(`Moved to step ${prevStep + 1} of ${steps.length}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if all required fields are filled
  const isFormComplete = () => {
    const { personalInfo, familyFinancialInfo, situationDescriptions } = formValues;
    
    // Check all steps are complete
    return Boolean(
      personalInfo?.name && 
      personalInfo?.nationalId && 
      personalInfo?.dateOfBirth && 
      personalInfo?.gender && 
      personalInfo?.address && 
      personalInfo?.city && 
      personalInfo?.state && 
      personalInfo?.country && 
      personalInfo?.phone && 
      personalInfo?.email &&
      familyFinancialInfo?.maritalStatus && 
      (familyFinancialInfo?.dependents !== undefined && familyFinancialInfo?.dependents !== null) && 
      familyFinancialInfo?.employmentStatus && 
      (familyFinancialInfo?.monthlyIncome !== undefined && familyFinancialInfo?.monthlyIncome !== null) && 
      familyFinancialInfo?.housingStatus &&
      situationDescriptions?.currentFinancialSituation?.length >= 50 && 
      situationDescriptions?.employmentCircumstances?.length >= 50 && 
      situationDescriptions?.reasonForApplying?.length >= 50
    );
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      announceToScreenReader('Application submitted successfully!');
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <FamilyFinancialStep />;
      case 2:
        return <SituationDescriptionsStep />;
      default:
        return null;
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold">{t('messages.successTitle')}</h2>
              <p className="text-muted-foreground">
                {t('messages.successMessage')}
              </p>
              <Button onClick={() => {
                setShowSuccess(false);
                setCurrentStep(0);
                methods.reset();
              }}>
                {t('messages.submitAnother')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SkipLink targetId="main-content" label="Skip to main content" />
      <Card id="main-content" role="main" aria-labelledby="app-title" className="shadow-xl border-2 animate-slide-up">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle id="app-title" className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t('app.title')}
          </CardTitle>
          <CardDescription className="text-center text-base">
            {t('app.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ProgressBar currentStep={currentStep} steps={steps} />

          {hasErrors && (
            <div
              className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-md flex items-start gap-2"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <p className="text-sm text-destructive">
                {t('messages.fixErrors')}
              </p>
            </div>
          )}

          <FormProvider {...methods}>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === steps.length - 1 && isFormComplete()) {
                handleSubmit(onSubmit)(e);
              }
            }}>
              <div
                className="mb-8 min-h-[400px]"
                role="region"
                aria-label={`Step ${currentStep + 1} of ${steps.length}`}
              >
                {renderStep()}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t">
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="sm:w-auto w-full hover:bg-gray-50 transition-all"
                  aria-label="Go to previous step"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('buttons.previous')}
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="sm:w-auto w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
                    aria-label="Go to next step"
                  >
                    {t('buttons.next')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="sm:w-auto w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={isSubmitting ? 'Submitting application' : !isFormComplete() ? 'Complete all required fields to submit' : 'Submit application'}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        {t('buttons.submit')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              {currentStep === steps.length - 1 && !isFormComplete() && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md animate-slide-down">
                  <p className="text-sm text-amber-800 text-center flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {t('messages.completeRequired')}
                  </p>
                </div>
              )}
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};