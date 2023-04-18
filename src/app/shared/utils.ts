// check if the values is empty.
export function isEmpty(value: any): boolean {
    if (value instanceof Array) {
        return value.length === 0;
    }
    return value === null || value === undefined || value === '';
}

// export an object to json file
export function exportToJsonFile(json: Object, filename = 'data.json') {
    const dataStr = JSON.stringify(json);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
}