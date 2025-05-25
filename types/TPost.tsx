export interface Post {
  id: number,
  tags: string[],
  author: string,
  title: string,
  content: string,
  slug: string,
  created_at: string,
  update_at: string,
  locale: string,
  og_description: string,
  image: string
};

export interface BusinessGroup {
  title: string;
  description: string;
  image: string;
}

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}