import { columns } from "@/components/pages/product-management/columns";
import { DataTable } from "@/components/pages/product-management/DataTable";
import AppLayout from "@/layout/AppLayout";
import { InferGetServerSidePropsType } from "next";

export function getServerSideProps() {
  return {
    props: {
      data: [
        {
          id: 1,
          product_name: "Shampo",
          purchase_price: "10000",
          selling_price: "10000",
          stock: "10",
          category: "Mandi",
          barcode: "17872878278",
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
      <div className="w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </AppLayout>
  );
};

export default ProductManagement;
