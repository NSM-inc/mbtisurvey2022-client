import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import SurveyReqBodyDto from '../../models/SurveyReqBodyDto';
import AlcoholDto from '../../models/SurveyReqBodyDto/AlcoholDto';
import CommonDto from '../../models/SurveyReqBodyDto/CommonDto';
import EtcDto from '../../models/SurveyReqBodyDto/EtcDto';
import LoveDto from '../../models/SurveyReqBodyDto/LoveDto';
import ResidenceDto from '../../models/SurveyReqBodyDto/ResidenceDto';
import UsersDto from '../../models/SurveyReqBodyDto/UsersDto';
import WorkDto from '../../models/SurveyReqBodyDto/WorkDto';
import { AuthState } from '../../recoil/atoms';
import api from '../../util/api';
import SurveyPresenter from './SurveyPresenter';

const SurveyContainer = function () {
    const authState = useRecoilValue(AuthState);
    const router = useRouter();

    useEffect(() => {
        if (!authState.phone || !authState.token) {
            router.replace('/');
        }
    }, []);

    const handleSubmit = async function (
        data: AlcoholDto &
            CommonDto &
            EtcDto &
            LoveDto &
            ResidenceDto &
            UsersDto &
            WorkDto,
    ) {
        // user
        const user: UsersDto = {
            token: authState.token,
            mbti: data.mbti,
            phone: authState.phone,
        };
        // common
        const common: CommonDto = {
            gender: data.gender,
            birth: data.birth,
            personalColor: data.personalColor,
            hobby: data.hobby,
            smartphoneOS: data.smartphoneOS,
            politics: data.politics,
            religion: data.religion,
        };
        // etc
        const etc: EtcDto = {
            leagueOfLegendsPosition: data.leagueOfLegendsPosition,
            leagueOfLegendsTier: data.leagueOfLegendsTier,
            starcraftRace: data.starcraftRace,
            favoriteMbti: data.favoriteMbti,
        };
        // love
        const love: LoveDto = {
            loveCount: data.loveCount,
            isLoveTarget: data.isLoveTarget,
            isInLove: data.isInLove,
            isMarried: data.isMarried,
            longestLoveTime: data.longestLoveTime,
        };
        // residence
        const residence: ResidenceDto = {
            residenceType: data.residenceType,
            isOnlyChild: data.isOnlyChild,
            allBrothers: data.allBrothers,
            allSisters: data.allSisters,
            myOrder: data.myOrder,
            currentAddress: data.currentAddress,
        };
        // alcohol
        const alcohol: AlcoholDto = {
            alcoholPerOnce: data.alcoholPerOnce,
            alcoholPerWeek: data.alcoholPerWeek,
            favoriteAlcohol: data.favoriteAlcohol,
        };
        // work
        const work: WorkDto = {
            isEmployed: data.isEmployed,
            job: data.job,
            income: data.income,
            firstWorkYear: data.firstWorkYear,
        };

        const surveyData: SurveyReqBodyDto = {
            user,
            common,
            love,
            residence,
            work,
            alcohol,
            etc: {
                ...etc,
                favoriteMbti: etc.favoriteMbti === '' ? null : etc.favoriteMbti,
            },
        };

        try {
            await api({
                method: 'post',
                url: '/survey',
                data: surveyData,
            });
            alert('서베이가 등록되었습니다. 감사합니다.');
            router.replace('/');
        } catch {
            alert('서베이 등록에 실패했습니다. 죄송합니다.');
        }
    };

    return <SurveyPresenter onSubmit={handleSubmit} />;
};

export default SurveyContainer;
