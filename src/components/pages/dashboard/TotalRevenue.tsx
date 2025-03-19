import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TotalRevenue = ({revenue}: {revenue: string}) => {
  return (
    <Card className="border border-green-500 w-full hover:bg-green-500 transition-all hover:text-white group cursor-pointer">
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
        <CardDescription className="group-hover:text-white transition-all">
          Total revenue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-xl text-green-500 group-hover:text-white transition-all">
          {revenue}
        </h1>
      </CardContent>
    </Card>
  );
};

export default TotalRevenue;
