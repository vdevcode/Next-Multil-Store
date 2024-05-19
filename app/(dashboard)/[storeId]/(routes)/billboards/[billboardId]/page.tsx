import { db } from "@/lib/firebase";
import { BillBoards } from "@/types-db";
import { doc, getDoc } from "firebase/firestore";
import { BillboardForm } from "./_components/billboard-form";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string; storeId: string };
}) => {
  const billboard = (
    await getDoc(
      doc(db, "stores", params.storeId, "billboards", params.billboardId)
    )
  ).data() as BillBoards;
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
