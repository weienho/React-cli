import { 
    Route,
    Redirect,
    withRouter,
 } from 'react-router-dom';
import {connect} from 'react-redux'

import Index from './../home/Index'
import Info from './../home/info/Info'
import InfoDetail from './../home/info/Detail'
import InfoEdit from './../home/info/Edit'
import About from './../home/about/About'
import AboutDetail from './../home/about/Detail'


class SwitchContainer extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        const { id,authPages, ...rest } = this.props;
        if (authPages.length==0) {
            return null;
        }

        const authPage= authPages.filter(item=>{
            return item.id===id;
        });

        if(authPage.length==0){
            return <Redirect to="/index"/>;
        }


        switch(this.props.id){
            case "001":
            return <Route component={Index} {...rest} />;
            case "002001":
            return <Route component={About} {...rest} />;
            case "002001001":
            return <Route component={AboutDetail} {...rest} />;
            case "002002":
            return <Route component={Info} {...rest} />;
            case "003":
            return <Route component={InfoEdit} {...rest} />;
            case "002002001":
            return <Route component={InfoDetail} {...rest} />;
            default:
            return <Route component={Index} {...rest} />;
        }
    }
}

const mapStateToProps=(state)=>{
    return {
        authPages:state.authPages,
    };
};

export default connect(mapStateToProps,null)(SwitchContainer);


