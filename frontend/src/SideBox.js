import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SbtiBox = styled.button`
  position: fixed;
  top: 60%;
  right: 3%;
  transform: translateY(-40%);
  
  font-weight: bold;
  width: 120px;
  height: 300p;
  background-color: beige;
  color: brown;
  border: 3px solid brown;
  cursor: pointer;

`;

const SideBox = () => {
  const navigate = useNavigate();

  return(
    <SbtiBox onClick={() => navigate("/SBTIMain")}>
      <p>지금 당장</p>
      <p>SBTI</p>
      <p>검사하러 가기</p>
    </SbtiBox>
  );
};
export default SideBox;