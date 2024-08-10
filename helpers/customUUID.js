export function generateProductId() {
  const timesStamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);

  return `${timesStamp}-${random}`;
}
