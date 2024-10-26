import { useState, useEffect } from 'react'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'

import { IconContext } from "react-icons";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

function Signup(props:any) {
    const [name, setName] = useState('')

    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [currerror, setCurrerror] = useState<string>()

    const [showpw1, setShowpw1] = useState(true)
    const [showshow1, setShowshow1] = useState('flex')
    const [showhide1, setShowhide1] = useState('none')
    const [texttype1, setTexttype1] = useState('password')
    useEffect(()=>{
        if (showpw1){
            setShowshow1('flex')
            setShowhide1('none')
            setTexttype1('password')
        } else {
            setShowshow1('none')
            setShowhide1('flex')
            setTexttype1('text')
        }
    }, [showpw1])
    const [showpw2, setShowpw2] = useState(true)
    const [showshow2, setShowshow2] = useState('flex')
    const [showhide2, setShowhide2] = useState('none')
    const [texttype2, setTexttype2] = useState('password')
    useEffect(()=>{
        if (showpw2){
            setShowshow2('flex')
            setShowhide2('none')
            setTexttype2('password')
        } else {
            setShowshow2('none')
            setShowhide2('flex')
            setTexttype2('text')
        }
    }, [showpw2])

    const hitSignUp = () => {
        if (password1==''|| password2==''){
            setCurrerror(
                'Please fill in all fields'
            )
        } else if (password1!=password2){
            setCurrerror(
                "Your passwords don't match"
            )
        } else {
            createUserWithEmailAndPassword(auth, email, password1)
                .then(
                    async function(){
                        if (auth.currentUser){
                            updateProfile(auth.currentUser, {
                                displayName: name
                            })
                        }
                        window.location.href=window.location.href.slice(0,-5)+'scanner'
                    }
                )
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
                <input className="w-full" type='text' placeholder='Name' value={name} onChange={(e) => {setName(e.target.value)}}/>
            </div>
            <div className="input">
                <input className="w-full" type={texttype1} placeholder='Password' value={password1} onChange={(e) => {setPassword1(e.target.value)}}/>
                <IconContext.Provider value={{ size: "1.5rem", color: "black" }}>
                    <BiSolidShow className="cursor-pointer" style={{ display: showshow1 }} onClick={()=>{
                        setShowpw1(false)
                    }}/>
                    <BiSolidHide className="cursor-pointer" style={{ display: showhide1 }} onClick={()=>{
                        setShowpw1(true)
                    }}/>
                </IconContext.Provider>
            </div>
            <div className="input">
                <input className="w-full" type={texttype2} placeholder='Confirm password' value={password2} onChange={(e) => {setPassword2(e.target.value)}}/>
                <IconContext.Provider value={{ size: "1.5rem", color: "black" }}>
                    <BiSolidShow className="cursor-pointer" style={{ display: showshow2 }} onClick={()=>{
                        setShowpw2(false)
                    }}/>
                    <BiSolidHide className="cursor-pointer" style={{ display: showhide2 }} onClick={()=>{
                        setShowpw2(true)
                    }}/>
                </IconContext.Provider>
            </div>
            <button className="w-full" onClick={hitSignUp}>Sign Up</button>
        </>
    )
}

export default Signup