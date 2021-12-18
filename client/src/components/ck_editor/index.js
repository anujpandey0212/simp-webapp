import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from '@material-ui/core';
import "./editor.css";

class editor extends Component {
    constructor(props){
        super(props);
        this.state={
            editor1:null,
            editor2:null,
            editor3:null,
            editor4:null,
            editor1_data:null,
            editor2_data:null,
            editor3_data:null,
            editor4_data:null,
        } 
    }
    componentDidMount(){
        //simulation name editor
        ClassicEditor
    .create( document.querySelector( '#editor1' ),{
        autoParagraph : false,
        
    } )
    .then( editor1 => {
        console.log( editor1 );
        this.setState({
            editor1: editor1
          });
          this.state.editor1.setData( 'Some text.' );
        //   this.state.editor1.config.enterMode = 2
        //   this.state.editor1.config.autoParagraph = false;
          
    } )
    .catch( error => {
        console.error( error );
    } );

    //simulation title editor
    ClassicEditor
    .create( document.querySelector( '#editor2' ) )
    .then( editor1 => {
        console.log( editor1 );
        this.setState({
            editor2: editor1
          });
          this.state.editor2.setData( 'Some text.' );
    } )
    .catch( error => {
        console.error( error );
    } );

   //simulation image editor
    ClassicEditor
    .create( document.querySelector( '#editor3' ) )
    .then( editor1 => {
        console.log( editor1 );
        this.setState({
            editor3: editor1
          });
          this.state.editor3.setData( 'Some text.' );
    } )
    .catch( error => {
        console.error( error );
    } );

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
                <h2>Add Simulation</h2>
                <div className='editor_header'>
                    <h3>Simulation name = </h3>
                    <div id="editor1"></div>
                </div>
                <div className='editor_header'>
                    <h3>Title Name = </h3>
                    <div id="editor2"></div>
                </div>
                <div className='editor_header'>
                    <h3>Image Source =</h3>
                    <div id="editor3"></div>
                </div>
                <div className='editor_header'>
                    <h3>Html Iframe code = </h3>
                    <div id="editor4"></div>
                </div>
                <Button variant="contained" onClick={()=>{
                   const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: this.state.editor1.getData(),
                    title_name:this.state.editor2.getData(),
                    image:this.state.editor3.getData(),
                    src:this.state.editor4.getData()
                    })
                };
                fetch('/api', requestOptions)
            }}>ADD</Button>
            </div>
        );
    }
}

export default editor;