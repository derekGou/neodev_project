function Landing() {
  

    return (
      <>
        <div className="box-border p-12 gap-20 min-h-screen w-screen fixed flex flex-col md:flex-row items-center justify-center">
            <div className="cursor-pointer group h-80 w-80 lg:h-96 lg:w-96">
                <div className="group h-80 w-80 lg:h-96 lg:w-96 group-hover:[transform:rotateY(180deg)] transition-[transform] duration-1000">
                    <img className="h-80 w-80 lg:h-96 lg:w-96 opacity-0 absolute brightness-0 invert -z-10 group-hover:z-10 group-hover:opacity-100 transition-[opacity] transition-[z-index] delay-450" src="neodev.svg"></img>
                    <img className="h-80 w-80 lg:h-96 lg:w-96 absolute" src="neodev.svg"></img>
                </div>
            </div>
            <div className="flex flex-col gap-4">
            <div>
                <h1>Warpz</h1>
                <h2>Access anything, anywhere</h2>
            </div>
            <hr/>
            <p>Scanning with Warpz is as easy as 1:</p>
            <ol className="list-decimal list-inside">
                <li>Scan an object. That's it!</li>
            </ol>
            <div className="flex flex-row gap-8">
                <a href="/login">
                    <button>Let's go!</button>
                </a>
            </div>
            </div>
        </div>
      </>
    )
  }
  
export default Landing