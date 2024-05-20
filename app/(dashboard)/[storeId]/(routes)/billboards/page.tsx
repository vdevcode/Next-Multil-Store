import { collection, doc, getDocs } from "firebase/firestore";
import { BillBoardClient } from "./_components/client";
import { db } from "@/lib/firebase";
import { BillBoards } from "@/types-db";

const BillBoardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboardData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
  ).docs.map((doc) => doc.data() as BillBoards);

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <BillBoardClient />
      </div>
    </div>
  );
};

export default BillBoardsPage;
