import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Un-authorize", { status: 400 });
    }

    const { name } = body;
    if (!name) {
      return new NextResponse("Store name is missing", { status: 400 });
    }
    const storeData = {
      name,
      userId,
      createAt: serverTimestamp(),
    };

    const storeRef = await addDoc(collection(db, "stores"), storeData);
    const id = storeRef.id;

    await updateDoc(doc(db, "stores", id), {
      ...storeData,
      id,
      updateAt: serverTimestamp(),
    });

    return NextResponse.json({ id, ...storeData });
  } catch (error) {
    console.log(`Stored post: ${error}`);
    return new NextResponse("server error", { status: 500 });
  }
};
