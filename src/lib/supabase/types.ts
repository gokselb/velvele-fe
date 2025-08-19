/**
 * TypeScript types for the Velvele blog database schema
 *
 * These types provide type safety when working with Supabase queries.
 * They should match the database schema defined in supabase/schema.sql
 */

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          name: string;
          slug: string;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          lang: 'tr' | 'en';
          slug: string;
          title: string;
          excerpt: string | null;
          content_md: string | null;
          cover_url: string | null;
          status: 'draft' | 'published';
          author_id: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lang?: 'tr' | 'en';
          slug: string;
          title: string;
          excerpt?: string | null;
          content_md?: string | null;
          cover_url?: string | null;
          status?: 'draft' | 'published';
          author_id?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lang?: 'tr' | 'en';
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content_md?: string | null;
          cover_url?: string | null;
          status?: 'draft' | 'published';
          author_id?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
        };
        Insert: {
          post_id: string;
          tag_id: string;
        };
        Update: {
          post_id?: string;
          tag_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      post_lang: 'tr' | 'en';
      post_status: 'draft' | 'published';
    };
  };
}

// Convenience types for common use cases
export type Author = Database['public']['Tables']['authors']['Row'];
export type AuthorInsert = Database['public']['Tables']['authors']['Insert'];
export type AuthorUpdate = Database['public']['Tables']['authors']['Update'];

export type Tag = Database['public']['Tables']['tags']['Row'];
export type TagInsert = Database['public']['Tables']['tags']['Insert'];
export type TagUpdate = Database['public']['Tables']['tags']['Update'];

export type Post = Database['public']['Tables']['posts']['Row'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];

export type PostTag = Database['public']['Tables']['post_tags']['Row'];
export type PostTagInsert = Database['public']['Tables']['post_tags']['Insert'];
export type PostTagUpdate = Database['public']['Tables']['post_tags']['Update'];

// Extended types for common queries
export type PostWithAuthor = Post & {
  author: Author | null;
};

export type PostWithTags = Post & {
  tags: Tag[];
};

export type PostWithAuthorAndTags = Post & {
  author: Author | null;
  tags: Tag[];
};

export type AuthorWithPosts = Author & {
  posts: Post[];
};

export type TagWithPosts = Tag & {
  posts: Post[];
};
