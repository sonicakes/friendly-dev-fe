export type Project = {
  id: number;
  title: string;
  description: string;
  url: string;
  date: string;
  featured: boolean;
  image: string;
  category: string;
  documentId: string;
};

export type PostMeta = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
};

export type StrapiResponse<T> = {
  data: T[];
};

export type StrapiProject = {
  id: number;
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
