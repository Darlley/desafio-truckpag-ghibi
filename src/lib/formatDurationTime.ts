export const formatMinutes = (minutes: string) => {
  const toMinutes = parseInt(minutes, 10);
  const hours = Math.floor(toMinutes / 60);
  const remainingMinutes = toMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}m`;
};