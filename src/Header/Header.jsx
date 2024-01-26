import React from "react";
import styles from "./Header.module.css";
import { ReactComponent as AdmiralLogo } from "./admiral.svg";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Header() {
  const { i18n } = useTranslation();
  const initialLanguage = i18n.language || "mne";
  const [isMNE, setIsMNE] = useState(initialLanguage === "mne");

  const handleLanguageChange = () => {
    const newLanguage = isMNE ? "eng" : "mne";
    i18n.changeLanguage(newLanguage);

    setIsMNE((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <AdmiralLogo className={styles.logo} />
      <div onClick={handleLanguageChange}>
        {isMNE ? (
          <span className={styles.lang}>MNE</span>
        ) : (
          <span className={styles.lang}>ENG</span>
        )}
      </div>
    </header>
  );
}
