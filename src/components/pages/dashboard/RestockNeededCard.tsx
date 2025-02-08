import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const RestockNeededCard = () => {
  return (
    <Card className="border border-yellow-500 w-full hover:bg-yellow-500 transition-all hover:text-white group cursor-pointer">
      <CardHeader>
        <CardTitle>Restock needed</CardTitle>
        <CardDescription className="group-hover:text-white transition-all">
          Products that need to be restocked
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-xl text-yellow-500 group-hover:text-white transition-all">
          10
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

export default RestockNeededCard;
