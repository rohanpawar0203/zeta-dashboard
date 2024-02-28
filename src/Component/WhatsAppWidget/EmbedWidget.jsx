import React, { useEffect, useRef } from "react";
import appStore from "../Live Chats/Client/AppStore";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { clearJs, runJs } from "./sample";
import axios from "axios";
import { WidgetContentAPI } from "../../api";

const EmbedWidget = () => {
  const scriptRef = useRef(null);
  const scriptTagRef = useRef("");
  const { userData } = appStore();
  const $ = window.jQuery;

  const copyContent = `<script src="https://www.ulai.in/file-server/uploads/Ulai/ulaiwidget.js?12345&${userData?._id}"></script>`;

  const handleCopyScript = () => {
    const input = document.createElement("input");
    input.value = copyContent;
    document.body.appendChild(input);

    // Select the text and copy it˙
    input.select();
    document.execCommand("copy");

    // Remove the temporary input
    document.body.removeChild(input);

    toast.success("Script copied to clipboard");
  };

  return (
    <div className="d-flex flex-column align-items-left">
      <div className="mb-2">
        <h3 className="mt-4 mb-1">Embed the Whatsapp Widget</h3>
        <p className="mb-2">
          Copy and paste this code before the tag on every page of your website.
        </p>
      </div>
      <div className="w-100 d-flex flex-wrap gap-2 justify-content-between align-items-center mb-4">
        <button
          style={{ cursor: "none" }}
          type="text"
          className="btn btn-outline-none fw-bolder border border-lightgray"
        >
          Javascript
        </button>
      </div>
      <div
        style={{ background: "whitesmoke" }}
        className="w-100 d-flex flex-wrap gap-2 align-items-center  py-5 px-4"
      >
        <div style={{ width: "90%" }}>
          <p ref={scriptRef}>{copyContent}</p>
        </div>
        <div
          onClick={handleCopyScript}
          style={{
            background: "white",
            color: "black",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          className="d-flex flex-wrap align-items-center justify-content-center"
        >
          <MdOutlineContentCopy style={{ width: "20px", height: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default EmbedWidget;
