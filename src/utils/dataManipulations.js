import {i18n} from "../i18n";

const {t} = i18n.global;

export function deepClone(data) {
    return JSON.parse(JSON.stringify(data));
}

export function maskText(value, pattern) {
    /* eslint-disable */
    let i = 0,
        v = value.toString();
    return pattern.replace(/#/g, _ => v[i++]);
    /* eslint-enable */

}

export function maskPhoneNumber(phoneNumber) {
    if (!phoneNumber) return
    return maskText(phoneNumber, "### ## ### ## ##")
}

export function makeFormattedNumber(num) {
    if (!num) return 0;

    return num.toLocaleString('us')
}

export function makeMoneyFormatFromNum(num) {
    if (!num) return 0;

    const amount = num.toLocaleString('us')
    return `${amount} ${t('sum')}`
}

export function maskBankCardNumber(bankCardNumber) {
    if (!bankCardNumber) return
    return maskText(bankCardNumber, "#### #### #### ####")
}

export function addLeadingZero(data) {
    return parseInt(data) <= 9 ? ("0" + data) : data;
}

export function getDateWithoutTZ(dateWithTZ) {

    let dateObject = new Date(dateWithTZ);

    const year = dateObject.getFullYear()
    const month = addLeadingZero(dateObject.getMonth())
    const dateNum = addLeadingZero(dateObject.getDate())
    return dateNum + "." + month + '.' + year;

}
