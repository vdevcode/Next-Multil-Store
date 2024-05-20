import { collection, doc, getDocs } from "firebase/firestore";
import { BillBoardClient } from "./_components/client";
import { db } from "@/lib/firebase";
import { BillBoards } from "@/types-db";
import { BillboardColumns } from "./_components/columns";
import { format } from "date-fns";

const BillBoardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboardData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
  ).docs.map((doc) => doc.data() as BillBoards);

  const formatedBillboards: BillboardColumns[] = billboardData.map((item) => ({
    id: item.id,
    label: item.label,
    imageUrl: item.imageUrl,
    createAt: item.createAt
      ? format(item.createAt.toDate(), "MMMM do, yyyy")
      : "",
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <BillBoardClient data={formatedBillboards} />
      </div>
    </div>
  );
};

export default BillBoardsPage;
