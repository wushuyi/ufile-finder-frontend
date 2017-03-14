/**
 * Created by wushuyi on 2017/3/8.
 */
import {Upload, message, Button, Icon} from 'antd';
import React from 'react'
import request from 'superagent'

let cache = {};
const props = {
    name: 'file',
    action: 'http://libs.cn-bj.ufileos.com/',
    beforeUpload(file, fileList){
        console.log(file);
        console.log(fileList);
        let rootPath = 'media/images/';
        let path = rootPath + file.name;
        new Promise(function (resolve, reject) {
            request
                .post('http://127.0.0.1:5000/getauth')
                .send({
                    "method": "POST",
                    "bucket": "libs",
                    "key": path,
                    "mime_type": file.type
                })
                .end(function (err, res) {
                    if (err || !res.ok) {
                        reject();
                    } else {
                        cache.authorization = res.body.key;
                        resolve(res.body.key)
                    }
                });
        }).then(function (key) {
            let form = new FormData();
            form.append('FileName', path);
            form.append('Authorization', cache.authorization);
            form.append('file', file, path);
            return new Promise(function (resolve, reject) {
                request
                    .post('http://libs.cn-bj.ufileos.com/')
                    .send(form)
                    .end(function (err, res) {
                        if (err) {
                            reject(err);
                        }
                        console.log(res);
                        resolve(res.header['etag'])
                    });
            });
        }).then(function (etag) {
            let data = {
                rootPath: 'rootPath',
                path: '/' + path,
                isdir: false,
                info: {
                    etag: etag,
                    size: file.size,
                    mime_type: file.type,
                }
            };
            return new Promise(function (resolve, rejcet) {
                request
                    .post('http://127.0.0.1:5000/ufile')
                    .send(data)
                    .end(function (err, res) {
                        if (err) {
                            rejcet(err);
                        }
                        resolve(res);
                    });
            });
        });
        return false;
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export class MyUpload extends React.Component {
    render() {
        return (
            <Upload {...props}>
                <Button>
                    <Icon type="upload"/> Click to Upload
                </Button>
            </Upload>
        )
    }
}

