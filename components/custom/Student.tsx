"use client"

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Student {
  id: string
  name: string
  email: string
  course: string
  enrollmentYear: string
  gpa: string
}

const initialStudentsData: Student[] = [
  { id: "S20010010", name: "Rahul Kumar", email: "rahul.kumar@example.com", course: "MCA 3rd", enrollmentYear: "2022-2023", gpa: "3.8" },
  { id: "S20010011", name: "Priya Sharma", email: "priya.sharma@example.com", course: "MCA 3rd", enrollmentYear: "2022-2023", gpa: "3.9" },
  { id: "S20010012", name: "Amit Patel", email: "amit.patel@example.com", course: "MCA 1st", enrollmentYear: "2023-2024", gpa: "3.7" },
  { id: "S20010013", name: "Sneha Gupta", email: "sneha.gupta@example.com", course: "MCA 3rd", enrollmentYear: "2022-2023", gpa: "4.0" },
  { id: "S20010014", name: "Vikram Singh", email: "vikram.singh@example.com", course: "MCA 1st", enrollmentYear: "2023-2024", gpa: "3.6" },
  { id: "S20010015", name: "Neha Verma", email: "neha.verma@example.com", course: "MCA 3rd", enrollmentYear: "2022-2023", gpa: "3.8" },
  { id: "S20010016", name: "Rajesh Kumar", email: "rajesh.kumar@example.com", course: "MCA 1st", enrollmentYear: "2023-2024", gpa: "3.5" },
  { id: "S20010017", name: "Anita Desai", email: "anita.desai@example.com", course: "MCA 3rd", enrollmentYear: "2022-2023", gpa: "3.9" },
  { id: "S20010018", name: "Suresh Reddy", email: "suresh.reddy@example.com", course: "MCA 1st", enrollmentYear: "2023-2024", gpa: "3.7" },
  { id: "S20010019", name: "Meera Rao", email: "meera.rao@example.com", course: "MCA 3rd", enrollmentYear: "2022-2023", gpa: "4.0" },
]

export function StudentManagement() {
  const [studentsData, setStudentsData] = useState<Student[]>(initialStudentsData)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const itemsPerPage = 8
  const totalItems = studentsData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return studentsData.slice(startIndex, endIndex)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
  }

  const handleDelete = (id: string) => {
    setStudentsData(studentsData.filter(student => student.id !== id))
  }

  const handleSaveEdit = (updatedStudent: Student) => {
    setStudentsData(studentsData.map(student =>
      student.id === updatedStudent.id ? updatedStudent : student
    ))
    setEditingStudent(null)
  }

  const handleAddStudent = (newStudent: Student) => {
    setStudentsData([...studentsData, newStudent])
  }

  const currentData = getCurrentPageData()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-regular mb-4">Students of MCA Department</h1>
      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the details of the new student here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <AddStudentForm onAddStudent={handleAddStudent} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto border rounded-lg border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name & Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrollment Year
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GPA
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={`/placeholder.svg?height=40&width=40`} alt={student.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.course}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.enrollmentYear}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gpa}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(student)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Student Information</DialogTitle>
                          <DialogDescription>
                            Make changes to the student's information here. Click save when you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <EditStudentForm student={student} onSave={handleSaveEdit} />
                      </DialogContent>
                    </Dialog>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(student.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => handlePageChange(index + 1)} isActive={currentPage === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

function EditStudentForm({ student, onSave }: { student: Student, onSave: (updatedStudent: Student) => void }) {
  const [editedStudent, setEditedStudent] = useState(student)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedStudent)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" name="name" value={editedStudent.name} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" name="email" value={editedStudent.email} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="course" className="text-right">
            Course
          </Label>
          <Input id="course" name="course" value={editedStudent.course} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="enrollmentYear" className="text-right">
            Enrollment Year
          </Label>
          <Input id="enrollmentYear" name="enrollmentYear" value={editedStudent.enrollmentYear} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="gpa" className="text-right">
            GPA
          </Label>
          <Input id="gpa" name="gpa" value={editedStudent.gpa} onChange={handleChange} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  )
}

function AddStudentForm({ onAddStudent }: { onAddStudent: (newStudent: Student) => void }) {
  const [newStudent, setNewStudent] = useState<Student>({
    id: '',
    name: '',
    email: '',
    course: '',
    enrollmentYear: '',
    gpa: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddStudent({ ...newStudent, id: `S${Date.now().toString().slice(-8)}` }) // Generate a unique ID
    setNewStudent({ id: '', name: '', email: '', course: '', enrollmentYear: '', gpa: '' }) // Reset form
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-name" className="text-right">
            Name
          </Label>
          <Input id="new-name" name="name" value={newStudent.name} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-email" className="text-right">
            Email
          </Label>
          <Input id="new-email" name="email" value={newStudent.email} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-course" className="text-right">
            Course
          </Label>
          <Input id="new-course" name="course" value={newStudent.course} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-enrollmentYear" className="text-right">
            Enrollment Year
          </Label>
          <Input id="new-enrollmentYear" name="enrollmentYear" value={newStudent.enrollmentYear} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-gpa" className="text-right">
            GPA
          </Label>
          <Input id="new-gpa" name="gpa" value={newStudent.gpa} onChange={handleChange} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Add Student</Button>
      </DialogFooter>
    </form>
  )
}

