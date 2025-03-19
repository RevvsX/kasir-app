import { TransactionHistoryColumn } from '@/components/pages/transaction-history/columns'
import DateFilter from '@/components/partials/DateFilter'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layout/AppLayout'
import { Printer, FileText } from 'lucide-react'
import { GetServerSidePropsContext } from 'next'
import React, { useRef } from 'react'
import * as XLSX from 'xlsx'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { startDate = "", endDate = "" } = context.query;

    const getData = await fetch(`${process.env.APP_URL}/api/report/getall?startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            authorization: `Bearer ${context.req.cookies["next-auth.session-token"]}`
        },
    });

    const result = await getData.json();

    return {
        props: {
            initialData: result.transactions || null,
            totalProfit: result.totalProfit || null,
            startDate: startDate,
            endDate: endDate
        }
    };
}

const Index = ({ initialData, totalProfit, startDate, endDate }: { initialData: TransactionHistoryColumn[], totalProfit: { f0: number, f1: string, f2: string, f3: number, f4: string }, startDate: string, endDate: string }) => {

    const printRef = useRef<HTMLDivElement>(null);

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

    const handleExportToExcel = () => {
        const tableData = initialData.map(invoice => ({
            "Created At": new Date(invoice.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }),
            "Invoice": invoice.id,
            "Member": invoice.member ? invoice.member.name : "Guest",
            "Discount": `${invoice.discount}%`,
            "Total Price": parseInt(`${invoice.fixed_total_price}`).toLocaleString("id-ID", { style: "currency", currency: "IDR" })
        }));

        const summaryData = [
            { "Label": "Net Profit", "Amount": `Rp. ${parseInt(totalProfit.f2).toLocaleString("id-ID")}` },
            { "Label": "Bruto Profit", "Amount": `Rp. ${totalProfit.f3.toLocaleString("id-ID")}` }
        ];
    
        const wsSummary = XLSX.utils.json_to_sheet(summaryData);
        
        
        const ws = XLSX.utils.json_to_sheet(tableData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transaction Report");
        XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
    
        XLSX.writeFile(wb, `Transaction_Report_${startDate}_${endDate}.xlsx`);
    };

    if (initialData != null) {
        return (
            <AppLayout>
                <div className="my-2">
                    <DateFilter />
                </div>
                <div className="w-full py-8 shadow-md border" ref={printRef}>
                    <h1 className='text-center text-4xl font-bold mx-8'>7NightMarket</h1>
                    <h2 className='text-center text-xl'>Transaction Report</h2>
                    <div className="text-center mb-5 text-xs">
                        {startDate} - {endDate}
                    </div>
                    <div className="px-10">
                        <Table>
                            <TableCaption>7NightMarket</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Invoice</TableHead>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Discount</TableHead>
                                    <TableHead className='text-end'>Total Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {initialData.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">{new Date(invoice.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })}</TableCell>
                                        <TableCell>{invoice.id}</TableCell>
                                        <TableCell>{(invoice.member != null) ? invoice.member.name : "Guest"}</TableCell>
                                        <TableCell>{invoice.discount}%</TableCell>
                                        <TableCell className='text-end'>{parseInt(`${invoice.fixed_total_price}`).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4} className='text-end'>Net Profit</TableCell>
                                    <TableCell className="text-end">{(totalProfit.f2) ? parseInt(totalProfit.f2).toLocaleString("id-ID", { style: "currency", currency: "IDR" }) : "0"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={4} className='text-end'>Bruto Profit</TableCell>
                                    <TableCell className="text-end">{(totalProfit.f3) ? totalProfit.f3.toLocaleString("id-ID", { style: "currency", currency: "IDR" }) : "0"}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
                <div className="my-2 w-full flex justify-end gap-2">
                    <Button onClick={handleExportToExcel}><FileText className="mr-2" /> Export to Excel</Button>
                    <Button onClick={handlePrint}><Printer /></Button>
                </div>
            </AppLayout>
        )
    } else {
        return (
            <AppLayout>
                <div className="my-2">
                    <DateFilter />
                </div>
            </AppLayout>
        )
    }
}

export default Index
