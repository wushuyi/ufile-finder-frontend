/**
 * Created by wushuyi on 2017/3/13.
 */
import {Card} from 'antd'
import React, {Component} from 'react'

export class ItemCar extends Component {
    render() {
        return (
            <Card style={{width: 120}} bodyStyle={{padding: 4}}>
                <div className="custom-image">
                    <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
                </div>
                <div className="custom-card">
                    <h3>Europe Street beat</h3>
                    <p>www.instagram.com</p>
                </div>
            </Card>
        )
    }
}
