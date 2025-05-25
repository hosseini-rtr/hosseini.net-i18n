import { apiClient } from '../api-client';
import { Post } from '@/types/TPost';

export const PostService = {
  async getAllPosts(): Promise<Post[]> {
    return await apiClient.get<Post[]>('/api/posts/');
  },

  async getPostById(id: string): Promise<Post> {
    return await apiClient.get<Post>(`/api/posts/${id}`);
  }
};