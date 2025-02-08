import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from "react";

const NumberOfProductsCard = () => {
  return (
    <Card className="border border-blue-500 w-full hover:bg-blue-500 transition-all hover:text-white group cursor-pointer">
      <CardHeader>
        <CardTitle>Number of products</CardTitle>
        <CardDescription className="group-hover:text-white transition-all">
          Number of products by brand
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-xl text-blue-500 group-hover:text-white transition-all">
          1000
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

export default NumberOfProductsCard;
