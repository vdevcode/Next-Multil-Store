import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { StoreSwitcher } from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Store } from "@/types-db";

export const Navbar = async () => {
  const {userId} = auth()
  if(!userId){
    redirect("/sign-in")
  }

  const storeSnap = await getDocs(
    query(
      collection(db, "stores"),
      where("userId", "==", userId)
    )
  )

  let stores = [] as Store[]
  storeSnap.forEach((doc) => {
    stores.push(doc.data() as Store)
  })

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <StoreSwitcher items={stores} />
          <MainNav />
        </div>
        <div className="">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
