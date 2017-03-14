/**
 * Created by wushuyi on 2017/3/13.
 */
import React from 'react'
import './grid-view-item.less'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../actions/ufile'

class GradViewItem extends React.Component {

    get_mime_type() {
        return 'fileicon ' + this.props.mime_type;
    }

    render() {
        return (
            <div className="grid-view-item open-enable">
                <div className={ this.get_mime_type() } onClick={this.props.onClick.bind(this)}>
                    <img className="thumb" style={{visibility: 'hidden'}}/>
                </div>
                <div className="file-name">
                    <p>{ this.props.file_name }</p>
                </div>
            </div>
        )
    }
}

GradViewItem.propTypes = {
    mime_type: React.PropTypes.string.isRequired,
    file_name: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
};


export default GradViewItem
