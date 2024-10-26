import { db, auth } from "../../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";

function Scan() {
    const [uid, setUid] = useState('')
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            setUid(user.uid)
            // ...
        } else {
            window.location.href=window.location.href.slice(0, -7)+'login'
        }
    });

    return (
        <>
            <div className="flex flex-col w-full h-full gap-16 p-32">
                <div className="flex flex-row gap-8 items-center justify-center">
                    <a href={window.location.href.slice(0, -7)}>
                        <div className="cursor-pointer group h-32 w-32 lg:h-48 lg:w-48">
                            <div className="group h-32 w-32 lg:h-48 lg:w-48 group-hover:[transform:rotateY(180deg)] transition-[transform] duration-1000">
                                <img className="h-32 w-32 lg:h-48 lg:w-48 opacity-0 absolute brightness-0 invert -z-10 group-hover:z-10 group-hover:opacity-100 transition-[opacity] transition-[z-index] delay-450" src="neodev.svg"></img>
                                <img className="h-32 w-32 lg:h-48 lg:w-48 absolute" src="neodev.svg"></img>
                            </div>
                        </div>
                    </a>
                    <div className="flex flex-col gap-8 items-center justify-center">
                        <button className="w-full">Scan</button>
                        <button onClick={()=>{
                            signOut(auth).then(() => {
                                window.location.href=window.location.href.slice(0, -7)
                            }).catch((error) => {
                                // An error happened.
                            });
                        }}>Logout</button>
                    </div>
                </div>
                <div className="flex flex-col border-2 border-white grow">

                </div>
            </div>
        </>
    )
}
  
export default Scan