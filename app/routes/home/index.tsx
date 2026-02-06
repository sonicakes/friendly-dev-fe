import FeaturedProjects from "~/components/FeaturedProjects";
import type { Route } from "./+types/index";
import type { Project, StrapiProject, StrapiResponse } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import type { PostMeta } from "~/types";
import LatestPosts from "~/components/LatestPosts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "friendly dev | welcome" },
    { name: "description", content: "web dev" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);
  const [projectRes, postRes] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`,
    ),
    fetch(new URL("/posts-meta.json", url)),
  ]);

  if (!projectRes.ok || !postRes.ok) {
    throw new Error("Failed to fetch projs or blog posts");
  }

  const projectsJson: StrapiResponse<StrapiProject> = await projectRes.json();

  const postsJson = await postRes.json();

  const projects = projectsJson.data.map((item) => ({
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
  }));

  return { projects, posts: postsJson };
}

const Home = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
};

export default Home;
