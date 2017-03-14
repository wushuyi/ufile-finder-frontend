/**
 * Created by wushuyi on 2017/3/14.
 */
import React from 'react'
import {connect} from 'react-redux'

class PathView extends React.Component {
    render() {
        return (
            <div>
                {this.props.path}
            </div>
        )
    }
}

PathView.propTypes ={
    path: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        path: state.ufile.nowPath
    }
}

export default connect(
    mapStateToProps
)(PathView)