import { useState, useEffect } from 'react'
import Signin from '../onboard/signin'
import Signup from '../onboard/signup'

function Login(props:any) {
    const [pageState, setPageState] = useState('signin')
    const [signinState, setSigninState] = useState('flex')
    const [signupState, setSignupState] = useState('none')
    const [textState, setTextState] = useState('Sign In')
    const [width1, setWidth1] = useState('0%')
    const [width2, setWidth2] = useState('50%')
    const [pad1, setPad1] = useState('0')
    const [pad2, setPad2] = useState('1rem')
    const [textOpacity, setTextOpacity] = useState('1')
    useEffect(()=>{
        setTimeout(function(){
            if (pageState=='signup'){
                setWidth1('50%')
                setWidth2('0%')
                setPad1('1rem')
                setPad2('0')
                setSigninState('none')
                setSignupState('flex')
                setTextState('Sign Up')
            } else {
                setWidth1('0%')
                setWidth2('50%')
                setPad1('0')
                setPad2('1rem')
                setSigninState('flex')
                setSignupState('none')
                setTextState('Sign In')
            }
        }, 100)
    }, [pageState])

    return (
        <>
            <img className="w-8 h-8" src="/neodev.svg"/>
            <h1>[Name]</h1>
            <div className="h-8"/>
            <div className="rounded-lg bg-gray-500 box-border p-2 w-96">
                <div className="flex flex-row items-center align-center rounded-lg overflow-hidden bg-gray-600 h-[50px]">
                    <div style={{ transition: 'width 1s, padding 1s', width: width1, padding: pad1 }} className="overflow-hidden box-border flex items-center align-center cursor-pointer" onClick={()=>{
                        if (pageState=='signup'){
                            setPageState('signin')
                            setTextOpacity('0')
                            setTimeout(function(){setTextOpacity('1')}, 750)
                        }
                    }}>
                        <p style={{ transition: 'opacity 0.25s', opacity: textOpacity }} className="text-center text-white w-full">Sign In</p>
                    </div>
                    <div className="overflow-hidden box-border flex w-1/2 items-center align-center p-4 cursor-pointer bg-white">
                        <p style={{ transition: 'opacity 0.25s', opacity: textOpacity }} className="items-center align-center text-center text-black w-full">{textState}</p>
                    </div>
                    <div style={{ transition: 'width 1s, padding 1s', width: width2, padding: pad2 }} className="overflow-hidden box-border flex items-center align-center cursor-pointer" onClick={()=>{
                        if (pageState=='signin'){
                            setPageState('signup')
                            setTextOpacity('0')
                            setTimeout(function(){setTextOpacity('1')}, 750)
                        }
                    }}>
                        <p style={{ transition: 'opacity 0.25s', opacity: textOpacity }} className="text-center text-white w-full">Sign Up</p>
                    </div>
                </div>  
            </div>
            <div style={{ display: signinState }} className="w-96 flex flex-col gap-4">
                <Signin/>
            </div>
            <div style={{ display: signupState }} className="w-96 flex flex-col gap-4">
                <Signup userID={props.userID}/>
            </div>
        </>
    )
}
  
export default Login