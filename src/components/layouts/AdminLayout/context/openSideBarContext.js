import { createContext } from 'react';

const openSideBarContext = createContext(true);

export const openSideBarReducer = (state, action) => {
    switch (action.type) {
        case 'open':
            return true;
        case 'close':
            return false;
        default:
            return state;
    }
};

export default openSideBarContext;