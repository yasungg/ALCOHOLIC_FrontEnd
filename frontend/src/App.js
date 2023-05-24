import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import MemberUpdate from "./Pages/MemberUpdate";
import Event from "./Pages/Event";
import ImageUploader from "./component/UploadImage";
import FindPw from "./Pages/FindPw";
import FindId from "./Pages/FindId";
import RecmdPage from "./Pages/RecmdPage";
import Product from "./Pages/Product";
import UserStore from "./api/Context";
import ProductSearch from "./component/ProductSearch";
import SBTIMain from "./Pages/SBTIMain";
import SBTIStartQuestion1 from "./Pages/SBTIpages/SBTIStartQuestion1";
import SBTIStartQuestion2 from "./Pages/SBTIpages/SBTIStartQuestion2";
import SBTI1 from "./Pages/SBTIpages/SBTI1";
import SBTI2 from "./Pages/SBTIpages/SBTI2";
import SBTI3 from "./Pages/SBTIpages/SBTI3";
import SBTI4 from "./Pages/SBTIpages/SBTI4";
import SBTI5 from "./Pages/SBTIpages/SBTI5";
import SBTI6 from "./Pages/SBTIpages/SBTI6";
import SBTI7 from "./Pages/SBTIpages/SBTI7";
import SBTI8 from "./Pages/SBTIpages/SBTI8";
import SBTI9 from "./Pages/SBTIpages/SBTI9";
import SBTI10 from "./Pages/SBTIpages/SBTI10";
import SBTI11 from "./Pages/SBTIpages/SBTI11";
import SBTI12 from "./Pages/SBTIpages/SBTI12";
import SBTI13 from "./Pages/SBTIpages/SBTI13";
import SBTI14 from "./Pages/SBTIpages/SBTI14";
import SBTI15 from "./Pages/SBTIpages/SBTI15";
import SBTI16 from "./Pages/SBTIpages/SBTI16";
import SBTI17 from "./Pages/SBTIpages/SBTI17";
import SBTI18 from "./Pages/SBTIpages/SBTI18";
import SBTI19 from "./Pages/SBTIpages/SBTI19";
import SBTI20 from "./Pages/SBTIpages/SBTI20";
import SBTIResult from "./Pages/SBTIResult";
import DrinkofMonth from "./Pages/DrinkofMonth";

function App() {
  return (
    <UserStore>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/ProductSearch/:sword" element={<ProductSearch />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/MemberUpdate" element={<MemberUpdate />} />
          <Route path="/Event" element={<Event />} />
          <Route path="/UploadImage" elememt={<ImageUploader />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPw" element={<FindPw />} />
          <Route path="/RecmdPage" element={<RecmdPage />} />
          <Route path="/Product/:product_no" element={<Product />} />
          <Route path="/SBTIMain" element={<SBTIMain />} />
          <Route path="/SBTIStartQuestion1" element={<SBTIStartQuestion1 />} />
          <Route path="/SBTIStartQuestion2" element={<SBTIStartQuestion2 />} />
          <Route path="/SBTI1" element={<SBTI1 />} />
          <Route path="/SBTI2" element={<SBTI2 />} />
          <Route path="/SBTI3" element={<SBTI3 />} />
          <Route path="/SBTI4" element={<SBTI4 />} />
          <Route path="/SBTI5" element={<SBTI5 />} />
          <Route path="/SBTI6" element={<SBTI6 />} />
          <Route path="/SBTI7" element={<SBTI7 />} />
          <Route path="/SBTI8" element={<SBTI8 />} />
          <Route path="/SBTI9" element={<SBTI9 />} />
          <Route path="/SBTI10" element={<SBTI10 />} />
          <Route path="/SBTI11" element={<SBTI11 />} />
          <Route path="/SBTI12" element={<SBTI12 />} />
          <Route path="/SBTI13" element={<SBTI13 />} />
          <Route path="/SBTI14" element={<SBTI14 />} />
          <Route path="/SBTI15" element={<SBTI15 />} />
          <Route path="/SBTI16" element={<SBTI16 />} />
          <Route path="/SBTI17" element={<SBTI17 />} />
          <Route path="/SBTI18" element={<SBTI18 />} />
          <Route path="/SBTI19" element={<SBTI19 />} />
          <Route path="/SBTI20" element={<SBTI20 />} />
          <Route path="/SBTIResult" element={<SBTIResult />} />
          <Route path="/drinkofmonth" element={<DrinkofMonth />} />
        </Routes>
      </Router>
    </UserStore>
  );
}

export default App;
