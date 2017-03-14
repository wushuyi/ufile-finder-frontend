/**
 * Created by wushuyi on 2017/3/14.
 */
export function getPrevePath(path) {
    let res = path.split('/');
    res.pop();
    res.pop();
    return res.join('/') + '/';
}

export function getUpPath(path) {
    let res = path.split('/');
    res.shift();
    return res.join('/');
}