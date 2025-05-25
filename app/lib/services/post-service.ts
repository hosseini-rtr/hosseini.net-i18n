import { apiClient } from '../api-client';
import { Post } from '@/types/TPost';

export const PostService = {
  async getAllPosts(): Promise<Post[]> {
    try {
      return await apiClient.get<Post[]>('/api/posts/');
    } catch (error) {
      console.error('Error fetching all posts:', error);
      return []; // Return empty array instead of failing
    }
  },

  async getPostById(id: string): Promise<Post | null> {
    try {
      return await apiClient.get<Post>(`/api/posts/${id}`);
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      return null; // Return null for non-existent posts
    }
  }
};