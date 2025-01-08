import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SubjectAssignments } from "@/components/custom/subject-assignments"
import { SubjectMarks } from "@/components/custom/subject-marks"
import { TeacherFeedback } from "@/components/custom/teacher-feedback"
import { SkillsRating } from "@/components/custom/skills-rating"
import { AttendanceStats } from "@/components/custom/attendance-graph"


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
      
      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/30</div>
            <p className="text-xs text-muted-foreground">
              4 pending submissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CT Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.3</div>
            <p className="text-xs text-muted-foreground">
              +2.1 from last CT
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A+</div>
            <p className="text-xs text-muted-foreground">
              Top 15% of class
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<div>Loading...</div>}>
              <AttendanceStats />
            </Suspense>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <SubjectAssignments />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Subject Marks & Skills */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Class Test Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <SubjectMarks />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Skills Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <SkillsRating />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Teacher Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <TeacherFeedback />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

