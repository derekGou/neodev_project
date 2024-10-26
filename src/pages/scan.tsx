import { db, auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useRef, useEffect } from "react";
import { FaFileDownload } from "react-icons/fa";
import { IconContext } from "react-icons";
import { BiSolidShow } from "react-icons/bi";
import { AiOutlineScan } from "react-icons/ai";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { Group } from "three/examples/jsm/libs/tween.module.js";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { IoIosClose } from "react-icons/io";
import { getStorage, ref } from "firebase/storage";

const ObjModel = ({ url }) => {
  const obj = useLoader(OBJLoader, url);

  return <primitive object={obj} scale={[2, 2, 2, 2]} />;
};

const ObjViewer = ({ url }) => (
  <Canvas
    style={{
      width: "100%", // or a specific width, like '800px'
      height: "100%", // Adjust height here to make it larger
      boxSizing: "content-box",
      border: "1px solid white",
      backgroundClip: "#012",
      cursor: "default",
    }}
  >
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <ObjModel url={url} />
    <OrbitControls /> {/* Adds interactive controls */}
  </Canvas>
);

function Scan() {
  const storage = getStorage();

  const [uid, setUid] = useState("");
  const [currUser, setCurrUser] = useState<any[]>([]);
  const [files, setFiles] = useState<any>([]);
  const [link, setLink] = useState<JSX.Element>();
  const [fileShow, setFileShow] = useState<JSX.Element[]>([]);
  const [currFile, setCurrFile] = useState<string>("");
  const [show3d, setShow3d] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>("");

  onAuthStateChanged(auth, (user) => {
    if (currUser.length == 0) {
      if (user) {
        setUid(user.uid);
        setCurrUser([user.uid, user.displayName]);
      } else {
        window.location.href = window.location.href.slice(0, -7) + "login";
      }
    }
  });

  var currRef = useRef<HTMLAnchorElement>(null);
  const download = (file: string) => {
    setLink(
      <a
        href={"data:text/plain;charset=utf-8," + encodeURIComponent(file)}
        download="file.obj"
        ref={currRef}
      />
    );
    setTimeout(function () {
      currRef.current?.click();
      //   currRef.current?.remove();
    }, 10);
  };

  const runScan = async () => {
    const response = await fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: uid }),
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;
    let result = "";

    while (!done) {
      const { done: isDone, value } = await reader.read();
      done = isDone;
      if (value) {
        result += decoder.decode(value, { stream: true });
      }
    }
    setFiles((prev) => [
      ...prev,
      ["object.obj", new Blob([result]).size + "B", result],
    ]);
    
  };

  useEffect(() => {
    var rows: JSX.Element[] = [];
    for (let i = 0; i < files.length; i++) {
      rows.push(
        <div
          key={i}
          className="p-4 gap-4 flex flex-row border-[1px] border-white items-center align-center"
        >
          <div
            className="p-2 bg-[#234] cursor-pointer hover:brightness-200"
            onClick={() => {
              download(files[i][2]);
            }}
          >
            <FaFileDownload />
          </div>
          <div className="flex flex-col grow">
            <p className="text-[0.8rem]">{files[i][0]}</p>
            <p className="text-[0.6rem]">{files[i][1]}</p>
          </div>
          <div className="p-2 bg-[#234] cursor-pointer hover:brightness-200">
            <IoIosClose />
          </div>
          <div
            className="p-2 bg-[#234] cursor-pointer hover:brightness-200"
            onClick={(e) => {
              setShow3d(true);
              setCurrFile(files[i][0]);
              setCurrent(files[i][2]);
            }}
          >
            <BiSolidShow />
          </div>
        </div>
      );
    }
    setFileShow(rows);
  }, [files]);

  return (
    <>
      <div className="flex flex-col w-full h-full gap-16 p-32">
        <div className="flex flex-row gap-8 items-center justify-center">
          <a href={window.location.href.slice(0, -7)}>
            <div className="cursor-pointer group h-48 w-48">
              <div className="group h-48 w-48 group-hover:[transform:rotateY(180deg)] transition-[transform] duration-1000">
                <img
                  className="h-48 w-48 opacity-0 absolute brightness-0 invert -z-10 group-hover:z-10 group-hover:opacity-100 transition-[opacity] transition-[z-index] delay-450"
                  src="neodev.svg"
                ></img>
                <img className="h-48 w-48 absolute" src="neodev.svg"></img>
              </div>
            </div>
          </a>
          <div className="flex flex-col gap-4">
            <h1>{"Welcome " + currUser[1]}</h1>
            <button
              className="gap-2 w-fit"
              onClick={() => {
                runScan();
              }}
            >
              <AiOutlineScan />
              Scan
            </button>
          </div>
        </div>
        <div className="flex flex-col border-2 border-white grow overflow-y-scroll">
          {fileShow}
        </div>
        <button
          className="w-full"
          onClick={() => {
            signOut(auth)
              .then(() => {
                window.location.href = window.location.href.slice(0, -7);
              })
              .catch((error) => {
                // An error happened.
              });
          }}
        >
          Logout
        </button>
      </div>
      <div
        style={{ display: show3d ? "block" : "none" }}
        className="w-screen h-screen bg-[#012] p-36 z-20 fixed"
      >
        <div className="flex w-full border-[1px] border-white box-content items-center flex-row">
          <div className="ml-2 cursor-pointer" onClick={() => {}}>
            <IconContext.Provider value={{ size: "1rem", color: "white" }}>
              <FaFileDownload />
            </IconContext.Provider>
          </div>
          <p className="grow ml-2">{currFile}</p>
          <div
            className="cursor-pointer"
            onClick={() => {
              setShow3d(false);
            }}
          >
            <IconContext.Provider value={{ size: "2rem", color: "white" }}>
              <IoIosClose />
            </IconContext.Provider>
          </div>
        </div>
        <ObjViewer
          url={"data:text/plain;charset=utf-8," + encodeURIComponent(current)}
        />
      </div>
      {link}
    </>
  );
}

export default Scan;
