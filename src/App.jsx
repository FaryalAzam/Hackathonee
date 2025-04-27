import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/pages/Signup'; // ✅ correct
import Login from './components/pages/Login';   // ✅ correct
import Dashboard from './components/pages/Dashboard'; // ✅ correct
import { useAuth } from './context/AuthContext'; // ✅ correct

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={!currentUser ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
