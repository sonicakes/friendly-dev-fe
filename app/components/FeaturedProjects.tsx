import type { Project } from "~/types";
import ProjectCard from "./ProjectCard";

type FeaturedProjectsProps = {
    projects: Project[],
    count: number
}

const FeaturedProjects = ({projects, count = 4}: FeaturedProjectsProps) => {
  
    const featured = projects.projects.filter((p:Project) => p.featured).slice(0, count);
  
    return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-200">Featured projs</h2>
    <div className="gap-3 grid sm:grid-cols-2">
        {featured.map((p) => (
            <ProjectCard key={p.id} project={p}/>
        ))}
    </div>
    </section>
  );
};

export default FeaturedProjects;
