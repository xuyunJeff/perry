// import axios from "axios";
import store from "../store";
import router from "../router";
import { Toast } from 'vant';
// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_URL, // api 的 VUE_APP_URL
    timeout: 50000 // 请求超时时间(因为需要调试后台,所以设置得比较大)
});

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
    config => {
        if (store.state.token) {
            // 给请求头添加laohu-token
            config.headers["user-token"] = store.state.token;
            config.headers["set-cookie"] = store.state.token;
            config.headers["username"] = store.state.username;
            // config.headers.cookie = store.state.token
        }
        config.data = removeEmptyField(config.data)
        return config;
    },
    error => {
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// response 拦截器,数据返回后进行一些处理
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data;
        if (res.code == "0") {
            return res;
        } else if (res.code == "-1" || res.code == "500" ) {
            // code为603代表token已经失效,
            // 提示用户,然后跳转到登陆页面
            Toast.fail(res.msg);
            router.push("/login");
        } else {
            Promise.reject("Unknown Error");
        }
    },
    error => {
        Promise.reject("Internet Error");
    }
);

// 去除json对象中的空属性
function removeEmptyField(obj) {
    var newObj = {};
    if(typeof obj == "string"){
        obj = JSON.parse(obj);
    }
    if(obj instanceof Array){
        newObj = [];
    }
    if(obj instanceof Object){
        for(var attr in obj){
            if(obj.hasOwnProperty(attr) && obj[attr] !== "" && obj[attr] !== null && obj[attr] !== undefined){
                if(obj[attr] instanceof Object){
                    newObj[attr] = removeEmptyField(obj[attr]);
                }else if(typeof obj[attr] == "string" && ((obj[attr].indexOf("{") > -1 && obj[attr].indexOf("}") > -1) || (obj[attr].indexOf("[") > -1 && obj[attr].indexOf("]") > -1))){
                    try{
                        var attrObj = JSON.parse(obj[attr]);
                        if(attrObj instanceof Object){
                            newObj[attr] = removeEmptyField(attrObj);
                        }
                    }catch (e){
                        newObj[attr] = obj[attr];
                    }
                }else{
                    newObj[attr] = obj[attr];
                }
            }
        }
    }
    return newObj;
}

export default service;
