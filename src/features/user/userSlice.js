import { createSlice } from "@reduxjs/toolkit"

const userInit = {
    username: "Seif",
}
const userSlice = createSlice({
    name: "user",
    initialState: userInit,
    reducers: {
        updateUsername (state, action) {
            state.username = action.payload;
        },
    },
})

export const  {updateUsername} = userSlice.actions

export default userSlice.reducer;