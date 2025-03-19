import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const TotalNetProfit = ({netProfit}: {netProfit: string}) => {
  return (
    <Card className="border border-blue-500 w-full hover:bg-blue-500 transition-all hover:text-white group cursor-pointer">
      <CardHeader>
        <CardTitle>Total Net Profit</CardTitle>
        <CardDescription className="group-hover:text-white transition-all">
          Total net profit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-xl text-blue-500 group-hover:text-white transition-all">
          {netProfit}
        </h1>
      </CardContent>
    </Card>
  );
};

export default TotalNetProfit;
