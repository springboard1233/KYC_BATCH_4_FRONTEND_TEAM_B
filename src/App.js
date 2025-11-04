import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import DocumentUpload from "./pages/DocumentUpload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<DocumentUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
