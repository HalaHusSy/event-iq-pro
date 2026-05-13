import { describe, it, expect } from 'vitest';
import { mockMatch, mockFaqSearch, FAQ_KB, getExhibitors, getExhibitorById } from './data';
import { buildMatchCards, buildMatchReply } from './response';

describe('mockMatch retrieval', () => {
  it('ranks Botnoi top for "call center cost"', () => {
    const results = mockMatch('reduce call center cost with AI');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].exhibitor.id).toBe('ex01'); // Botnoi
    expect(results[0].match_score).toBeGreaterThan(0);
  });

  it('ranks VoiceSphere high for "Thai TTS"', () => {
    const results = mockMatch('Thai TTS for IVR');
    const top2 = results.slice(0, 2).map((r) => r.exhibitor.id);
    expect(top2).toContain('ex15');
  });

  it('returns Thai-language matches too', () => {
    const results = mockMatch('อยากลดต้นทุน call center ด้วย voice bot');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].matched_tokens.length).toBeGreaterThan(0);
  });

  it('falls back to all exhibitors when no token matches', () => {
    const results = mockMatch('xyzzy quxblorp');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.every((r) => r.match_score === 0.4)).toBe(true);
  });
});

describe('mockFaqSearch', () => {
  it('finds parking question', () => {
    const matches = mockFaqSearch('parking');
    expect(matches[0].id).toBe('faq02');
  });

  it('finds Thai food question', () => {
    const matches = mockFaqSearch('ฟู้ดคอร์ท');
    expect(matches[0].id).toBe('faq03');
  });

  it('falls back to top 3 when no match', () => {
    const matches = mockFaqSearch('xyzzy');
    expect(matches.length).toBe(3);
  });
});

describe('buildMatchCards', () => {
  it('shapes cards with required fields', () => {
    const candidates = mockMatch('voice AI');
    const cards = buildMatchCards(candidates, 'th');
    expect(cards.length).toBe(candidates.length);
    for (const card of cards) {
      expect(card.rank).toBeGreaterThan(0);
      expect(card.exhibitor_id).toMatch(/^ex\d{2}$/);
      expect(card.booth_no).toMatch(/^[A-Z]-\d{2}$/);
      expect(card.match_score).toBeGreaterThanOrEqual(40);
      expect(card.match_score).toBeLessThanOrEqual(100);
      expect(card.why_match_th).toBeTruthy();
      expect(card.why_match_en).toBeTruthy();
      expect(card.cta_url).toContain('/visitor?booth=');
    }
  });

  it('reply intro varies by candidate count', () => {
    const many = mockMatch('voice AI Thai chatbot');
    const reply = buildMatchReply(many, 'th');
    expect(reply.reply_text_th).toContain(String(many.length));
    expect(reply.follow_up_question).toBeTruthy();
  });
});

describe('data accessors', () => {
  it('getExhibitors returns canonical seeds', () => {
    expect(getExhibitors().length).toBe(2);
  });

  it('getExhibitorById finds Botnoi', () => {
    expect(getExhibitorById('ex01')?.name).toBe('Botnoi Group');
  });

  it('returns undefined for unknown id', () => {
    expect(getExhibitorById('exZZ')).toBeUndefined();
  });

  it('FAQ_KB has 6 mock entries', () => {
    expect(FAQ_KB.length).toBe(6);
  });
});
