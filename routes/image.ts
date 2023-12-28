import { lookup, mimes } from "mrmime";
import { withQuery } from "ufo";

export default defineEventHandler<{ query: { url: string } }>(async (event) => {
  const { loadFavicon, resolveFavicon } = useFavicon();

  const { url } = getQuery(event);
  try {
    const faviconUrl = await resolveFavicon(url);

    const favicon = await loadFavicon(faviconUrl);

    mimes.ico = "image/x-icon";

    const mime = lookup(faviconUrl);

    setCache(event);
    setResponseHeader(event, "Content-Type", mime || mimes.png);

    return Buffer.from(favicon);
  } catch {
    return sendRedirect(
      event,
      withQuery("/generic", {
        url,
      }),
    );
  }
});
