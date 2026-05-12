import { describe, it, expect } from 'vitest';
import { EXHIBITORS_CANONICAL } from './exhibitors.canonical';
import { ExhibitorSchema, buildEmbeddingText } from './exhibitor.zod';

describe('canonical exhibitor seeds', () => {
  it('has 2 gold-standard records', () => {
    expect(EXHIBITORS_CANONICAL).toHaveLength(2);
  });

  it('every seed passes ExhibitorSchema parse', () => {
    for (const e of EXHIBITORS_CANONICAL) {
      expect(() => ExhibitorSchema.parse(e)).not.toThrow();
    }
  });

  it('has expected ids', () => {
    const ids = EXHIBITORS_CANONICAL.map((e) => e.id).sort();
    expect(ids).toEqual(['ex01', 'ex15']);
  });

  it('Botnoi long_pitch_en contains keywords agent will retrieve on', () => {
    const botnoi = EXHIBITORS_CANONICAL.find((e) => e.id === 'ex01')!;
    expect(botnoi.long_pitch_en).toMatch(/voice/i);
    expect(botnoi.long_pitch_en).toMatch(/chatbot/i);
    expect(botnoi.long_pitch_en).toMatch(/Thai/i);
  });

  it('buildEmbeddingText produces non-empty corpus for each seed', () => {
    for (const e of EXHIBITORS_CANONICAL) {
      const text = buildEmbeddingText(e);
      expect(text.length).toBeGreaterThan(200);
      expect(text).toContain(e.name);
    }
  });
});
