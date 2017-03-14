/**
 * Created by wushuyi on 2017/3/13.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd';
import * as TodoActions from '../actions'
import {bindActionCreators} from 'redux'

class Num extends React.Component {

    constructor() {
        super();

        this.state = {
            num: 0,
        }
    }

    onChange(e) {
        this.setState({
            num: parseInt(e.target.value)
        })
    }

    onAdd() {
        this.props.actions.add(this.state.num)
    }

    onSubtract() {
        this.props.actions.subtract(this.state.num)
    }

    render() {
        return (
            <div>
                <input onChange={this.onChange.bind(this)}/>
                <Button type="primary" onClick={this.onAdd.bind(this)}>add</Button>
                <Button type="danger" onClick={this.onSubtract.bind(this)}>subtract</Button>
                <p>{ this.props.number }</p>
            </div>
        )
    }
}

Num.propTypes = {
    number: React.PropTypes.number.isRequired,
    actions: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    console.log(state);
    return {
        number: state.data.num
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Num)