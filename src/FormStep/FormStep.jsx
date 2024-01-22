import React from "react";
import styles from "./FormStep.module.css";
import Input from "../Input/Input";
import { useRegistrationData } from '../context';
import Button from "../Button/Button";

export default function FormStep({ fields, step, setStep, setSuccess }) {
  // console.log(fields);
  const {isStep1FormValid, isStep2FormValid} = useRegistrationData();
  const isNextDisabled = isStep1FormValid();
  const isSubmitDisabled = isStep2FormValid();
  //console.log("IS FORM VALID: ",isStep1FormValid())

  const handleSubmit = () => {
    setSuccess(true);
    console.log("submit")
  }
  
  return (
    <div className={styles.formStep}>
      <div className={styles.blurBackground}></div>
      <p className={styles.title}>
        REGISTER ON OUR WEBSITE!
      </p>
      <form>
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
      {step === 1 && <Button disabled={!isNextDisabled} onClick={() => setStep(2)}>Next</Button>}
      {step === 2 && <Button disabled={!isSubmitDisabled} onClick={() => handleSubmit()}>Submit</Button>}
    </div>
  );
}
