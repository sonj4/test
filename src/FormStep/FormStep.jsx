import React from 'react';
import styles from './FormStep.module.css';
import Input from '../Input/Input';
import { useRegistrationData } from '../context';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

export default function FormStep({ fields, step, setStep, setSuccess }) {
  const { isStep1FormValid, isStep2FormValid } = useRegistrationData();
  const isNextDisabled = isStep1FormValid();
  const isSubmitDisabled = isStep2FormValid();

  const handleSubmit = () => {
    setSuccess(true);
  };

  const { t } = useTranslation();

  return (
    <div className={styles.formStep}>
      <div className={styles.blurBackground}></div>
      <p className={styles.title}>{t('title')}</p>
      <form >
        {Array.isArray(fields) &&
          fields.map((field) => {
            return (
              <Input
                key={field.code ? field.code : Math.random()}
                field={field}
                step={step}
              />
            );
          })}
      </form>
      {step === 1 && (
        <Button disabled={!isNextDisabled} onClick={() => setStep(2)}>
          {t('next')}
        </Button>
      )}
      {step === 2 && (
        <Button disabled={!isSubmitDisabled} onClick={() => handleSubmit()}>
          {t('submit')}
        </Button>
      )}
    </div>
  );
}
