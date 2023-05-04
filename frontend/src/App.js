import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Pages/Main';
import MyPage from './Pages/MyPage';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/MyPage" element={<MyPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
