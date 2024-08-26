import { Oswald } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookF, faInstagram, faLinkedinIn, faSquareInstagram, faSquareXTwitter, faXTwitter } from "@fortawesome/free-brands-svg-icons"

const oswald = Oswald({
    weight: '500',
    subsets: ["latin"]
})
const Features = [
    {
        content: "Video Notes",
        link: "#"
    },
    {
        content: "Meeting Notes",
        link: "#"
    },
    {
        content: "Download",
        link: "#"
    },
    {
        content: "Support",
        link: "#"
    },
    {
        content: "Report a bug / issue",
        link: "#"
    },
    {
        content: "Contact",
        link: "#"
    }
];
const Policies = [
    {
        content: "Privacy Policy",
        link: "/privacy-policy"
    },
    {
        content: "Cookie Policy",
        link: "#"
    },
    {
        content: "Terms of Service",
        link: "#"
    },
    {
        content: "About Us",
        link: "#"
    },
    {
        content: "FAQs",
        link: "#"
    }
];

const Footer = () => {
    return (
        <div className="px-[14%] pb-12 pt-24 bg-black flex flex-col text-white">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col gap-8">
                    <h1 className="text-4xl font-[700]">Video learning<br /> made easy</h1>
                    <div className="opacity-[0.7]">
                        <p>Follow on</p>
                        <div className="flex gap-3 my-3">
                            {/* Social links */}
                            <Link href="#">
                                <FontAwesomeIcon icon={faXTwitter} className="h-6 w-6"/>
                            </Link>
                            <Link href="#">
                                <FontAwesomeIcon icon={faInstagram} className="h-6 w-6"/>
                            </Link>
                            <Link href="#">
                                <FontAwesomeIcon icon={faLinkedinIn} className="h-6 w-6"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col opacity-[0.7]">
                    {
                        Features.map((feature, index) => {
                            return (
                                <Link className="text-[16px] mb-10 leading-6 font-bold" href={feature.link} key={index}>
                                    {feature.content}
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="flex flex-col opacity-[0.7]">
                    {
                        Policies.map((feature, index) => {
                            return (
                                <Link className="text-[16px] mb-10 leading-6 font-bold" href={feature.link} key={index}>
                                    {feature.content}
                                </Link>
                            )
                        })
                    }
                </div>

            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <Image src="/Youtube-Notes-logo.png" alt="Youtube-Notes" width={40} height={40} />
                    <div className="text-2xl">
                        <p className={oswald.className}>Youtube-Notes</p>
                    </div>
                </div>
                <div className="text-center">
                    &copy;Youtube-Notes 2024
                </div>

            </div>
        </div>
    )
}

export default Footer
