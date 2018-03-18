import { 
    Route, 
    Redirect,
    withRouter,
 } from 'react-router-dom';
import {connect} from 'react-redux'


/**
 * 可根据组件设计使用的权限逻辑路由
 */
class AuthRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { component: Component,authPages,authCode, ...rest } = this.props;
        if (authPages.length==0) {
            return null;
        }

        const authPage= authPages.filter(item=>{
            return item.id==authCode;
        });

        return (<Route {...rest} render={props => (
            authPage.length>0 ? (
                <Component {...props} />
            ) : (
                    //     <Redirect to={{pathname:'https://www.baidu.com',
                    //     state:{from:props.location}
                    // }}/>
                    <Redirect to="/" />
                )
        )} />);
    }
}

const mapStateToProps=(state)=>{
    return {
        authPages:state.authPages,
    };
};

export default withRouter(connect(mapStateToProps,null)(AuthRoute));

// export default ({component:Component,...rest})=>{
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//             this.state={
//                 isAuthed:false,// 是否有权限进入页面
//                 hasAuthed:false,// 是否已经验证权限
//             };
//         }

//         componentDidMount() {
//             setTimeout(()=>{
//                 if(true) {
//                     this.setState({auth:true, hasAuthed: true});
//                   }else {
//                     this.setState({auth:false, hasAuthed: true});
//                   }
//             },2000);
//         }

//         render() {
//             if(!this.state.hasAuthed){
//                 return null;
//             }
//             console.log(Component);
//             <Route {...rest} render={props=>(
//                 this.state.isAuthed? (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect to={{pathname:'/',
//                     state:{from:props.location}
//                 }}/>
//                 )
//             )} />;
//         }
//     }
// }

