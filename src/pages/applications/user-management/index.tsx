import { columns } from "@/components/pages/user-management/columns";
import { DataTable } from "@/components/pages/user-management/DataTable";
import AppLayout from "@/layout/AppLayout";
import { InferGetServerSidePropsType } from "next";

export function getServerSideProps() {
  return {
    props: {
      data: [
        {
          id: 1,
          username: "Eksa Arifa",
          email: "eksaarifa@gmail.com",
          role: "admin",
          address: "Indonesia",
          phone_number: "0891898278",
        },
      ],
    },
  };
}

const UserManagement = ({
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

export default UserManagement;
