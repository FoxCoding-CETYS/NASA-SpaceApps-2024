"use client"

import { useEffect, useState } from "react"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Loader2, Info, Brain } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface PredictionData {
  LST_DAY: number
  LST_NIGHT: number
  EVI: number
  NDVI: number
  quarter: number
  month: number
  year: number
  dayofyear: number
  dayofmonth: number
  weekofyear: number
  prediction: number
}

export default function Component({ longitude, latitude }: { longitude: string, latitude: string }) {
  const [data, setData] = useState<PredictionData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://evipred2.purplemoss-24dee846.westus.azurecontainerapps.io/predict?latitude=${latitude}&longitude=${longitude}`
        )
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const result = await response.json()
        // Escalar los valores de EVI por un factor de 10,000 y ordenar los datos
        const scaledData = result
          .map((item: PredictionData) => ({
            ...item,
            EVI: item.EVI / 10000,
          }))
          .sort((a: PredictionData, b: PredictionData) => a.dayofyear - b.dayofyear)
        setData(scaledData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [longitude, latitude])

  const formatDate = (dayofyear: number, year: number) => {
    const date = new Date(year, 0, dayofyear)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">
              AI-Powered EVI Time Series
            </CardTitle>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                <Info className="h-4 w-4" />
                <span className="sr-only">EVI Information</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <p className="text-sm text-muted-foreground">
                EVI (Enhanced Vegetation Index) es una medida de la vegetación y su salud. Rango de -1 a +1, con valores más altos indicando vegetación más densa y saludable. EVI es más sensible a variaciones estructurales del dosel y menos susceptible a influencias atmosféricas que otros índices de vegetación.
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <CardDescription>
          Powered by AI and NASA's MODIS satellite data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ChartContainer
            config={{
              EVI: {
                label: "EVI",
                color: "black",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="dayofyear"
                  tickFormatter={(dayofyear) =>
                    formatDate(dayofyear, data[0].year)
                  }
                  label={{
                    value: "Fecha",
                    position: "insideBottom",
                    offset: -10,
                  }}
                />
                <YAxis
                  label={{
                    value: "EVI",
                    angle: -90,
                    position: "insideLeft",
                    offset: 10,
                  }}
                  domain={[-1, 1]}
                  ticks={[-1, -0.5, 0, 0.5, 1]}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <ChartTooltipContent>
                          <div className="text-sm font-bold">
                            {formatDate(data.dayofyear, data.year)}
                          </div>
                          <div className="text-xs">
                            EVI: {data.EVI.toFixed(4)}
                          </div>
                        </ChartTooltipContent>
                      )
                    }
                    return null
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="EVI"
                  stroke="black"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}