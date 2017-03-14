/**
 * Created by wushuyi on 2017/3/13.
 */
new Promise(function (resolve, reject) {
    resolve(1)
}).then(function (value) {
    console.log(value)
    return new Promise(function (resolve, reject) {
        resolve(2)
    })
}).then(function (value) {
    console.log(value)
});

