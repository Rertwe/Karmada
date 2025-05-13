export const dynamic = "force-dynamic"

export default function ProfileCoursesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <p>
        Please visit the new courses page at{" "}
        <a href="/profile/my-courses" className="text-blue-600 underline">
          My Courses
        </a>
      </p>
    </div>
  )
}
