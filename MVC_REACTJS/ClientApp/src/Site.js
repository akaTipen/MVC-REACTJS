function isEmptyString(str) {
    return (str.trim() === "");
}

export function renderDate(data, type, val) {
    if (!isEmptyString(data)) {
        return data.substr(0, 10).split('-').reverse().join('-');
    }
    return '';
}

export function renderDateInsert(data, type, val) {
    if (!isEmptyString(data)) {
        var split = [];
        split = data.substr(0, 10).split('-');
        var result = split[1] + "-" + split[0] + "-" + split[2];
        return result;
    } else {
        return '';
    }
}
