export const getTimeAgo = (dateString) => {
  const minDiff = Math.floor((new Date() - new Date(dateString)) / 60000);
  if (minDiff < 60) return `${minDiff} mins ago`;
  const hourDiff = Math.floor(minDiff / 60);
  if (hourDiff < 24) return `${hourDiff} hours ago`;
  const dayDiff = Math.floor(hourDiff / 24);
  return `${dayDiff} day${dayDiff > 1 ? 's' : ''} ago`;
};
