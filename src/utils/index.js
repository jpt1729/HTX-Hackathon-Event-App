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
function formatDateTime(input) {
    const date = new Date(input);
      
    // Extract year, month, day, hour, and minutes
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  
    // Construct the desired format
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
export {
    formatTime,
    formatDateTime
}
