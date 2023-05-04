import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    pauseOnHover : true
  };
  const BannerContainer = styled.div`

  `;
  const StyledSlider = styled(Slider)`
    .slick-list {
      width: 100%;
      height: 300px;
      background: rgba(223, 214, 210);
      text-align: center;
    }
    .slick-slide div {
      outline: none;
      width: 100%;
    }
  `;
  const CardBox = styled.div`
    cursor: pointer;
  `;
  const CardImg = styled.img`
    width: 100%;
    height: 100%;
  `;  
  return (
    <BannerContainer>
      <StyledSlider {...settings}>
        <div><h3>배너1</h3></div>
        <div><h3>배너2</h3></div>
        <div><h3>배너3</h3></div>
        <div><h3>배너4</h3></div>
        <div><h3>배너5</h3></div>
        {/* {sliders.map(({name, image}) => {
          return (
            <CardBox>
              <CardImg src="{image}} alt=""/>
            </CardBox>
          );
        })} */}
      </StyledSlider>
    </BannerContainer>
  );
}
export default Banner;