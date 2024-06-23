const formatTime = ( dateObject ) => {
    
    let formattedTime = dateObject.toLocaleString("en-US", {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true // Change to true for 12-hour format
    });
    
    // Format the date part
    let formattedDate = dateObject.toLocaleDateString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    return `${formattedTime} ${formattedDate}`
}
function formatDateTime(input, timeZone=Intl.DateTimeFormat().resolvedOptions().timeZone) {
    const date = new Date(input);
    
    // Use Intl.DateTimeFormat to format date in the specified timezone
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: timeZone
    };
    
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedParts = formatter.formatToParts(date);
    
    // Extract formatted parts
    const year = formattedParts.find(part => part.type === 'year').value;
    const month = formattedParts.find(part => part.type === 'month').value;
    const day = formattedParts.find(part => part.type === 'day').value;
    const hours = formattedParts.find(part => part.type === 'hour').value;
    const minutes = formattedParts.find(part => part.type === 'minute').value;
  
    // Construct the desired format
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
export {
    formatTime,
    formatDateTime
}
