import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DashboardChart({ chartData }) {
  let maxOrder = 0;
  let maxOrderCategory = "";
  let maxSale = 0;
  let maxSaleCategory = "";
  for (let i = 0; i < chartData.length; i++) {
    const item = chartData[i];
    if (maxOrder < item.orders) {
      maxOrder = item.orders;
      maxOrderCategory = item.category;
    }
    if (maxSale < item.sales) {
      maxSale = item.sales;
      maxSaleCategory = item.category;
    }
  }
  return (
    <Card className='rounded-md'>
      <CardHeader>
        <CardTitle>Category Sales</CardTitle>
        <CardDescription>Not Including Refund and Cancelled Orders</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <YAxis yAxisId='left' orientation='left' />
            <YAxis yAxisId='right' orientation='right' />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
            <Bar yAxisId='left' dataKey='orders' fill='var(--color-orders)' radius={4} />
            <Bar yAxisId='right' dataKey='sales' fill='var(--color-sales)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='text-sm'>
        <div className=' text-muted-foreground'>
          Most ordered category is {maxOrderCategory}, the order amount is {maxOrder}. Most sold category is{" "}
          {maxSaleCategory}, the sale amount is {maxSale}.
        </div>
      </CardFooter>
    </Card>
  );
}
