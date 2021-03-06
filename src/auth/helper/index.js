import {API} from '../../backend';

export const signUp = user => {
    return fetch(`${API}/signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            "content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const signIn = user => {
    return fetch(`${API}/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            "content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const authenticate = (data,next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}

export const signOut = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(res => console.log("Sign out success"))
        .catch(err => console.log(err));
    }
}

export const isAuthenticated = () => {
    if(typeof window !== "undefined"){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }else{
        return false;
    }
}