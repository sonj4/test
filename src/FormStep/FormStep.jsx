import React from "react";
import styles from "./FormStep.module.css";
import Input from "../Input/Input";

export default function FormStep({ fields }) {
  console.log(fields);
  return (
    <div className={styles.formStep}>
      <div className={styles.blurBackground}></div>
      <form>
        {Array.isArray(fields) &&
          fields.map((field) => {
            return (
              <Input
                key={field.code ? field.code : Math.random()}
                field={field}
              />
            );
          })}
      </form>
    </div>
  );
}
