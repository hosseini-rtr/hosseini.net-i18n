import Link from "next/link";
import { useSocialLinks } from "@/lib/social-config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SocialsProps {
  containerStyles?: string;
  iconStyles?: string;
  location: 'header' | 'footer' | 'links';
}

export default function Socials({ containerStyles, iconStyles, location }: SocialsProps) {
  const links = useSocialLinks(location);

  return (
    <div className={containerStyles}>
      {links.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <TooltipProvider delayDuration={100} key={index}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconStyles}
                >
                  <div >
                    <IconComponent />
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <div className="bg-slate-50 rounded-sm text-background p-2 capitalize">
                  {social.name}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
