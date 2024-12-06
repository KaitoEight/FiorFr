import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger  from "gsap/ScrollTrigger"
import { useRef } from "react"
gsap.registerPlugin(ScrollTrigger)

const CTA = () => {

    const img1 = useRef(null)
    const img2 = useRef(null)
    useGSAP(() => {
        gsap.from(img1.current, {
            opacity: 0,
            x: -20,
            duration: 0.1,
            scrollTrigger: {
                trigger: img1.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        })
        gsap.from(img2.current, {
            opacity: 0,
            x: 20,
            duration: 0.1,
            scrollTrigger: {
                trigger: img2.current,
                start: "top 80%",
            },
        })
    })
  return (
    <section className="relative w-full py-20 px-3 mt-24 bg-black flex items-center justify-center flex-col -z-[1]">
        <h1 className="text-3xl font-extrabold text-white">About FiorDiSaigon</h1>
        <p  className="text-xl font-semibold text-white max-w-[800px] text-center mt-4">Fior Di Saigon is a italian shop which provides italian icecream called gelato with best quality</p>
        <img src="/flipgelatocup.png" alt="" className="md:w-[300px] max-md:w-[200px] absolute md:bottom-10 -left-10 max-md:bottom-2" ref={img1}/>
        <img src="/gelatocup.png" alt="" className="md:w-[270px] max-md:w-[160px] absolute -z-[2] bottom-10 md:right-10 max-md:right-2 max-md:bottom-32" ref={img2}/>
    </section>
  )
}

export default CTA
