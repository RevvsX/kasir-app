import { columns } from "@/components/pages/transaction-history/columns";
import { DataTable } from "@/components/pages/transaction-history/DataTable";
import AppLayout from "@/layout/AppLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const {pagenumber = "1", pagelimit = "10", search = ""} = context.query
  
  const fetching = await fetch(`${process.env.APP_URL}/api/transactions?pagelimit=${pagelimit}&pagenumber=${pagenumber}&search=${search}`, {
    method:"GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${context.req.cookies["next-auth.session-token"]}`
    },
  })

  const response = await fetching.json()

  return {
    props: {
      data: response.data,
      currentPageNumber : pagenumber,
      currentPageLimit : pagelimit,
      pagecount: response.meta.pagecount
    },
  };
}

const TransactionHistory = ({
  data,
  currentPageLimit,
  currentPageNumber,
  pagecount
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AppLayout>
      <div className="w-full">
        <DataTable pagecount={pagecount} pagelimit={currentPageLimit as string} pagenumber={currentPageNumber as string}  columns={columns} data={data} />
      </div>
    </AppLayout>
  );
};

export default TransactionHistory;
