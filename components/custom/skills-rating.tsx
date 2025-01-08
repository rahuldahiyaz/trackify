"use client"

import { Star, StarHalf } from 'lucide-react'

const skills = [
  { name: "Problem Solving", rating: 4.0 },
  { name: "Communication", rating: 4.0 },
  { name: "Teamwork", rating: 5.0 },
  { name: "Time Management", rating: 3.0 },
  { name: "Critical Thinking", rating: 4.0 },
  { name: "Leadership", rating: 3.0 },
  { name: "Creativity", rating: 4.0 },
  { name: "Technical Skills", rating: 4.5 },
  { name: "Collaboration", rating: 5.0 },
  { name: "Project Management", rating: 3.5 },
]

export function SkillsRating() {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name} className="flex items-center justify-between">
          <span className="text-sm font-medium">{skill.name}</span>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.floor(skill.rating)
              const half = i === Math.floor(skill.rating) && skill.rating % 1 !== 0
              
              return (
                <div key={i} className="text-yellow-400">
                  {half ? (
                    <StarHalf className="h-4 w-4 fill-current" />
                  ) : (
                    <Star
                      className={`h-4 w-4 ${
                        filled ? "fill-current" : "stroke-current"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
