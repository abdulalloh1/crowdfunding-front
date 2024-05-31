import {i18n} from "../i18n";

const {t} = i18n.global;

export const BUSINESS_TYPE = 'BUSINESS';
export const CHARITY_TYPE = 'CHARITY';
export const CREATIVE_TYPE = 'CREATIVE';
export const SOCIAL_TYPE = 'SOCIAL';

export const PROJECT_TYPE_DONATION = 'DONATION';
export const PROJECT_TYPE_INVESTMENT = 'INVESTMENT';

export const PROJECT_TYPES_WITH_LABEL = [
    {
        label: t('projectTypes.business.title'),
        value: 'BUSINESS'
    },
    {
        label: t('projectTypes.charity.title'),
        value: 'CHARITY'
    },
    {
        label: t('projectTypes.creative.title'),
        value: 'CREATIVE'
    },
    {
        label: t('projectTypes.social.title'),
        value: 'SOCIAL'
    },
];
