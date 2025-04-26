import { useContext } from "react";
import { ExpenseRatioContext } from "../../context/ExpenseRatioContext";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ['#FF9304', '#A000FF', '#FDE006', '#0088FE', '#00C49F', '#FFBB28', '#009072', '#FF7490', '#873399', '#C49F',];

export default function TrackerChart() {
    const { expenseRatio } = useContext(ExpenseRatioContext);

    let data = Object.entries(expenseRatio).map(item => {
        return { name: item[0], value: item[1].ratio }
    });

    return <>
        {data.length !== 0 && <div className='Tracker-chart'>
            <ResponsiveContainer width={180} height={180}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='none' />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="Tracker-chart-labels">
                {data.map((entry, index) => (
                    <div key={`legend-item-${index}`} style={{
                        display: 'flex', alignItems: 'center',
                    }}>
                        <div
                            style={{
                                width: '26px',
                                height: '8px',
                                backgroundColor: COLORS[index % COLORS.length],
                                marginRight: '5px',
                            }}
                        ></div>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: '400',
                            whiteSpace: 'nowrap',
                            marginRight: '10px',
                            color: '#FFFFFF'
                        }}>
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>}
    </>
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: '12px', fontWeight: '400' }}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
