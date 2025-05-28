'use client';

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

type ShareModalProps = {
  url: string;
  title: string;
};

export default function ShareModal({ url, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-gray-400 hover:text-gray-300">
          Share this article
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-900 border-gray-800">
        <SheetTitle className="text-xl font-semibold text-white">Share this article</SheetTitle>
        <div className="space-y-8">

          <div className="flex gap-4">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <FaTwitter className="w-6 h-6 text-white" />
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <FaFacebook className="w-6 h-6 text-white" />
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <FaLinkedin className="w-6 h-6 text-white" />
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Or copy the link</p>
            <Button
              onClick={handleCopyUrl}
              variant="outline"
              className="w-full justify-between border-gray-700 hover:bg-gray-800"
            >
              <span className="truncate mr-2">{url}</span>
              <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}