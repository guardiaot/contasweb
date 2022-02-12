import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://contaspr.test/api';

const apiFetchFile = async (endpoint, body) => {
    if(!body.token){
        let token = Cookies.get('token');
        if(token) {
            body.append('token',token);
        }
    }
    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        body
    })

    const json = await res.json();

    if(json.notallowed){
        window.location.href = "/signin";
        return;
    }
    return json;  
}
const apiFetchPost = async (endpoint, body) => {
    if(!body.token){
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    })

    const json = await res.json();

    if(json.notallowed){
        window.location.href = "/signin";
        return;
    }
    return json;
}
const apiFetchGet = async (endpoint, body = []) => {
    if(!body.token){
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`)
    const json = await res.json();

    if(json.notallowed){
        window.location.href = "/signin";
        return;
    }
    return json;
}


const Api = {
    login: async (email, password) => {
       const json = await apiFetchPost(
           '/auth/login',
           {email, password}
       );

       return json;
    },




};

export default () => Api;

/*
Get /user/me (token)
Put /user/me (token , name, email, satate, password)

post /ad/{id} (token,status, title,category,price,priceNegotiable,description, images, img[])


*/