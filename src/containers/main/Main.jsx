import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    withRouter,
    Switch,
} from 'react-router-dom'
import { Tabs } from 'antd'
import {
    addPaneAction,
    removePaneAction,
    getActiveMenuAction,
} from './../../actions/menuAction'
import SwitchContainer from './../main/SwitchContainer'
import AuthRoute from './../../Routers/AuthRoute'

const TabPane = Tabs.TabPane;

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (activeKey) => {
        var activePage = {};

        this.props.panes.forEach((item) => {
            if (item.id === activeKey) {
                activePage = item;
                return;
            }
        });

        if (Object.keys(activePage).length == 0) {
            return;
        }

        this.props.getActiveMenu({
            id: activePage.id,
            name: activePage.name,
            path:activePage.path,
        });
        this.props.history.push(activePage.path);
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        var currentIndex = 0;
        var activePage = {};

        this.props.panes.forEach((item, index) => {
            if (item.id === targetKey) {
                currentIndex = index;
                return;
            }
        });
        this.props.removePane(currentIndex);

        // 不是关闭当前面板，就不用跳转路由和获取新的activeMenu
        if (targetKey === this.props.activeMenu.id) {
            const prevPane = this.props.panes[currentIndex-1];

            this.props.history.push(prevPane.path);
            this.props.getActiveMenu({
                id: prevPane.id,
                name: prevPane.name,
                path:prevPane.path,
            });
        }
    };

    componentDidMount() {
        this.props.addPane({
            id: this.props.activeMenu.id,
            name: this.props.activeMenu.name,
            path:this.props.activeMenu.path,
            content: this.props.children,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.props)
        // console.log(nextProps)

        // 在panes的个数为0的时候，防止其他异步操作或与panes无关的状态更新的干扰
        if (this.props.panes.length == 0) {
            return true;
        }

        // 当前activeMenu没有改变的时候，如果panes也没有改变则不需要重新render
        if (this.props.activeMenu.id === nextProps.activeMenu.id) {
            if (this.props.panes.length != nextProps.panes.length) {
                return true;
            } else {
                return false;
            }
        }

        const existPane = this.props.panes.filter(item => { return item.id == nextProps.activeMenu.id });

        if (existPane.length == 0) {
            this.props.addPane({
                id: nextProps.activeMenu.id,
                name: nextProps.activeMenu.name,
                path:nextProps.activeMenu.path,
                content: nextProps.children,
            });
        }
        return true;
    }

    render() {
        if (this.props.panes.length == 0) {
            return null;
        }
        return (
            <main>
                <Tabs hideAdd onChange={this.onChange} onEdit={this.onEdit} activeKey={this.props.activeMenu.id} type="editable-card">
                    {this.props.panes.map((pane, index) =>
                        <TabPane tab={pane.name} key={pane.id} closable={index > 0}>
                            <SwitchContainer id={pane.id} exact path={pane.path}/>
                        </TabPane>
                    )}
                </Tabs>
                {/* {this.props.children} */}
            </main>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        activeMenu: state.activeMenu,
        panes: state.panes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPane: (pane) => dispatch(addPaneAction(pane)),
        removePane: (currentIndex) => dispatch(removePaneAction(currentIndex)),
        getActiveMenu: (activeMenu) => dispatch(getActiveMenuAction(activeMenu)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));