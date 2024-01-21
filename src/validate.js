export const validateField = (value, validators, password) => {
  let isValid = true;
  let validationErrors = [];
  console.log(value);
  validators.forEach((validator) => {
    switch (validator.key) {
      case "minLength":
        if (value.length < validator.parameters.targetLength) {
          isValid = false;
          validationErrors.push(validator.invalid_message);
        }
        break;
      case "maxLength":
        if (value.length > validator.parameters.targetLength) {
          isValid = false;
          validationErrors.push(validator.invalid_message);
        }
        break;
      case "regex":
        const regex = new RegExp(
          validator.parameters.regex,
          validator.parameters.modifiers || ""
        );
        if (!regex.test(value)) {
          isValid = false;
          validationErrors.push(validator.invalid_message);
        }
        break;
      case "emailValidator":
        const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!EMAIL_REGEX.test(value)) {
          isValid = false;
          validationErrors.push(validator.invalid_message);
        }
        break;
      case "olderThan":
        let dateValue = new Date(value);

        const today = new Date();
        const age = today.getFullYear() - dateValue.getFullYear();
        const m = today.getMonth() - dateValue.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dateValue.getDate())) {
          age--;
        }

        if (age < validator.parameters.age) {
          isValid = false;
          validationErrors.push(validator.invalid_message);
        }
        break;
      case "passwordStrength":
        const PSWD_REGEX = new RegExp(validator.parameters.regex, "");
        if (!PSWD_REGEX.test(value)) {
          isValid = false;
          validationErrors.push(validator.invalid_message);
        }
        break;
      case "matchesField":
        if (value !== password) {
          isValid = false;
          validationErrors.push(validator.invalid_message);
        }
        break;
      case "length":
        if (value.length !== validator.parameters.targetLength) {
          isValid = false;
          validationErrors.push(validator.invalid_message);
        }
        break;
    }
  });

  return { isValid, validationErrors };
};
