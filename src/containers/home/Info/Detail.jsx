export default class Detail extends React.Component{
    constructor(props){
        super(props);    
    }

     componentDidMount(){
    }

    shouldComponentUpdate(nextProps,nextState) {
        return true;
    }

    render(){
        return (
        <div>这是信息详细页id:
       {this.props.match.params.id} 
      </div>
        );
    }
}