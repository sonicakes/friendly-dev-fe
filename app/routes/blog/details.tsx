import ReactMarkdown from "react-markdown";
import type { Route } from "./+types";
import type { Post, StrapiPost, StrapiResponse } from "~/types";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`,
  );

  if (!res.ok) throw new Error("Failed to fetch blog detail data");

  const json: StrapiResponse<StrapiPost> = await res.json();

  if (!json.data.length) throw new Response("not found", { status: 404 });

  const item = json.data[0];
  const post = {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt,
    title: item.title,
    body: item.body,
    date: item.date,
    image: item.image?.url
      ? `${item.image.url}`
      : "images/no-image.png",
  };
  return {
    post,
  };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    post: Post;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { post } = loaderData;
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">
        {post.title}
      </h1>
      <p>{new Date(post.date).toDateString()}</p>
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover mb-4" />
      <div className="max-w-none mb-12 prose prose-invert">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
      <Link className="text-blue-700 hover:underline" to="/blog">
        Back to blog posts
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;
