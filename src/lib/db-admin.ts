import prisma from './prisma';

/**
 * Admin-only database helpers.
 * These functions operate through Prisma and are intended for use only
 * from server-side admin API routes that have already verified the caller
 * is an admin or superadmin.
 */
export const dbAdmin = {
  // ── Artworks ───────────────────────────────────────────────────────────────
  listArtworks() {
    return prisma.artwork.findMany({ orderBy: { createdAt: 'desc' } });
  },

  deleteArtwork(id: number) {
    return prisma.artwork.delete({ where: { id } });
  },

  // ── Forum posts ────────────────────────────────────────────────────────────
  listForumPosts() {
    return prisma.forumPost.findMany({
      include: { user: true, reports: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  deleteForumPost(id: number) {
    return prisma.forumPost.delete({ where: { id } });
  },

  // ── Events ─────────────────────────────────────────────────────────────────
  listEvents() {
    return prisma.event.findMany({
      include: { registrations: true },
      orderBy: { date: 'desc' },
    });
  },

  deleteEvent(id: number) {
    return prisma.event.delete({ where: { id } });
  },
};
