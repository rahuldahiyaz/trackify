"use client"

import { Progress } from "@/components/ui/progress"

const assignments = [
  { subject: "Software Engineering & Project Management", completed: 5, total: 6 },
  { subject: "Machine Learning", completed: 4, total: 5 },
  { subject: "Cryptography & Network Security", completed: 3, total: 4 },
  { subject: "Cloud Computing", completed: 5, total: 5 },
  { subject: "Image processing & Computer Vision", completed: 4, total: 6 },
  { subject: "Internet of Things", completed: 3, total: 4 },
]

export function SubjectAssignments() {
  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <div key={assignment.subject} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{assignment.subject}</span>
            <span className="text-sm text-muted-foreground">
              {assignment.completed}/{assignment.total}
            </span>
          </div>
          <Progress
            value={(assignment.completed / assignment.total) * 100}
            className="h-2"
          />
        </div>
      ))}
    </div>
  )
}

