import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category", initialState: {
        categoryList: [{
            id: 1,
            name: "Shopping",
            description: "Online Shopping,Mall Shopping, Store",
            type: 'expense'
        }, {
            id: 2,
            name: "Movie",
            description: "Movies & TV",
            type: 'expense'
        }, {
            id: 3,
            name: "Salary",
            description: "Best Company Monthly Salary",
            type: 'income'
        }]
    }, reducers: {
        addCategory: (state, action) => {
            state.categoryList.push({
                id: state.categoryList.length + 1,
                name: action.payload.name,
                description: action.payload.description,
                type: action.payload.type
            })
        }
    }
})

export const {addCategory} = categorySlice.actions;

export default categorySlice;