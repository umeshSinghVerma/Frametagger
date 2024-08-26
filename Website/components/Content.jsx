import ImageContent from "./ImageContent"
import TakingSnapshot from './takingsnapshot.png'
import TakingNotes from  "./takingnotes.png"
import Drawing from "./drawing.png"
const Content = () => {
    const data = [
        {
            heading: [
                {
                    content: "Seamless Video Integration ",
                    color: "#211e1c"
                },
                {
                    content: "in Your PDFs",
                    color: "#da3832"
                }
            ],
            data: [
                "Youtube-Notes creates powerful PDFs that allow you to click on a specific screenshot and be redirected to the exact moment in the YouTube video where the snapshot was taken.",
                "This feature ensures you can effortlessly revisit key points in your videos, enhancing your learning and review process.",
                "Enjoy seamless integration of visual content and notes, making your study sessions more interactive and productive."
            ],
            pdfUrl: "/How your vision determines your reality _ Bryan William Jones _ TEDxBerlin.pdf",
        },
        {
            heading: [
                {
                    content: "Organize Playlist Notes ",
                    color: "#211e1c"
                },
                {
                    content: "with Youtube-Notes",
                    color: "#da3832"
                }
            ],
            data: [
                "Youtube-Notes has a special ability to manage your notes when you're watching a YouTube playlist. Continuously take screenshots, and Youtube-Notes's playlist view lets you download all the notes you've collected from different videos into a single PDF.",
                "Using the YouTube Data API, Youtube-Notes collects video indexes, ensuring your notes are always organized. No matter the order in which you take screenshots, the PDF will display notes in the correct sequence according to the playlist.",
            ],
            pdfUrl: "/Introduction to Operating Systems playlistview.pdf",
        },
        {
            heading: [
                {
                    content: "Take ",
                    color: "#211e1c"
                },
                {
                    content: "screenshots & notes ",
                    color: "#da3832"
                },
                {
                    content: "and  ",
                    color: "#211e1c"
                },
                {
                    content: "add bookmarks ",
                    color: "#da3832"
                },
                {
                    content: "on videos",
                    color: "#211e1c"
                }
            ],
            data: [
                "Youtube-Notes lets you add captions and customize the slides so you can quickly reference the material later. You never have to scramble to write down the contents of a slide again!",
                "Easily annotate your video frames with important notes, making studying and reviewing more efficient.",
                "Enhance your learning experience by combining visual aids with your personalized notes, tailored to your needs."
            ],
            imgUrl: TakingNotes,
        },
        {
            heading: [
                {
                    content: "Draw Over Snapshots ",
                    color: "#211e1c"
                },
                {
                    content: "in Real Time",
                    color: "#da3832"
                }
            ],
            data: [
                "Youtube-Notes has the special ability to draw over YouTube snapshots in real-time. When you press Ctrl+I, it opens the YouTube snapshot on the entire screen, allowing you to draw over the image and save it to your notes.",
                "Enhance your note-taking by adding personalized annotations directly onto video frames, making your study material even more comprehensive and visually engaging.",
            ],
            imgUrl: Drawing,
        },
        {
            heading: [
                {
                    content: "Access Notes Easily ",
                    color: "#211e1c"
                },
                {
                    content: "with Youtube-Notes",
                    color: "#da3832"
                }
            ],
            data: [
                "You can access all your notes for a particular video by clicking on the Youtube-Notes icon in the extension panel after pinning it.",
                "Youtube-Notes ensures that all your important notes are just a click away, providing quick and easy access to your annotations whenever you need them.",
            ],
            imgUrl: TakingSnapshot,
        }
    ]
    return (
        <div className="bg-[#fbf9f4] py-[50px] md:py-[100px] md:px-[14%] flex flex-col gap-10 md:gap-28">
            {
                data.map((data, index) => {
                    return <ImageContent data={{ ...data, imgPos: index % 2 == 0 ? "right" : "left" }} key={index} />
                })
            }

        </div>
    )
}

export default Content
