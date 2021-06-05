import { memo, useState, useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const PieChartGraph = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pieData, setPieData] = useState([]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (data) {
      const newData = [];
      Object.keys(data).forEach((key) => {
        if (key !== 'total') {
          newData.push({
            name: key,
            value: data[key]
          });
        }
      })
      setPieData(newData);
    }
  }, [data])

  return (
    <div id="pie">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={450} height={450}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#FD5E5A"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(PieChartGraph);