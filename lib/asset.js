const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path) {
  if (!path) return path;
  if (/^(https?:)?\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : "/" + path}`;
}
