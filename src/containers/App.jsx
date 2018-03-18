// import React,{Component} from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    withRouter,
    Switch,
} from 'react-router-dom'

import {getMenusAction} from './../actions/menuAction'
import {
    getSignStatusAction,
    getAuthPagesAction,
} from './../actions/authAction'

import AuthRoute from './../Routers/AuthRoute'
import Header from './header/Header'
import Sidebars from './navigation/Sidebars'
import Main from './main/Main'
// import Index from './../containers/home/Index'
// import Info from './../containers/home/info/Info'
// import InfoDetail from './../containers/home/info/Detail'
// import About from './../containers/home/About'
// import InfoEdit from './../containers/home/info/Edit'
import Unauthorized from './../containers/httpStatus/Unauthorized'

/**
 * 以class的定义方式使用jsx语法创建react组件
 */
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * react组件生命周期中的钩子函数
     */
    componentDidMount() {
        if(this.props.location.pathname!='/index'){
            window.location.href="/index";
        }

        this.props.checkSignStatus();
    }

    render() {
        // es6的结构语法使用
        const {isSignedIn,hasSignedIn}=this.props;

        // 如果在特定条件下才把组件渲染出来的，不符合的时候 return null可以减少不必要的渲染提高性能
        if(!hasSignedIn) {
            return null;
        }

        if(!isSignedIn) {
            return (<Unauthorized />);
        }

        return (
            <React.Fragment>
                <Header></Header>
                <Sidebars></Sidebars>
                <Main>
                    <Switch>
                    {/* {/* <Route component={Index} authCode={"1"} exact  path="/index"/> */}
                    {/* <Route component={InfoEdit} authCode={"1"} exact path="/info/edit"/> */}
                    {/* <Route component={InfoDetail} authCode={"9"} exact path="/info/:id"/> */}
                    {/* <Route component={About} authCode={"3"} path="/about"/> */}

                    {/* <AuthRoute component={Index} authCode={"1"} exact  path="/index"/>
                    <AuthRoute component={Info} authCode={"5"} exact path="/info"/>
                    <AuthRoute component={InfoDetail} authCode={"9"} exact path="/info/:id"/>
                    <AuthRoute component={About} authCode={"3"} path="/about"/> */}

                    {/* <Route render={() => <Index/>} authCode={"1"} exact  path="/index"/>
                    <Route render={() => <Info />} authCode={"1"} exact path="/info"/>
                    <Route render={() => <input type="text"/>}  authCode={"9"} exact path="/info/:id"/>
                    <Route render={() => <input type="text"/>}  authCode={"3"} path="/about"/> */}
                    
                    </Switch>
                </Main>
            </React.Fragment>
        );
    }
}

/**
 * react-redux connect高阶组件的传入参数之一
 * gobal state都作为 props 传入到组件中
 * @param {全局状态} state 
 */
const mapStateToProps=(state)=>{
    return {
        hasSignedIn:state.signStatus.hasSignedIn,
        isSignedIn:state.signStatus.isSignedIn,
    };
};

/**
 * react-redux connect高阶组件的传入参数之一
 * dispatch() 都作为 props 传入到组件中回调
 * @param {发送action的函数} dispatch 
 */
const mapDispatchToProps=(dispatch)=>{
    return {
        // thunk 允许使用dispatch(func)的方式增加异步操作的处理
        checkSignStatus:()=>dispatch((()=>(dispatch,getState)=>{
        // async get data
        // 获取用户信息（个人资料，菜单，页面权限，操作权限，数据权限）的返回信息需要加解密处理
        setTimeout(()=>{
            dispatch(getSignStatusAction({
                    hasSignedIn:true,
                    isSignedIn:true,
                }));
            dispatch(getMenusAction());
            dispatch(getAuthPagesAction());        
        },2000);
    })())
};
};


/**
 * connect 为react-redux中封装高阶函数（HOC）
 * connect 将store的订阅操作逻辑封装了
 * withRouter react-router 4.0中封装的高阶函数（不向下兼容）
 * withRouter 似的在使用redux的时候可以获取到 history,match,location路由属性
 */
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

