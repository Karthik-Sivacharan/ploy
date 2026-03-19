let counter = 0;

export function nanoid(): string {
  counter += 1;
  return `node-${Date.now().toString(36)}-${counter.toString(36)}`;
}
