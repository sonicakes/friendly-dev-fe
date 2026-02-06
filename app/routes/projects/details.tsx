import type { Route } from "./+types/details";
import type { Project } from "~/types";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
//example of client loader
export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${params.id}`);
  if (!res.ok) throw new Response("rpj nt fnd", { status: 404 });
  const project: Project = await res.json();
  return project;
}

export function HydrateFallback() {
  return <div>loading...</div>;
}
const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;
  return (
    <>
      <Link
        to="/projects"
        className="mb-4 gap-2 flex items-center text-blue-400"
      >
        <FaArrowLeft />
        Go Back
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-400">{project.title}</h1>
          <p className="text-gray-300 text-sm mb-4">
            {new Date(project.date).toLocaleDateString()} | {project.category}
          </p>
          <p className="text-gray-200 mb-6">{project.description}</p>
          <a
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
            href={project.url}
            target="_blank"
          >
            Go to {project.title}
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
