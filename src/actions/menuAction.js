import {
    MENUS_ACTIONTYPE,
    ACTIVE_MENU_ACTIONTYPE,
    ADD_PANES_ACTIONTYPE,
    REMOVE_PANES_ACTIONTYPE,
} from './../constants/actionTypeContants'

import {demoMenus} from './../constants/demoDataContants'

export const getMenusAction=()=>{
    return {
        type:MENUS_ACTIONTYPE,  
        payload:demoMenus,
    };
};

export const getActiveMenuAction=(menuItem)=>{
    return {
        type:ACTIVE_MENU_ACTIONTYPE,
        payload:{
            id:menuItem.id,
            name:menuItem.name,
            path:menuItem.path,
        },
    };
};

export const addPaneAction = (pane) => {
    return {
        type: ADD_PANES_ACTIONTYPE,
        payload: pane,
    };
};

export const removePaneAction = (currentIndex) => {
    return {
        type: REMOVE_PANES_ACTIONTYPE,
        payload: { currentIndex },
    };
};