import React from "react";

const DownloadForm = ({ handlePreview, handleDownload, isLoading }) => {
  return (
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
  );
};

export default DownloadForm;
