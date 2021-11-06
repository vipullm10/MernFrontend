import React,{useState} from 'react';
import Base from '../core/Base';
import { Link,Redirect } from 'react-router-dom';
import {signIn,authenticate,isAuthenticated} from '../auth/helper'

const Signin = () => {

    const [values,setValues] = useState({
        email:"",
        password:"",
        error:false,
        loading:false,
        didRedirect:false,
        errorMessageText:""
    });

    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signIn({email,password})
            .then(data => {
                if(data.error){
                    setValues({...values,error:true,errorMessageText:data.error,loading:false});
                    return;
                }
                authenticate(data,() => {
                    setValues({...values,didRedirect:true});
                })
            })
            .catch(error => {
                console.log("Sign in req failed",error)
            });
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role===1){
                return <p>redirect to admin</p>;
            }else{
                return <p>redirect to user dashboard</p>;
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />;
        }
    }


    const {email,password,error,loading,didRedirect,errorMessageText} = values;
    const {user} = isAuthenticated();

    const loadingMessage = () => {
        return(
            loading && (
                <div className='alert alert-info'>
                    <h2>Loading ...</h2>
                </div>
            )
        );
    }

    const errorMessage = () => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className='alert alert-danger' style={{display:error ? "" : "none"}}>
                        {errorMessageText} 
                    </div>
                </div>
            </div>
        )
    }


    const signInForm = () => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input className='form-control' value={email} onChange={handleChange("email")} type='email'></input>
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input className='form-control' value={password} onChange={handleChange("password")} type='password'></input>
                        </div>
                        <button className='btn btn-success w-100 mt-3' onClick={onSubmit}>Submit</button>
                    </form>
                </div>    
            </div>
        );
    }

    return(
        <Base title='Sign in page' description='A page for user to sign in!'>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className='text-white text-center'>{JSON.stringify(values)}</p>
        </Base>
    );
}


export default Signin;