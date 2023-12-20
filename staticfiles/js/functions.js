
const csvmaker = function (data) {
    csvRows = [];
    const headers = Object.keys(data);
    csvRows.push(headers.join(','));
    const values = Object.values(data).join(',');
    csvRows.push(values)
    return csvRows.join('\n')
}

