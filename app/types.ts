export type Project = {
    id: number;
    title: string;
    description: string;
    url: string;
    date: string;
    featured: boolean;
    image: string;
    category: string;
}

export type PostMeta = {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    slug: string;
}