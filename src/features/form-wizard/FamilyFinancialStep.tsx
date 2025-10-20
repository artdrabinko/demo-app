import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '../../shared/ui/shadcn/input';
import { Label } from '../../shared/ui/shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../shared/ui/shadcn/select';
import type { FamilyFinancialInfo } from '../../entities/form-data/types';
import { cn } from '../../shared/lib/cn';
import { ErrorMessage } from '../../shared/ui/ErrorMessage';

export const FamilyFinancialStep: React.FC = () => {
  const { t } = useTranslation();
  const { register, formState: { errors }, setValue, watch } = useFormContext<FamilyFinancialInfo>();

  const maritalStatus = watch('maritalStatus');
  const employmentStatus = watch('employmentStatus');
  const housingStatus = watch('housingStatus');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maritalStatus" className={cn(errors.maritalStatus && "text-destructive")}>
            {t('form.fields.maritalStatus')} <span className="text-destructive">*</span>
          </Label>
          <Select value={maritalStatus} onValueChange={(value) => setValue('maritalStatus', value as 'single' | 'married' | 'divorced' | 'widowed')}>
            <SelectTrigger 
              id="maritalStatus"
              className={cn(errors.maritalStatus && "border-destructive focus:ring-destructive")}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">{t('form.maritalStatuses.single')}</SelectItem>
              <SelectItem value="married">{t('form.maritalStatuses.married')}</SelectItem>
              <SelectItem value="divorced">{t('form.maritalStatuses.divorced')}</SelectItem>
              <SelectItem value="widowed">{t('form.maritalStatuses.widowed')}</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage message={errors.maritalStatus?.message} id="maritalStatus-error" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dependents" className={cn(errors.dependents && "text-destructive")}>
            {t('form.fields.dependents')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dependents"
            type="number"
            {...register('dependents', { valueAsNumber: true })}
            className={cn(errors.dependents && "border-destructive focus-visible:ring-destructive")}
          />
          <ErrorMessage message={errors.dependents?.message} id="dependents-error" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employmentStatus" className={cn(errors.employmentStatus && "text-destructive")}>
            {t('form.fields.employmentStatus')} <span className="text-destructive">*</span>
          </Label>
          <Select value={employmentStatus} onValueChange={(value) => setValue('employmentStatus', value as 'employed' | 'unemployed' | 'selfEmployed' | 'retired' | 'student')}>
            <SelectTrigger 
              id="employmentStatus"
              className={cn(errors.employmentStatus && "border-destructive focus:ring-destructive")}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">{t('form.employmentStatuses.employed')}</SelectItem>
              <SelectItem value="unemployed">{t('form.employmentStatuses.unemployed')}</SelectItem>
              <SelectItem value="selfEmployed">{t('form.employmentStatuses.selfEmployed')}</SelectItem>
              <SelectItem value="retired">{t('form.employmentStatuses.retired')}</SelectItem>
              <SelectItem value="student">{t('form.employmentStatuses.student')}</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage message={errors.employmentStatus?.message} id="employmentStatus-error" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyIncome" className={cn(errors.monthlyIncome && "text-destructive")}>
            {t('form.fields.monthlyIncome')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="monthlyIncome"
            type="number"
            step="0.01"
            {...register('monthlyIncome', { valueAsNumber: true })}
            className={cn(errors.monthlyIncome && "border-destructive focus-visible:ring-destructive")}
          />
          <ErrorMessage message={errors.monthlyIncome?.message} id="monthlyIncome-error" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="housingStatus" className={cn(errors.housingStatus && "text-destructive")}>
          {t('form.fields.housingStatus')} <span className="text-destructive">*</span>
        </Label>
        <Select value={housingStatus} onValueChange={(value) => setValue('housingStatus', value as 'owned' | 'rented' | 'homeless' | 'other')}>
          <SelectTrigger 
            id="housingStatus"
            className={cn(errors.housingStatus && "border-destructive focus:ring-destructive")}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owned">{t('form.housingStatuses.owned')}</SelectItem>
            <SelectItem value="rented">{t('form.housingStatuses.rented')}</SelectItem>
            <SelectItem value="homeless">{t('form.housingStatuses.homeless')}</SelectItem>
            <SelectItem value="other">{t('form.housingStatuses.other')}</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage message={errors.housingStatus?.message} id="housingStatus-error" />
      </div>
    </div>
  );
};