export const roundNumber = (num) => {
    return Math.round(num * 100) / 100;
}

export const onlyRoundedInteger = (data) => {

    if (data == 0) { return 0 };

    if (data != 'none') {
        return roundNumber(data);
    }
    return 0;
}