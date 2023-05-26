import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SbtiBox = styled.button`
  position: fixed;
  top: 80%;
  left: 3%;
  transform: translateY(-40%);

  font-weight: bold;
  width: 120px;
  height: 300p;
  background: rgb(223, 214, 210);
  color: #404949;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const SideBox = () => {
  const navigate = useNavigate();

  return (
    <SbtiBox onClick={() => navigate("/SBTIMain")}>
      <p>지금 당장</p>
      <p>SBTI</p>
      <p>검사하러 가기</p>
    </SbtiBox>
  );
};
export default SideBox;
