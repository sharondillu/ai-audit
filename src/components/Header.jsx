import "./Header.css";

export default function Header() {
 return (
   <header className="header">
     <div className="header-container">
       <h1 className="logo">
         SpendWise <span>AI</span>
       </h1>

       <p className="tagline">
        Instantly audit your AI Tool spending and uncover hidden savings
       </p>
     </div>
   </header>
 );
}