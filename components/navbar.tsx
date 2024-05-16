import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";

export const Navbar = () => {
  return <div className="border-b">
    <div className="flex h-16 items-center px-4 justify-between">
        <p>This is store switcher</p>
        <MainNav />
        <div className="">
            <UserButton />
        </div>
    </div>
  </div>;
};
