export default eventHandler(async (event) => {
  const { resolveFavicon } = useFavicon();

  const { url } = getQuery(event);

  return resolveFavicon(url as string);
});
