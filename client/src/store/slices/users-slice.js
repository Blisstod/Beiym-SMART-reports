import {createSlice} from "@reduxjs/toolkit";
import {createEntityAdapter} from "@reduxjs/toolkit";


const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState({
    userInfo: {
        name: '',
        role: '',
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
})

const {reducer} = usersSlice

export default reducer