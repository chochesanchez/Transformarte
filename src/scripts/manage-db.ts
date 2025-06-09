import { dbAdmin } from '../lib/db-admin';
import prisma from '../lib/prisma';

async function main() {
  const command = process.argv[2];
  const id = parseInt(process.argv[3]);

  try {
    switch (command) {
      case 'list-artworks':
        const artworks = await dbAdmin.listArtworks();
        console.log('Artworks:', artworks);
        break;

      case 'delete-artwork':
        if (!id) {
          console.error('Please provide an artwork ID');
          break;
        }
        await dbAdmin.deleteArtwork(id);
        break;

      case 'list-posts':
        const posts = await dbAdmin.listForumPosts();
        console.log('Forum Posts:', posts);
        break;

      case 'delete-post':
        if (!id) {
          console.error('Please provide a post ID');
          break;
        }
        await dbAdmin.deleteForumPost(id);
        break;

      case 'list-events':
        const events = await dbAdmin.listEvents();
        console.log('Events:', events);
        break;

      case 'delete-event':
        if (!id) {
          console.error('Please provide an event ID');
          break;
        }
        await dbAdmin.deleteEvent(id);
        break;

      default:
        console.log(`
Available commands:
  list-artworks        - List all artworks
  delete-artwork <id>  - Delete an artwork
  list-posts          - List all forum posts
  delete-post <id>    - Delete a forum post
  list-events         - List all events
  delete-event <id>   - Delete an event
        `);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 