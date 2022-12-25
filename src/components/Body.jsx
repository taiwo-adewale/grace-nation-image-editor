import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { ImagePreview, DownloadForm } from ".";

const Body = () => {
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = () => {
    let images = document.querySelector("#images");

    if (images.files.length > 0) {
      let allImagesArr = [];
      for (const image of images.files) {
        allImagesArr.push(URL.createObjectURL(image));
      }
      setAllImages(allImagesArr);
    }
  };

  const handleDownload = () => {
    if (allImages.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        const date = new Date();
        let day = String(date.getDate()).padStart(2, "0");
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let year = date.getFullYear();

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
      }, 20);
    }
  };

  return (
    <div className="container my-10 flex flex-col gap-6">
      <ImagePreview allImages={allImages} />

      <DownloadForm
        isLoading={isLoading}
        handleDownload={handleDownload}
        handlePreview={handlePreview}
      />
    </div>
  );
};

export default Body;
