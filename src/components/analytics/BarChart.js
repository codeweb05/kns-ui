import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const BarChartGraph = ({data=[]}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#FD5E5A" />
        <Bar dataKey="uv" fill="#FD5E5A" />
      </BarChart>
    </ResponsiveContainer>
  );

}

export default memo(BarChartGraph);
