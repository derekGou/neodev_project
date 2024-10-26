import { useState, useEffect } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

import { IconContext } from "react-icons";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

function Signin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [currerror, setCurrerror] = useState<string>()

    const [showpw, setShowpw] = useState(true)
    const [showshow, setShowshow] = useState('flex')
    const [showhide, setShowhide] = useState('none')
    const [texttype, setTexttype] = useState('password')
    useEffect(()=>{
        if (showpw){
            setShowshow('flex')
            setShowhide('none')
            setTexttype('password')
        } else {
            setShowshow('none')
            setShowhide('flex')
            setTexttype('text')
        }
    }, [showpw])

    const hitSignIn = () => {
        if (password==''){
            setCurrerror(
                'Please fill in all fields'
            )
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                    window.location.href=window.location.href.slice(0,-5)+'scanner'
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log([errorCode, errorMessage])
                });
        }
    }

    return (
        <>
            <p className='w-full text-center text-red-600 mt-4'>{currerror}</p>
            <div className="input">
                <input className="w-full" type='text' placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className="input">
                <input className="w-full" type={texttype} placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <IconContext.Provider value={{ size: "1.5rem", color: "black" }}>
                    <BiSolidShow className="cursor-pointer" style={{ display: showshow }} onClick={()=>{
                        setShowpw(false)
                    }}/>
                    <BiSolidHide className="cursor-pointer" style={{ display: showhide }} onClick={()=>{
                        setShowpw(true)
                    }}/>
                </IconContext.Provider>
            </div>
            <button className="w-full" onClick={hitSignIn}>Sign In</button>
        </>
    )
}

export default Signin