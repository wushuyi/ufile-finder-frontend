import React, {Component} from 'react';
import './App.less';
import {Layout} from 'antd';
import {Provider} from 'react-redux'
import GridView from './components/grid-view'
import PathView from './components/path-view'
import HeaderView from './components/header'
import {store} from './reducers'
import FileInfo from './components/file-info'


const {Header, Footer, Sider, Content} = Layout;


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
                        <FileInfo></FileInfo>
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
