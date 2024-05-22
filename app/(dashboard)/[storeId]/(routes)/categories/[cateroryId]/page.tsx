import { db } from "@/lib/firebase";
import { Categories } from "@/types-db";
import { doc, getDoc } from "firebase/firestore";
import { CategoryForm } from "./_components/billboard-form";

const BillboardPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = (
    await getDoc(
      doc(db, "stores", params.storeId, "billboards", params.categoryId)
    )
  ).data() as Categories;
  return (
    <div className="flex-col">  
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default BillboardPage;
