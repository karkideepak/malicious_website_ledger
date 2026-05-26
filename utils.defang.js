export function defang(url) {
  return url
    .replace(/^https?/, 'hxxp')
    .replace(/\./g, '[.]')
    .replace('://', '[://]');
}
