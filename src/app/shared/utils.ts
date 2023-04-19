// check if the values is empty.
export function isEmpty(value: any): boolean {
    if (value instanceof Array) {
        return value.length === 0;
    }
    return value === null || value === undefined || value === '';
}
