import { mimes } from "mrmime";

export default defineEventHandler<{ query: { url: string } }>(async (event) => {
  const { url } = getQuery(event);

  const { loadFavicon, getDefaultFavicon } = useFavicon();

  const favicon = await loadFavicon(getDefaultFavicon(url));

  setResponseHeader(event, "Content-Type", mimes.png);

  return Buffer.from(favicon);
});
