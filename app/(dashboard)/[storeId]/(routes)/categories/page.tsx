import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Categories } from "@/types-db";
import { format } from "date-fns";
import { CategoryClient } from "./_components/client";
import { CategoriesColumns } from "./_components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categoriesData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
  ).docs.map((doc) => doc.data() as Categories);

  const formatedCategory: CategoriesColumns[] = categoriesData.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboardLabel,
    createAt: item.createAt
      ? format(item.createAt.toDate(), "MMMM do, yyyy")
      : "",
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <CategoryClient data={formatedCategory} />
      </div>
    </div>
  );
};

export default CategoriesPage;
