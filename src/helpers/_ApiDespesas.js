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

    getDespesas: async (id) =>{
        const json = await apiFetchGet(
            '/despesas'
        );
        return json;
    },

    getDespesa: async (id) => {
        const json = await apiFetchGet(
            '/lastdespesas/'+id,
        );
        return json;
    },

    contasPagas: async (fData) => {
        const json = await apiFetchGet(
            '/contaspagas',
        );
        return json;
    },

    
    
}

export default () => Api;