import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const ProfitCard = () => {
  return (
    <Card className="border border-green-500 w-full hover:bg-green-500 transition-all hover:text-white group cursor-pointer">
      <CardHeader>
        <CardTitle>Total profit</CardTitle>
        <CardDescription className="group-hover:text-white transition-all">
          total net profit of all time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-xl text-green-500 group-hover:text-white transition-all">
          Rp.700.000.000,00
        </h1>
      </CardContent>
      <CardFooter>
        <span className="text-xs flex items-center gap-2">
          Click for details <ArrowRight />
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProfitCard;
