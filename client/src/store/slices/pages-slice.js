import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    scores: []
}

const pagesSlice = createSlice({
    name: 'pages',
    initialState,
})

const {reducer} = pagesSlice

export default reducer