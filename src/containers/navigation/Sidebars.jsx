import { connect } from 'react-redux'
import {
    withRouter,
} from 'react-router-dom'
import { Menu, Icon, Button } from 'antd';
import { getActiveMenuAction } from './../../actions/menuAction'

const SubMenu = Menu.SubMenu;

class Sidebars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    linkToActivePage = (activeMenu) => {
        this.props.getActiveMenu({
            id: activeMenu.id,
            name: activeMenu.name,
            path: activeMenu.path,
        });
        this.props.history.push(activeMenu.path);
    };

    getMenus = (menus) => {
        return menus.map((item) => {
            if (item.subMenus && item.subMenus.filter(item=>{return !item.isDetail}).length > 0) {
                return (
                    <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                        {this.getMenus(item.subMenus)}
                    </SubMenu>
                );
            } else {
                if (!item.isDetail) {
                    return (
                        <Menu.Item key={item.id}>
                            <a onClick={this.linkToActivePage.bind(this, item)}>
                                <Icon type={item.icon} /><span>{item.name}</span>
                            </a>
                        </Menu.Item>
                    );
                }
            }
        });
    };

    shouldComponentUpdate = () => {
        return true;
    }

    render() {
        if (this.props.menus.length == 0) {
            return null;
        }
        return (
            <aside>
                <Button type="primary" onClick={this.toggleCollapsed}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu defaultSelectedKeys={['0']} mode="inline" theme="drak" inlineCollapsed={this.state.collapsed}>
                    {this.getMenus(this.props.menus)}
                </Menu>
            </aside>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        menus: state.menus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getActiveMenu: (menuItem) => {
            dispatch(getActiveMenuAction(menuItem));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebars));

