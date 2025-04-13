"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="bg-background border-b border-border h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link href="/" className="text-lg font-bold">AniRelease Notifier</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline">
          <Link href="https://example.com/episodes">Episodes</Link>
        </Button>
        <Button variant="outline">
          <Link href="https://example.com/new-anime">New Anime Release</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Icons.user className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.share className="mr-2 h-4 w-4" />
              <span>Invite friends</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.help className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.externalLink className="mr-2 h-4 w-4" />
              <span>Terms &amp; Conditions</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.trash className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
