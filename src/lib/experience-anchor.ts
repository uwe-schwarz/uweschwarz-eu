const EXPERIENCE_ID_PREFIX = "experience-";

/** Fired when a link asks the timeline to reveal (expand and scroll to) an entry. */
export const EXPERIENCE_REVEAL_EVENT = "experience:reveal";

export const getExperienceAnchorId = (slug: string) => `${EXPERIENCE_ID_PREFIX}${slug}`;

/** Slug from a location hash like "#experience-threedium", or null. */
export const getExperienceSlugFromHash = (hash: string) => {
  const id = decodeURIComponent(hash.replace(/^#/u, ""));
  return id.startsWith(EXPERIENCE_ID_PREFIX) ? id.slice(EXPERIENCE_ID_PREFIX.length) : null;
};

/**
 * Updates the hash without the native jump (the target may still be
 * collapsed) and lets the timeline expand and scroll to it.
 */
export const requestExperienceReveal = (slug: string) => {
  window.history.pushState(null, "", `#${getExperienceAnchorId(slug)}`);
  window.dispatchEvent(new CustomEvent<string>(EXPERIENCE_REVEAL_EVENT, { detail: slug }));
};
