import React from "react";

interface Stat {
  device: string;
  [key: string]: any;
}

interface DeviceProps {
  stats: Stat[];
}

interface ChartData {
  device: string;
  count: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Device: React.FC<DeviceProps> = ({ stats }) => {
  const deviceCount = stats.reduce(
    (acc: { [key: string]: number }, item: Stat) => {
      if (!acc[item.device]) {
        acc[item.device] = 0;
      }
      acc[item.device]++;
      return acc;
    },
    {}
  );

  const result: ChartData[] = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));

  const total = result.reduce((sum, item) => sum + item.count, 0);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <svg width="100%" height="100%" viewBox="-1 -1 2 2">
        {result.map((item, index) => {
          const startAngle =
            index === 0
              ? 0
              : (result.slice(0, index).reduce((sum, i) => sum + i.count, 0) /
                  total) *
                2 *
                Math.PI;
          const endAngle = startAngle + (item.count / total) * 2 * Math.PI;

          const startX = Math.cos(startAngle);
          const startY = Math.sin(startAngle);
          const endX = Math.cos(endAngle);
          const endY = Math.sin(endAngle);

          const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

          const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`,
          ].join(" ");

          const midAngle = (startAngle + endAngle) / 2;
          const labelX = Math.cos(midAngle) * 0.6;
          const labelY = Math.sin(midAngle) * 0.6;

          return (
            <g key={item.device}>
              <path d={pathData} fill={COLORS[index % COLORS.length]} />
              <text
                x={labelX}
                y={labelY}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="0.1"
              >
                {`${item.device}: ${((item.count / total) * 100).toFixed(0)}%`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Device;
