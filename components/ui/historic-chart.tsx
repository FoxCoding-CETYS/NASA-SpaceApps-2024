"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart showing EVI comparison for two years"

const chartData = [
  { date: "2024-04-01", year2023: 0.6, year2024: 0.3 },
  { date: "2024-04-02", year2023: 0.7, year2024: 0.2 },
  { date: "2024-04-03", year2023: -0.1, year2024: 0.4 },
  { date: "2024-04-04", year2023: 0.5, year2024: -0.3 },
  { date: "2024-04-05", year2023: 0.2, year2024: 0.6 },
  { date: "2024-04-06", year2023: 0.8, year2024: 0.4 },
  { date: "2024-04-07", year2023: 0.3, year2024: 0.5 },
  { date: "2024-04-08", year2023: -0.4, year2024: 0.6 },
  { date: "2024-04-09", year2023: 0.5, year2024: 0.2 },
  { date: "2024-04-10", year2023: 0.6, year2024: 0.3 },
  { date: "2024-04-11", year2023: 0.1, year2024: -0.2 },
  { date: "2024-04-12", year2023: 0.4, year2024: 0.1 },
  { date: "2024-04-13", year2023: 0.3, year2024: 0.7 },
  { date: "2024-04-14", year2023: 0.6, year2024: 0.8 },
  { date: "2024-04-15", year2023: 0.4, year2024: -0.1 },
]

const chartConfig = {
  year2023: {
    label: "Year 2023",
    color: "hsl(var(--chart-1))",
  },
  year2024: {
    label: "Year 2024",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function HistoricChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("year2023")

  const total = React.useMemo(
    () => ({
      year2023: chartData.reduce((acc, curr) => acc + curr.year2023, 0)/chartData.length,
      year2024: chartData.reduce((acc, curr) => acc + curr.year2024, 0)/chartData.length,
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - EVI Comparison</CardTitle>
          <CardDescription>
            Comparing EVI coefficient for 2023 and 2024
          </CardDescription>
        </div>
        <div className="flex">
          {["year2023", "year2024"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toFixed(2)}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="EVI"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}