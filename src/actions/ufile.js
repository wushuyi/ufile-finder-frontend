/**
 * Created by wushuyi on 2017/3/13.
 */
import * as types from '../constants/UfileTypes'
import * as settings from '../settings'
import request from 'superagent'
import {getUpPath} from '../utils'

function switchDir(files, nowPath) {
    return {
        type: types.SWITCHDIR,
        files: files,
        nowPath: nowPath
    }
}

function addFile(fileItem) {
    return {
        type: types.ADDFILE,
        data: fileItem
    }
}

export function UFileInit() {
    let nowPath = '/';
    return dispatch => {
        request
            .get(settings.restfulService + '/ufile')
            .query({where: '{"rootPath": "' + nowPath + '"}'})
            .query({sort: '-isdir'})
            .end(function (err, res) {
                dispatch(switchDir(res.body, nowPath))
            });
    }
}

export function switchDirXHR(nowPath) {
    return dispatch => {
        request
            .get(settings.restfulService + '/ufile')
            .query({where: '{"rootPath": "' + nowPath + '"}'})
            .query({sort: '-isdir'})
            .end(function (err, res) {
                dispatch(switchDir(res.body, nowPath))
            });
    }
}

export function uploadFileXHR(fpath, file) {
    return dispatch => {
        let rootPath = fpath;
        let path = getUpPath(fpath + file.name);
        new Promise(function (resolve, reject) {
            request
                .post(settings.restfulService + '/getauth')
                .send({
                    "method": "POST",
                    "bucket": settings.UFileBucket,
                    "key": path,
                    "mime_type": file.type
                })
                .end(function (err, res) {
                    if (err || !res.ok) {
                        reject();
                    } else {
                        resolve(res.body.key)
                    }
                });
        })
            .then(function (key) {
                let form = new FormData();
                form.append('FileName', path);
                form.append('Authorization', key);
                form.append('file', file, path);
                return new Promise(function (resolve, reject) {
                    request
                        .post(settings.UFileService)
                        .send(form)
                        .end(function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            resolve(res.header['etag'])
                        });
                });
            })
            .then(function (etag) {
                let data = {
                    rootPath: rootPath,
                    path: '/' + path,
                    isdir: false,
                    info: {
                        etag: etag,
                        size: file.size,
                        mime_type: file.type,
                    }
                };
                return new Promise(function (resolve, reject) {
                    request
                        .post(settings.restfulService + '/ufile')
                        .send(data)
                        .end(function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            resolve(res);
                        });
                });
            })
            .then(function (res) {
                return new Promise(function (resolve, reject) {
                    request
                        .get(settings.restfulService + '/ufile/' + res.body._id)
                        .end(function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            resolve(res);
                        })
                })
            })
            .then(function (res) {
                dispatch(addFile(res.body))
            })
    }
}

export function addDirXHR(fpath, fname) {
    return dispatch => {
        let data = {
            rootPath: fpath,
            path: fpath + fname,
            isdir: true
        };
        console.log(data);
        new Promise(function (resolve, reject) {
            request
                .post(settings.restfulService + '/ufile')
                .send(data)
                .end(function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
        })
            .then(function (res) {
                return new Promise(function (resolve, reject) {
                    request
                        .get(settings.restfulService + '/ufile/' + res.body._id)
                        .end(function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            resolve(res);
                        })
                })
            })
            .then(function (res) {
                dispatch(addFile(res.body))
            })
    }
}

export function showInfo(data, show) {
    return {
        type: types.SHOW_INFO,
        data,
        show
    }
}