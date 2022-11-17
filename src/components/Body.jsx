import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { ImagePreview } from ".";
import { useStateContext } from "../contexts/StateContext";

const Body = () => {
  const {
    allImages,
    setAllImages,
    selectedImg,
    allLogoProps,
    setAllLogoProps,
  } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoPropsChange = (e) => {
    const { name, value } = e.target;

    setAllLogoProps((prevProps) =>
      prevProps.map((prop, index) =>
        selectedImg === index ? { ...prop, [name]: parseInt(value) } : prop
      )
    );
  };

  const handleAllLogoPropsChange = () => {
    setIsLoading(true);

    setAllLogoProps((prevData) => {
      let newLogoSize = prevData[selectedImg].logoSize;
      let newLogoX = prevData[selectedImg].logoX;
      let newLogoY = prevData[selectedImg].logoY;
      return prevData.map(() => {
        return {
          logoSize: newLogoSize,
          logoX: newLogoX,
          logoY: newLogoY,
        };
      });
    });

    setIsLoading(false);
  };

  const handlePreview = () => {
    let images = document.querySelector("#images");

    if (images.files.length > 0) {
      let allImagesArr = [];
      let allLogoPropsArr = [];
      for (let i = 0; i < images.files.length; i++) {
        allImagesArr.push(URL.createObjectURL(images.files[i]));
        allLogoPropsArr.push({
          logoSize: 100,
          logoX: 10,
          logoY: 10,
        });
      }
      setAllImages(allImagesArr);
      setAllLogoProps(allLogoPropsArr);
    }
  };

  const handleDownload = () => {
    setIsLoading(true);

    setTimeout(() => {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      let zip = new JSZip();
      for (let i = 0; i < allImages.length; i++) {
        let imgUrl = document
          .querySelector(`#canvas-${i}`)
          .toDataURL("image/jpeg", 1);

        zip.file(
          `Grace Nation - ${i}.jpeg`,
          imgUrl.replace("data:image/jpeg;base64,", ""),
          {
            base64: true,
          }
        );
      }
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, `Grace nation ${day}_${month}_${year}.zip`);
      });
      setIsLoading(false);
    }, 50);
  };

  return (
    <div className="container my-10 flex flex-col gap-6">
      <ImagePreview />

      <form className="flex flex-col gap-y-4 order-1">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="logo-size">Logo size</label>
          <input
            type="number"
            id="logo-size"
            name="logoSize"
            value={allLogoProps[selectedImg]?.logoSize || 0}
            onChange={handleLogoPropsChange}
            className="border py-1 px-4 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="logo-x">Logo X position</label>
          <input
            type="number"
            id="logo-x"
            name="logoX"
            value={allLogoProps[selectedImg]?.logoX || 0}
            onChange={handleLogoPropsChange}
            className="border py-1 px-4 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="logo-y">Logo Y position</label>
          <input
            type="number"
            id="logo-y"
            name="logoY"
            value={allLogoProps[selectedImg]?.logoY || 0}
            onChange={handleLogoPropsChange}
            className="border py-1 px-4 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="images">Your File</label>
          <input type="file" id="images" onChange={handlePreview} multiple />
        </div>

        <div className="flex justify-between gap-x-4 my-4">
          <button
            type="button"
            id="download-btn"
            onClick={handleDownload}
            className="bg-gray-500 hover:bg-gray-400 text-white rounded-full py-2 lg:py-3 px-4 flex-grow text-center"
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Loading..." : "Download"}
          </button>

          <button
            type="button"
            id="preview-btn"
            onClick={handleAllLogoPropsChange}
            className="bg-orange-500 hover:bg-orange-400 text-white rounded-full py-2 px-4 flex-grow text-center"
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Loading..." : "Change All"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Body;
