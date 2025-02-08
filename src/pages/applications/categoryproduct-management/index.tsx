import { columns } from "@/components/pages/categoryproduct-management/columns";
import { DataTable } from "@/components/pages/categoryproduct-management/DataTable";
import AppLayout from "@/layout/AppLayout";
import { InferGetServerSidePropsType } from "next";

export function getServerSideProps() {
  return {
    props: {
      data: [
        {
          id: 1,
          category_name: "Junk food",
        },
      ],
    },
  };
}

const CategoryProductManagement = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AppLayout>
      <div className="w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </AppLayout>
  );
};

export default CategoryProductManagement;
