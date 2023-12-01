import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import _ from "lodash";


function Statistics() {

    const trainingLink = "https://traineeapp.azurewebsites.net/gettrainings";

    const [trainings, setTrainings] = useState([]);

    const getTrainings = () => {
        fetch(trainingLink)
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => getTrainings(), []);

    const groupedTrainings = _.groupBy(trainings, "activity");

    const data = Object.keys(groupedTrainings).map(activity => {
        const activitysDuration = _.sumBy(groupedTrainings[activity], "duration");
        return { name: activity, value: activitysDuration }
    })

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF5252', '#4CAF50', '#FFEB3B', '#9C27B0', '#2196F3', '#FF1493',
        '#FFA500'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, value }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const labelRadius = outerRadius + 30;
        const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
        const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
        const a = cx + radius * Math.cos(-midAngle * RADIAN);
        const b = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <g>
                <text x={a} y={b} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {` ${(percent * 100).toFixed(0)}%`}
                </text>
                <text x={x} y={y} fill='#333333' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="hanging">
                    {name}:  {value} minutes
                </text>
            </g>
        );
    };


    return (
        <>
            <h1 style={{ textAlign: "center" }}>Training distribution</h1>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </>
    );
}

export default Statistics;
