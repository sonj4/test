import React from "react";
import styles from "./Input.module.css";
import { useState } from "react";
import { validateField } from "../validate";

export default function Input({ field }) {
  const [inputValue, setInputValue] = useState(field.defaultValue);
  const [isValid, setIsValid] = useState(
    field.code === "gender" ? true : false
  );
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (event) => {
    const { isValid, validationErrors } = validateField(
      event.target.value,
      field.validators,
      ""
    );
    setInputValue(event.target.value);
    setIsValid(isValid);
    setErrMsg(validationErrors.join("-"));
    console.log(event.target.value);
    console.log(isValid);
    console.log(validationErrors.join("-"));
  };

  const inputType =
    field.fieldType === "string"
      ? "text"
      : field.fieldType === "dropdown"
      ? "dropdown"
      : field.fieldType === "date"
      ? "date"
      : field.fieldType === "password"
      ? "password"
      : "";

  if (inputType === "dropdown") {
    const options = field.valueList.sort((a, b) => a.order - b.order);
    return (
      <>
        <label
          htmlFor={field.code}
          className={
            isValid
              ? `${styles.inputLabel} ${styles.valid}`
              : `${styles.inputLabel} ${styles.error}`
          }
        >
          {field.name}
        </label>
        <select
          name={field.code}
          id={field.code}
          required={field.required ? field.required : false}
          value={inputValue}
          onChange={(e) => handleChange(e)}
          className={
            isValid
              ? `${styles.selectField} ${styles.valid}`
              : `${styles.selectField} ${styles.error}`
          }
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
      </>
    );
  } else {
    return (
      <>
        <label
          htmlFor={field.code}
          className={
            isValid
              ? `${styles.inputLabel} ${styles.valid}`
              : `${styles.inputLabel} ${styles.error}`
          }
        >
          {field.name}
        </label>
        <input
          type={inputType}
          name={field.code}
          id={field.code}
          required={field.required ? field.required : false}
          value={inputValue}
          onChange={(e) => handleChange(e)}
          className={
            isValid
              ? `${styles.inputField} ${styles.valid}`
              : `${styles.inputField} ${styles.error}`
          }
        />
      </>
    );
  }
}
