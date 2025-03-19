import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ProductSold from "@/components/pages/dashboard/ProductSold";
import TotalGrossProfit from "@/components/pages/dashboard/TotalGrossProfit";
import TotalNetProfit from "@/components/pages/dashboard/TotalNetProfit";
import TotalRevenue from "@/components/pages/dashboard/TotalRevenue";
import TotalTransaction from "@/components/pages/dashboard/TotalTransaction";
import AppLayout from "@/layout/AppLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import DateFilter from "@/components/partials/DateFilter";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { startDate = "", endDate = "" } = context.query;

  const getData = await fetch(`${process.env.APP_URL}/api/report?startDate=${startDate}&endDate=${endDate}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${context.req.cookies["next-auth.session-token"]}`
    },
  });

  const result = await getData.json();

  return {
    props: {
      initialData: result.data || null,
    }
  };
}

export default function Home({ initialData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const { startDate = "", endDate = "" } = router.query;

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/report?startDate=${startDate}&endDate=${endDate}`);
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [startDate, endDate]);

  if (status === "loading") {
    return (
      <AppLayout>
        <p>Loading...</p>
      </AppLayout>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    return (
      <AppLayout>
        <h1>OFFICER</h1>
      </AppLayout>
    );
  }

  if (!data) {
    return (
      <AppLayout>
        <DateFilter />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <DateFilter />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full mb-4">
            <TotalRevenue revenue={(data.f1 != null) ? parseInt(data.f1).toLocaleString('id-ID', { currency: "IDR", style: "currency" }) : "0"} />
            <TotalNetProfit netProfit={(data.f2 != null) ? parseInt(data.f2).toLocaleString('id-ID', { currency: "IDR", style: "currency" }) : "0"} />
            <TotalGrossProfit grossProfit={(data.f3 != null) ? data.f3.toLocaleString('id-ID', { currency: "IDR", style: "currency" }) : "0"} />
          </div>
          <div className="w-full flex flex-wrap md:flex-nowrap gap-4 mt-4">
            <TotalTransaction transaction={(data.f0 != null) ? data.f0 : 0} />
            <ProductSold sold={(data.f4 != null) ? data.f4 : 0} />
          </div>
        </>
      )}
    </AppLayout>
  );
}
