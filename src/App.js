import "./App.css";
import Header from "./Header/Header";
import { useEffect, useState } from "react";
import { RegistrationDataProvider } from "./context";
import FormStep from "./FormStep/FormStep";

function App() {
  const [data, setData] = useState({});

  const fetchJson = () => {
    fetch("./sampleData.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
  }, []);

  return (
    <RegistrationDataProvider>
      <div className="App">
        <Header />
        <FormStep fields={data.step1} />
      </div>
    </RegistrationDataProvider>
  );
}

export default App;
