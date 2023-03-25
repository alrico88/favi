export default eventHandler(async (event) => {
  const { loadFavicon, resolveFavicon } = useFavicon();

  const { url } = getQuery(event);

  const faviconUrl = await resolveFavicon(url as string);

  const favicon = await loadFavicon(faviconUrl);

  setResponseHeader(event, "Content-Type", "image/png");

  return Buffer.from(favicon);
});
