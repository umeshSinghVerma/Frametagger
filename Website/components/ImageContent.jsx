import clsx from "clsx"
import EmbedPdf from "./EmbedPdf"
import Image from "next/image"

const ImageContent = ({ data }) => {
    return (
        <div className={clsx(
            'flex gap-10 items-center flex-col justify-between',
            {
                'md:flex-row': data.imgPos === 'right',
                'md:flex-row-reverse': data.imgPos !== 'right'
            }
        )}>
            <div className="md:max-w-[50%] px-5">
                <div className="text-[2.25rem] font-[700] leading-[50px]">
                    {data.heading.map((heading, index) => {
                        return <span key={index} style={{ color: heading.color }}>{heading.content}</span>
                    })}
                </div>
                <div className="flex flex-col text-[18px] opacity-[0.7] font-[300]">
                    {
                        data.data.map((subheading, index) => {
                            return (
                                <div className="my-2" key={index}>
                                    {subheading}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {data.imgUrl && <Image src={data.imgUrl} alt="Youtube-Notes" lazy className="md:max-w-[50%] rounded-2xl px-5 md:px-0" />}
            {data.pdfUrl && <EmbedPdf pdf={data.pdfUrl} />}
        </div>
    )
}

export default ImageContent
