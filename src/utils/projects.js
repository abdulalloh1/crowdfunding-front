import {i18n} from "../i18n";
import {
    PROJECT_STATUS_REFUND,
    PROJECT_STATUS_REFUND_COLOR,
    PROJECT_STATUS_CANCELED,
    PROJECT_STATUS_CANCELED_COLOR,
    PROJECT_STATUS_CREATED,
    PROJECT_STATUS_CREATED_COLOR,
    PROJECT_STATUS_FUNDING,
    PROJECT_STATUS_FUNDING_COLOR,
    PROJECT_STATUS_MODERATING,
    PROJECT_STATUS_MODERATING_COLOR,
    PROJECT_STATUS_MODERATION_CANCELED,
    PROJECT_STATUS_MODERATION_CANCELED_COLOR,
    PROJECT_STATUS_FINISHED,
    PROJECT_STATUS_FINISHED_COLOR,
    PROJECT_STATUS_INVESTED, PROJECT_STATUS_INVESTED_COLOR
} from "../constants/project-statuses";


const {t} = i18n.global;


export function getProjectTypeLabel(type) {
    if (!type) return null;
    return t('projectTypes.' + type.toLowerCase() + '.title');
}

export function getProjectStatusLabel(status) {
    switch (status) {
        case PROJECT_STATUS_FINISHED:
            return {
                label: t('projectStatuses.finished'),
                color: PROJECT_STATUS_FINISHED_COLOR
            }
        case PROJECT_STATUS_REFUND:
            return {
                label: t('projectStatuses.refund'),
                color: PROJECT_STATUS_REFUND_COLOR
            }
        case PROJECT_STATUS_INVESTED:
            return {
                label: t('projectStatuses.invested'),
                color: PROJECT_STATUS_INVESTED_COLOR
            }
        case PROJECT_STATUS_MODERATION_CANCELED:
            return {
                label: t('projectStatuses.moderationCanceled'),
                color: PROJECT_STATUS_MODERATION_CANCELED_COLOR
            }
        case PROJECT_STATUS_CANCELED:
            return {
                label: t('projectStatuses.canceled'),
                color: PROJECT_STATUS_CANCELED_COLOR
            }
        case PROJECT_STATUS_CREATED:
            return {
                label: t('projectStatuses.created'),
                color: PROJECT_STATUS_CREATED_COLOR
            }
        case PROJECT_STATUS_FUNDING:
            return {
                label: t('projectStatuses.funding'),
                color: PROJECT_STATUS_FUNDING_COLOR
            }
        case PROJECT_STATUS_MODERATING:
            return {
                label: t('projectStatuses.moderating'),
                color: PROJECT_STATUS_MODERATING_COLOR
            }
        default:
            return ''
    }
}


export function calculateCashProgress(collected, need) {
    const percent = (collected / need) * 100;
    const color = (percent > 50) ? '#32B49C' : (percent > 25) ? '#FFB801' : '#FF6C01'
    return {
        percent,
        color
    }
}