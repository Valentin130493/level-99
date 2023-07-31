import React, {Fragment} from 'react';

import {useAppDispatch, useAppSelector} from "./store/hooks";
import {Modal, UserBlock} from "./components";
import {addUser, getUser, removeUser} from "./store/reducers/usersReducer";

import './App.scss';

export const App = () => {
    const dispatch = useAppDispatch()
    const {users} = useAppSelector((state => state.users))

    const [inputValue, setInputValue] = React.useState<string>('')
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const openModal = (index: number) => {
        setIsOpen(true);
        dispatch(getUser(index))
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleRemove = (name: string) => {
        dispatch(removeUser(name))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputValue) dispatch(addUser(inputValue))
        setInputValue('')
    }

    return (
        <div className="wrapper">
            <section className={"form_section"}>
                <form onSubmit={handleSubmit}>
                    <input value={inputValue} onChange={handleInputChange} type="text"/>
                    <button type={"submit"}>Save</button>
                </form>
            </section>
            <section className={"users_section"}>
                {users?.map((user: string, i: number) => {
                    return <Fragment key={`${i}`}>
                        <UserBlock name={user} edit={() => openModal(i)} remove={() => handleRemove(user)}/>
                    </Fragment>
                })}
            </section>
            {isOpen && <Modal onClose={closeModal}/>}
        </div>
    );
}

