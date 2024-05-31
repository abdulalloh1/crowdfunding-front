import {i18n} from "../i18n";
import {USER_APPROVED_STATUS, USER_SIMPLE_STATUS} from "../constants/user-statuses";
import {USER_MODERATED, USER_ON_MODERATION} from "../constants/moderation-statuses";

const {t} = i18n.global;

export function getUserStatusText(status) {
    if (status === USER_APPROVED_STATUS) return t("status.active.title");

    if (status === USER_SIMPLE_STATUS) return t("status.simplified.title")

    return '';
}

export function getModerationStatusOfUser(status) {
    if (status === USER_ON_MODERATION) return 'На модерации'
    if (status === USER_MODERATED) return 'Модерирован'

    return ''
}

export function signIn() {

}