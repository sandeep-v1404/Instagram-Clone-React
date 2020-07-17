import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { db, storage } from "../firebase";
import firebase from "firebase";
import './ImageUpload.css';
function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");
    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                //Error Function ..
                console.log(error);
                alert(error.message)
            },
            () => {
                //complete Function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgURL: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        );

    }

    return (
        <div className="image__upload">
            <progress className="image__upload__progress" value={progress} max="100"></progress>
            <input type="text" value={caption} placeholder="Enter a Caption.." onChange={e => setCaption(e.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload} >Upload</Button>
        </div>
    )
}
export default ImageUpload;