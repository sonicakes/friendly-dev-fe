import { Link } from "react-router";
import type { Post } from "~/types";

type LatestPostsProps = {
  posts: Post[];
  limit?: number;
};

const LatestPosts = ({ posts, limit = 3 }: LatestPostsProps) => {
  const sortedPosts = [...posts].sort((a: Post, b: Post) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const latest = sortedPosts.slice(0, limit);

  return (
    <section className="mx-auto px-6 py-12 max-6xl">
      <h2 className="text-2xl text-white mb-6 font-bold">Latest posts</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.slug}
            className="block p-4 border-gray-700 rounded-lg bg-gray-800 transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-blue-400 ,b-1">
              {post.title}
            </h3>
            <p className="text-sm text-gray-300">{post.excerpt}</p>
            <span className="block mt-3">
              {new Date(post.date).toDateString()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
