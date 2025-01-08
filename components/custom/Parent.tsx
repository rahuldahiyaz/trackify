"use client"

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

interface Parent {
  id: string
  name: string
  email: string
  phone: string
  address: string
  childName: string
  childId: string
}

const initialParentsData: Parent[] = [
  { id: "P20010010", name: "Rajesh Kumar", email: "rajesh.kumar@example.com", phone: "+91 9876543210", address: "123 Main St, Mumbai", childName: "Amit Kumar", childId: "S20010010" },
  { id: "P20010011", name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 9876543211", address: "456 Park Ave, Delhi", childName: "Neha Sharma", childId: "S20010011" },
  { id: "P20010012", name: "Suresh Patel", email: "suresh.patel@example.com", phone: "+91 9876543212", address: "789 Oak Rd, Ahmedabad", childName: "Ravi Patel", childId: "S20010012" },
  { id: "P20010013", name: "Anita Desai", email: "anita.desai@example.com", phone: "+91 9876543213", address: "101 Pine St, Bangalore", childName: "Pooja Desai", childId: "S20010013" },
  { id: "P20010014", name: "Vikram Singh", email: "vikram.singh@example.com", phone: "+91 9876543214", address: "202 Elm Blvd, Jaipur", childName: "Rahul Singh", childId: "S20010014" },
  { id: "P20010015", name: "Sunita Gupta", email: "sunita.gupta@example.com", phone: "+91 9876543215", address: "303 Cedar Ln, Kolkata", childName: "Anjali Gupta", childId: "S20010015" },
  { id: "P20010016", name: "Mohan Reddy", email: "mohan.reddy@example.com", phone: "+91 9876543216", address: "404 Birch Rd, Hyderabad", childName: "Karthik Reddy", childId: "S20010016" },
  { id: "P20010017", name: "Lakshmi Rao", email: "lakshmi.rao@example.com", phone: "+91 9876543217", address: "505 Maple Ave, Chennai", childName: "Srinivas Rao", childId: "S20010017" },
  { id: "P20010018", name: "Arun Joshi", email: "arun.joshi@example.com", phone: "+91 9876543218", address: "606 Willow St, Pune", childName: "Meera Joshi", childId: "S20010018" },
  { id: "P20010019", name: "Kavita Mehta", email: "kavita.mehta@example.com", phone: "+91 9876543219", address: "707 Ash Blvd, Lucknow", childName: "Rohan Mehta", childId: "S20010019" },
]

export function ParentManagement() {
  const [parentsData, setParentsData] = useState<Parent[]>(initialParentsData)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingParent, setEditingParent] = useState<Parent | null>(null)
  const itemsPerPage = 8
  const totalItems = parentsData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return parentsData.slice(startIndex, endIndex)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleEdit = (parent: Parent) => {
    setEditingParent(parent)
  }

  const handleDelete = (id: string) => {
    setParentsData(parentsData.filter(parent => parent.id !== id))
  }

  const handleSaveEdit = (updatedParent: Parent) => {
    setParentsData(parentsData.map(parent =>
      parent.id === updatedParent.id ? updatedParent : parent
    ))
    setEditingParent(null)
  }

  const handleAddParent = (newParent: Parent) => {
    setParentsData([...parentsData, newParent])
  }

  const currentData = getCurrentPageData()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-regular mb-4">Parents of MCA Department Students</h1>
      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Parent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Parent</DialogTitle>
              <DialogDescription>
                Enter the details of the new parent here.
              </DialogDescription>
            </DialogHeader>
            <AddParentForm onAddParent={handleAddParent} />
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
                Phone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Child Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Child ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((parent) => (
              <tr key={parent.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{parent.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={`/placeholder.svg?height=40&width=40`} alt={parent.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{parent.name}</div>
                      <div className="text-sm text-gray-500">{parent.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parent.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parent.childName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parent.childId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(parent)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Parent Information</DialogTitle>
                          <DialogDescription>
                            Make changes to the parent's information here. Click save when you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <EditParentForm parent={parent} onSave={handleSaveEdit} />
                      </DialogContent>
                    </Dialog>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(parent.id)}>
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

function EditParentForm({ parent, onSave }: { parent: Parent, onSave: (updatedParent: Parent) => void }) {
  const [editedParent, setEditedParent] = useState(parent)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedParent({ ...editedParent, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedParent)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" name="name" value={editedParent.name} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" name="email" value={editedParent.email} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input id="phone" name="phone" value={editedParent.phone} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address" className="text-right">
            Address
          </Label>
          <Input id="address" name="address" value={editedParent.address} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="childName" className="text-right">
            Child Name
          </Label>
          <Input id="childName" name="childName" value={editedParent.childName} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="childId" className="text-right">
            Child ID
          </Label>
          <Input id="childId" name="childId" value={editedParent.childId} onChange={handleChange} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  )
}

function AddParentForm({ onAddParent }: { onAddParent: (newParent: Parent) => void }) {
  const [newParent, setNewParent] = useState<Parent>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    childName: '',
    childId: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewParent({ ...newParent, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddParent({ ...newParent, id: `P${Date.now().toString().slice(-8)}` }) // Generate a unique ID
    setNewParent({ id: '', name: '', email: '', phone: '', address: '', childName: '', childId: '' }) // Reset form
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-name" className="text-right">
            Name
          </Label>
          <Input id="new-name" name="name" value={newParent.name} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-email" className="text-right">
            Email
          </Label>
          <Input id="new-email" name="email" value={newParent.email} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-phone" className="text-right">
            Phone
          </Label>
          <Input id="new-phone" name="phone" value={newParent.phone} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-address" className="text-right">
            Address
          </Label>
          <Input id="new-address" name="address" value={newParent.address} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-childName" className="text-right">
            Child Name
          </Label>
          <Input id="new-childName" name="childName" value={newParent.childName} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-childId" className="text-right">
            Child ID
          </Label>
          <Input id="new-childId" name="childId" value={newParent.childId} onChange={handleChange} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Add Parent</Button>
      </DialogFooter>
    </form>
  )
}

