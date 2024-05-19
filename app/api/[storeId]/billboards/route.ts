import { db } from "@/lib/firebase";
import { BillBoards } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  collection,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Un-authorize", { status: 400 });
    }

    const { label, imageUrl } = body;
    if (!label) {
      return new NextResponse("Billboard name is missing!!! ", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image billboards is missing!!!", {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse("StoreId is missing!!!", { status: 400 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));

    if (store.exists()) {
      let storeData = store.data();
      if (storeData?.userId !== userId) {
        return new NextResponse("Un-authorize access", { status: 500 });
      }
    }

    const billboardData = {
      label,
      imageUrl,
      createAt: serverTimestamp(),
    };

    const billboardRef = await addDoc(
      collection(db, "stores", params.storeId, "billboards"),
      billboardData
    );

    const id = billboardRef.id;

    await updateDoc(doc(db, "stores", params.storeId, "billboards", id), {
      ...billboardData,
      id,
      updateAt: serverTimestamp(),
    });

    return NextResponse.json({ id, ...billboardData });
  } catch (error) {
    console.log(`Stored post: ${error}`);
    return new NextResponse("server error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Un-authorize", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("StoreId is missing!!!", { status: 400 });
    }

    const billboardsData = (
      await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
    ).docs.map((doc) => doc.data() as BillBoards[]);


    return NextResponse.json({billboardsData})
  } catch (error) {
    console.log(`Stored post: ${error}`);
    return new NextResponse("server error", { status: 500 });
  }
};
