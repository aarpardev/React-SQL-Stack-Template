import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={getText(title)}
          onChange={(e) => setTitle(e.target.title)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={getText(value)}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
 
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cat01"}
              name="cat"
              value="cat01"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cat01">Category 1</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cat02"}
              name="cat"
              value="cat02"
              id="cat 02"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Category 2</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cat03"}
              name="cat"
              value="cat03"
              id="cat 03"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cat03">Category 3</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cat04"}
              name="cat"
              value="cat04"
              id="cat 04"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cat04">Category 4</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cat05"}
              name="cat"
              value="cat05"
              id="cat 05"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cat 05">Category 5</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cat06"}
              name="cat"
              value="cat06"
              id="cat06"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cat06">Cateogry 6</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;