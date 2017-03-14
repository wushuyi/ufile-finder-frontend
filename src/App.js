import React, {Component} from 'react';
import {WrappedHorizontalLoginForm} from './form'
import {MyUpload} from './upload'
import './App.less';
import {ItemCar} from './item-car'
import {Layout} from 'antd';
import {GradViewItem} from './components/grid-view-item'
const {Header, Footer, Sider, Content} = Layout;

import {Provider} from 'react-redux'
// import Num from './components/num'
import GridView from './components/grid-view'
import PathView from './components/path-view'
import HeaderView from './components/header'
import {store} from './reducers'





class Aaa extends Component {
    render() {
        return (
            <Layout style={{height: '100vh'}}>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>
                        <HeaderView></HeaderView>
                    </Header>
                    <Content>
                        <GridView></GridView>
                    </Content>
                    <Footer>
                        <PathView></PathView>
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Aaa/>
            </Provider>
        );
    }
}

export default App;
