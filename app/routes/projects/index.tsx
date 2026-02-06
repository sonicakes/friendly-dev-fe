import ProjectCard from "~/components/ProjectCard";
import type Route from "./+types/index";
import type { Project } from "~/types";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(import.meta.env.VITE_API_URL);
  const data = await res.json();
  return { projects: data.projects };
}
const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  //unique categories
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  //filter projs based on the ategory
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  //calc total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  //get current pages projs
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currProjs = filteredProjects.slice(indexOfFirst, indexOfLast);
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 cursor-pointer rounded text-sm ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div layout className="gap-6 grid sm:grid-cols-2">
          {currProjs.map((project) => (
            <motion.div layout key={project.id}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        onPageChange={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
};

export default ProjectsPage;
