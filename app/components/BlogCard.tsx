import type { Post } from "~/types";
import { Link } from "react-router";

const BlogCard = ({ post }: { post: Post }) => {
  return (
    <article
      className="bg-gray-800 rounded-lg py-4 px-6 shadow my-4"
      key={post.slug}
    >
      <h3 className="text-2xl font-semibold text-blue-400">{post.title}</h3>
      <p className="text-sm text-gray-400 mb-2">
        {new Date(post.date).toLocaleDateString()}
      </p>
      {post.image && (<img src={post.image} alt={post.title} className="h-48 w-full object-cover rounded mb-4"></img>)}
      <p className="text-gray-300 mb-4">{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}`}
        className="text-blue-300 text-sm hover:underline"
      >
        Read More
      </Link>
    </article>
  );
};

export default BlogCard;
