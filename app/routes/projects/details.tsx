import type { Route } from "./+types/details";
import type { Project, StrapiProject, StrapiResponse } from "~/types";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { id } = params;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${id}&populate=*`,
  );
  if (!res.ok) throw new Response("rpj nt fnd", { status: 404 });

  const json: StrapiResponse<StrapiProject> = await res.json();
  const item = json.data[0];
  const project: Project = {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/images/no-image.png",
  };
  return { project };
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData;
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
