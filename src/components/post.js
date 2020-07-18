import React, { useState, useEffect } from 'react';
import './post.css';
import { Avatar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from "../firebase";
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import firebase from "firebase";

library.add(faTrash, faPen);
function Post({ username, user, caption, imgURL, postId }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        let unsubsrcibe;
        if (postId) {
            unsubsrcibe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                })
        }
        return () => {
            unsubsrcibe();
        }
    }, [postId]);


    const handleDelete = event => {
        event.preventDefault();
        db.collection("posts").doc(postId).delete();
    }
    const postComment = event => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }
    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar"
                    src={imgURL}
                    alt={username}
                />
                <h3>{username}</h3>
                {username === user?.displayName ?
                    <div className="post__menu" onClick={handleDelete}>
                        <FontAwesomeIcon className="icon trash" icon="trash" />
                    </div> : null
                }
            </div>
            <img className="post__image" src={imgURL} alt="" />
            {caption ? <h4 className="post__text"><strong>{username}</strong> {caption}</h4> : null}

            <div className="post__comment">
                {
                    comments.map((comment, id) => {
                        return <div key={id} >
                            <p >
                                <strong>{comment.username} : </strong>{comment.text}

                            </p>
                        </div>
                    })}

            </div>
            {
                user &&
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text" placeholder="Add a comment.."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >Post</button>
                </form>
            }
        </div>
    )
}

export default Post;
