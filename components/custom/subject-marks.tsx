"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const marks = [
  { subject: "SWE", fullSubject: "Software Engineering & Project Management", marks: 85 },
  { subject: "ML", fullSubject: "Machine Learning", marks: 78 },
  { subject: "CNS", fullSubject: "Cryptography and Network Security", marks: 82 },
  { subject: "CC", fullSubject: "Cloud Computing", marks: 88 },
  { subject: "IP & CV", fullSubject: "Image Processing & Computer Vision", marks: 92 },
  { subject: "IOT", fullSubject: "Internet of Things", marks: 95 },
]

export function SubjectMarks() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={marks}>
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
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          formatter={(value, name, props) => [
            `${value}`,
            props.payload?.fullSubject || name, // Show full subject name in the tooltip
          ]}
          contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
        />
        <Bar
          dataKey="marks"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
