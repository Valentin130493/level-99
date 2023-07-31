import React from 'react';

import "./style.scss"


interface UserBlockProps {
    name: string,
    edit: () => void;
    remove:()=>void;
}


export const UserBlock: React.FC<UserBlockProps> = ({name, edit, remove}) => {

    return (
        <div className={"user_block"}>
            <p>{name}</p>
            <span>
                <button onClick={edit}>edit</button>
                <button className={"remove"} onClick={remove}>remove</button>
            </span>
        </div>
    );
};
