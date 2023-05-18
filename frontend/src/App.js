import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import MemberUpdate from "./Pages/MemberUpdate";
import Event from "./Pages/Event";
import ImageUploader from "./Pages/UploadImage";
import FindPw from "./Pages/FindPw";
import FindId from "./Pages/FindId";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MemberUpdate" element={<MemberUpdate />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/UploadImage" elememt={<ImageUploader />} />
        <Route path="/FindId" element={<FindId />} />
        <Route path="/FindPw" element={<FindPw />} />
      </Routes>
    </Router>
  );
}

export default App;
