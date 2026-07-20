import { getSupabaseServerClient } from './supabase/server';
import type { BlogPost } from './types';

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error al obtener los posts del blog:', error.message);
    return [];
  }
  return data as BlogPost[];
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .contains('tags', [tag])
    .order('date', { ascending: false });

  if (error) {
    console.error('Error al filtrar posts por tag:', error.message);
    return [];
  }
  return data as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error al obtener el post:', error.message);
    return null;
  }
  return data as BlogPost | null;
}

/**
 * Posts relacionados (sidelinks) por solapamiento de tags.
 * Es enlazado interno relevante temáticamente, bueno para SEO y para
 * que el rastreador descubra el resto del contenido del blog.
 */
export async function getRelatedPosts(
  post: BlogPost,
  limit = 3
): Promise<BlogPost[]> {
  if (!post.tags?.length) return [];

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .overlaps('tags', post.tags)
    .neq('id', post.id)
    .order('date', { ascending: false })
    .limit(limit + 2); // margen para poder priorizar por nº de tags en común

  if (error || !data) {
    console.error('Error al obtener posts relacionados:', error?.message);
    return [];
  }

  const scored = (data as BlogPost[])
    .map((candidate) => ({
      candidate,
      score: candidate.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.candidate);

  return scored;
}

/** Lista de tags únicas con nº de posts, para la nube de tags del blog. */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
