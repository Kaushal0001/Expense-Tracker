import { useContext } from "react";
import { ExpenseRatioContext } from "../../context/ExpenseRatioContext";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function TopExpensesChart() {
    const { expenseRatio } = useContext(ExpenseRatioContext);

    let data = Object.entries(expenseRatio).map(item => {
        return { name: item[0], value: item[1].ratio }
    })

    return (
        <ResponsiveContainer  >
            {Object.keys(expenseRatio).length === 0 &&
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <p style={{ color: 'gray' }}>No Expenses</p>
                </div>
            }
            {Object.keys(expenseRatio).length!==0 && <BarChart
                layout="vertical"
                width={500}
                height={300}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis type="number" tickLine={false} tick={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'black' }} />
                <Bar dataKey="value" fill="#8884d8" radius={[0, 20, 20, 0]} barSize={20} />
            </BarChart>}
        </ResponsiveContainer>
    );
}