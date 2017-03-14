/**
 * Created by wushuyi on 2017/3/14.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Button, Icon, Modal} from 'antd'
import * as Actions from '../actions/ufile'
import {bindActionCreators} from 'redux'
import request from 'superagent'
import * as settings from '../settings'
import {getPrevePath} from '../utils'
import {InputModal} from './input-modal'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
    }

    goPrvePath(proxy) {
        let path = getPrevePath(this.props.path);
        this.props.actions.switchDirXHR(path);
    }

    uploadFile(proxy) {
        let that = this;
        proxy.preventDefault();
        let file = proxy.target.files[0];
        proxy.target.value = '';
        this.props.actions.uploadFileXHR(this.props.path, file);
    }

    showModal = () => {
        this.setState({
                showModal: true
            }
        );
    };

    createDir = (dirname) => {
        this.props.actions.addDirXHR(this.props.path, dirname);
    }

    render() {
        return (
            <div>
                <Button.Group>
                    <Button
                        disabled={this.props.path === '/' ? 'disabled' : ''}
                        type="primary"
                        onClick={this.goPrvePath.bind(this)}>
                        <Icon type="rollback"/>返回上级</Button>
                    <Button type="primary" style={{
                        position: 'relative'
                    }}>
                        <Icon type="upload"/>上传文件
                        <input type="file" style={{
                            overflow: 'hidden',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            opacity: 0,
                            width: '101%',
                            height: '101%'
                        }} onChange={this.uploadFile.bind(this)}/>
                    </Button>
                    <Button type="primary" onClick={this.showModal}><Icon type="folder-add"/>新建文件夹</Button>
                </Button.Group>
                <InputModal prveNode={this} visible={this.state.showModal} createDir={this.createDir}></InputModal>
            </div>
        )
    }
}

Header.propTypes = {
    path: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        path: state.ufile.nowPath
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)