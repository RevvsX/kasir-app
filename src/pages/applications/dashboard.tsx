import ActivityLog from "@/components/pages/dashboard/ActivityLog";
import NumberOfProductsCard from "@/components/pages/dashboard/NumberOfProductsCard";
import ProfitCard from "@/components/pages/dashboard/ProfitCard";
import RestockNeededCard from "@/components/pages/dashboard/RestockNeededCard";
import TransactionChart from "@/components/pages/dashboard/TransactionChart";
import AppLayout from "@/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full mb-4">
        <ProfitCard />
        <NumberOfProductsCard />
        <RestockNeededCard />
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap gap-4 mt-4">
        <TransactionChart />
        <ActivityLog />
      </div>
    </AppLayout>
  );
}
