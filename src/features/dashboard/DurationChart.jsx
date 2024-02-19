import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "../../contexts/ThemeContext";

function DurationChart({ confirmedStays }) {
  // Get the data

  // 1- Initializing an array with initial data representing different durations of stays
  const startData = [
    {
      duration: "1 night",
      value: 0,
    },
    {
      duration: "2 nights",
      value: 0,
    },
    {
      duration: "3 nights",
      value: 0,
    },
    {
      duration: "4-5 nights",
      value: 0,
    },
    {
      duration: "6-7 nights",
      value: 0,
    },
    {
      duration: "8-14 nights",
      value: 0,
    },
    {
      duration: "15-21 nights",
      value: 0,
    },
    {
      duration: "21+ nights",
      value: 0,
    },
  ];

  // 2- Function to increment the value of a specific duration in an array
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      // If the duration of the object matches the specified field, increment it's value
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  // 3- prepare data based on confirmed stays
  function prepareData(stays) {
    const data = stays
      .reduce((acc, curr) => {
        const num = curr.num_of_nights;
        switch (true) {
          case num === 1:
            return incArrayValue(acc, "1 night");
          case num === 2:
            return incArrayValue(acc, "2 nights");
          case num === 3:
            return incArrayValue(acc, "3 nights");
          case [4, 5].includes(num):
            return incArrayValue(acc, "4-5 nights");
          case [6, 7].includes(num):
            return incArrayValue(acc, "6-7 nights");
          case num >= 8 && num <= 14:
            return incArrayValue(acc, "8-14 nights");
          case num >= 15 && num <= 21:
            return incArrayValue(acc, "15-21 nights");
          case num >= 21:
            return incArrayValue(acc, "21+ nights");
          default:
            return acc;
        }
      }, startData)
      .filter((obj) => obj.value > 0);
    return data;
  }
  const staysData = prepareData(confirmedStays);

  // Handle colors, in light and dark theme
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const pieColors = isLightMode
    ? [
        "#a855f7",
        "#3b82f6",
        "#14b8a6",
        "#22c55e",
        "#84cc16",
        "#eab308",
        "#f97316",
        "#ef4444",
      ]
    : [
        "#7e22ce",
        "#1d4ed8",
        "#0f766e",
        "#15803d",
        "#4d7c0f",
        "#a16207",
        "#c2410c",
        "#b91c1c",
      ];

  return (
    <div className="h-[400px] rounded-lg bg-white p-6 shadow-sm dark:bg-dark-bg">
      <h2 className="heading-2 mb-6">Stay duration summary</h2>

      {!staysData.length ? (
        <p className="sec-text-color text-lg">
          Sorry, there is no data to be displayed during the selected time
          duration.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={staysData}
              nameKey="duration"
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={82}
              paddingAngle={3}
            >
              {staysData.map((entry, index) => {
                return (
                  <Cell
                    key={entry.duration}
                    fill={pieColors[index]}
                    strokeWidth={0}
                  />
                );
              })}
            </Pie>

            <Legend
              iconType="circle"
              align="right"
              verticalAlign="middle"
              layout="vertical"
              width="35%"
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default DurationChart;
