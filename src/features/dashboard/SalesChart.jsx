import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, subDays, format, isSameDay } from "date-fns";
import { useTheme } from "../../contexts/ThemeContext";

function SalesChart({ recentBookings, numOfDays }) {
  // Calculate data

  // 1- Get dates between the specified days ago and today
  const targetDates = eachDayOfInterval({
    start: subDays(new Date(), numOfDays - 1),
    end: new Date(),
  });

  // 2- Create data array based on the target days we have and the bookings that was created in those days
  const data = targetDates.map((day) => {
    return {
      // Just formatting the day
      label: format(day, "MMM dd"),
      // Return sub of all "total_price" values from all bookings that was "created_at" this "day"
      total_sales: recentBookings
        .filter((booking) => isSameDay(day, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.total_price, 0),
      // The same => Return sub of all "extra_price" values from all bookings that was "created_at" this "day"
      extra_sales: recentBookings
        .filter((booking) => isSameDay(day, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extra_price, 0),
    };
  });

  // 3- Get first and last day
  const firstDay = format(targetDates.at(0), "MMM dd yyyy");
  const lastDay = format(targetDates[targetDates.length - 1], "MMM dd yyyy");

  // Handle colors, in light and dark theme
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const colors = {
    indigoColor: isLightMode ? "#c7d2fe" : "#4f46e5",
    greenColor: isLightMode ? "#dcfce7" : "#22c55e",
    textColor: isLightMode ? "#374151" : "#e5e7eb",
    backgroundColor: isLightMode ? "#fff" : "#18212f",
    strokeIndigo: "#6366f1",
    strokeGreen: "#16a34a",
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-dark-bg">
      <h2 className="heading-2 mb-6 text-balance">
        Sales from {firstDay} &mdash; {lastDay}
      </h2>

      {!data.length ? (
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Sorry, there is no data to be displayed during the selected time
          duration.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis
              dataKey="label"
              tick={{ fill: colors.textColor }}
              tickLine={{ stroke: colors.textColor }}
            />
            <YAxis
              unit="$"
              axisLine={false}
              tick={{ fill: colors.textColor }}
              tickLine={{ stroke: colors.textColor }}
            />
            <CartesianGrid
              strokeDasharray="4"
              strokeOpacity={isLightMode ? 1 : 0.2}
            />
            <Tooltip
              contentStyle={{ backgroundColor: colors.backgroundColor }}
              cursor={{ stroke: colors.strokeIndigo, strokeWidth: 2 }}
            />
            <Legend iconType="square" />

            <Area
              type="natural"
              dataKey="total_sales"
              fill={colors.indigoColor}
              stroke={colors.strokeIndigo}
              strokeWidth={2}
              name="Total sales"
              unit="$"
            />
            <Area
              type="natural"
              dataKey="extra_sales"
              fill={colors.greenColor}
              stroke={colors.strokeGreen}
              strokeWidth={2}
              name="Extra sales"
              unit="$"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SalesChart;
