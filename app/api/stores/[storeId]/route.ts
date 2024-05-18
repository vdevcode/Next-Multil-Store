import { db } from "@/lib/firebase";
import { Store } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

//patch store name
export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Un-authorize", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    const { name } = body;
    if (!name) {
      return new NextResponse("Store name is missing", { status: 400 });
    }

    const docRef = doc(db, "stores", params.storeId);
    await updateDoc(docRef, { name });

    const store = (await getDoc(docRef)).data() as Store;

    return NextResponse.json(store);
  } catch (error) {
    console.log(`Stored update: ${error}`);
    return new NextResponse("server error", { status: 500 });
  }
};

//delete store name
export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Un-authorize", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    const docRef = doc(db, "stores", params.storeId);
    await deleteDoc(docRef);

    return NextResponse.json({ msg: "store and all in sub-collections" });
  } catch (error) {
    console.log(`Stored patch: ${error}`);
    return new NextResponse("server error", { status: 500 });
  }
};
