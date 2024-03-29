/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import styled from '@emotion/styled';
import Input from '../common/Input';
import SelectBox from '../common/SelectBox';

import { Color, ColorResult, SliderPicker } from 'react-color';
import { useEffect, useRef, useState } from 'react';
import Button from '../common/Button';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    CurrentSurveyStepState,
    IsShowProcessPercentState,
} from '../../recoil/atoms';
import COLOR from '../../assets/consts/color';
import { useForm } from 'react-hook-form';
import UsersDto from '../../models/SurveyReqBodyDto/UsersDto';
import AlcoholDto from '../../models/SurveyReqBodyDto/AlcoholDto';
import CommonDto from '../../models/SurveyReqBodyDto/CommonDto';
import LoveDto from '../../models/SurveyReqBodyDto/LoveDto';
import EtcDto from '../../models/SurveyReqBodyDto/EtcDto';
import ResidenceDto from '../../models/SurveyReqBodyDto/ResidenceDto';
import WorkDto from '../../models/SurveyReqBodyDto/WorkDto';
import { isMobile } from '../../assets/consts/mediaQuery';
import { useWindowSize } from '../../util/useWindowSize';
import RadioButtons from '../common/RadioButtons';
import YNRadioButton from '../common/YNRadioButton';

interface SurveyPresenterProps {
    onSubmit: (
        data: AlcoholDto &
            CommonDto &
            EtcDto &
            LoveDto &
            ResidenceDto &
            UsersDto &
            WorkDto,
    ) => Promise<void>;
}

