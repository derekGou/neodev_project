import { db, auth } from "../../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useRef, useEffect } from "react";
import { FaFileDownload } from "react-icons/fa";
import { IconContext } from "react-icons";
import { BiSolidShow } from "react-icons/bi";
import { AiOutlineScan } from "react-icons/ai";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { Group } from "three/examples/jsm/libs/tween.module.js";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';

const ObjModel = ({ url }) => {
    const obj = useLoader(OBJLoader, url);
  
    return <primitive object={obj} />;
  };
  
  const ObjViewer = ({ url }) => (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ObjModel url={url} />
      <OrbitControls /> {/* Adds interactive controls */}
    </Canvas>
  );
  

function Scan() {
    const [uid, setUid] = useState('')
    const [currUser, setCurrUser] = useState<any[]>([])
    const [files, setFiles] = useState([])
    const [link, setLink] = useState<JSX.Element>()
    const [frame, setFrame] = useState<any>()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            setUid(user.uid)
            // ...
            if (currUser.length==0){
                setCurrUser([user.uid, user.displayName])
            }
        } else {
            window.location.href=window.location.href.slice(0, -7)+'login'
        }
    });

    const download = (file: string) => {
        var currRef = useRef<HTMLAnchorElement>(null)
        setLink(
            <a href={file} download ref={currRef}/>
        )
        setTimeout(function(){
            currRef.current?.click()
            currRef.current?.remove()
        }, 10)
    }

    const runScan = async () => {
        const response = await fetch("localhost:5000/api", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: JSON.stringify(uid),
        })
    }

    useEffect(()=>{
        var rows: JSX.Element[] = []
        for (let i = 0; i<files.length; i++){
            rows.push(
                <div className="p-4 gap-4 flex flex-row border-[1px] border-white items-center align-center">
                    <div className="p-2 bg-[#234] cursor-pointer hover:brightness-200">
                        <FaFileDownload/>
                    </div>
                    <div className="flex flex-col grow">
                        <p className="text-[0.8rem]">{files[i][0]}</p>
                        <p className="text-[0.6rem]">{files[i][1]}</p>
                    </div>
                    <div className="p-2 bg-[#234] cursor-pointer hover:brightness-200">
                        <BiSolidShow/>                            
                    </div>
                </div>
            )
        }
    }, [files])

    return (
        <>
            <div className="flex flex-col w-full h-full gap-16 p-32">
                <div className="flex flex-row gap-8 items-center justify-center">
                    <a href={window.location.href.slice(0, -7)}>
                        <div className="cursor-pointer group h-48 w-48">
                            <div className="group h-48 w-48 group-hover:[transform:rotateY(180deg)] transition-[transform] duration-1000">
                                <img className="h-48 w-48 opacity-0 absolute brightness-0 invert -z-10 group-hover:z-10 group-hover:opacity-100 transition-[opacity] transition-[z-index] delay-450" src="neodev.svg"></img>
                                <img className="h-48 w-48 absolute" src="neodev.svg"></img>
                            </div>
                        </div>
                    </a>
                    <div className="flex flex-col gap-4">
                        <h1>{'Welcome '+currUser[1]}</h1>
                        <button className="gap-2 w-fit">
                            <AiOutlineScan/>
                            Scan
                        </button>
                    </div>
                </div>
                <div className="flex flex-col border-2 border-white grow">
                <ObjViewer url="texturedMesh.obj"/>
                </div>
                <button className="w-full" onClick={()=>{
                    signOut(auth).then(() => {
                        window.location.href=window.location.href.slice(0, -7)
                    }).catch((error) => {
                        // An error happened.
                    });
                }}>Logout</button>
            </div>
        </>
    )
}
  
export default Scan