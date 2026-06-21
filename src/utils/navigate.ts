// 7 real pages in FullPageScroll
export const PAGE_MAP: Record<string, number> = {
  hero:    0,
  intros:  1,   // the single intro section (handles 5 text states internally)
  about:   2,
  why:     3,
  work:    4,
  contact: 5,
  footer:  6,
}

export const navigateTo = (id: string) => {
  const idx = PAGE_MAP[id]
  if (idx !== undefined) {
    window.dispatchEvent(new CustomEvent('fp:go', { detail: idx }))
  }
}
