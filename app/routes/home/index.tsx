import FeaturedProjects from "~/components/FeaturedProjects";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
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
    fetch(`${import.meta.env.VITE_API_URL}`),
    fetch(new URL('/posts-meta.json', url))
  ]);

  if (!projectRes.ok || !postRes.ok) {
    throw new Error('Failed to fetch projs or blog posts');
  }
 
  const [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json()
  ]);

  console.log(projects,posts)
  return { projects, posts };
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
