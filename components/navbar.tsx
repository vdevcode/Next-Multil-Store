import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";

export const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <p>This is store switcher</p>
          <MainNav />
        </div>
        <div className="">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
