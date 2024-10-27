import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import TimezonePicker from "./TimezonePicker";
import { useNavigate } from "react-router-dom";
import "./UserProfileForm.css";  // Add this for custom styling

const UserProfileForm = () => {
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        displayName: "",
        email: auth.currentUser?.email || "",
        photoURL: "",
        nativeLanguages: "",
        timeZone: "",
        availability: {
            preferredTimes: [],
            daysAvailable: []
        },
        interests: "",
    });

    // Check if user profile already exists
    useEffect(() => {
        const checkUserProfile = async () => {
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                const userDoc = await getDoc(doc(db, "users", uid));
                if (userDoc.exists()) {
                    // User profile exists, redirect to dashboard
                    navigate("/dashboard");
                }
            }
        };

        checkUserProfile();
    }, [auth.currentUser, db, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "nativeLanguages") {
            setFormData((prev) => ({ ...prev, nativeLanguages: value.split(",") }));
        } else if (name === "interests") {
            setFormData((prev) => ({ ...prev, interests: value.split(",") }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth.currentUser) {
            const uid = auth.currentUser.uid;

            try {
                await setDoc(doc(db, "users", uid), {
                    uid: uid,
                    displayName: formData.displayName,
                    email: formData.email,
                    photoURL: formData.photoURL,
                    createdAt: new Date(),
                    lastActive: new Date(),
                    nativeLanguages: formData.nativeLanguages,
                    timeZone: formData.timeZone,
                    availability: formData.availability,
                    interests: formData.interests,
                    totalPracticeMinutes: 0,
                    streakCount: 0,
                    lastPracticeDate: null,
                });
                console.log("User profile created/updated in Firestore");
                navigate("/dashboard");

            } catch (error) {
                console.error("Error saving user profile: ", error);
            }
        }
    };

    return (
        <div className="language-theme">
            <h1>🗣️ Language Explorer Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        🎓 Display Name:
                        <input 
                            type="text" 
                            name="displayName" 
                            value={formData.displayName} 
                            onChange={handleChange} 
                            placeholder="Hola! What's your name?" 
                            required 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        🌐 Photo URL:
                        <input 
                            type="url" 
                            name="photoURL" 
                            value={formData.photoURL} 
                            onChange={handleChange} 
                            placeholder="Link to your favorite picture!" 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        🏡 Native Languages (comma-separated):
                        <input 
                            type="text" 
                            name="nativeLanguages" 
                            value={formData.nativeLanguages} 
                            onChange={handleChange} 
                            placeholder="E.g., English, French" 
                            required 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <TimezonePicker 
                        onTimezoneChange={(timezone) => setFormData((prev) => ({ ...prev, timeZone: timezone }))} 
                        value={formData.timeZone} 
                    />
                </div>
                <div className="form-group">
                    <label>
                        ⏰ Preferred Times (comma-separated):
                        <input 
                            type="text" 
                            name="preferredTimes" 
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                availability: {
                                    ...prev.availability,
                                    preferredTimes: e.target.value.split(","),
                                },
                            }))} 
                            placeholder="E.g., Morning, Afternoon" 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        📅 Days Available (comma-separated):
                        <input 
                            type="text" 
                            name="daysAvailable" 
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                availability: {
                                    ...prev.availability,
                                    daysAvailable: e.target.value.split(","),
                                },
                            }))} 
                            placeholder="E.g., Monday, Friday" 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        🎯 Interests (comma-separated):
                        <input 
                            type="text" 
                            name="interests" 
                            value={formData.interests} 
                            onChange={handleChange} 
                            placeholder="E.g., Cooking, Music, Languages" 
                        />
                    </label>
                </div>  
                <button type="submit" className="submit-button">
                    🗺️ Let’s Talk!
                </button>
            </form>
        </div>
    );
};

export default UserProfileForm;
