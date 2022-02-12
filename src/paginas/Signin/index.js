import React, { Component,  useState} from 'react'
import LuzLogin from '../../components/modulos/LuzLogin';

import { doLogin } from '../../helpers/AuthHandler';
import api from '../../helpers/ApiClientes';

export default (props) => {

    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setDisabled(true);
        setError('');
        api.post("http://contaspr.test/api/auth/login",  {email, password} )
        .then((response) => {
            let result = response.data;
            if(result.error){
                setError(result.error)
            }else{
                doLogin(result.token, rememberPassword);
                window.location.href = "/";
            }
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
        setDisabled(false);
    }

        return (
            <div>
                 <LuzLogin />
            <div className="container-login">
               
                <div className="login">
                    <form onSubmit={handleSubmit}>
                    <div className="titulopopup">
                    <span id="titulo" class="page-title tpopup">Login :</span>
                        <a href="#" >
                            <img src="/img/fecharpopup.png" height={25} width={25} border={0}  />
                        </a>
                    </div>
                    <div class="conteudopopup">
                    <div>
                    <div className="row-fluid">
                        <span className="span10">E-mail:<br />
                        <input 
                             type="email"
                             disabled={disabled} 
                             value={email}
                             className="obrigatorio span12"
                             onChange={e=>setEmail(e.target.value)}
                             required
                        />
                        </span>
                    </div>
                    <div className="row-fluid">
                        <span className=" span7">Senha:<br />
                        <input 
                            type="password"
                            disabled={disabled} 
                            value={password}
                            className="obrigatorio span12"
                            onChange={e=>setPassword(e.target.value)}
                            required
                        />
                        </span>
                        <span className=" span1"><br />
                        </span><br />
                    </div>
                    <div className="row-fluid">
                        <span className=" span7">Lembrar senha:<br />
                        <input type="checkbox" 
                             disabled={disabled} 
                             checked={rememberPassword}
                             onChange={()=>setRememberPassword(!rememberPassword)}
                             />
                        </span>
                        <span className=" span1"><br />
                        </span><br />
                    </div>
                  
                    <div className="row-fluid">
                        <center>
                        <button className="btn btn-primary" >Fazer Login</button>
                        </center>
                    </div>
                    <div className="row-fluid">
                        <span className="text-error">{error}</span>
                    </div>
                    </div>
                    </div> 
                    </form>
                </div> 
            </div>
            </div>
        )
    }
 