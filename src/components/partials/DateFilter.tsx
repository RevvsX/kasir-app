import { useRouter } from "next/router";
import { Input } from "../ui/input"
import { Label } from "../ui/label";


const DateFilter = () => {

    const router = useRouter()
    const { startDate = "", endDate = "" } = router.query;


    const handleDateChange = (key: "startDate" | "endDate", value: string) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, [key]: value },
        });
    };
    return (
        <div className="flex gap-2 my-2">
            <div className="flex flex-col w-full gap-2">
                <Label>
                    Start date
                </Label>
                <Input
                    type="date"
                    value={startDate as string}
                    onChange={(e) => handleDateChange("startDate", e.target.value)}
                />
            </div>
            <div className="flex flex-col w-full gap-2">
                <Label>
                    End Date
                </Label>
                <Input
                    type="date"
                    value={endDate as string}
                    onChange={(e) => handleDateChange("endDate", e.target.value)}
                />
            </div>
        </div>
    )
}

export default DateFilter