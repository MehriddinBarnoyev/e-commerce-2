"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "../components/layout/admin-layout";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const analyticsData = [
  {
    month: "Jan",
    pageViews: 5000,
    activeUsers: 2000,
    conversionRate: 2.5,
    revenue: 10000,
  },
  {
    month: "Feb",
    pageViews: 6000,
    activeUsers: 2200,
    conversionRate: 2.7,
    revenue: 12000,
  },
  {
    month: "Mar",
    pageViews: 7500,
    activeUsers: 2600,
    conversionRate: 3.0,
    revenue: 15000,
  },
  {
    month: "Apr",
    pageViews: 8200,
    activeUsers: 2800,
    conversionRate: 3.2,
    revenue: 17000,
  },
  {
    month: "May",
    pageViews: 9000,
    activeUsers: 3100,
    conversionRate: 3.5,
    revenue: 20000,
  },
  {
    month: "Jun",
    pageViews: 9500,
    activeUsers: 3300,
    conversionRate: 3.7,
    revenue: 22000,
  },
  {
    month: "Jul",
    pageViews: 9700,
    activeUsers: 3500,
    conversionRate: 4.0,
    revenue: 20000,
  },
  {
    month: "Aug",
    pageViews: 9800,
    activeUsers: 3700,
    conversionRate: 4.2,
    revenue: 24000,
  },
  {
    month: "Sep",
    pageViews: 9200,
    activeUsers: 3400,
    conversionRate: 3.9,
    revenue: 23000,
  },
  {
    month: "Oct",
    pageViews: 8900,
    activeUsers: 3200,
    conversionRate: 3.6,
    revenue: 21000,
  },
  {
    month: "Nov",
    pageViews: 8700,
    activeUsers: 3100,
    conversionRate: 3.4,
    revenue: 20000,
  },
  {
    month: "Dec",
    pageViews: 9500,
    activeUsers: 3300,
    conversionRate: 3.8,
    revenue: 22000,
  },
];

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="grid gap-6 ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics Overview</h1>
        </div>
        <Card className="bg-dark text-white border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                pageViews: {
                  label: "Page Views",
                  color: "hsl(var(--chart-1))",
                },
                activeUsers: {
                  label: "Active Users",
                  color: "hsl(var(--chart-2))",
                },
                conversionRate: {
                  label: "Conversion Rate",
                  color: "hsl(var(--chart-3))",
                },
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={analyticsData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis yAxisId="left" stroke="#888888" />
                  <YAxis yAxisId="right" orientation="right" stroke="#888888" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="pageViews"
                    fill="var(--color-pageViews)"
                    fillOpacity={0.3}
                    stroke="var(--color-pageViews)"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="activeUsers"
                    fill="var(--color-activeUsers)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversionRate"
                    stroke="var(--color-conversionRate)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(analyticsData[analyticsData.length - 1]).map(
            ([key, value]) =>
              key !== "month" && (
                <Card
                  key={key}
                  className="bg-dark text-white border-zinc-800"
                >
                  <CardHeader>
                    <CardTitle className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {typeof value === "number"
                        ? key === "conversionRate"
                          ? `${value.toFixed(1)}%`
                          : key === "revenue"
                          ? `$${value.toLocaleString()}`
                          : value.toLocaleString()
                        : value}
                    </div>
                  </CardContent>
                </Card>
              )
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
