"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked area chart showing EVI coefficient comparison"

const chartData = [
  { month: "January", year1: 0.6, year2: 0.3 },
  { month: "February", year1: 0.8, year2: 0.5 },
  { month: "March", year1: 0.3, year2: 0.1 },
  { month: "April", year1: -0.2, year2: -0.1 },
  { month: "May", year1: 0.4, year2: 0.2 },
  { month: "June", year1: 0.7, year2: 0.6 },
]

const chartConfig = {
  year1: {
    label: "Year 1",
    color: "hsl(var(--chart-1))",
  },
  year2: {
    label: "Year 2",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Comparing EVI coefficient between two years
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              domain={[-1, 1]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toFixed(1)}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="year1"
              type="natural"
              fill="var(--color-year1)"
              fillOpacity={0.4}
              stroke="var(--color-year1)"
              stackId="a"
            />
            <Area
              dataKey="year2"
              type="natural"
              fill="var(--color-year2)"
              fillOpacity={0.4}
              stroke="var(--color-year2)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              May 2024 have a better EVI than May 2023 <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June | 2023 vs 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
