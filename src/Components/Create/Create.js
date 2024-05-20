import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Create.css';
import Header from '../Header/Header';
import { getStorage ,ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { getAuth,onAuthStateChanged} from "firebase/auth";
import {FirebaseContext,AuthContext} from '../../store/Context'
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
const Create = () => {
  const {Firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const storage = getStorage(Firebase);
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState(null)
  const auth=getAuth(Firebase)
  const db = getFirestore(Firebase);
  const navigate=useNavigate()
  const date=new Date()
  const handleUpload= async(evnt)=>{
   evnt.preventDefault();
    const storageRef= ref(storage, `/images/${image.name}`)
  
    await uploadBytes(storageRef,image).then((snapShot)=>{

    })
    await getDownloadURL(ref(storage, `images/${image.name}`)).then((url)=>{
         
          addDoc(collection(db, "products"), {
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        });
         navigate('/')
    })
    
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(evnt)=>{
                setName(evnt.target.value)
              }}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(evnt)=>{
                setCategory(evnt.target.value)
              }}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"  value={price}
              onChange={(evnt)=>{
                setPrice(evnt.target.value)
              }}/>
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''} ></img>
         
            <br />
            <input onChange={(evnt)=>{
               setImage(evnt.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleUpload} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
