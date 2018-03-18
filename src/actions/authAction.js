import {
    SIGN_STATUS_ACTIONTYPE,
    AUTH_PAGES_ACTIONTYPE,
} from './../constants/actionTypeContants'
import {demoMenus} from './../constants/demoDataContants'

export const getSignStatusAction=(signStatus)=>{
    return {
        type:SIGN_STATUS_ACTIONTYPE,
        payload:signStatus,
    };
};

export const getAuthPagesAction=()=>{
    return {
        type:AUTH_PAGES_ACTIONTYPE,
        payload:demoMenus,
    };
};
