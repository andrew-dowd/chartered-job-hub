import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SavedJobs from "./pages/SavedJobs";
import PostJob from "./pages/PostJob";
import TalentNetwork from "./pages/TalentNetwork";
import FAQ from "./pages/FAQ";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/talent-network" element={<TalentNetwork />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;