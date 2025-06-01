function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

/** @returns Time formated string (00:00:00) */
export function clockFromSeconds(s: number) {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
