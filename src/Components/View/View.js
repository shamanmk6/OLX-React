import React, { useState, useEffect, useContext,} from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import "./View.css";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { Firebase } = useContext(FirebaseContext);
  const db = getFirestore(Firebase);
  useEffect(() => {
  const fetchData = async () => {
    try {
      if (postDetails) {
        const q = query(collection(db, "users"), where("id", "==", postDetails.userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  fetchData();

  return () => {
    // Cleanup function if needed
  };
}, [postDetails,db]);

  return (
    <div className="viewParentDiv">
      {postDetails && (
        <div className="imageShowDiv">
          <img src={postDetails.url} alt="" />
        </div>
      )}
      <div className="rightSection">
        {postDetails && (
          <div className="productDetails">
            <p>&#x20B9; {postDetails.price} </p>
            <span>{postDetails.name}</span>
            <p>{postDetails.category}</p>
            <span>{postDetails.createdAt}</span>
          </div>
        )}
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
  
}
export default View;
