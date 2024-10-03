import React, { useEffect,useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Box } from '@mui/material';
import {io} from 'socket.io-client';
import {useParams} from 'react-router-dom';

const Editor = () => {
  const socket =io(`${process.env.NODE_ENV === "production"?"https://googledocs-pink.vercel.app/":"http://localhost:9000"}`);
  const[quill,setQuill]=useState();
  const {id} =useParams();
  /*useEffect(()=>{
    socket.emit("hello",{message:"hello",name:"dharani"})
  },[])

  useEffect(()=>{
    socket.on("response",(data)=>{
      console.log(data);
    })
  },[socket])*/
  useEffect(() => {
    
    const existingToolbar = document.querySelector('.ql-toolbar');
    if (existingToolbar) {
      existingToolbar.remove();
    }

    
    const quillServer = new Quill('#container', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote','code-block'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'align': [] }],
          ['link', 'image', 'video'],
          ['clean']
        ]
      }
    });
    quillServer.disable();
    quillServer.setText('Loading the document...')

    setQuill(quillServer);
    return () => {
      if (quillServer) {
        quillServer.enable(false);
      }
    };
    
  }, []); 

  

  
 useEffect(() => {
    if (socket === null || quill === null) return;

    const handleChange = (delta, oldData, source) => {
        if (source !== 'user') return;

        socket && socket.emit('send-changes', delta);
    }

    quill && quill.on('text-change', handleChange);

    return () => {
        quill && quill.off('text-change', handleChange);
    }
}, [quill, socket])


useEffect(() => {
  if (socket === null || quill === null) return;

  const handleChange = (delta ) => {
      quill.updateContents(delta);
  }

  socket && socket.on('receive-changes', handleChange);
 
  return () => {
      socket && socket.off('receive-changes', handleChange);
  }
}, [quill, socket]);

useEffect(() => {
  if(quill ===null || socket===null)return;

  socket && socket.once('load-document',document =>{
    quill && quill.setContents(document);
    quill && quill.enable()
  }

  )

  socket && socket.emit('get-document',id);
},[quill,socket,id]);


useEffect(() => {
  if (socket === null || quill === null) return;

  const interval = setInterval(() => {
      socket && socket.emit('save-document', quill.getContents())
  }, 2000);

  return () => {
      clearInterval(interval);
  }
}, [socket, quill]);


  return (
    <Box className='container' id='container' ></Box>
  );
};

export default Editor;
