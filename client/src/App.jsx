import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SectionSelector from "./components/SectionSelector";
import Quiz from "./components/Quiz";

const App = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            selectedSection ? (
              <Quiz section={selectedSection} />
            ) : (
              <SectionSelector onSelect={setSelectedSection} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
