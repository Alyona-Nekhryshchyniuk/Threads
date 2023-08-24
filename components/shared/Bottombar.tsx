"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="bottombar">
      {/* <section className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden"> */}
      <div className="bottombar_container">
        {/* <div className=" flex items-center justify-between gap-3 xs:gap-5"> */}
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
