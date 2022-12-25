import React, { useEffect } from "react";

const Canvas = ({ imgIndex, imageSrc }) => {
  const renderImage = () => {
    const canvas = document.querySelector(`#canvas-${imgIndex}`);
    const ctx = document.querySelector(`#canvas-${imgIndex}`).getContext("2d");
    const image = document.querySelector(`#image-${imgIndex}`);
    const logo = document.querySelector("#logo");

    const imageNaturalWidth = image.naturalWidth;
    const imageNaturalHeight = image.naturalHeight;

    if (imageNaturalWidth <= imageNaturalHeight) {
      var logoSize = imageNaturalWidth * 0.12;
    } else {
      var logoSize = imageNaturalHeight * 0.12;
    }

    canvas.width = imageNaturalWidth;
    canvas.height = imageNaturalHeight;

    ctx.clearRect(0, 0, imageNaturalWidth, imageNaturalHeight);
    ctx.drawImage(image, 0, 0, imageNaturalWidth, imageNaturalHeight);
    ctx.drawImage(logo, 10, 10, logoSize, logoSize);
  };

  useEffect(() => {
    const image = document.querySelector(`#image-${imgIndex}`);

    if (image.complete) {
      renderImage();
    } else {
      image.addEventListener("load", renderImage);
    }

    return () => image.removeEventListener("load", renderImage);
  }, []);

  return (
    <>
      <canvas
        id={`canvas-${imgIndex}`}
        className="w-full bg-gray-300"
        width={100}
        height={100}
      ></canvas>

      <img
        src={imageSrc}
        id={`image-${imgIndex}`}
        key={`image-${imgIndex}`}
        className="hidden"
      />
    </>
  );
};

export default Canvas;
