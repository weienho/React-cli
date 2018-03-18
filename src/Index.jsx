import "babel-polyfill" // 识别和编译es6的API，必须放在跟组件文件的import列表的第一行读取
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from '../src/reducers/index'
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import APP from './containers/APP'
import './styles/app.scss'

/**
 * 将各个功能模块的reducer通过函数combineReducers组合在一起
 * key 的名称与gobal state的属性名相同
 * value 各个功能模块的reducer的函数名称
 */
const reducer = combineReducers({
    signStatus:reducers.checkSignStatus,// 登录状态
    menus:reducers.getMenus,// 权限菜单
    panes:reducers.getPanes,// 动态加载的面板
    authPages:reducers.getAuthPages,// 权限的页面
    activeMenu:reducers.getActiveMenu,// 当前的页面
});

/**
 * redux store
 * createStore 初始化store的函数，可以设置初始的gobal state
 * createStore 设置使用各种的中间件 Middleware，多个的中间件会有先后顺序排列成数组
 * thunk 增加redux 对异步操作中的支持,dispatch(func)的方式实现，源码简而精
 */
const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

/**
 * react的根组件 通过ReactDOM.render创建
 * Provider react-redux库封装德1组件，内部逻辑是通过react context对象让每一个组件都能获取到store对象
 * browserRouter 在服务器端需要配置指定页面，因为重新刷新浏览器会指向为服务器的文件路径
 * historyRouter 不支持 location.key 和 location.state。另外由于该技术只是用来支持旧版浏览器
 */
ReactDOM.render((
    <Provider store={store}>
        <Router>
            <APP/>
        </Router>
    </Provider>
), document.getElementById('app'));