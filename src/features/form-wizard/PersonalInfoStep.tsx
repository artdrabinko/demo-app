import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '../../shared/ui/shadcn/input';
import { Label } from '../../shared/ui/shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../shared/ui/shadcn/select';
import type { PersonalInfo } from '../../entities/form-data/types';
import { cn } from '../../shared/lib/cn';
import { ErrorMessage } from '../../shared/ui/ErrorMessage';

export const PersonalInfoStep: React.FC = () => {
  const { t } = useTranslation();
  const { register, formState: { errors }, setValue, watch } = useFormContext<PersonalInfo>();

  const gender = watch('gender');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className={cn(errors.name && "text-destructive")}>
            {t('form.fields.name')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            {...register('name')}
            className={cn(errors.name && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          <ErrorMessage message={errors.name?.message} id="name-error" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationalId" className={cn(errors.nationalId && "text-destructive")}>
            {t('form.fields.nationalId')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nationalId"
            {...register('nationalId')}
            className={cn(errors.nationalId && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={!!errors.nationalId}
            aria-describedby={errors.nationalId ? 'nationalId-error' : undefined}
          />
          <ErrorMessage message={errors.nationalId?.message} id="nationalId-error" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className={cn(errors.dateOfBirth && "text-destructive")}>
            {t('form.fields.dateOfBirth')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            className={cn(errors.dateOfBirth && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={!!errors.dateOfBirth}
            aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
          />
          <ErrorMessage message={errors.dateOfBirth?.message} id="dateOfBirth-error" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className={cn(errors.gender && "text-destructive")}>
            {t('form.fields.gender')} <span className="text-destructive">*</span>
          </Label>
          <Select value={gender} onValueChange={(value) => setValue('gender', value as 'male' | 'female' | 'other')}>
            <SelectTrigger 
              id="gender"
              className={cn(errors.gender && "border-destructive focus:ring-destructive")}
              aria-invalid={!!errors.gender}
              aria-describedby={errors.gender ? 'gender-error' : undefined}
            >
              <SelectValue placeholder={t('form.fields.gender')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t('form.genders.male')}</SelectItem>
              <SelectItem value="female">{t('form.genders.female')}</SelectItem>
              <SelectItem value="other">{t('form.genders.other')}</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage message={errors.gender?.message} id="gender-error" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className={cn(errors.address && "text-destructive")}>
          {t('form.fields.address')} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="address"
          {...register('address')}
          className={cn(errors.address && "border-destructive focus-visible:ring-destructive")}
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
        />
        <ErrorMessage message={errors.address?.message} id="address-error" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className={cn(errors.city && "text-destructive")}>
            {t('form.fields.city')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            {...register('city')}
            className={cn(errors.city && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'city-error' : undefined}
          />
          <ErrorMessage message={errors.city?.message} id="city-error" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state" className={cn(errors.state && "text-destructive")}>
            {t('form.fields.state')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="state"
            {...register('state')}
            className={cn(errors.state && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={!!errors.state}
            aria-describedby={errors.state ? 'state-error' : undefined}
          />
          <ErrorMessage message={errors.state?.message} id="state-error" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className={cn(errors.country && "text-destructive")}>
            {t('form.fields.country')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="country"
            {...register('country')}
            className={cn(errors.country && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? 'country-error' : undefined}
          />
          <ErrorMessage message={errors.country?.message} id="country-error" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className={cn(errors.phone && "text-destructive")}>
            {t('form.fields.phone')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            className={cn(errors.phone && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          <ErrorMessage message={errors.phone?.message} id="phone-error" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className={cn(errors.email && "text-destructive")}>
            {t('form.fields.email')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className={cn(errors.email && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          <ErrorMessage message={errors.email?.message} id="email-error" />
        </div>
      </div>
    </div>
  );
};