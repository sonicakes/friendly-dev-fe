import type { Project } from "~/types";
import ProjectCard from "./ProjectCard";

type FeaturedProjectsProps = {
  projects: Project[];
};

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  if (projects.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-200">Featured projs</h2>
      <div className="gap-3 grid sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
