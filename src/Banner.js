import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { storage } from "./api/firebase";
import { ref, getDownloadURL } from "firebase/storage";

const Banner = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const storageRef = ref(storage, "images");

    Promise.all([
      getDownloadURL(ref(storageRef, "Banner1.png")),
      getDownloadURL(ref(storageRef, "Banner2.png")),
      getDownloadURL(ref(storageRef, "main_bnr.jpg")),
    ])
      .then((urls) => {
        setImageUrls(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    pauseOnHover: true,
  };
  const BannerContainer = styled.div``;
  const StyledSlider = styled(Slider)`
    .slick-list {
      width: 100%;
      height: 300px;
      text-align: center;
    }
    .slick-slide div {
      outline: none;
      width: 100%;
    }
    .slick-prev {
      position: absolute;
      top: 50%;
      z-index: 9;
      left: 45px;
    }
    .slick-next {
      position: absolute;
      top: 50%;
      z-index: 9;
      right: 45px;
    }
  `;
  const CardBox = styled.div`
    cursor: pointer;
  `;
  const CardImg = styled.img`
    width: 100%;
    height: 300px;
  `;
  return (
    <BannerContainer>
      <StyledSlider {...settings}>
        {imageUrls.map((url) => (
          <CardBox key={url}>
            <CardImg src={url} alt="Banner" />
          </CardBox>
        ))}
      </StyledSlider>
    </BannerContainer>
  );
};
export default Banner;
