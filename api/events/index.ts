import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from '../_lib/cors';
import { RICH_EVENTS } from '../../src/lib/mock/events-rich';

/**
 * GET /api/events
 *   ?status=live|upcoming|past   (optional filter)
 *
 * Returns the 5 mock events with venue summary (no full floor map to keep
 * payload light). Use /api/events/:id for full venue + exhibitor roster.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const status = (Array.isArray(req.query.status) ? req.query.status[0] : req.query.status) as
    | 'live' | 'upcoming' | 'past' | undefined;

  let items = RICH_EVENTS;
  if (status) items = items.filter((e) => e.status === status);

  const lite = items.map((e) => ({
    id: e.id,
    name: e.name,
    slug: e.slug,
    cover: e.cover,
    tagline_th: e.tagline_th,
    tagline_en: e.tagline_en,
    start_date: e.start_date,
    end_date: e.end_date,
    open_time: e.open_time,
    close_time: e.close_time,
    status: e.status,
    expected_visitors: e.expected_visitors,
    industries_focus: e.industries_focus,
    ticket_price_thb: e.ticket_price_thb,
    venue_summary: {
      name: e.venue.name,
      district: e.venue.district,
      province: e.venue.province,
      total_floors: e.venue.total_floors,
      parking_spots: e.venue.parking_spots,
    },
    exhibitor_count: e.exhibitor_ids.length,
    bot_connected: e.bot.connected,
  }));

  res.status(200).json({ count: lite.length, items: lite });
}
