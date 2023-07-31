import {createSlice} from '@reduxjs/toolkit'
import {usersKey} from "../../static";


interface UsersState {
    users: any,
    user: string
}

const initialState: UsersState = {
    users: localStorage.getItem(usersKey) ? JSON.parse(localStorage.getItem(usersKey) as string) : [],
    user: ""
}

export const cardsSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, {payload}) => {
            state.users = state.users.concat(payload)
            localStorage.setItem(usersKey, JSON.stringify(state.users))
        },
        getUser: (state, {payload}) => {
            state.user = state.users[payload]
        },
        updateUserName: (state, {payload}) => {
            state.users = state.users.map((user: string) => {
                if (payload.old === user) {
                    return payload.newName
                } else {
                    return user
                }
            })
            state.user = ''
            localStorage.setItem(usersKey, JSON.stringify(state.users))
        },
        removeUser: (state, {payload}) => {
            state.users = state.users.filter((user: string) => user !== payload)
        }

    },

})

export const {addUser, getUser, updateUserName, removeUser} = cardsSlice.actions

export default cardsSlice.reducer