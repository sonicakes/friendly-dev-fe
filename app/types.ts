export type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  date: string;
  featured: boolean;
  image: string;
  category: string;
  documentId: string;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  body: string;
  image: string;
};

export type StrapiResponse<T> = {
  data: T[];
};

export type StrapiProject = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  url: string;
  date: string;
  featured: boolean;
  image?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  category: string;
};

export type StrapiPost = {
  id: string;
  documentId: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  body: string;
};
