export function parseTaken(taken: string): string[] {
  if (!taken) {
    return [];
  }

  return taken.split(',').filter(Boolean);
}

export function serializeTaken(seats: string[]): string {
  return seats.join(',');
}
