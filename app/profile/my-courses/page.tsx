"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

export default function MyCoursesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState<any[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    // Simulate loading courses
    const timer = setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: "Web Development Fundamentals",
          progress: 75,
          image: "/placeholder.svg?height=200&width=300",
          description: "Learn HTML, CSS, and JavaScript basics",
        },
        {
          id: 2,
          title: "Advanced React Development",
          progress: 45,
          image: "/placeholder.svg?height=200&width=300",
          description: "Master React hooks, context, and advanced patterns",
        },
        {
          id: 3,
          title: "Node.js Backend Development",
          progress: 20,
          image: "/placeholder.svg?height=200&width=300",
          description: "Build scalable backend services with Node.js",
        },
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">{t("my_courses")}</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="p-0">
                <Skeleton className="h-[200px] w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">{t("my_courses")}</h1>
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">{t("noCourses")}</h2>
          <p className="text-muted-foreground mb-6">{t("noCoursesDescription")}</p>
          <Button asChild>
            <Link href="/courses">{t("browseCourses")}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader className="p-0">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-[200px] object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t("progress")}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/courses/${course.id}`}>{t("details")}</Link>
                </Button>
                <Button asChild>
                  <Link href={`/courses/${course.id}/learn`}>{t("continue")}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
