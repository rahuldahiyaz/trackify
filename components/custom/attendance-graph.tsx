"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from "recharts"



const data = [
  { subject: "SWE", fullSubject: "Software Engineering & Project Management", present: 92, absent: 8 },
  { subject: "ML", fullSubject: "Machine Learning", present: 88, absent: 12 },
  { subject: "CNS", fullSubject: "Cryptography & Network Security", present: 85, absent: 15 },
  { subject: "CC", fullSubject: "Cloud Computing", present: 90, absent: 10 },
  { subject: "IP & CV", fullSubject: "Image Processing & Computer Vision", present: 95, absent: 5 },
  { subject: "IOT", fullSubject: "Internet of Things", present: 87, absent: 13 },
  { subject: "SP & D", fullSubject: "Software Project & Documentation", present: 87, absent: 13 },
  { subject: "AD Lab", fullSubject: " Application Development Lab", present: 56, absent: 44 },
  { subject: "ML Lab", fullSubject: "Machine Learning Lab", present: 56, absent: 44 },
]

export function AttendanceStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="subject"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          formatter={(value, name, props) => [
            `${value}%`,
            props.payload?.fullSubject || name, // Show full subject name in the tooltip
          ]}
          contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
        />
        <Bar
          dataKey="present"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        >
          <LabelList
            dataKey="present"
            position="top"
            formatter={(value) => `${value}%`}
            style={{
              fontSize: "12px",
              fill: "#333",
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
