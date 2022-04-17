
// import logger from 'redux-logger';
// import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice'

// const middleware = [thunk];

// if(process.env.NODE_ENV=== "development"){
//     middleware.push(logger);
// }
const store = configureStore({
    reducer:{
        user:userSlice,
    }
})
export default store;
