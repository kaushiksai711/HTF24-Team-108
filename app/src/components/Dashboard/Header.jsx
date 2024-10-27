import React from 'react';
import './Header.css';
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Header = () => {
    const auth = getAuth();
    const db = getFirestore();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                const userDocRef = doc(db, "users", uid);

                try {
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        setError("No user data found.");
                    }
                } catch (err) {
                    setError("Error fetching user data: " + err.message);
                }
            }
        };

        fetchUserData();
    }, [auth.currentUser, db]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { displayName, photoURL } = userData;

    return (
      <div className="header">
        <h1>Welcome, {displayName}!</h1>
        <div className="profile">
          <span>Your Profile</span>
          <div className="profile-icon"></div>
        </div>
      </div>
        
    );
};

export default Header;



