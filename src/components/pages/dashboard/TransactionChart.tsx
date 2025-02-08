import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { day: "01", transactions: 60 },
  { day: "02", transactions: 100 },
  { day: "03", transactions: 80 },
  { day: "04", transactions: 86 },
  { day: "05", transactions: 90 },
  { day: "06", transactions: 90 },
  { day: "07", transactions: 70 },
  { day: "08", transactions: 50 },
  { day: "09", transactions: 100 },
  { day: "10", transactions: 90 },
  { day: "11", transactions: 80 },
  { day: "12", transactions: 90 },
  { day: "13", transactions: 94 },
  { day: "14", transactions: 34 },
  { day: "15", transactions: 89 },
  { day: "16", transactions: 56 },
  { day: "17", transactions: 98 },
  { day: "18", transactions: 120 },
  { day: "19", transactions: 100 },
  { day: "20", transactions: 110 },
  { day: "21", transactions: 60 },
  { day: "22", transactions: 80 },
  { day: "23", transactions: 100 },
  { day: "24", transactions: 120 },
  { day: "25", transactions: 60 },
  { day: "26", transactions: 90 },
  { day: "27", transactions: 150 },
  { day: "28", transactions: 89 },
  { day: "29", transactions: 190 },
  { day: "30", transactions: 200 },
];

const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "#000",
  },
} satisfies ChartConfig;

const TransactionChart = () => {
  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <h1 className="text-xl">Transaction statistics</h1>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="transactions"
              fill="var(--color-desktop)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionChart;
