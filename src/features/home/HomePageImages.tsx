import React, { Fragment } from "react";
import { Carousel } from "react-bootstrap";
const HomePageImages = () => {
  const imageUrls: string[] = [
    "/imgs/profile_orig.jpg",
    "/imgs/crooked-tongue_orig.jpg",
    "/imgs/risers_orig.jpg",
  ];

  const renderImage = (url: string) => (
    <Carousel.Item key={url}>
      <img src={url} alt="img" className="d-block w-100" />
    </Carousel.Item>
  );

  return (
    <Fragment>
      <Carousel>{imageUrls.map(renderImage)}</Carousel>
    </Fragment>
  );
};

export default HomePageImages;
