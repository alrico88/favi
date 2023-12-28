import { mimes } from "mrmime";

export default defineEventHandler<{ query: { url: string } }>(async (event) => {
  const { url } = getQuery(event);

  const { loadFavicon, getDefaultFavicon } = useFavicon();

  setResponseHeader(event, "Content-Type", mimes.png);

  return Buffer.from(await loadFavicon(getDefaultFavicon(url)));
});
