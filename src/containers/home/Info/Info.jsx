import {connect} from 'react-redux'
import {
    Link,
    withRouter,
} from 'react-router-dom'
import styled from 'styled-components'
import {getActiveMenuAction} from '../../../actions/menuAction'

const StyledPText=styled.p`
color:blue;
`;

class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    linkToInfoDetail=(id)=>{
        const path='/info/'+id;
        this.props.history.push(path);

        this.props.authPages.forEach((item)=>{
            if(item.id==="002002001"){
                this.props.getActiveMenu(item);
            }
        });
    };

    render() {
        return (
            <div>
        <StyledPText>信息页</StyledPText>
        <a onClick={this.linkToInfoDetail.bind(this,666)}> 
        跳转到信息详细页面
        </a>
        </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        authPages:state.authPages,
    };
};

const mapDispatchToProps=(dispatch)=>{
    return {
        getActiveMenu:(menuItem)=>{
            dispatch(getActiveMenuAction(menuItem));
        }
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Info));

