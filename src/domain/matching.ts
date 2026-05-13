import type { Exhibitor } from './types'

export interface RankedExhibitor {
  exhibitor: Exhibitor
  score: number
  matchedTerms: string[]
}

function normalize(s: string) {
  return s.toLowerCase().trim()
}

function corpusFor(ex: Exhibitor) {
  const parts = [
    ex.companyName,
    ex.shortBio,
    ex.boothLabel,
    ...ex.solutions.flatMap((s) => [s.solutionName, ...s.useCases]),
  ]
  return normalize(parts.join(' '))
}

function tokens(text: string) {
  const n = normalize(text)
  const words = n.split(/[\s,.;:!?/|()[\]{}'"<>]+/).filter((w) => w.length > 1)
  const uniq = [...new Set(words)]
  if (n.length > 3) uniq.push(n)
  return uniq
}

export function rankExhibitorsForPain(pain: string, exhibitors: Exhibitor[], topN = 5): RankedExhibitor[] {
  if (!pain.trim()) return []
  const painTokens = tokens(pain)
  const ranked: RankedExhibitor[] = exhibitors.map((exhibitor) => {
    const corpus = corpusFor(exhibitor)
    const matchedTerms: string[] = []
    let score = 0
    for (const t of painTokens) {
      if (t.length < 2) continue
      if (corpus.includes(t)) {
        score += 3
        matchedTerms.push(t)
      }
    }
    for (const t of painTokens) {
      if (t.length < 4) continue
      for (const word of corpus.split(/\s+/)) {
        if (word.length > 3 && (word.includes(t) || t.includes(word))) {
          score += 1
          if (!matchedTerms.includes(t)) matchedTerms.push(t)
        }
      }
    }
    return { exhibitor, score, matchedTerms: [...new Set(matchedTerms)] }
  })
  ranked.sort((a, b) => b.score - a.score)
  return ranked.filter((r) => r.score > 0).slice(0, topN)
}
