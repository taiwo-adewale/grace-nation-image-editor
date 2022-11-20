import React from "react";

import logoPic from "../assets/logo.jpg";
import Canvas from "./Canvas";

const ImagePreview = ({ allImages }) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 order-2">
        {allImages.map((image, index) => (
          <Canvas key={`canvas-${index}`} imgIndex={index} image={image} />
        ))}
      </div>

      <img src={logoPic} className="hidden" id="logo" />
    </>
  );
};

export default ImagePreview;
