export const priorityLabel = (number) => {
    const priorities = {
        0: 'No Priority',
        1: 'Low',
        2: 'Medium',
        3: 'High',
    };

    return priorities[number] || 'No Priority';
};
export const formatDate = (date) => {
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    };
    return date ? date.toLocaleString('en-US', options) : '';
};

export const textToDate = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return formatDate(div.textContent) || formatDate(div.innerText) || '';
  }
