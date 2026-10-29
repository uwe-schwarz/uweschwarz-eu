export function hasMarkdownAcceptHeader(acceptHeader: string | null) {
  if (!acceptHeader) {
    return false;
  }

  const { htmlCompatibleQ, markdownQ } = acceptHeader.split(",").reduce(
    (quality, part) => {
      const [type, ...parameterParts] = part.split(";").map((value) => value.trim().toLowerCase());
      const qValue = parameterParts.find((parameter) => parameter.startsWith("q="));
      const q = qValue ? Number(qValue.slice(2)) : 1;
      const normalizedQ = Number.isFinite(q) ? q : 0;

      if (type === "text/markdown") {
        quality.markdownQ = Math.max(quality.markdownQ, normalizedQ);
      }

      if (type === "text/html" || type === "text/*" || type === "*/*") {
        quality.htmlCompatibleQ = Math.max(quality.htmlCompatibleQ, normalizedQ);
      }

      return quality;
    },
    { htmlCompatibleQ: 0, markdownQ: 0 },
  );

  return markdownQ > 0 && markdownQ >= htmlCompatibleQ;
}
