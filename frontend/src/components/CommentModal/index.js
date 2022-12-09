import React, { useEffect, useState } from 'react';
import { createComment } from '../../api/comments';
import {useDispatch} from "react-redux";
import { addComment } from '../../redux/features/commentsSlice.js';
import "./style.css";

export default function CommentModal({props}) {
    const [createModal, setCreateModal] = useState(false);
    const dispatch = useDispatch();
    const [formInputs, setFormInputs] = useState({
        post_id: "",
        id: "",
        name: "",
        creator_email: "",
        creator_id: "",
        body: ""
    });

    const showModal = (e) => {
        setCreateModal(true);
    };
    const hideModal = (e) => {
        setCreateModal(false);
        setFormInputs({
            post_id: "",
            id: "",
            name: "",
            creator_email: "",
            creator_id: "",
            body: ""
        });
    };

    const keyHandler = ({keyCode}) => {
        console.log("keyCode: " + keyCode);//Esc=27
        switch (keyCode) {
            case 27:
                hideModal();
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit");
        createComment(formInputs, (message, success, error) => {
            if (success) {
                dispatch(addComment([formInputs]));
                props[0].setSuccessMessage({message});
            } else if (error) {
                props[0].setErrorMessage({message});
            }
        });
        hideModal();
    };

    useEffect(() => {
        document.addEventListener("keydown", keyHandler);
        return () => {
            document.removeEventListener("keydown", keyHandler);
        };
    }, []);

    const handleChange = ({target}) => {
        let value = target.value;
        let nameInput = target.name;
        setFormInputs(prev => ({...prev, [nameInput]: value}));
    }
    const isDisabled = () => {
        return !formInputs.post_id || !formInputs.id || !formInputs.name || !formInputs.creator_email || !formInputs.creator_id || !formInputs.body;
    };
    return (
        <div className="create-comment">
            <button type='button' className="show-modal" onClick={showModal}>Let's create a new comment</button>
            <div className={`modal ${createModal ? "show" : ""}`}>
                <button className='close' onClick={hideModal}>Close</button>
                <form onSubmit={handleSubmit}>
                    <input value={formInputs.post_id} onChange={handleChange} type="text" name='post_id' placeholder='Post id' />
                    <input value={formInputs.id} onChange={handleChange} type="text" name='id' placeholder='Comment id' />
                    <input value={formInputs.name} onChange={handleChange} type="text" name='name' placeholder='Comment name' />
                    <input value={formInputs.creator_email} onChange={handleChange} type="email" name='creator_email' placeholder='Comment creator email' />
                    <input value={formInputs.creator_id} onChange={handleChange} type="text" name='creator_id' placeholder='Comment creator id' />
                    <textarea value={formInputs.body} onChange={handleChange} name="body" id="" cols="30" rows="10" placeholder='Comment body'></textarea>
                    <button type='submit' disabled={isDisabled()}>Create</button>
                </form>
            </div>
            <div className={`modal-overlay ${createModal ? "show" : ""}`}></div>
        </div>
    )
}
