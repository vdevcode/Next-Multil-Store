import { db } from "@/lib/firebase";
import { BillBoards } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Un-authorized", { status: 401 });
    }

    const { label, imageUrl } = body;

    if (!label || !imageUrl || !params.storeId || !params.billboardId) {
      const missingFields = [
        !label && "label",
        !imageUrl && "imageUrl",
        !params.storeId && "storeId",
        !params.billboardId && "billboardId",
      ]
        .filter(Boolean)
        .join(", ");

      return new NextResponse(`Missing required fields: ${missingFields}`, {
        status: 400,
      });
    }

    const storeRef = doc(db, "stores", params.storeId);
    const store = await getDoc(storeRef);

    if (!store.exists()) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const storeData = store.data();
    if (storeData?.userId !== userId) {
      return new NextResponse("Unauthorized access", { status: 403 });
    }

    const billboardRef = doc(
      db,
      "stores",
      params.storeId,
      "billboards",
      params.billboardId
    );
    const billboardDoc = await getDoc(billboardRef);

    if (!billboardDoc.exists()) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    await updateDoc(billboardRef, { label, imageUrl });

    const updatedBillboard = (await getDoc(billboardRef)).data() as BillBoards;

    return NextResponse.json({ billboard: updatedBillboard });
  } catch (error) {
    console.error(`Error updating billboard: ${error}`);
    return new NextResponse("Server error", { status: 500 });
  }
};

export const DELETE = async (
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

    const billboardRef = doc(
      db,
      "stores",
      params.storeId,
      "billboards",
      params.billboardId
    );

    await deleteDoc(billboardRef);

    return NextResponse.json({ msg: "Delete success " });
  } catch (error) {
    console.log(`Stored patch: ${error}`);
    return new NextResponse("server error", { status: 500 });
  }
};