const SurveyPresenter = function ({ onSubmit }: SurveyPresenterProps) {
    const [favoriteColor, setFavoriteColor] = useState<Color>();
    const [currentSurveyStep, setCurrentSurveyStep] = useRecoilState(
        CurrentSurveyStepState,
    );
    const setIsShowProcessPercent = useSetRecoilState(
        IsShowProcessPercentState,
    );
    const [mbti, setMbti] = useState<{
        ei: '·' | 'E' | 'I';
        ns: '·' | 'N' | 'S';
        ft: '·' | 'F' | 'T';
        pj: '·' | 'P' | 'J';
    }>({ ei: '·', ns: '·', ft: '·', pj: '·' });

    const [isShowErrors, setIsShowErrors] = useState<boolean>(false);

    const favoriteColorRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, setValue, watch, setFocus } = useForm<
        AlcoholDto &
            CommonDto &
            EtcDto &
            LoveDto &
            ResidenceDto &
            UsersDto &
            WorkDto
    >();

    const watched = watch();

    const {
        gender,
        birth,
        personalColor,
        hobby,
        smartphoneOS,
        politics,
        religion,
        isEmployed,
        job,
        income,
        firstWorkYear,
        alcoholPerOnce,
        alcoholPerWeek,
        favoriteAlcohol,
        loveCount,
        isLoveTarget,
        isInLove,
        isMarried,
        longestLoveTime,
        residenceType,
        isOnlyChild,
        allBrothers,
        allSisters,
        myOrder,
        currentAddress,
        leagueOfLegendsPosition,
        leagueOfLegendsTier,
        starcraftRace,
        favoriteMbti,
    } = watched;

    const { width } = useWindowSize();
    const isMobileSize = (width || 0) < 480;

    useEffect(() => {
        setIsShowProcessPercent(true);
        return () => setIsShowProcessPercent(false);
    }, []);

    const handleFavoriteColorChange = (color: ColorResult) => {
        setValue('personalColor', color.hex);
        setFavoriteColor(color.hex);
    };

    const handleClickNext = function () {
        if (currentSurveyStep >= surveySlide.length - 1) return;
        setCurrentSurveyStep((prev) => prev + 1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const favoriteAlcoholOptions = [
        { value: '', text: '클릭하여 선택' },
        { value: 'SOJU', text: '소주' },
        { value: 'BEER', text: '맥주' },
        { value: 'WINE', text: '와인' },
        { value: 'MAKGEOLI', text: '막걸리' },
        { value: 'BOARDCAKE', text: '보드카' },
        { value: 'COCKTAIL', text: '칵테일' },
    ];

    const surveySlide = [
        <>
            <h1
                css={css`
                    margin-bottom: 70px;
                    ${isMobile} {
                        margin-bottom: 30px;
                    }
                `}
            >
                나의 MBTI는
            </h1>
            <div
                css={css`
                    display: flex;
                    justify-content: center;
                    & > button {
                        width: 82px;
                        height: 146px;
                        padding: 0;
                        background: transparent;
                        border: 0;
                        border-bottom: 2px solid ${COLOR.WHITE};
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        cursor: pointer;
                        &:not(:last-child) {
                            margin-right: 70px;
                        }
                        ${isMobile} {
                            width: 60px;
                            &:not(:last-child) {
                                margin-right: 20px;
                            }
                        }
                    }
                    & > button > span {
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-family: Montserrat;
                        font-size: 120px;
                        font-weight: 900;
                        font-style: normal;
                        line-height: 146px;
                        ${isMobile} {
                            font-size: 90px;
                            line-height: 176px;
                        }
                    }
                `}
            >
                {/* mbti 입력 폼 */}
                <button
                    type="button"
                    onClick={() => {
                        if (mbti.ei === 'E') {
                            setMbti((prev) => ({ ...prev, ei: 'I' }));
                        } else {
                            setMbti((prev) => ({ ...prev, ei: 'E' }));
                        }
                    }}
                >
                    <span
                        css={css`
                            background: linear-gradient(
                                180deg,
                                #ff1010 0%,
                                #bf871a 100%
                            );
                            text-shadow: 0px 0px 15px rgba(255, 0, 0, 0.5);
                        `}
                    >
                        {mbti.ei}
                    </span>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (mbti.ns === 'N') {
                            setMbti((prev) => ({ ...prev, ns: 'S' }));
                        } else {
                            setMbti((prev) => ({ ...prev, ns: 'N' }));
                        }
                    }}
                >
                    <span
                        css={css`
                            background: linear-gradient(
                                180deg,
                                #a3fe12 0%,
                                #3088b1 100%
                            );
                            text-shadow: 0 0 15px rgba(113, 203, 88, 0.5);
                        `}
                    >
                        {mbti.ns}
                    </span>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (mbti.ft === 'F') {
                            setMbti((prev) => ({ ...prev, ft: 'T' }));
                        } else {
                            setMbti((prev) => ({ ...prev, ft: 'F' }));
                        }
                    }}
                >
                    <span
                        css={css`
                            background: linear-gradient(
                                180deg,
                                #10e2ff 0%,
                                #1a3ebf 100%
                            );
                            text-shadow: 0 0 15px rgba(21, 143, 223, 0.5);
                        `}
                    >
                        {mbti.ft}
                    </span>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (mbti.pj === 'P') {
                            setMbti((prev) => ({ ...prev, pj: 'J' }));
                        } else {
                            setMbti((prev) => ({ ...prev, pj: 'P' }));
                        }
                    }}
                >
                    <span
                        css={css`
                            background: linear-gradient(
                                180deg,
                                #4a2169 0%,
                                #a147e7 100%
                            );
                            text-shadow: 0 0 15px rgba(119, 53, 170, 0.5);
                        `}
                    >
                        {mbti.pj}
                    </span>
                </button>
            </div>
            <div
                css={css`
                    margin-top: 10px;
                `}
            >
                <FormError
                    isShow={
                        isShowErrors &&
                        isShowErrors &&
                        !!Object.entries(mbti).filter((elem) => elem[1] === '·')
                            .length
                    }
                >
                    MBTI를 입력해주세요.
                </FormError>
            </div>

            <Button
                css={css`
                    margin-top: 100px;
                `}
                onClick={() => {
                    if (
                        mbti.ei === '·' ||
                        mbti.ft === '·' ||
                        mbti.ns === '·' ||
                        mbti.pj === '·'
                    ) {
                        setIsShowErrors(true);
                        return;
                    }
                    setValue(
                        'mbti',
                        `${mbti.ei}${mbti.ns}${mbti.ft}${mbti.pj}`,
                    );
                    setIsShowErrors(false);
                    handleClickNext();
                }}
                type="button"
            >
                다음
            </Button>
        </>,
        <>
            <h1
                css={css`
                    margin-bottom: 70px;
                `}
            >
                기본정보 조사를
                <br />
                시작합니다
            </h1>
            <QuestionContainer>
                <QuestionTitle text="성별" />
                <RadioButtons
                    items={[
                        { value: 'MALE', text: '남성' },
                        { value: 'FEMALE', text: '여성' },
                        { value: 'MTF', text: 'MTF' },
                    ]}
                    itemWidth={isMobileSize ? '100px' : '120px'}
                    register={register('gender')}
                />
                <RadioButtons
                    items={[
                        { value: 'FTM', text: 'FTM' },
                        { value: 'ETC', text: '기타' },
                    ]}
                    itemWidth="100px"
                    register={register('gender')}
                />
                <FormError isShow={isShowErrors && isShowErrors && !gender}>
                    성별을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="태어난 해" />
                <Input
                    type="number"
                    placeholder="1995 (4자리 입력)"
                    register={register('birth', {
                        valueAsNumber: true,
                        required: true,
                    })}
                />
                <FormError
                    isShow={
                        isShowErrors && (!birth || birth < 1900 || birth > 2022)
                    }
                >
                    태어난 해를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="좋아하는 색상" />
                <div
                    css={css`
                        margin-top: 10px;
                    `}
                    ref={favoriteColorRef}
                >
                    <SliderPicker
                        color={favoriteColor}
                        onChangeComplete={handleFavoriteColorChange}
                    />
                </div>
                <FormError isShow={isShowErrors && !personalColor}>
                    좋아하는 색상을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="취미/특기" />
                <SelectBox
                    register={register('hobby')}
                    options={[
                        // todo 각 항목 text 맞는지 체크
                        { value: '', text: '클릭하여 선택' },
                        { value: 'SPORTS', text: '스포츠' },
                        { value: 'LANGUAGE', text: '언어' },
                        { value: 'INVESTING', text: '투자' },
                        { value: 'COOKING', text: '요리' },
                        { value: 'COMPUTER', text: '컴퓨터' },
                        { value: 'MUSIC', text: '음악' },
                        { value: 'PHOTOGRAPHY', text: '사진' },
                        { value: 'FASHION', text: '패션' },
                        { value: 'DIY', text: 'DIY' },
                        { value: 'MARKETING', text: '마케팅' },
                        { value: 'ART', text: '예술' },
                        { value: 'SUBJECT', text: '마케팅' },
                        { value: 'CODING', text: '코딩' },
                        { value: 'FINANCE', text: '금융' },
                        { value: 'DANCE', text: '춤' },
                        { value: 'BUSINESS', text: '비즈니스' },
                        { value: 'DATA', text: '데이터' },
                        { value: 'ETC', text: '기타' },
                    ]}
                />
                <FormError isShow={isShowErrors && !hobby}>
                    취미 혹은 특기를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="사용하는 스마트폰" />
                <RadioButtons
                    items={[{ value: 'IOS', text: 'iOS' }]}
                    itemWidth={isMobileSize ? '120px' : '150px'}
                    register={register('smartphoneOS')}
                />
                <RadioButtons
                    items={[
                        { value: 'ANDROID', text: '안드로이드' },
                        { value: 'ETC', text: '기타' },
                    ]}
                    itemWidth={isMobileSize ? '130px' : '150px'}
                    register={register('smartphoneOS')}
                />
                <FormError isShow={isShowErrors && !smartphoneOS}>
                    사용하는 스마트폰의 OS를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="정치성향" />
                <RadioButtons
                    items={[
                        { value: 'LEFT', text: '진보' },
                        { value: 'RIGHT', text: '보수' },
                        { value: 'MIDDLE', text: '중도' },
                    ]}
                    itemWidth={isMobileSize ? '80px' : '100px'}
                    register={register('politics')}
                />
                <FormError isShow={isShowErrors && !politics}>
                    정치성향을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="종교" />
                <SelectBox
                    register={register('religion')}
                    options={[
                        { value: '', text: '클릭하여 선택' },
                        { value: 'NONE', text: '무교' },
                        { value: 'CHRISTIAN', text: '기독교' },
                        { value: 'CATHOLIC', text: '가톨릭' },
                        { value: 'BUDDHIST', text: '불교' },
                        { value: 'MUSLIM', text: '이슬람' },
                        { value: 'WONBUDDHIST', text: '원불교' },
                        { value: 'HINDUISM', text: '힌두교' },
                        { value: 'ETC', text: '기타' },
                    ]}
                />
                <FormError isShow={isShowErrors && !religion}>
                    종교를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={() => {
                    let isError = false;
                    if (!gender) {
                        !isError && setFocus('gender');
                        isError = true;
                    }
                    if (!birth || birth < 1900 || birth > 2022) {
                        !isError && setFocus('birth');
                        isError = true;
                    }
                    if (!favoriteColor) {
                        // todo 포커싱으로 변경
                        alert('좋아하는 색상을 선택해주세요.');
                        isError = true;
                    }
                    if (!hobby) {
                        !isError && setFocus('hobby');
                        isError = true;
                    }
                    if (!smartphoneOS) {
                        !isError && setFocus('smartphoneOS');
                        isError = true;
                    }
                    if (!politics) {
                        !isError && setFocus('politics');
                        isError = true;
                    }
                    if (!religion) {
                        !isError && setFocus('religion');
                        isError = true;
                    }
                    if (isError) {
                        setIsShowErrors(true);
                        return;
                    }
                    setIsShowErrors(false);
                    handleClickNext();
                }}
                type="button"
            >
                다음
            </Button>
        </>,
        <>
            <QuestionContainer>
                <QuestionTitle text="현재 재직 여부" />
                <YNRadioButton
                    width={isMobileSize ? '120px' : '150px'}
                    register={register('isEmployed')}
                />
                <FormError isShow={isShowErrors && !isEmployed}>
                    재직여부를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer isDisabled={!isEmployed || isEmployed === '0'}>
                <QuestionTitle text="직종" />
                <SelectBox
                    register={register('job')}
                    options={[
                        { value: '', text: '클릭하여 선택' },
                        { value: '01', text: '관리직' },
                        { value: '02', text: '경영/회계/사무' },
                        { value: '03', text: '금융/보험' },
                        { value: '04', text: '교육/자연과학/사회과학' },
                        { value: '05', text: '법률/경찰/소방/교도' },
                        { value: '06', text: '보건/의료' },
                        { value: '07', text: '사회복지/종교' },
                        { value: '08', text: '문화/예술/디자인/방송' },
                        { value: '09', text: '운전/운송' },
                        { value: '10', text: '영업/판매' },
                        { value: '11', text: '경비/청소' },
                        { value: '12', text: '미용/숙박/여행/오락/스포츠' },
                        { value: '13', text: '음식/서비스' },
                        { value: '14', text: '건설' },
                        { value: '15', text: '기계' },
                        { value: '16', text: '재료' },
                        { value: '17', text: '화학' },
                        { value: '18', text: '섬유/의복' },
                        { value: '19', text: '전기/전자' },
                        { value: '20', text: '정보통신' },
                        { value: '21', text: '식품가공' },
                        { value: '22', text: '환경/인쇄/목재/가구/공예/생산' },
                        { value: '23', text: '농림어업' },
                        { value: '24', text: '군인' },
                    ]}
                    disabled={!isEmployed || isEmployed === '0'}
                />
                <FormError isShow={isShowErrors && !job && isEmployed === '1'}>
                    직종을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer isDisabled={!isEmployed || isEmployed === '0'}>
                <QuestionTitle text="소득 수준 (단위:원)" />
                <RadioButtons
                    items={[{ value: '2000', text: '2천만 ~ 3천만' }]}
                    itemWidth="200px"
                    register={register('income', {
                        disabled: !isEmployed || isEmployed === '0',
                    })}
                />
                <RadioButtons
                    items={[{ value: '3000', text: '3천만 ~ 4천만' }]}
                    itemWidth="200px"
                    register={register('income', {
                        disabled: !isEmployed || isEmployed === '0',
                    })}
                />
                <RadioButtons
                    items={[{ value: '4000', text: '4천만 ~ 6천만' }]}
                    itemWidth="200px"
                    register={register('income', {
                        disabled: !isEmployed || isEmployed === '0',
                    })}
                />
                <RadioButtons
                    items={[{ value: '6000', text: '6천만 ~ 8천만' }]}
                    itemWidth="200px"
                    register={register('income', {
                        disabled: !isEmployed || isEmployed === '0',
                    })}
                />
                <RadioButtons
                    items={[{ value: '8000', text: '8천만 ~ 1억' }]}
                    itemWidth="200px"
                    register={register('income', {
                        disabled: !isEmployed || isEmployed === '0',
                    })}
                />
                <RadioButtons
                    items={[{ value: '10000', text: '1억 이상' }]}
                    itemWidth="200px"
                    register={register('income', {
                        disabled: !isEmployed || isEmployed === '0',
                    })}
                />
                <FormError
                    isShow={isShowErrors && !income && isEmployed === '1'}
                >
                    소득수준을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="첫 출근 연도" />
                <Input
                    type="number"
                    placeholder="숫자 네자리 입력"
                    register={register('firstWorkYear', {
                        valueAsNumber: true,
                        required: true,
                    })}
                />
                <FormError
                    isShow={
                        isShowErrors &&
                        (!firstWorkYear ||
                            firstWorkYear < 1900 ||
                            firstWorkYear > 2022)
                    }
                >
                    첫 출근 연도를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={() => {
                    let isError = false;
                    if (!isEmployed) {
                        !isError && setFocus('isEmployed');
                        isError = true;
                    }
                    if (!job && isEmployed === '1') {
                        !isError && setFocus('job');
                        isError = true;
                    }
                    if (!income && isEmployed === '1') {
                        !isError && setFocus('income');
                        isError = true;
                    }
                    if (
                        !firstWorkYear ||
                        firstWorkYear < 1900 ||
                        firstWorkYear > 2022
                    ) {
                        !isError && setFocus('firstWorkYear');
                        isError = true;
                    }
                    if (isError) {
                        setIsShowErrors(true);
                        return;
                    }
                    setIsShowErrors(false);
                    handleClickNext();
                }}
                type="button"
            >
                다음
            </Button>
        </>,
        <>
            <QuestionContainer>
                <QuestionTitle text="좋아하는 술" />
                <SelectBox
                    register={register('favoriteAlcohol')}
                    options={favoriteAlcoholOptions}
                />
                <FormError isShow={isShowErrors && !favoriteAlcohol}>
                    좋아하는 술을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle
                    text={`주량 ${
                        favoriteAlcohol &&
                        '(' +
                            favoriteAlcoholOptions.filter(
                                (elem) => elem.value === favoriteAlcohol,
                            )[0].text +
                            ')'
                    }`}
                />
                <Input
                    type="number"
                    placeholder="숫자 입력 (병)"
                    register={register('alcoholPerOnce', {
                        valueAsNumber: true,
                        required: true,
                    })}
                />
                <FormError isShow={isShowErrors && !alcoholPerOnce}>
                    주량을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="음주 횟수 (1주)" />
                <Input
                    type="number"
                    placeholder="숫자 입력 (회)"
                    register={register('alcoholPerWeek', {
                        valueAsNumber: true,
                        required: true,
                    })}
                />
                <FormError isShow={isShowErrors && !alcoholPerWeek}>
                    음주 횟수를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={() => {
                    let isError = false;
                    if (!alcoholPerOnce) {
                        !isError && setFocus('alcoholPerOnce');
                        isError = true;
                    }
                    if (!alcoholPerWeek) {
                        !isError && setFocus('alcoholPerWeek');
                        isError = true;
                    }
                    if (!favoriteAlcohol) {
                        !isError && setFocus('favoriteAlcohol');
                        isError = true;
                    }
                    if (isError) {
                        setIsShowErrors(true);
                        return;
                    }
                    setIsShowErrors(false);
                    handleClickNext();
                }}
                type="button"
            >
                다음
            </Button>
        </>,
        <>
            <QuestionContainer>
                <QuestionTitle text="연애 횟수" />
                <Input
                    type="number"
                    placeholder="숫자 입력"
                    register={register('loveCount', {
                        valueAsNumber: true,
                        required: true,
                    })}
                />
                <FormError
                    isShow={
                        (isShowErrors && !loveCount && loveCount !== 0) ||
                        loveCount < 0
                    }
                >
                    연애 횟수를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer isDisabled={!loveCount || loveCount < 0}>
                <QuestionTitle text="현재 연애 여부 (기혼 포함)" />
                <YNRadioButton
                    width={isMobileSize ? '120px' : '150px'}
                    register={register('isInLove', {
                        disabled: !loveCount || loveCount < 0,
                    })}
                />
                <FormError isShow={isShowErrors && !isInLove && loveCount > 0}>
                    현재 연애 여부를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer isDisabled={!loveCount || loveCount < 0}>
                <QuestionTitle text="연애 대상" />
                <RadioButtons
                    items={[
                        { value: 'STRAIGHT', text: '이성' },
                        { value: 'HOMOSEXUAL', text: '동성' },
                        { value: 'BISEXUAL', text: '양성' },
                    ]}
                    itemWidth={isMobileSize ? '80px' : '100px'}
                    register={register('isLoveTarget', {
                        disabled: !loveCount || loveCount < 0,
                    })}
                />
                <FormError
                    isShow={isShowErrors && !isLoveTarget && loveCount > 0}
                >
                    연애 대상을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer isDisabled={!loveCount || loveCount < 0}>
                <QuestionTitle text="가장 긴 연애 기간" />
                <RadioButtons
                    items={[{ value: '0TO3MONTHS', text: '0 ~ 3 개월' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime', {
                        disabled: !loveCount || loveCount < 0,
                    })}
                />
                <RadioButtons
                    items={[{ value: '3TO6MONTHS', text: '3 ~ 6 개월' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime', {
                        disabled: !loveCount || loveCount < 0,
                    })}
                />
                <RadioButtons
                    items={[{ value: '6TO12MONTHS', text: '6 ~ 12 개월' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime', {
                        disabled: !loveCount || loveCount < 0,
                    })}
                />
                <RadioButtons
                    items={[{ value: '1TO3YEARS', text: '1 ~ 3 년' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime', {
                        disabled: !loveCount || loveCount < 0,
                    })}
                />
                <RadioButtons
                    items={[{ value: 'OVER3YEARS', text: '3년 이상' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime', {
                        disabled: !loveCount || loveCount < 0,
                    })}
                />
                <FormError
                    isShow={isShowErrors && !longestLoveTime && loveCount > 0}
                >
                    가장 긴 연애 기간을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="기혼 여부" />
                <YNRadioButton
                    width={isMobileSize ? '120px' : '150px'}
                    register={register('isMarried')}
                />
                <FormError isShow={isShowErrors && !isMarried}>
                    기혼여부를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={() => {
                    let isError = false;
                    if ((!loveCount && loveCount !== 0) || loveCount < 0) {
                        !isError && setFocus('loveCount');
                        isError = true;
                    }
                    if (!isInLove && loveCount > 0) {
                        !isError && setFocus('isInLove');
                        isError = true;
                    }
                    if (!isLoveTarget && loveCount > 0) {
                        !isError && setFocus('isLoveTarget');
                        isError = true;
                    }
                    if (!longestLoveTime && loveCount > 0) {
                        !isError && setFocus('longestLoveTime');
                        isError = true;
                    }
                    if (!isMarried) {
                        !isError && setFocus('isMarried');
                        isError = true;
                    }
                    if (isError) {
                        setIsShowErrors(true);
                        return;
                    }
                    setIsShowErrors(false);
                    handleClickNext();
                }}
                type="button"
            >
                다음
            </Button>
        </>,
        <>
            <QuestionContainer>
                <QuestionTitle text="거주형태" />
                <RadioButtons
                    items={[{ value: 'SINGLE', text: '싱글(1인 가구)' }]}
                    itemWidth="240px"
                    register={register('residenceType')}
                />
                <RadioButtons
                    items={[
                        { value: 'COUPLE', text: '커플' },
                        { value: 'FAMILY', text: '가족' },
                    ]}
                    itemWidth="120px"
                    register={register('residenceType')}
                />
                <FormError isShow={isShowErrors && !residenceType}>
                    거주형태를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="외동 여부" />
                <YNRadioButton
                    width="100px"
                    register={register('isOnlyChild')}
                />
                <FormError isShow={isShowErrors && !isOnlyChild}>
                    외동 여부를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer isDisabled={!isOnlyChild || isOnlyChild === '1'}>
                <QuestionTitle text="모든 형제" />
                <Input
                    type="number"
                    placeholder="숫자 입력 (명)"
                    register={register('allBrothers', {
                        valueAsNumber: true,
                    })}
                    disabled={!isOnlyChild || isOnlyChild === '1'}
                />
                <FormError
                    isShow={isShowErrors && !allBrothers && isOnlyChild === '0'}
                >
                    모든 형제 수를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer isDisabled={!isOnlyChild || isOnlyChild === '1'}>
                <QuestionTitle text="모든 자매" />
                <Input
                    type="number"
                    placeholder="숫자 입력 (명)"
                    register={register('allSisters', {
                        valueAsNumber: true,
                    })}
                    disabled={!isOnlyChild || isOnlyChild === '1'}
                />
                <FormError
                    isShow={isShowErrors && !allSisters && isOnlyChild === '0'}
                >
                    모든 자매 수를 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer isDisabled={!isOnlyChild || isOnlyChild === '1'}>
                <QuestionTitle text="형제자매 중 몇째" />
                <Input
                    type="number"
                    placeholder="숫자 입력 (째)"
                    register={register('myOrder', { valueAsNumber: true })}
                    disabled={!isOnlyChild || isOnlyChild === '1'}
                />
                <FormError
                    isShow={isShowErrors && !myOrder && isOnlyChild === '0'}
                >
                    형제자매 중 몇 째 인지 입력해주세요.
                </FormError>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="현재 거주 지역" />
                <SelectBox
                    register={register('currentAddress')}
                    options={[
                        // todo 서버쪽 enum 잘못됨
                        { value: '', text: '클릭하여 선택' },
                        { value: '02', text: '서울특별시' },
                        { value: '031', text: '경기도' },
                        { value: '032', text: '인천광역시' },
                        { value: '033', text: '강원도' },
                        { value: '041', text: '충청남도' },
                        { value: '042', text: '대전광역시' },
                        { value: '043', text: '충청북도' },
                        { value: '044', text: '세종특별자치시' },
                        { value: '051', text: '부산광역시' },
                        { value: '052', text: '울산광역시' },
                        { value: '053', text: '대구광역시' },
                        { value: '054', text: '경상북도' },
                        { value: '055', text: '경상남도' },
                        { value: '061', text: '전라남도' },
                        { value: '062', text: '광주광역시' },
                        { value: '063', text: '전라북도' },
                        { value: '064', text: '제주특별자치도' },
                    ]}
                />
                <FormError isShow={isShowErrors && !currentAddress}>
                    현재 거주 지역을 입력해주세요.
                </FormError>
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={() => {
                    let isError = false;
                    if (!residenceType) {
                        !isError && setFocus('residenceType');
                        isError = true;
                    }
                    if (!isOnlyChild) {
                        !isError && setFocus('isOnlyChild');
                        isError = true;
                    }
                    if (
                        !allBrothers &&
                        allBrothers != 0 &&
                        isOnlyChild === '0'
                    ) {
                        !isError && setFocus('allBrothers');
                        isError = true;
                    }
                    if (!allSisters && allSisters != 0 && isOnlyChild === '0') {
                        !isError && setFocus('allSisters');
                        isError = true;
                    }
                    if (!myOrder && isOnlyChild === '0') {
                        !isError && setFocus('myOrder');
                        isError = true;
                    }
                    if (!currentAddress) {
                        !isError && setFocus('currentAddress');
                        isError = true;
                    }
                    if (isError) {
                        setIsShowErrors(true);
                        return;
                    }
                    setIsShowErrors(false);
                    handleClickNext();
                }}
                type="button"
            >
                다음
            </Button>
        </>,
        <>
            <QuestionContainer>
                <QuestionTitle text="롤 포지션" />
                <RadioButtons
                    items={[
                        { value: 'TOP', text: '탑' },
                        { value: 'JUNGLE', text: '정글' },
                        { value: 'MIDDLE', text: '미드' },
                    ]}
                    itemWidth={isMobileSize ? '80px' : '100px'}
                    register={register('leagueOfLegendsPosition')}
                />
                <RadioButtons
                    items={[
                        { value: 'BOTTOM', text: '원딜' },
                        { value: 'SUPPORT', text: '서포터' },
                    ]}
                    itemWidth="100px"
                    register={register('leagueOfLegendsPosition')}
                />
                {/* <FormError isShow={isShowErrors && !leagueOfLegendsPosition}>
                    롤 포지션을 입력해주세요.
                </FormError> */}
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="롤 티어" />
                <RadioButtons
                    items={[
                        { value: 'CHALLENGER', text: '챌린져' },
                        { value: 'MASTER', text: '마스터' },
                        { value: 'DIAMOND', text: '다이아' },
                    ]}
                    itemWidth={isMobileSize ? '80px' : '100px'}
                    register={register('leagueOfLegendsTier')}
                />
                <RadioButtons
                    items={[
                        { value: 'PLATINUM', text: '플래티넘' },
                        { value: 'GOLD', text: '골드' },
                    ]}
                    itemWidth="120px"
                    register={register('leagueOfLegendsTier')}
                />
                <RadioButtons
                    items={[
                        { value: 'SILVER', text: '실버' },
                        { value: 'BRONZE', text: '브론즈' },
                        { value: 'IRON', text: '아이언' },
                    ]}
                    itemWidth={isMobileSize ? '80px' : '100px'}
                    register={register('leagueOfLegendsTier')}
                />
                {/* <FormError isShow={isShowErrors && !leagueOfLegendsTier}>
                    롤 티어를 입력해주세요.
                </FormError> */}
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="스타크래프트 종족" />
                <RadioButtons
                    items={[
                        { value: 'TERRAN', text: '테란' },
                        { value: 'PROTOSS', text: '프로토스' },
                        { value: 'ZERG', text: '저그' },
                    ]}
                    itemWidth="120px"
                    register={register('starcraftRace')}
                />
                {/* <FormError isShow={isShowErrors && !starcraftRace}>
                    스타크래프트 종족을 입력해주세요.
                </FormError> */}
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="선호 MBTI" />
                <SelectBox
                    register={register('favoriteMbti')}
                    options={[
                        { value: '', text: '클릭하여 선택' },
                        { value: 'INFP', text: 'INFP' },
                        { value: 'INFJ', text: 'INFJ' },
                        { value: 'INTP', text: 'INTP' },
                        { value: 'INTJ', text: 'INTJ' },
                        { value: 'ISFP', text: 'ISFP' },
                        { value: 'ISFJ', text: 'ISFJ' },
                        { value: 'ISTP', text: 'ISTP' },
                        { value: 'ISTJ', text: 'ISTJ' },
                        { value: 'ESFP', text: 'ESFP' },
                        { value: 'ESFJ', text: 'ESFJ' },
                        { value: 'ESTP', text: 'ESTP' },
                        { value: 'ESTJ', text: 'ESTJ' },
                        { value: 'ENFP', text: 'ENFP' },
                        { value: 'ENFJ', text: 'ENFJ' },
                        { value: 'ENTP', text: 'ENTP' },
                        { value: 'ENTJ', text: 'ENTJ' },
                    ]}
                />
                {/* <FormError isShow={isShowErrors && !favoriteMbti}>
                    선호 MBTI 유형을 입력해주세요.
                </FormError> */}
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={handleSubmit((data) => {
                    // let isError = false;
                    // if (!leagueOfLegendsPosition) {
                    //     !isError && setFocus('leagueOfLegendsPosition');
                    //     isError = true;
                    // }
                    // if (!leagueOfLegendsTier) {
                    //     !isError && setFocus('leagueOfLegendsTier');
                    //     isError = true;
                    // }
                    // if (!starcraftRace) {
                    //     !isError && setFocus('starcraftRace');
                    //     isError = true;
                    // }
                    // if (!favoriteMbti) {
                    //     !isError && setFocus('favoriteMbti');
                    //     isError = true;
                    // }
                    // if (isError) {
                    //     setIsShowErrors(true);
                    //     return;
                    // }
                    setIsShowErrors(false);
                    onSubmit(data);
                })}
            >
                제출
            </Button>
        </>,
    ];

    return (
        <FormContainer>
            {surveySlide.map((elem, idx) => {
                return (
                    <div
                        key={idx}
                        css={css`
                            display: ${idx === currentSurveyStep
                                ? 'flex'
                                : 'none'};
                            flex-direction: column;
                            padding: 140px 0;
                            ${isMobile} {
                                width: 100%;
                                align-items: center;
                                padding: 100px 0;
                            }
                        `}
                    >
                        {elem}
                    </div>
                );
            })}
        </FormContainer>
    );
};

const FormContainer = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const QuestionContainer = function ({
    children,
    isDisabled = false,
}: {
    children: React.ReactNode;
    isDisabled?: boolean;
}) {
    return (
        <div
            css={css`
                width: 100%;
                display: flex;
                opacity: ${isDisabled ? '0.3' : 'none'};
                flex-direction: column;
                margin-bottom: 80px;
                ${isMobile} {
                    padding: 0 20px;
                }
            `}
        >
            {children}
        </div>
    );
};

const QuestionTitle = function ({ text }: { text: string }) {
    return (
        <h2
            css={css`
                margin-bottom: 7px;
            `}
        >
            {text}
        </h2>
    );
};

const FormError = function ({
    children,
    isShow,
}: {
    children: string;
    isShow: boolean;
}) {
    return isShow ? (
        <span
            css={css`
                width: 100%;
                color: yellow;
                margin-top: 10px;
            `}
        >
            {children}
        </span>
    ) : (
        <></>
    );
};

export default SurveyPresenter;
