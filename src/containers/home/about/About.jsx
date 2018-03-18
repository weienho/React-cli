import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getActiveMenuAction} from '../../../actions/menuAction'

const StyledPText=styled.p`
color:blue;
`;

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    linkToAboutDetail=(param)=>{
        const path=`/about/${JSON.stringify(param)}`;

        this.props.history.push(path);

        this.props.authPages.forEach((item)=>{
            if(item.id==="002001001"){
                this.props.getActiveMenu(item);
            }
        });
    };

    render() {
        const data={id:888,type:'Good'};

        return (<div>
            <a onClick={this.linkToAboutDetail.bind(this,data)}>跳转到关于详细页</a>
            <StyledPText>关于我们页</StyledPText>
        </div>);

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
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(About));