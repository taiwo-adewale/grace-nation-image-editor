import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { ImagePreview } from ".";

const Body = () => {
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = () => {
    let images = document.querySelector("#images");

    if (images.files.length > 0) {
      let allImagesArr = [];
      for (let i = 0; i < images.files.length; i++) {
        allImagesArr.push(URL.createObjectURL(images.files[i]));
      }
      setAllImages(allImagesArr);
    }
  };

  const handleDownload = () => {
    if (allImages.length > 0) {
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
          setIsLoading(false);
        });
      }, 50);
    }
  };

  return (
    <div className="container my-10 flex flex-col gap-6">
      <ImagePreview allImages={allImages} />

      <form className="flex flex-col gap-y-4 order-1">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="images">Your File</label>
          <input
            type="file"
            id="images"
            onChange={handlePreview}
            multiple
            disabled={isLoading ? true : false}
          />
        </div>

        <div className="flex justify-between gap-x-4 my-4">
          <button
            type="button"
            id="download-btn"
            onClick={handleDownload}
            className={`bg-orange-500 hover:bg-orange-400 text-white rounded-full py-2 lg:py-3 px-4 flex-grow text-center ${
              isLoading ? "!bg-gray-300" : ""
            }`}
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Loading..." : "Download"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Body;
