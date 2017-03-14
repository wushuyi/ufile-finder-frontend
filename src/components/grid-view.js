/**
 * Created by wushuyi on 2017/3/13.
 */
import React from 'react'
import GrideViewItem from './grid-view-item'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../actions/ufile'


class GridView extends React.Component {

    get_mime_type(data) {
        return data.isdir ? 'dir-large' : 'default-large'
    }

    get_file_name(data) {
        let res = data.path.split("/");
        return res[res.length - 1];
    }

    onClick() {
        let that = this;
        return function (proxy, event) {
            event.preventDefault();
            if (this.props.data.isdir) {
                that.props.actions.switchDirXHR(this.props.data.path + '/');
            } else {
                console.log(this.props.data);
            }
        }
    }

    render() {
        let items = [];
        if (this.props.data._items) {
            let data;
            for (let i = 0; i < this.props.data._items.length; i++) {
                data = this.props.data._items[i];
                items.push(<GrideViewItem
                    key={i}
                    data={data}
                    mime_type={this.get_mime_type(data)}
                    file_name={this.get_file_name(data)}
                    onClick={this.onClick()}
                ></GrideViewItem>)
            }
        } else {
            this.props.actions.UFileInit();
        }
        return <div>{ items }</div>;
    }
}

GridView.propTypes = {
    data: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        data: state.ufile.files
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
)(GridView)