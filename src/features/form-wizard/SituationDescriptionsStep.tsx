import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Label } from '../../shared/ui/shadcn/label';
import { Textarea } from '../../shared/ui/shadcn/textarea';
import type { SituationDescriptions } from '../../entities/form-data/types';
import { AIAssistanceButton } from '../ai-assistance/AIAssistanceButton';
import { cn } from '../../shared/lib/cn';
import { ErrorMessage } from '../../shared/ui/ErrorMessage';

export const SituationDescriptionsStep: React.FC = () => {
  const { t } = useTranslation();
  const { register, formState: { errors }, setValue, watch } = useFormContext<SituationDescriptions>();

  const currentFinancialSituation = watch('currentFinancialSituation');
  const employmentCircumstances = watch('employmentCircumstances');
  const reasonForApplying = watch('reasonForApplying');

  const handleAIAssistance = (fieldName: keyof SituationDescriptions, suggestion: string) => {
    setValue(fieldName, suggestion);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Label htmlFor="currentFinancialSituation" className={cn("text-base font-semibold", errors.currentFinancialSituation && "text-destructive")}>
          {t('form.fields.currentFinancialSituation')} <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2 mb-2">
          <AIAssistanceButton
            fieldName={t('form.fields.currentFinancialSituation')}
            currentValue={currentFinancialSituation || ''}
            onAccept={(suggestion) => handleAIAssistance('currentFinancialSituation', suggestion)}
            context="Describe your current financial situation including income, expenses, debts, and any financial challenges you're facing."
          />
        </div>
        <Textarea
          id="currentFinancialSituation"
          rows={4}
          {...register('currentFinancialSituation')}
          className={cn(errors.currentFinancialSituation && "border-destructive focus-visible:ring-destructive")}
          placeholder="Describe your current financial situation..."
        />
        <ErrorMessage message={errors.currentFinancialSituation?.message} id="currentFinancialSituation-error" />
      </div>

      <div className="space-y-3">
        <Label htmlFor="employmentCircumstances" className={cn("text-base font-semibold", errors.employmentCircumstances && "text-destructive")}>
          {t('form.fields.employmentCircumstances')} <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2 mb-2">
          <AIAssistanceButton
            fieldName={t('form.fields.employmentCircumstances')}
            currentValue={employmentCircumstances || ''}
            onAccept={(suggestion) => handleAIAssistance('employmentCircumstances', suggestion)}
            context="Describe your employment circumstances including your job status, work history, any job losses, or difficulties finding employment."
          />
        </div>
        <Textarea
          id="employmentCircumstances"
          rows={4}
          {...register('employmentCircumstances')}
          className={cn(errors.employmentCircumstances && "border-destructive focus-visible:ring-destructive")}
          placeholder="Describe your employment circumstances..."
        />
        <ErrorMessage message={errors.employmentCircumstances?.message} id="employmentCircumstances-error" />
      </div>

      <div className="space-y-3">
        <Label htmlFor="reasonForApplying" className={cn("text-base font-semibold", errors.reasonForApplying && "text-destructive")}>
          {t('form.fields.reasonForApplying')} <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2 mb-2">
          <AIAssistanceButton
            fieldName={t('form.fields.reasonForApplying')}
            currentValue={reasonForApplying || ''}
            onAccept={(suggestion) => handleAIAssistance('reasonForApplying', suggestion)}
            context="Explain why you are applying for social support, what specific assistance you need, and how it would help your situation."
          />
        </div>
        <Textarea
          id="reasonForApplying"
          rows={4}
          {...register('reasonForApplying')}
          className={cn(errors.reasonForApplying && "border-destructive focus-visible:ring-destructive")}
          placeholder="Explain your reason for applying..."
        />
        <ErrorMessage message={errors.reasonForApplying?.message} id="reasonForApplying-error" />
      </div>
    </div>
  );
};