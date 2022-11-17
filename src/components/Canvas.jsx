import React, { useEffect } from "react";

import { useStateContext } from "../contexts/StateContext";

const Canvas = ({ imgIndex, image }) => {
  const { selectedImg, setSelectedImg, allLogoProps } = useStateContext();
  const logoProps = allLogoProps[imgIndex];

  const renderImage = () => {
    const canvas = document.querySelector(`#canvas-${imgIndex}`);
    const ctx = document.querySelector(`#canvas-${imgIndex}`).getContext("2d");
    const image = document.querySelector(`#image-${imgIndex}`);
    const logo = document.querySelector("#logo");

    canvas.width = 720;

    if (image.naturalHeight > image.naturalWidth) {
      canvas.height = 1080;
    } else {
      canvas.height = 540;
    }

    ctx.clearRect(0, 0, 720, canvas.height);
    ctx.drawImage(image, 0, 0, 720, canvas.height);
    ctx.drawImage(
      logo,
      logoProps.logoX,
      logoProps.logoY,
      logoProps.logoSize,
      logoProps.logoSize
    );
  };

  useEffect(() => {
    const image = document.querySelector(`#image-${imgIndex}`);

    if (image.complete) {
      renderImage();
    } else {
      image.addEventListener("load", renderImage);
    }

    return () => image.removeEventListener("load", renderImage);
  }, [logoProps]);

  return (
    <>
      <canvas
        id={`canvas-${imgIndex}`}
        className={`w-full p-1 ${
          selectedImg === imgIndex ? "outline-dashed outline-black" : ""
        }`}
        onClick={() => setSelectedImg(imgIndex)}
      ></canvas>

      <img
        src={image}
        id={`image-${imgIndex}`}
        key={`image-${imgIndex}`}
        className="hidden"
      />
    </>
  );
};

export default Canvas;
