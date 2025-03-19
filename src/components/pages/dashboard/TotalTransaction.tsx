import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TotalTransaction = ({transaction}: {transaction: number}) => {
  return (
    <Card className="border border-yellow-500 w-full hover:bg-yellow-500 transition-all hover:text-white group cursor-pointer">
      <CardHeader>
        <CardTitle>Total Transaction</CardTitle>
        <CardDescription className="group-hover:text-white transition-all">
          Total transaction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-xl text-yellow-500 group-hover:text-white transition-all">
          {transaction}
        </h1>
      </CardContent>
    </Card>
  );
};

export default TotalTransaction;
