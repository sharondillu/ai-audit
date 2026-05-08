import "./ResultCard.css";

function ResultCard({ result }) {
 /*if (!result) return null;*/

 return (
   <div className="result-container">

     <div className="result-card">
      {!result?(
        <p style={{color:"#a1a1aa"}}>Run Audit to see Results</p>
      ):(
        <>
      

       <h2>Total Savings</h2>

       <h1>${result.monthlySavings}/month</h1>
       <p>${result.annualSavings}/year</p>

       <div className="breakdown">

         <h3>Breakdown</h3>

         {result.breakdown.map((item, index) => (
           <div key={index} className="breakdown-item">

             <div>
               <strong>{item.tool}</strong>
               <p>{item.recommendation}</p>
             </div>

             <div className="savings">
               ${item.savings}
             </div>

           </div>
           
         ))}

       </div>
         </>
      )}
     </div>

   </div>
 );
}

export default ResultCard;