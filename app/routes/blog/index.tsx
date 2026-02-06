import type { Route } from "./+types";
import BlogCard from "~/components/BlogCard";
import type { PostMeta } from "~/types";
import Pagination from "~/components/Pagination";
import { useState } from "react";
import PostFilter from "~/components/PostFilter";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  data.sort((a:PostMeta, b:PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })
  return { posts: data };
}
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const { posts } = loaderData;

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    )
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  return (
    <div className="mx-auto max-w-3xl p-6 bg-gray-900 ">
      <h2>Blog page</h2>
      <PostFilter searchQuery={searchQuery} onSearchChange={(query) => {
        setSearchQuery(query);
        setCurrentPage(1);
      }
        } />

        <div className="space-y-8">
          {currentPosts.length === 0 ? (<p>not found any posts</p>): (
            currentPosts.map((post) => (
        <BlogCard post={post} key={post.slug} />
      ))
          )}
        </div>
      

      {totalPages > 1 && (
        <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}/>
      )}
    </div>
  );
};

export default BlogPage;
