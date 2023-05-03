import styled from "styled-components";

const FooterDesign = () => {

  const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    width: 100%;
    height: 350px;
    border-top: 1px solid rgb(223, 214, 210);
  `;
  const UpperBox = styled.div`
    width: 80%;
    height: 70px;
    margin: 25px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
    align-self: center;
  `;
  const NameBox = styled.div`
    width: 250px;
    height: 70px;
    display: flex;
    flex-direction: column;
    .firstLine {
      font-size: 1.3em;
      margin: 0;
    }
    .secondLine {
      font-size: .7em;
      margin-top: 5px;
    }
    .thirdLine {
      font-size: .8em;
      margin: 0;
    }
  `;
  const FooterButtonBox = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  align-self: flex-start;
  `;
  const FooterButton = styled.button`
  width: 150px;
  border:none;
  background: none;
  font-weight: bold;
  cursor: pointer;
  &:nth-child(1) {
    border-right: 1px solid rgb(223, 214, 210);
  }
  &:nth-child(2) {
    border-right: 1px solid rgb(223, 214, 210);
  }
  `;
  const SNSBox = styled.div`
    width: 250px;
    display: flex;
    justify-content: space-between;
  `;
  const SNSButton = styled.button`
    width: 50px;
    height: 50px;
    background: rgb(223, 214, 210);
    border-radius: 50%;
    border: none;
  `;
  const LowBox = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 80%;
    margin: 0 20px 0 20px;
    .lowBoxA {
      width: 80px;
      text-decoration: none;
    }
    .lowBoxSpan {

    }
  `;
  
  return (
    <FooterContainer>
      <UpperBox>
        <NameBox>
          <p className="firstLine">마쉴랭 제작소</p>
          <span className="secondLine">Tel: 02-0000-0000</span>
          <p className="thirdLine">고객센터 운영시간: 10:00 ~ 18:00, 일요일 휴무</p>
        </NameBox>
        <FooterButtonBox>
          <FooterButton>이용약관</FooterButton>
          <FooterButton>개인정보처리방침</FooterButton>
          <FooterButton>입점문의</FooterButton>
        </FooterButtonBox>
        <SNSBox>
          <SNSButton>블로그</SNSButton>
          <SNSButton>페이스북</SNSButton>
          <SNSButton>인스타그램</SNSButton>
          <SNSButton>트위터</SNSButton>
        </SNSBox>
      </UpperBox>
      <LowBox>
        <span className="lowBoxSpan">대표 : 이재욱</span>
        <span className="lowBoxSpan">사업자등록번호 : 620-81-58299</span>
        <a className="lowBoxA" href="/">사업자확인</a>
        <span className="lowBoxSpan">통신판매 신고번호: 2021-서울서초-2084</span>

      </LowBox>
    </FooterContainer>
  )
};
export default FooterDesign;