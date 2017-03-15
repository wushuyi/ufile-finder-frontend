/**
 * Created by wushuyi on 2017/3/14.
 */
import React from 'react'
import {Button, Icon, Modal, Card} from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../actions/ufile'
import * as setting from '../settings'


class FileInfo extends React.Component {


    handleCancel = (e) => {
        this.props.actions.showInfo({}, false);
    };

    createCar = () => {
        if (!this.props.show) {
            return ''
        }
        let data = this.props.data;
        let src;
        if (data.info.mime_type.indexOf('image') >= 0) {
            src = setting.UFileCdnService + data.path;
            src = <p><img style={{maxWidth: '100%'}} src={src} alt=""/></p>
        }

        return (
            <Card>
                { src }
                <p>创建时间: {data._created}</p>
                <p>更新时间: {data._updated}</p>
                <p>文件名: {data.path}</p>
                <p>文件大小: {data.info.size}</p>
                <p>文件类型: {data.info.mime_type}</p>
                <p>cdn链接: {'http:' + setting.UFileCdnService + data.path}</p>
            </Card>
        )
    }

    render() {
        return (
            <Modal
                visible={this.props.show}
                title="文件信息"
                onCancel={this.handleCancel}
                footer={null}
                maskClosable={false}
            >
                {this.createCar()}
            </Modal>
        )
    }
}

FileInfo.propTypes = {
    data: React.PropTypes.object.isRequired,
    show: React.PropTypes.bool.isRequired,
    actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        data: state.ufile.showinfo.data,
        show: state.ufile.showinfo.show,
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
)(FileInfo)