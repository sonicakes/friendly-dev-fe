import ReactMarkdown from "react-markdown";
import type { Route } from "./+types";
import type { PostMeta } from "~/types";
import { Link } from "react-router";

export async function loader({request, params}: Route.LoaderArgs) {
const {slug} = params;
const url = new URL('/posts-meta.json', request.url);
const res = await fetch(url.href);

if (!res.ok) throw new Error('Failed to fetch data');

const index = await res.json();
const postMeta = index.find((post:PostMeta) => post.slug === slug );

if (!postMeta) throw new Response('not found', {status: 404});

//dynamically import the raw markdown
//the name of posts md file should match the slug names exactly
const markdown = await import(`../../posts/${slug}.md?raw`);

return {
    postMeta,
    markdown: markdown.default
}
}

type BlogPostDetailsPageProps = {
    loaderData: {
        postMeta: PostMeta,
        markdown: string
    }
}

const BlogPostDetailsPage = ({loaderData}: BlogPostDetailsPageProps) => {
    const {postMeta, markdown} = loaderData;
    return ( <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">
            {postMeta.title}
        </h1><p>
            {new Date(postMeta.date).toDateString()}
        </p>
        <div className="max-w-none mb-12 prose prose-invert">
            <ReactMarkdown>
                {markdown}
            </ReactMarkdown>
        </div>
        <Link className="text-blue-700 hover:underline" to="/blog">Back to blog posts</Link>
    </div> );
}
 
export default BlogPostDetailsPage;