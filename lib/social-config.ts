import {
  FaGithub,
  FaInstagram,
  FaKaggle,
  FaLinkedinIn,
  FaYoutube,
  FaHackerrank,
  FaDev,
  FaTwitter,
} from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

export type SocialLink = {
  name: string;
  link: string;
  icon?: any;
  showInHeader?: boolean;
  showInFooter?: boolean;
  showInLinks?: boolean;
  color?: string;
};

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/seyed-hossein-hosseini-rtr/",
    icon: FaLinkedinIn,
    // color: "#0077B5",
    showInHeader: true,
    showInFooter: true,
    showInLinks: true
  },
  {
    name: "Instagram",
    link: "https://instagram.com/hosseini-rtr",
    icon: FaInstagram,
    // color: "#E4405F",
    showInHeader: true,
    showInFooter: true,
    showInLinks: true
  },
  {
    name: "Dev.to",
    link: "https://dev.to/hosseini_rtr",
    icon: FaDev,
    // color: "#000000",
    showInHeader: false,
    showInFooter: true,
    showInLinks: true
  },
  {
    name: "GitHub",
    link: "https://github.com/hosseinirtr", 
    icon: FaGithub,
    // color: "#333",
    showInHeader: true,
    showInFooter: true,
    showInLinks: true
  },
  {
    name: "YouTube",
    link: "https://youtube.com/@hosseinirtr",
    icon: FaYoutube,
    // color: "#FF0000",
    showInHeader: false,
    showInFooter: true,
    showInLinks: true
  },
  {
    name: "Kaggle",
    link: "https://www.kaggle.com/hosseinirtr",
    icon: FaKaggle,
    // color: "#20BEFF",
    showInHeader: false,
    showInFooter: true,
    showInLinks: true
  },
  {
    name: "Devpost",
    link: "https://devpost.com/hosseinirtr", 
    icon: SiDevpost,
    // color: "#003E54",
    showInHeader: false,
    showInFooter: false,
    showInLinks: true
  },
  {
    name: "HackerRank",
    link: "https://www.hackerrank.com/profile/hosseinirtr", 
    icon: FaHackerrank,
    // color: "#003E54",
    showInHeader: false,
    showInFooter: false,
    showInLinks: true
  },
  {
    name: "Twitter",
    link: "https://x.com/hosseini_rtr", 
    icon: FaTwitter,
    // color: "#003E54",
    showInHeader: false,
    showInFooter: false,
    showInLinks: true
  }
];

export const useSocialLinks = (location: 'header' | 'footer' | 'links') => {
  return socialLinks.filter(link => {
    switch (location) {
      case 'header':
        return link.showInHeader;
      case 'footer':
        return link.showInFooter;
      case 'links':
        return link.showInLinks;
      default:
        return true;
    }
  });
};