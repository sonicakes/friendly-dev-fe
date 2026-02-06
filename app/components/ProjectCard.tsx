import { Link } from "react-router";
import type { Project } from "~/types";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link 
        className="block transform transition duration-300 hover:scale-[1.02]" 
        to={`/projects/${project.id}`}>
      <div
        key={project.id}
        className="bg-gray-800 border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md"
      >
        <img
          alt={project.title}
          src={project.image}
          className="h-40 w-full object-cover"
        />
        <div className="p-5">
          <h3 className="text-3xl font-semibold text-blue-400 mb-1">
            {project.title}
          </h3>
          <p className="mb-2 text-gray-300 text-sm">{project.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{project.category}</span>
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
