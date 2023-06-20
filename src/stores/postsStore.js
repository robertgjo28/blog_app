import { defineStore } from 'pinia';
import { api, endpoints } from 'boot/axios';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPostById: (state) => (id) => state.posts.find((post) => post.id === id),
    getPosts() {
      return this.posts;
    },
  },
  actions: {
    async fetchPosts() {
      const { data: users } = await api.get(endpoints.users);
      const { data: posts } = await api.get(endpoints.posts);
      const filteredPosts = posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);
        return { ...post, user };
      });
      this.posts = filteredPosts;
    },
    async deletePost(id) {
      await api.delete(endpoints.deletePost(id));
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    async fetchComments(id) {
      const { data } = await api.get(endpoints.getPostComments(id));
      return data;
    },
    async updatePost(post) {
      const { data } = await api.put(endpoints.updatePost(post.id), post);
      const index = this.posts.findIndex((p) => p.id === post.id);
      if (index !== -1) {
        const user = this.posts[index].user;
        this.posts[index] = { ...data, user };
      }
    },
    async createPost(post) {
      const { data } = await api.post(endpoints.posts, post);
      const guestUser = {
        id: 1,
        name: 'Guest Guest',
        username: 'Guest',
        email: 'guest@guest.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: { lat: '-37.3159', lng: '81.1496' },
        },
        phone: '1-770-736-8031 x56442',
        website: 'guest.com',
        company: {
          name: 'Guest Company',
          catchPhrase: 'We are guest company and we are here to help you!',
          bs: 'How do Guest Company do it?',
        },
      };

      this.posts.unshift({ ...data, user: guestUser });
    },
  },
});
