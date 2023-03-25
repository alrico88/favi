import { lookup } from "mrmime";

export default eventHandler(async (event) => {
  const { loadFavicon, resolveFavicon } = useFavicon();

  const { url } = getQuery(event);

  const faviconUrl = await resolveFavicon(url as string);

  const favicon = await loadFavicon(faviconUrl);

  const mime = lookup(faviconUrl);

  setResponseHeader(event, "Content-Type", mime as string);

  return Buffer.from(favicon);
});
