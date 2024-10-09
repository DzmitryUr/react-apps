export const getFormattedDate = () => {
  const currentDate = new Date();
  const options = {
    weekday: 'short',
    month: 'short', // Short month name (e.g., "Oct")
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return currentDate.toLocaleString('en-US', options);
};

export const getShortDate = (timestamp) => {
  const date = new Date(timestamp * 1000);

  // Formatting options for date and time
  const options = {
    month: 'short', // Short month name (e.g., "Oct")
    day: 'numeric', // Numeric day (e.g., "8")
    hour: 'numeric', // Hour in 12-hour format (e.g., "12")
  };

  return date.toLocaleString('en-US', options);
};
