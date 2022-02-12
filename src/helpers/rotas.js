import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://contaspr.test/api';



     apiFetchFile: async (endpoint, body) => {
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
    
    apiFetchPost: async (endpoint, body) => {
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
    
    apiFetchGet: async (endpoint, body = []) => {
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
