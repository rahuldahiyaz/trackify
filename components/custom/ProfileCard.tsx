"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, MapPin, Mail, Phone, ArrowRight, Star } from "lucide-react";

interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  skills: string[];
  image: string;
}

export default function ProfileCard() {
  const [profile, setProfile] = useState<Profile>({
    name: "Rahul Dahiya",
    title: "Software Engineer",
    location: "Bhilai, Durg",
    email: "rahulxdahiya@gmail.com",
    phone: "+91 9856874976",
    skills: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "ReactJS",
      "NextJS",
      "C++",
      "Java",
      "Spring Boot",
      "Data Structures & Algorithm",
    ],
    image:
      "https://i.pinimg.com/736x/99/f3/5a/99f35a4179e659ce63250408e68c8cf6.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="p-10">
      <Card className="w-full max-w-3xl mx-auto">
        <div
          className="h-32"
          style={{
            backgroundImage: `url('https://i.pinimg.com/736x/d9/ca/67/d9ca679e5874fabb2cba91437c767a66.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <CardContent className="relative pt-16 pb-8 px-6">
          {/* Profile Image */}
          <Avatar className="absolute -top-16 left-6 w-32 h-32 border-2 border-background">
            <AvatarImage src={profile.image} alt={profile.name} />
            <AvatarFallback>ES</AvatarFallback>
          </Avatar>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-muted-foreground">{profile.title}</p>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label>Name</label>
                          <Input
                            value={editedProfile.name}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label>Title</label>
                          <Input
                            value={editedProfile.title}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label>Location</label>
                          <Input
                            value={editedProfile.location}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                location: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label>Email</label>
                          <Input
                            value={editedProfile.email}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label>Phone</label>
                          <Input
                            value={editedProfile.phone}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label>Skills (comma-separated)</label>
                          <Textarea
                            value={editedProfile.skills.join(", ")}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                skills: e.target.value
                                  .split(",")
                                  .map((s) => s.trim()),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{profile.phone}</span>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Skills</h2>
                <Star className="h-5 w-5" />
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Cards */}

            <div>
              <h2 className="text-lg font-semibold mb-4">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 hover:bg-black hover:text-white cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">AuthFlow</h3>
                      <p className="text-sm text-muted-foreground">
                        A secure authentication and authorization system for
                        managing user access and roles.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 hover:bg-black hover:text-white cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">
                        Modern Landing Page
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        A sleek, responsive web page design that introduces a
                        product or service.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 hover:bg-black hover:text-white cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Trackify</h3>
                      <p className="text-sm text-muted-foreground">
                        A tracking application that helps monitor and analyze
                        student academic progress in real-time.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
