import { columns } from "@/components/pages/member-management/columns";
import { DataTable } from "@/components/pages/member-management/DataTable";
import AppLayout from "@/layout/AppLayout";
import { InferGetServerSidePropsType } from "next";

export function getServerSideProps() {
  return {
    props: {
      data: [
        {
          id: 1,
          name: "Aldon",
          address: "Bangunjiwo",
          phone_number: "081982773628",
        },
      ],
    },
  };
}

const ProductManagement = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AppLayout>
      <div className="max">
        <DataTable columns={columns} data={data} />
      </div>
    </AppLayout>
  );
};

export default ProductManagement;
