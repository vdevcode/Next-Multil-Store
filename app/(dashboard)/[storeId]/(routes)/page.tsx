import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Store } from "@/types-db";

interface DashboardOverviewProps {
  params: { storeId: string };
}

const DashboardOverview = async ({ params }: DashboardOverviewProps) => {
  const store = (
    await getDoc(doc(db, "stores", params.storeId))
  ).data() as Store;

  return <div className="">overview {store.name}</div>;
};

export default DashboardOverview;
