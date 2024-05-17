import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { StoreSwitcher } from "./store-switcher";

export const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <StoreSwitcher items={[]} />
          <MainNav />
        </div>
        <div className="">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
