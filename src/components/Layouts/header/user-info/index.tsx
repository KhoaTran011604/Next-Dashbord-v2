"use client";

import { cn } from "../../../../styles/lib/utils";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { ChevronUpIcon } from "assets/icons";
import { useAuth } from "context/auth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export function UserInfo() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const imagePath = "/images/user/khoatran.jpg";

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>
        {auth.isAuthenticated && (
          <figure className="flex items-center gap-3">
            <Image
              src={imagePath}
              className="size-12 rounded-full"
              alt={`Avatar of ${auth?.user?.fullName}`}
              role="presentation"
              width={200}
              height={200}
            />
            <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 dark:text-white/90 max-[1024px]:sr-only">
              <span>{auth?.user?.fullName}</span>

              <ChevronUpIcon
                aria-hidden
                className={cn(
                  "rotate-180 transition-transform",
                  isOpen && "rotate-0"
                )}
                strokeWidth={1.5}
              />
            </figcaption>
          </figure>
        )}
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark dark:bg-gray-800 dark:text-white/90 min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          <Image
            src={imagePath}
            className="size-12 rounded-full"
            alt={`Avatar for ${auth?.user?.fullName}`}
            role="presentation"
            width={200}
            height={200}
          />

          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {auth?.user?.fullName}
            </div>

            <div className="leading-none text-gray-6">{auth?.user?.email}</div>
          </figcaption>
        </figure>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6 [&>*]:cursor-pointer">
          <Link
            href={"/profile"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-200 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white  dark:bg-gray-800 dark:text-white/90"
          >
            <UserIcon />

            <span className="mr-auto text-base font-medium">View profile</span>
          </Link>

          <Link
            href={"/pages/settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-200 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white  dark:bg-gray-800 dark:text-white/90"
          >
            <SettingsIcon />

            <span className="mr-auto text-base font-medium">
              Account Settings
            </span>
          </Link>
        </div>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-200 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white  dark:bg-gray-800 dark:text-white/90"
            onClick={() => setIsOpen(false)}
          >
            <LogOutIcon />

            <span
              className="text-base font-medium"
              onClick={async () => {
                const res = auth.logout();
                if (res) {
                  ["#todoList", "#todoList_Completed", "#user"].forEach(
                    (key) => {
                      queryClient.removeQueries({ queryKey: [key] });
                    }
                  );

                  Cookies.remove("token_info");
                  router.replace("/auth/sign-in");
                }
              }}
            >
              Log out
            </span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
