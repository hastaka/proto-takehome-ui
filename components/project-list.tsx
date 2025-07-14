"use client";
import useProjects from "@/hooks/use-projects";

export function ProjectList() {
  const { data, isLoading, error } = useProjects();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <ul>
      {data.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
