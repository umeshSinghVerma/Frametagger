import Image from "next/image"
import Link from "next/link"

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center py-[20px] md:py-[80px] px-[30px] text-center">
            <h1 className="text-xl md:text-5xl leading-[140%] font-[700] mb-[20px] text-[#211e1c]">Revolutionize Video Tagging Experience</h1>
            <h1 className="text-xl md:text-5xl leading-[140%] font-[700] mb-[40px] text-[#ed1c24]">Introducing Youtube-Notes</h1>
            <div className="text-[#211e1c]">
                <p className="text-[22px] opacity-[0.7] text-center font-[200]">
                    Take screenshots and capture slides automatically on videos on YouTube
                </p>
                <p className="text-[22px] opacity-[0.7] text-center font-[200]">Capturing Information from videos Made Easy and Visual! Now powered by <span className="font-semibold">Google Youtube Data API</span></p>
            </div>
            <Link href="https://chromewebstore.google.com/detail/Youtube-Notes/ppogfckcfolngoiadhmgflfndgmaijph" className="flex bg-[#fddcdf] p-5 text-left gap-4 rounded-full m-10 w-[260px] h-[71px] items-center justify-center hover:bg-red-300">
                <Image src="/google-image.svg"  alt="Youtube-Notes" height={50} width={50}/>
                <div>
                    <p className="text-[12px]">Download the</p>
                    <p className="font-semibold">Chrome Extension</p>
                </div>
            </Link>
        </div>
    )
}

export default Hero
