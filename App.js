import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import LoginPage from './Login';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
