import React,{useState} from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signUp } from '../auth/helper/index';

const Signup = () => {

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false,
        errorMessageText:""
    });

    const {name,email,password,error,success,errorMessageText} = values;

    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:false});
        signUp({name,email,password})
            .then(data => {
                if(data.errorMessage){
                    setValues({...values,error:true,success:false,errorMessageText:data.errorMessage})
                    return 
                }
                setValues({...values,name:'',email:'',password:'',success:true,error:false});
            })
            .catch(err => console.log(err));
    }

    const signUpForm = () => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className='form-group'>
                            <label className='text-light'>Name</label>
                            <input className='form-control' onChange={handleChange("name")} value={name} type='text'></input>
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input className='form-control' onChange={handleChange("email")} value={email} type='email'></input>
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input className='form-control' onChange={handleChange("password")} value={password} type='password'></input>
                        </div>
                        <button onClick={onSubmit} className='btn btn-success w-100 mt-3'>Submit</button>
                    </form>
                </div>    
            </div>
        );
    }

    const successMessage = () => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className='alert alert-success' style={{display:success ? "block" : "none"}}>
                        New account was created successfully . Please <Link to='/signin'>Login here</Link>
                    </div>
                </div>
            </div>
        )
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

    return(
        <Base title='Sign up page' description='A page for user to sign up!'>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className='text-white text-center'>{JSON.stringify(values)}</p>
        </Base>
    );
}


export default Signup;