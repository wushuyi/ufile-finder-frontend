/**
 * Created by wushuyi on 2017/3/14.
 */
import React from 'react'
import {Input, Icon, Modal, Button} from 'antd';

export class InputModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dirName: '',
        };
    }

    emitEmpty = () => {
        this.dirNameInput.focus();
        this.setState({dirName: ''});
    };

    onChangedirName = (e) => {
        this.setState({dirName: e.target.value});
    };

    onOk = () => {
        this.props.prveNode.setState({
                showModal: false
            }
        );
        if(this.state.dirName){
            this.props.createDir(this.state.dirName);
        }
        this.setState({dirName: ''});
    };

    onCancel = () => {
        this.props.prveNode.setState({
                showModal: false
            }
        );
        this.setState({dirName: ''});
    };


    render() {
        const {dirName} = this.state;
        const suffix = dirName ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
        return (
            <Modal title="新建文件夹"
                   visible={this.props.prveNode.state.showModal}
                   onOk={this.onOk}
                   onCancel={this.onCancel}
                   maskClosable={false}
            >
                <Input
                    placeholder="文件夹名称"
                    prefix={<Icon type="folder"/>}
                    suffix={suffix}
                    value={dirName}
                    onChange={this.onChangedirName}
                    ref={node => this.dirNameInput = node}
                />
            </Modal>
        )
    }
}





