import React, { Component } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@material-ui/core";
import "./editor.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Editor() {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

 

  React.useEffect(() => {
    console.log("useeffect");
    ClassicEditor.create(document.getElementById('editor4'))
    .then((editor1) => {
      console.log(editor1);
      setData(editor1);
      data.setData("Some text");
    })
    .catch((error) => {
      console.error(error);
    });

    var division = document.getElementById("division1");
    division.style.display = "block";
  },[user]);

  const handelsubmit = () => {
    if (isAuthenticated) {
      if (user.email == "anujp6561@gmail.com") {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: document.getElementById("exampleInputEmail1").value,
            topic_name: document.getElementById("exampleInputPassword1").value,
            image: document.getElementById("exampleInputPassword3").value,
            src: document.getElementById("exampleInputPassword3").value,
            ragistration_required: document.getElementById(
              "exampleInputPassword4"
            ).value,
            description: data.getData(),
          }),
        };
        fetch("/api", requestOptions)
        window.alert("uploaded");
      } else {
        window.alert("not authorized");
      }
    } else {
      navigate("/notfound");
    }
  };

  return (
    <div className="editor">
      <h1 id="headersimulation">Add Simulation</h1>

      <div className="form-group">
        <label>Simulation Name</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Simulation Name"
        ></input>
      </div>
      <div className="form-group">
        <label>Title</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Title"
        ></input>
      </div>
      <div className="form-group">
        <label>Image Url</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword2"
          placeholder="Url of Image"
        ></input>
      </div>
      <div className="form-group">
        <label>Source Url</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword3"
          placeholder="Source Url"
        ></input>
      </div>
      <div className="form-group">
        <label>Ragistration required</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword4"
          placeholder="Source Url"
        ></input>
      </div>
      <div id="editor_container">
        <label>Description</label>
        <div id="editor4"></div>
      </div>

      <Button
        variant="contained"
        onClick={() => {
          handelsubmit();
        }}
      >
        ADD
      </Button>
    </div>
  );
}
