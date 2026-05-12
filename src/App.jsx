// src/App.jsx

import { useState } from "react";

import Header from "./components/Header";
import AuditForm from "./components/AuditForm";
import ResultCard from "./components/ResultCard";
import {generateAudit} from "./utils/auditEngine";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ReportPage from "./pages/ReportPage";


/* =========================
  APP
========================= */

function MainApp() {
 const [result, setResult] = useState(null);
const [formData, setFormData] = useState(null);


 const handleAudit = (data) => {
   const res = generateAudit(data);
   setResult(res);
   setFormData(data);
 };

 return (
   <div className="app-container">
     <Header />
     <div className="main-content">
     <AuditForm onAudit={handleAudit} />
     <ResultCard result={result}formData={formData} />
    

   </div></div>
 );
}
function App(){
  return(
   
 <Routes>
   <Route path="/" element={<MainApp />} />
   <Route path="/report/:id" element={<ReportPage />} />
 </Routes>

  )
}

export default App;
