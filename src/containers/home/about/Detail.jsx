export default class Detail extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidUpdate(nextProps,nextState){
        if(this.props.match.params.data===this.props.match.params.data){
            return false;
        }
        return true;
    }

    render() {
        console.log(this.props.match.params);
        const data =JSON.parse(this.props.match.params.data);
        return (<p>{data.type}</p>);
    };
}