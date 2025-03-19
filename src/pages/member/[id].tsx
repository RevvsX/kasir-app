import { MemberColumn } from '@/components/pages/member-management/columns'
import AppLayout from '@/layout/AppLayout'
import { Condiment, Fira_Code } from "next/font/google"
import { GetServerSidePropsContext } from 'next'
import React, { useRef } from 'react'
import { useBarcode } from "next-barcode"
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Printer } from 'lucide-react'
import { useRouter } from 'next/router'
import { useToast } from '@/hooks/use-toast'




const font = Condiment({ weight: "400" })
const fira_code = Fira_Code()


export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { id } = context.query

    const fetching = await fetch(`${process.env.APP_URL}/api/crud/member-management/get/${id}`, {
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

const Member = ({ data }: { data: MemberColumn }) => {

    const { inputRef } = useBarcode({
        value: data.id.toString(),
        options:{height: 60}
    })

    const printRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    const toast = useToast()

    const handlePrint = () => {
        if (printRef.current) {
            const printContent = printRef.current.innerHTML;
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload()
        }
    };

    return (
        <AppLayout>
            <div className="flex gap-2">
                <div className="w-[600px] h-[300px] rounded-md shadow-md border relative" ref={printRef}>
                    <div className={`w-full h-full bg-black text-white absolute top-0 left-0 flex flex-col opacity-30 justify-center items-center ${font.className}`}>
                        <h1 className="text-9xl">Member</h1>
                        <h2 className='text-7xl'>Card</h2>
                    </div>
                    <div className="absolute top-0 left-0 p-4 w-full h-full z-50 border-r-2">
                        <h1 className={`text-6xl font-bold ${fira_code.className}`}>7NightMarket</h1>
                        <div className={`flex flex-col p-2 font-bold text-xl`}>
                            <span>Name: {data.name}</span>
                            <span>Address: {data.address}</span>
                            <span>Phone Number: {data.phone_number}</span>
                        </div>
                        <svg className='w-[150px] absolute right-2 bottom-0' ref={inputRef} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button onClick={handlePrint}>
                        <Printer className="mr-2" /> Print
                    </Button>
                    <Button onClick={()=>{
                        navigator.clipboard.writeText(data.id.toString())
                        toast.toast({
                            title: "Id member copied to clipboard",
                            duration: 5000
                        })
                    }}>
                        <Copy/>
                    </Button>
                    <Button onClick={() => router.back()}>
                        <ArrowLeft /> Back
                    </Button>
                </div>
            </div>
        </AppLayout>
    )
}

export default Member