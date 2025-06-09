import prisma from './prisma';

export const dbAdmin = {
  // Artwork Management
  async listArtworks() {
    return await prisma.artwork.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  async deleteArtwork(id: number) {
    try {
      await prisma.artwork.delete({
        where: { id }
      });
      console.log(`Artwork ${id} deleted successfully`);
      return true;
    } catch (error) {
      console.error(`Error deleting artwork ${id}:`, error);
      return false;
    }
  },

  // Forum Posts Management
  async listForumPosts() {
    return await prisma.forumPost.findMany({
      include: {
        user: true,
        reports: true
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async deleteForumPost(id: number) {
    try {
      await prisma.forumPost.delete({
        where: { id }
      });
      console.log(`Forum post ${id} deleted successfully`);
      return true;
    } catch (error) {
      console.error(`Error deleting forum post ${id}:`, error);
      return false;
    }
  },

  // Event Management
  async listEvents() {
    return await prisma.event.findMany({
      include: {
        registrations: true
      },
      orderBy: { date: 'desc' }
    });
  },

  async deleteEvent(id: number) {
    try {
      await prisma.event.delete({
        where: { id }
      });
      console.log(`Event ${id} deleted successfully`);
      return true;
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      return false;
    }
  }
};

// Example usage:
async function example() {
  try {
    // List all artworks
    console.log('All artworks:');
    const artworks = await dbAdmin.listArtworks();
    console.log(artworks);

    // Delete an artwork (replace 1 with actual ID)
    // await dbAdmin.deleteArtwork(1);

    // List all forum posts
    console.log('All forum posts:');
    const posts = await dbAdmin.listForumPosts();
    console.log(posts);

    // Delete a forum post (replace 1 with actual ID)
    // await dbAdmin.deleteForumPost(1);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Uncomment to run the example
// example(); 