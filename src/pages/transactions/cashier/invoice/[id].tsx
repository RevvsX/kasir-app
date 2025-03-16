import { Button } from '@/components/ui/button'
import AppLayout from '@/layout/AppLayout'
import { Printer } from 'lucide-react'
import { GetServerSidePropsContext } from 'next'
import { useRef } from 'react'

type InvoiceType = {
    id: number,
    discount: string,
    ppn: string,
    total_price: string,
    money_paid: string,
    change: string,
    created_at: string,
    fixed_total_price: string,
    user: {
        full_name: string
    },
    member: {
        name: string
    },
    TransactionDetail: {
        id: number,
        quantity: number,
        sub_total: number
        product: {
            product_name: string,
        }
    }[]
}


export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { id } = context.query

    const fetching = await fetch(`${process.env.APP_URL}/api/transactions/get/${id}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            authorization: `Bearer ${context.req.cookies["next-auth.session-token"]}`
        },
    })

    const response = await fetching.json()

    return {
        props: {
            data: response.data || null
        },
    };
}


const Invoice = ({ data }: { data: InvoiceType }) => {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (printRef.current) {
            const printContent = printRef.current.innerHTML;
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
        }
    };

    return (
        <AppLayout>
            <div className="flex gap-2">
                <div ref={printRef} className="w-[360px] py-10 px-3 shadow-md border">
                    <div className="text-center font-bold">7NightMarket</div>
                    <div className="text-center text-xs">
                        {new Date(data.created_at).toLocaleString("id-ID", {day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"})}
                    </div>
                    <div className="text-center text-xs">{data.id}</div>
                    <div className="w-full border my-2"></div>
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col text-xs">
                            <span className="font-bold">Officer</span>
                            <span>{data.user.full_name}</span>
                        </div>
                        <div className="flex flex-col items-end text-xs">
                            <span className="font-bold">Member</span>
                            <span className="text-end">{data.member ? data.member.name : "Guest"}</span>
                        </div>
                    </div>
                    <div className="w-full border my-2"></div>
                    <div className="my-3">
                        {data.TransactionDetail.map((el) => (
                            <div key={el.id} className="w-full flex justify-between items-center text-xs">
                                <span>
                                    {el.product.product_name} x {el.quantity}
                                </span>
                                <span>
                                    {el.sub_total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full border my-2"></div>
                    <div className="my-3">
                        <div className="w-full flex justify-between items-center text-xs">
                            <span>Discount</span>
                            <span>{data.discount}%</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-xs">
                            <span>PPN</span>
                            <span>{data.ppn}%</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-xs">
                            <span>Total</span>
                            <span>{parseInt(data.fixed_total_price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-xs">
                            <span>Money paid</span>
                            <span>{parseInt(data.money_paid).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-xs">
                            <span>Money change</span>
                            <span>{parseInt(data.change).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                        </div>
                    </div>
                    <div className="text-center text-xs">Thank youuuuuuu:)</div>
                </div>

                <div>
                    <Button onClick={handlePrint}>
                        <Printer className="mr-2" /> Print
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
};

export default Invoice;