"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Trash2, Plus, Mail, Phone, MapPin, Briefcase } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Teacher {
  id: string
  name: string
  email: string
  subject: string
  phone: string
  address: string
  designation: string
  photoUrl: string
}

const initialTeachersData: Teacher[] = [
  { id: "20010010", name: "Dr. Jyoti Pillai", email: "jyoti.pillai@gmail.com", subject: "Software Engineering & Project Management", phone: "+91 9876543210", address: "Raipur, Chhattisgarh", designation: "Head Of Department", photoUrl: "https://bitdurg.ac.in/admin/uploads/Dr__Jyothi_Pillai1.jpg" },
  { id: "20010011", name: "Dr. Amit Kumar Biswas", email: "amit.k.biswas@gmail.com", subject: "Machine Learning", phone: "+91 9758684779", address: "Bhilai Nagar, Durg", designation: "Associate Professor (Gr-1)", photoUrl: "https://bitdurg.ac.in/admin/uploads/Mr__Amit_Biswas13.jpg" },
  { id: "20010012", name: "Mr. B. Varghese", email: "b.varghese@gmail.com", subject: "Cryptography & Network Security", phone: "+91 9876543211", address: "Bilaspur, Chhattisgarh", designation: "Associate Professor", photoUrl: "https://bitdurg.ac.in/admin/uploads/Mr__B__Varghese.jpg" },
  { id: "20010013", name: "Dr. Ani Thomas", email: "ani.thomas@gmail.com", subject: "Cloud Computing", phone: "+91 9876543212", address: "Korba, Chhattisgarh", designation: "Assistant Professor", photoUrl: "https://bitdurg.ac.in/admin/uploads/DSC_2072.jpg" },
  { id: "20010014", name: "Dr. Vinita A. Gupta", email: "vinita.gupta@gmail.com", subject: "Image processing & Computer Vision", phone: "+91 9876543213", address: "Durg, Chhattisgarh", designation: "Assistant Professor", photoUrl: "https://bitdurg.ac.in/admin/uploads/Mrs__Vinita_Abhishek_Gupta.jpg" },
  { id: "20010015", name: "Mr. Raj Kumar Singh", email: "raj.k.singh@gmail.com", subject: "Internet of Things", phone: "+91 9876543214", address: "Bhilai, Chhattisgarh", designation: "Assistant Professor", photoUrl: "https://bitdurg.ac.in/admin/uploads/rajkumar.jpg" },
  { id: "20010016", name: "Mr. Ajay Mishra", email: "ajay.mishra@gmail.com", subject: "Application Development Lab", phone: "+91 9876543215", address: "Durg, Chhattisgarh", designation: "Assistant Professor", photoUrl: "https://bitdurg.ac.in/admin/uploads/Mr__ajay_Mishra11.jpg" },
  { id: "20010017", name: "Dr. Sanjeev Karmakar", email: "sanjeev.karmakar@gmail.com", subject: "Software Project & Documentation", phone: "+91 9876543216", address: "Raipur, Chhattisgarh", designation: "Professor", photoUrl: "https://bitdurg.ac.in/admin/uploads/Dr_SanjeevKarmakar.PNG" },
]

export function TeacherManagement() {
  const [teachersData, setTeachersData] = useState<Teacher[]>(initialTeachersData)

  const handleEdit = (updatedTeacher: Teacher) => {
    setTeachersData(teachersData.map(teacher =>
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    ))
  }

  const handleDelete = (id: string) => {
    setTeachersData(teachersData.filter(teacher => teacher.id !== id))
  }

  const handleAddTeacher = (newTeacher: Teacher) => {
    setTeachersData([...teachersData, newTeacher])
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faculty Members of MCA Department</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Enter the details of the new teacher here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <AddTeacherForm onAddTeacher={handleAddTeacher} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachersData.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

function TeacherCard({ teacher, onEdit, onDelete }: { teacher: Teacher, onEdit: (updatedTeacher: Teacher) => void, onDelete: (id: string) => void }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={teacher.photoUrl} alt={teacher.name} />
            <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{teacher.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{teacher.designation}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium">{teacher.subject}</p>
          <p className="text-sm text-muted-foreground flex items-center">
            <Mail className="mr-2 h-4 w-4" /> {teacher.email}
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            <Phone className="mr-2 h-4 w-4" /> {teacher.phone}
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="mr-2 h-4 w-4" /> {teacher.address}
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            <Briefcase className="mr-2 h-4 w-4" /> {teacher.designation}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Teacher Information</DialogTitle>
              <DialogDescription>
                Make changes to the teacher's information here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <EditTeacherForm teacher={teacher} onSave={onEdit} />
          </DialogContent>
        </Dialog>
        <Button size="sm" variant="default" onClick={() => onDelete(teacher.id)}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

function EditTeacherForm({ teacher, onSave }: { teacher: Teacher, onSave: (updatedTeacher: Teacher) => void }) {
  const [editedTeacher, setEditedTeacher] = useState(teacher)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTeacher({ ...editedTeacher, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedTeacher)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" name="name" value={editedTeacher.name} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" name="email" value={editedTeacher.email} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="subject" className="text-right">
            Subject
          </Label>
          <Input id="subject" name="subject" value={editedTeacher.subject} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input id="phone" name="phone" value={editedTeacher.phone} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address" className="text-right">
            Address
          </Label>
          <Input id="address" name="address" value={editedTeacher.address} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="designation" className="text-right">
            Designation
          </Label>
          <Input id="designation" name="designation" value={editedTeacher.designation} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="photoUrl" className="text-right">
            Photo URL
          </Label>
          <Input id="photoUrl" name="photoUrl" value={editedTeacher.photoUrl} onChange={handleChange} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  )
}

function AddTeacherForm({ onAddTeacher }: { onAddTeacher: (newTeacher: Teacher) => void }) {
  const [newTeacher, setNewTeacher] = useState<Teacher>({
    id: '',
    name: '',
    email: '',
    subject: '',
    phone: '',
    address: '',
    designation: '',
    photoUrl: '/placeholder.svg?height=100&width=100',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTeacher({ ...newTeacher, id: Date.now().toString() }) // Generate a unique ID
    setNewTeacher({ id: '', name: '', email: '', subject: '', phone: '', address: '', designation: '', photoUrl: '/placeholder.svg?height=100&width=100' }) // Reset form
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-name" className="text-right">
            Name
          </Label>
          <Input id="new-name" name="name" value={newTeacher.name} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-email" className="text-right">
            Email
          </Label>
          <Input id="new-email" name="email" value={newTeacher.email} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-subject" className="text-right">
            Subject
          </Label>
          <Input id="new-subject" name="subject" value={newTeacher.subject} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-phone" className="text-right">
            Phone
          </Label>
          <Input id="new-phone" name="phone" value={newTeacher.phone} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-address" className="text-right">
            Address
          </Label>
          <Input id="new-address" name="address" value={newTeacher.address} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-designation" className="text-right">
            Designation
          </Label>
          <Input id="new-designation" name="designation" value={newTeacher.designation} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-photoUrl" className="text-right">
            Photo URL
          </Label>
          <Input id="new-photoUrl" name="photoUrl" value={newTeacher.photoUrl} onChange={handleChange} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Add Teacher</Button>
      </DialogFooter>
    </form>
  )
}

