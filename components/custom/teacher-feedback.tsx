"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Updated feedback with profile URLs
const feedback = [
  {
    teacher: "Dr. Jyoti Pillai",
    subject: "Software Engineering & Project Management",
    comment: "Great clarity in explaining complex concepts. Keep inspiring your students!",
    date: "2024-02-22",
    avatar: "JP",
    profileUrl: "https://bitdurg.ac.in/admin/uploads/Dr__Jyothi_Pillai1.jpg",
  },
  {
    teacher: "Dr. Amit Kumar Biswas",
    subject: "Machine Learning",
    comment: "Amazing lectures on machine learning. Your insights make the subject come alive!",
    date: "2024-08-06",
    avatar: "AB",
    profileUrl: "https://bitdurg.ac.in/admin/uploads/Mr__Amit_Biswas13.jpg",
  },
  {
    teacher: "Mr. B. Varghese",
    subject: "Cryptography & Network Security",
    comment: "Detailed explanations and practical examples. Very helpful for understanding encryption.",
    date: "2024-10-01",
    avatar: "BV",
    profileUrl: "https://bitdurg.ac.in/admin/uploads/Mr__B__Varghese.jpg",
  },
  {
    teacher: "Dr. Ani Thomas",
    subject: "Cloud Computing",
    comment: "Exceptional teaching on cloud infrastructure and deployment techniques. Very engaging!",
    date: "2024-08-16",
    avatar: "AT",
    profileUrl: "https://bitdurg.ac.in/admin/uploads/DSC_2072.jpg",
  },
  {
    teacher: "Dr. Vinita A. Gupta",
    subject: "Image processing & Computer Vision",
    comment: "Your expertise in computer vision and image processing is evident. Keep up the great work!",
    date: "2024-05-23",
    avatar: "VG",
    profileUrl: "https://bitdurg.ac.in/admin/uploads/Mrs__Vinita_Abhishek_Gupta.jpg",
  },
  {
    teacher: "Mr. Raj Kumar Singh",
    subject: "Internet of Things",
    comment: "Clear explanation of IoT concepts, with great hands-on examples. Very practical teaching style!",
    date: "2024-11-12",
    avatar: "RS",
    profileUrl: "https://bitdurg.ac.in/admin/uploads/rajkumar.jpg",
  },
  {
    teacher: "Mr. Ajay Mishra",
    subject: "Application Development Lab",
    comment: "Your guidance in the lab has made learning app development so much easier. Thank you!",
    date: "2024-03-24",
    avatar: "AM",
    profileUrl: "https://bitdurg.ac.in/admin/uploads/Mr__ajay_Mishra11.jpg",
  },
  {
    teacher: "Dr. Sanjeev Karmakar",
    subject: "Software Project & Documentation",
    comment: "Your approach to software project management is thorough and effective. A very enriching experience!",
    date: "2024-02-29",
    avatar: "SK",
    profileUrl: "https://bitdurg.ac.in/admin/uploads/Dr_SanjeevKarmakar.PNG",
  },
]

export function TeacherFeedback() {
  return (
    <div className="h-96 overflow-y-auto space-y-8">
      {feedback.map((item) => (
        <div key={item.date} className="flex items-start gap-4">
          <Avatar>
            <AvatarFallback>{item.avatar}</AvatarFallback>
            <AvatarImage src={item.profileUrl} alt={item.teacher} />
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{item.teacher}</span>
              <span className="text-sm text-muted-foreground">
                {item.subject}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item.comment}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(item.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
