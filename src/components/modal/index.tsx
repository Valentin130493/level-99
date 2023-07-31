import React from 'react';

import "./style.scss"
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {updateUserName} from "../../store/reducers/usersReducer";

interface ModalProps {
    onClose: () => void;
}


export const Modal: React.FC<ModalProps> = ({onClose}) => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state => state.users))

    const [userName,setUserName] = React.useState<string>(user)

    const handleChange = React.useCallback( (e:React.ChangeEvent<HTMLInputElement>) =>{
        setUserName(e.target.value)
    },[])

    const handleKeyPress = (e:React.KeyboardEvent) =>{
        if(e.code === "Enter"){
            dispatch(updateUserName({old:user, newName:userName}))
            onClose()
        }

    }

    return (
        <div className={"modal"}>
            <div className="modal_content">
                <h1>Change your user name</h1>
                <div className={"content_input"}>
                    <input type="text" value={userName} onChange={handleChange} onKeyPress={handleKeyPress}/>
                    <span className="close_btn" onClick={onClose}>
                        &times;
                    </span>
                </div>
            </div>
        </div>
    );
};

