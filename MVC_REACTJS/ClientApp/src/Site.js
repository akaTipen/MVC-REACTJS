function isEmptyString(str) {
    return (str.trim() === "");
}

export function renderDate(data, type, val) {
    if (!isEmptyString(data)) {
        return data.substr(0, 10).split('-').reverse().join('-');
    }
    return '';
}
