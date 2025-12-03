import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { EquityPoint, ProfitByPeriod } from "@/lib/mockTradeData";

interface PerformanceChartsProps {
  equityCurve: EquityPoint[];
  weeklyProfit: ProfitByPeriod[];
  profitByTradeType: { name: string; profit: number; count: number }[];
  profitByStrategy: { name: string; profit: number; count: number }[];
  profitByAsset: { name: string; profit: number; count: number }[];
}

const CHART_COLORS = {
  primary: 'hsl(217, 91%, 60%)',
  bullish: 'hsl(142, 76%, 36%)',
  bearish: 'hsl(0, 72%, 51%)',
  chart1: 'hsl(217, 91%, 60%)',
  chart2: 'hsl(142, 76%, 36%)',
  chart3: 'hsl(0, 72%, 51%)',
  chart4: 'hsl(38, 92%, 50%)',
  chart5: 'hsl(280, 80%, 60%)',
};

const PIE_COLORS = [CHART_COLORS.chart1, CHART_COLORS.chart2, CHART_COLORS.chart4, CHART_COLORS.chart5];

export function PerformanceCharts({
  equityCurve,
  weeklyProfit,
  profitByTradeType,
  profitByStrategy,
  profitByAsset,
}: PerformanceChartsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Equity Curve */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Equity Curve (Cumulative PnL)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equityCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Equity']}
                />
                <Line 
                  type="monotone" 
                  dataKey="equity" 
                  stroke={CHART_COLORS.bullish}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLORS.bullish, strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, fill: CHART_COLORS.bullish }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Profit */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Profit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProfit}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="period" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Profit']}
                />
                <Bar 
                  dataKey="profit" 
                  fill={CHART_COLORS.primary}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Profit by Trade Type */}
      <Card>
        <CardHeader>
          <CardTitle>Profit by Trade Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitByTradeType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Profit']}
                />
                <Bar 
                  dataKey="profit" 
                  fill={CHART_COLORS.chart4}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Profit by Strategy - Donut Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Profit by Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={profitByStrategy}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="profit"
                  nameKey="name"
                  label={({ name, profit }) => `${name}: $${profit.toLocaleString()}`}
                  labelLine={false}
                >
                  {profitByStrategy.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Profit']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Profit by Asset - Horizontal Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Profit by Asset</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitByAsset} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  width={50}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Profit']}
                />
                <Bar 
                  dataKey="profit" 
                  radius={[0, 4, 4, 0]}
                >
                  {profitByAsset.map((entry) => (
                    <Cell 
                      key={entry.name} 
                      fill={entry.profit >= 0 ? CHART_COLORS.bullish : CHART_COLORS.bearish} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
