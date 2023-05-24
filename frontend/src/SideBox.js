import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ImgBox = styled.button`
  position: fixed;
  top: 60%;
  right: 10%;
  transform: translateY(-40%);
  
  font-weight: bold;
  width: 120px;
  height: 300p;
  color: red;
  background-color: white;
  border: 3px solid brown;
  cursor: pointer;

`;

const SideBox = () => {
  const navigate = useNavigate();

  return(
    <ImgBox onClick={() => navigate("/SBTIMain")}>
      <p>지금 당장</p>
      <p>SBTI</p>
      <p>검사하러 가기</p>
    </ImgBox>
  );
};
export default SideBox;