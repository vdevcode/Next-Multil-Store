import { db } from "@/lib/firebase";
import { BillBoards } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
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

    if (!params.billboardId) {
      return new NextResponse("Billboard is missing", { status: 400 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));

    if (store.exists()) {
      let storeData = store.data();
      if (storeData?.userId !== userId) {
        return new NextResponse("Un-authorize access", { status: 500 });
      }
    }

    const billboardRef = await getDoc(
      doc(db, "stores", params.storeId, "billboards", params.billboardId)
    );

    if (billboardRef.exists()) {
      await updateDoc(doc(db, "stores", params.storeId, "billboards"), {
        ...billboardRef.data(),
        label,
        imageUrl,
      });
    } else {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    const billboard = (
      await getDoc(
        doc(db, "store", params.storeId, "billboards", params.billboardId)
      )
    ).data() as BillBoards;

    return NextResponse.json({ billboard });
  } catch (error) {
    console.log(`Stored patch: ${error}`);
    return new NextResponse("server error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
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

  if (!params.billboardId) {
    return new NextResponse("Billboard is missing", { status: 400 });
  }

  const store = await getDoc(doc(db, "stores", params.storeId));
  if (store.exists()) {
    let storeData = store.data();
    if (storeData?.userId !== userId) {
      return new NextResponse("Un-authorize access", { status: 500 });
    }
  }

  const billboardRef = await getDoc(
    doc(db, "stores", params.storeId, "billboards", params.billboardId)
  );

  if (billboardRef.exists()) {
    
  } else {
    return new NextResponse("Billboard not found", { status: 404 });
  }
};
