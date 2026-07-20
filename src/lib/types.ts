export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML
  image_url: string;
  image_alt: string;
  image_credit_name?: string | null;
  image_credit_url?: string | null;
  topic: string;
  tags: string[];
  date: string; // 'YYYY-MM-DD'
  created_at: string;
}
