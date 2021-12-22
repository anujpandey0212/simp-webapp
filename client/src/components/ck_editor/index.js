import React, { Component } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from '@material-ui/core';
import "./editor.css";

class editor extends Component {
    constructor(props){
        super(props);
        this.state={
            editor4:null,
        } 
    }
    componentDidMount(){

    //simulation iframe  editor
    ClassicEditor
    .create( document.querySelector( '#editor4' ) )
    .then( editor1 => {
        console.log( editor1 );
        this.setState({
            editor4: editor1
          });
          this.state.editor4.setData( 'Some text' );
    } )
    .catch( error => {
        console.error( error );
    } );

    
    }
    
    render() {
        return (
            <div className="editor">
                <h1 id='headersimulation'>Add Simulation</h1>
                
                
                <div className="form-group">
                    <label>Simulation Name</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Simulation Name" onChange={this.handelaluechange}></input>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Title" onChange={this.handelaluechange}></input>
                </div>
                <div className="form-group">
                    <label>Image Url</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Url of Image" onChange={this.handelaluechange}></input>
                </div>
                <div className="form-group">
                    <label>Source Url</label>
                    <input type="password" className="form-control" id="exampleInputPassword3" placeholder="Source Url" onChange={this.handelaluechange}></input>
                </div>
                <div id='editor_container'>
                    <label>Description</label>
                    <div id="editor4"></div>
                </div>
             
                
                <Button variant="contained" onClick={()=>{
                   const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: document.getElementById('exampleInputEmail1').value,
                    title_name:document.getElementById('exampleInputPassword1').value,
                    image:document.getElementById('exampleInputPassword3').value,
                    src:document.getElementById('exampleInputPassword3').value,
                    description:this.state.editor4.getData(),
                    })
                };
                fetch('/api', requestOptions)
            }}>ADD</Button>
            </div>
        );
    }
}

export default editor;