const API_URL = import.meta.env.VITE_EVENTIQ_API_URL || 'http://localhost:8000';
const USE_MOCK = import.meta.env.VITE_USE_MOCK_BACKEND === 'true';

import { SAMPLE_ARTICLES, SAMPLE_ARTICLE } from '@/lib/mock/memory-articles';
import { SAMPLE_SESSIONS } from '@/lib/mock/sessions';
import { MATCH_SCENARIOS } from '@/lib/mock/match-results';
import { FAQS } from '@/lib/mock/faq-kb';

export interface ConsentData {
  audioRecording: boolean;
  publicSharing: boolean;
  pdpaTerms: boolean;
  signature: string;
  timestamp: string;
}

export async function matchExhibitor(painPoint: string) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 800));
    const lower = painPoint.toLowerCase();
    const found = MATCH_SCENARIOS.find((s) => lower.includes(s.pain.slice(0, 6)));
    return (found ?? MATCH_SCENARIOS[0]).results;
  }
  const res = await fetch(`${API_URL}/tools/match-exhibitor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pain: painPoint }),
  });
  return res.json();
}

export async function searchFaq(question: string) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    const lower = question.toLowerCase();
    const matches = FAQS.filter(
      (f) => f.question_th.includes(question) || f.question_en.toLowerCase().includes(lower)
    );
    return (matches.length ? matches : FAQS).slice(0, 3);
  }
  const res = await fetch(`${API_URL}/tools/faq-search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  return res.json();
}

export async function saveConsent(data: ConsentData) {
  if (USE_MOCK) {
    console.log('[MOCK] Consent saved:', data);
    await new Promise((r) => setTimeout(r, 500));
    return { id: `consent-${Date.now()}`, success: true };
  }
  const res = await fetch(`${API_URL}/tools/save-consent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function generateArticle(audioBlob: Blob, consentId: string) {
  if (USE_MOCK) {
    console.log('[MOCK] Generating article for consent', consentId);
    await new Promise((r) => setTimeout(r, 3000));
    return SAMPLE_ARTICLE;
  }
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('consent_id', consentId);
  const res = await fetch(`${API_URL}/tools/generate-article`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function getAllSessions() {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    return SAMPLE_SESSIONS;
  }
  const res = await fetch(`${API_URL}/sessions`);
  return res.json();
}

export async function getSessionSummary(sessionId: string) {
  if (USE_MOCK) {
    return SAMPLE_SESSIONS.find((s) => s.id === sessionId);
  }
  const res = await fetch(`${API_URL}/tools/session-summary/${sessionId}`);
  return res.json();
}

export async function getAllArticles() {
  if (USE_MOCK) return SAMPLE_ARTICLES;
  const res = await fetch(`${API_URL}/articles`);
  return res.json();
}
