import {Link} from 'react-router-dom'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
        <div>
            <Link to='/info'> 跳转到信息页</Link>
            <p>这是一个神奇的首页</p>
            <input type="text"/>
            </div>);
    }
}