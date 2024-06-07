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

export {
    formatTime
}