import {
    SIGN_STATUS_ACTIONTYPE, 
    MENUS_ACTIONTYPE,
    ADD_PANES_ACTIONTYPE,
    REMOVE_PANES_ACTIONTYPE,
    AUTH_PAGES_ACTIONTYPE,
    ACTIVE_MENU_ACTIONTYPE,
    ACTIVE_KEY_ACTIONTYPE,
} from './../constants/actionTypeContants'

/**
 * signStatus reducer
 * @param {是否登录} isSignedIn 
 * @param {} action 
 */
export const checkSignStatus=(signStatus={hasSignedIn:false,isSignedIn:false},action)=>{
    switch(action.type) {
        case SIGN_STATUS_ACTIONTYPE:
        return action.payload;
        default:
        return signStatus;
    }
};

/**
 * menus reducer
 * @param {权限菜单} menus 
 * @param {} action 
 */
export const getMenus=(menus=[],action)=>{
    switch(action.type) {
        case MENUS_ACTIONTYPE:
        return action.payload;
        default:
        return menus;
    }
};

/**
 * panes reducer
 * @param {面板数组} panes 
 * @param {} action 
 */
export const getPanes=(panes=[],action)=>{
    let newPanes=[];
    switch(action.type) {
        case ADD_PANES_ACTIONTYPE:
        newPanes=[...panes,action.payload]
        return newPanes;
        case REMOVE_PANES_ACTIONTYPE:
        newPanes=[...panes];
        newPanes.splice(action.payload.currentIndex,1);
        return newPanes;
        default:
        return panes;
    }
};

/**
 * AuthPages reducer
 * @param {权限页面} authPages 
 * @param {} action 
 */
export const getAuthPages=(authPages=[],action)=>{
    switch(action.type) {
        case AUTH_PAGES_ACTIONTYPE:
        return getAuthPagesInMenus(action.payload);
        default:
        return authPages;
    }
};

/**
 * 递归获取权限页面
 * @param {权限菜单数组} menus 
 */
const getAuthPagesInMenus=(menus)=>{
    const menusLength=menus.length;

    let authPages=[];

    for(let i=0;i<menusLength;i++){
        if(menus[i].subMenus&&menus[i].subMenus.length>0){
            if(menus[i].subMenus.filter(item=>{return item.isDetail==true;}).length>0){
                authPages.push({
                    id:menus[i].id,
                    name:menus[i].name,
                    path:menus[i].path,
                });
            }
            let subAuthPages= getAuthPagesInMenus(menus[i].subMenus);
            authPages=[...authPages,...subAuthPages];
        } else {
            authPages.push({
                id:menus[i].id,
                name:menus[i].name,
                path:menus[i].path,
            });
        }
    }
    return authPages;
}

/**
 * activeMenu reducer
 * @param {当前页面} activeMenu 
 * @param {} action 
 */
export const getActiveMenu=(activeMenu={id:"001",name:"首页",path:"/index"},action)=>{
    switch(action.type) {
        case ACTIVE_MENU_ACTIONTYPE:
        return action.payload;
        default:
        return activeMenu;
    }
}

