import React from "react";

import logoPic from "../assets/logo.jpg";
import Canvas from "./Canvas";
import { useStateContext } from "../contexts/StateContext";

const ImagePreview = () => {
  const { allImages } = useStateContext();

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 order-2">
        {allImages.map((image, index) => (
          <Canvas key={`canvas-${index}`} imgIndex={index} image={image} />
        ))}
      </div>

      <img src={logoPic} className="hidden" id="logo" />
    </>
  );
};

export default ImagePreview;
