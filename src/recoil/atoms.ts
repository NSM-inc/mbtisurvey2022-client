import { atom } from 'recoil';

export const CurrentSurveyStepState = atom({
    key: 'CurrentSurveyStepState',
    default: 0,
});

export const IsShowProcessPercentState = atom({
    key: 'IsShowProcessPercentState',
    default: false,
});
