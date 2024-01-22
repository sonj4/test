import "./App.css";
import Header from "./Header/Header";
import { useEffect, useState } from "react";
import { RegistrationDataProvider } from "./context";
import FormStep from "./FormStep/FormStep";

import Confetti from 'react-confetti'

function App() {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const fetchJson = () => {  
    fetch("./sampleData.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
       // console.log(data);
        const sortedByOrder = data.fields.sort((a, b) => a.order - b.order);
        const step1Fields = sortedByOrder.filter((field) => field.step === 1);
        const step2Fields = sortedByOrder.filter((field) => field.step === 2);
        setData({ step1: step1Fields, step2: step2Fields });
      })
      .catch(() => {
        console.log("Error fetching JSON");
      });
  };

  
  useEffect(() => {
    fetchJson();
console.log(success)
    // if (success) {
    //   const handleScreenClick = () => setSuccess(false);
    //   window.addEventListener('click', handleScreenClick);

    //   return () => window.removeEventListener('click', handleScreenClick);
    // }
  }, [success]);

  if (!data) {
    return <div>Loading...</div>; 
  }

  return (
   <RegistrationDataProvider initialData={data}>
      <div className="App">
        <Header />
        {success && <Confetti width={width} height={height}/>}
        {step === 1 && <FormStep fields={data.step1} step={step} setStep={setStep}/>}
        {step === 2 && <FormStep fields={data.step2} step={step} setStep={setStep} setSuccess={setSuccess}/>}
      </div>
    </RegistrationDataProvider>
  );
}

export default App;
