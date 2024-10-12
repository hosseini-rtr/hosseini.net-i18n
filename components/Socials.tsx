import Link from "next/link";
import {
  FaGithub,
  FaInstagram,
  FaKaggle,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const links = [
  {
    name: "github",
    link: "",
    icon: <FaGithub />,
  },
  {
    name: "instagram",
    link: "",
    icon: <FaInstagram />,
  },
  {
    name: "linkedin",
    link: "",
    icon: <FaLinkedinIn />,
  },
  {
    name: "youtube",
    link: "",
    icon: <FaYoutube />,
  },
  {
    name: "Kaggle",
    link: "",
    icon: <FaKaggle />,
  },
];

interface SocialsProps {
  containerStyles?: string;
  iconStyles?: string;
}
export default function Socials({ containerStyles, iconStyles }: SocialsProps) {
  return (
    <div className={containerStyles}>
      {links.map((social, index) => (
        <TooltipProvider delayDuration={100} key={index}>
          <Tooltip>
            <TooltipTrigger className="">
              <Link
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={iconStyles}
              >
                <div className="">{social.icon}</div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <div className="bg-slate-50 rounded-sm text-background p-2 capitalize">
                {social.name}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
