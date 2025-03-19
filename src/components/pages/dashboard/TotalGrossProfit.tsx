import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TotalGrossProfit = ({grossProfit}: {grossProfit: string}) => {
  return (
    <Card className="border border-yellow-500 w-full hover:bg-yellow-500 transition-all hover:text-white group cursor-pointer">
      <CardHeader>
        <CardTitle>Total Gross Profit</CardTitle>
        <CardDescription className="group-hover:text-white transition-all">
          Total gross profit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-xl text-yellow-500 group-hover:text-white transition-all">
          {grossProfit}
        </h1>
      </CardContent>
    </Card>
  );
};

export default TotalGrossProfit;
