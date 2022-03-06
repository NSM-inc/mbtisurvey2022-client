/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import styled from '@emotion/styled';
import Flex from '../common/Flex';
import Input from '../common/Input';
import RadioButton from '../common/RadioButton';
import SelectBox from '../common/SelectBox';

import { Color, ColorResult, SliderPicker } from 'react-color';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    CurrentSurveyStepState,
    IsShowProcessPercentState,
} from '../../recoil/atoms';
import COLOR from '../../assets/consts/color';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import SurveyReqBodyDto from '../../models/SurveyReqBodyDto';
import UsersDto from '../../models/SurveyReqBodyDto/UsersDto';
import AlcoholDto from '../../models/SurveyReqBodyDto/AlcoholDto';
import CommonDto from '../../models/SurveyReqBodyDto/CommonDto';
import LoveDto from '../../models/SurveyReqBodyDto/LoveDto';
import EtcDto from '../../models/SurveyReqBodyDto/EtcDto';
import ResidenceDto from '../../models/SurveyReqBodyDto/ResidenceDto';
import WorkDto from '../../models/SurveyReqBodyDto/WorkDto';
import api from '../../util/api';
import { isMobile } from '../../assets/consts/mediaQuery';
import { useWindowSize } from '../../util/useWindowSize';

// interface SurveyPresenterProps {}

const SurveyPresenter = function () {
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
    const [surveyData, setSurveyData] = useState<SurveyReqBodyDto>();

    const { register, handleSubmit, setValue, watch } = useForm<
        AlcoholDto &
            CommonDto &
            EtcDto &
            LoveDto &
            ResidenceDto &
            UsersDto &
            WorkDto
    >();

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

    const handleFinalSubmit = async function () {
        try {
            await api({
                method: 'post',
                url: '/survey',
                data: surveyData,
            });
        } catch {}
    };

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
                    )
                        return;
                    setValue(
                        'mbti',
                        `${mbti.ei}${mbti.ns}${mbti.ft}${mbti.pj}`,
                    );
                    handleClickNext();
                }}
                type="submit"
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
                        { value: 'male', text: '남성' },
                        { value: 'female', text: '여성' },
                        { value: 'mtf', text: 'MTF' },
                    ]}
                    itemWidth={isMobileSize ? '80px' : '100px'}
                    register={register('gender')}
                />
                <RadioButtons
                    items={[
                        { value: 'ftm', text: 'FTM' },
                        { value: 'etc', text: '기타' },
                    ]}
                    itemWidth="100px"
                    register={register('gender')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="태어난 해" />
                <Input
                    type="number"
                    placeholder="1995 (4자리 입력)"
                    register={register('birth')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="취미/특기" />
                <SelectBox register={register('hobby')}>
                    <option value="">클릭하여 선택</option>
                    <option value="police">기타</option>
                </SelectBox>
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={handleClickNext}
            >
                다음
            </Button>
        </>,
        <>
            <QuestionContainer>
                <QuestionTitle text="사용하는 스마트폰" />
                <RadioButtons
                    items={[
                        { value: 'android', text: '안드로이드' },
                        { value: 'ios', text: 'iOS' },
                    ]}
                    itemWidth={isMobileSize ? '120px' : '150px'}
                    register={register('smartphoneOS')}
                />
                <RadioButtons
                    items={[{ value: 'etc', text: '기타' }]}
                    itemWidth={isMobileSize ? '120px' : '150px'}
                    register={register('smartphoneOS')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="정치성향" />
                <RadioButtons
                    items={[
                        { value: 'bosu', text: '보수' },
                        { value: 'jinbo', text: '진보' },
                    ]}
                    itemWidth={isMobileSize ? '120px' : '150px'}
                    register={register('politics')}
                />
                <RadioButtons
                    items={[
                        { value: 'mid', text: '중도' },
                        { value: 'no', text: '관심없음' },
                    ]}
                    itemWidth={isMobileSize ? '120px' : '150px'}
                    register={register('politics')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="종교" />
                <SelectBox register={register('religion')}>
                    <option value="">클릭하여 선택</option>
                    <option value="jesus">기독교</option>
                </SelectBox>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="좋아하는 색상" />
                <div
                    css={css`
                        margin-top: 10px;
                    `}
                >
                    <SliderPicker
                        color={favoriteColor}
                        onChangeComplete={handleFavoriteColorChange}
                    />
                </div>
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={handleClickNext}
            >
                다음
            </Button>
        </>,
        <>
            <QuestionContainer>
                <QuestionTitle text="주량" />
                <Input
                    type="number"
                    placeholder="숫자 입력 (회)"
                    register={register('alcoholPerOnce')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="음주 횟수 (1주)" />
                <Input
                    type="number"
                    placeholder="숫자 입력 (회)"
                    register={register('alcoholPerWeek')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="좋아하는 술" />
                <SelectBox register={register('favoriteAlcohol')}>
                    <option value="">클릭하여 선택</option>
                    <option value="soju">소주</option>
                    <option value="beer">맥주</option>
                    <option value="wine">와인</option>
                    <option value="mak">막걸리</option>
                    <option value="bodka">보드카</option>
                    <option value="cock">칵테일</option>
                    <option value="etc">기타</option>
                </SelectBox>
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={handleClickNext}
            >
                다음
            </Button>
        </>,
        <>
            <QuestionContainer>
                <QuestionTitle text="현재 재직 여부" />
                <RadioButtons
                    items={[
                        { value: 'yes', text: '예' },
                        { value: 'no', text: '아니오' },
                    ]}
                    itemWidth={isMobileSize ? '120px' : '150px'}
                    register={register('isEmployed')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="직종" />
                <SelectBox register={register('job')}>
                    <option value="">클릭하여 선택</option>
                    <option value="soju">소주</option>
                    <option value="beer">맥주</option>
                    <option value="wine">와인</option>
                    <option value="mak">막걸리</option>
                    <option value="bodka">보드카</option>
                    <option value="cock">칵테일</option>
                    <option value="etc">기타</option>
                </SelectBox>
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="소득 수준 (단위:원)" />
                <RadioButtons
                    items={[{ value: 'yes', text: '2천만 ~ 3천만' }]}
                    itemWidth="200px"
                    register={register('income')}
                />
                <RadioButtons
                    items={[{ value: 'yes', text: '3천만 ~ 4천만' }]}
                    itemWidth="200px"
                    register={register('income')}
                />
                <RadioButtons
                    items={[{ value: 'yes', text: '4천만 ~ 6천만' }]}
                    itemWidth="200px"
                    register={register('income')}
                />
                <RadioButtons
                    items={[{ value: 'yes', text: '6천만 ~ 8천만' }]}
                    itemWidth="200px"
                    register={register('income')}
                />
                <RadioButtons
                    items={[{ value: 'yes', text: '8천만 ~ 1억' }]}
                    itemWidth="200px"
                    register={register('income')}
                />
                <RadioButtons
                    items={[{ value: 'yes', text: '1억 이상' }]}
                    itemWidth="200px"
                    register={register('income')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="첫 출근 연도" />
                <Input
                    type="number"
                    placeholder="숫자 네자리 입력"
                    register={register('firstWorkYear')}
                />
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={handleClickNext}
            >
                다음
            </Button>
        </>,
        <>
            <QuestionContainer>
                <QuestionTitle text="연애 횟수" />
                <Input type="number" placeholder="숫자 입력" />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="연애 대상" />
                <RadioButtons
                    items={[
                        { value: 'other', text: '이성' },
                        { value: 'same', text: '동성' },
                        { value: 'both', text: '양성' },
                    ]}
                    itemWidth={isMobileSize ? '80px' : '100px'}
                    register={register('isLoveTarget')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="현재 연애 여부 (기혼 포함)" />
                <RadioButtons
                    items={[
                        { value: 'yes', text: '예' },
                        { value: 'no', text: '아니오' },
                    ]}
                    itemWidth="100px"
                    register={register('isInLove')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="기혼 여부" />
                <RadioButtons
                    items={[
                        { value: 'yes', text: '예' },
                        { value: 'no', text: '아니오' },
                    ]}
                    itemWidth="100px"
                    register={register('isMarried')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="가장 긴 연애 기간" />
                <RadioButtons
                    items={[{ value: '1', text: '0 ~ 3 개월' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime')}
                />
                <RadioButtons
                    items={[{ value: '2', text: '3 ~ 6 개월' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime')}
                />
                <RadioButtons
                    items={[{ value: '3', text: '6 ~ 12 개월' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime')}
                />
                <RadioButtons
                    items={[{ value: '4', text: '1 ~ 3 년' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime')}
                />
                <RadioButtons
                    items={[{ value: '5', text: '3년 이상' }]}
                    itemWidth="200px"
                    register={register('longestLoveTime')}
                />
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={handleClickNext}
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
                하려면 하고
                <br />
                말려면 마세요 ㅋ
            </h1>
            <QuestionContainer>
                <QuestionTitle text="롤 포지션" />
                <RadioButtons
                    items={[
                        { value: 'top', text: '탑' },
                        { value: 'jug', text: '정글' },
                        { value: 'mid', text: '미드' },
                    ]}
                    itemWidth={isMobileSize ? '80px' : '100px'}
                    register={register('leagueOfLegendsPosition')}
                />
                <RadioButtons
                    items={[
                        { value: 'adc', text: '원딜' },
                        { value: 'sup', text: '서포터' },
                    ]}
                    itemWidth="100px"
                    register={register('leagueOfLegendsPosition')}
                />
            </QuestionContainer>
            <QuestionContainer>
                <QuestionTitle text="선호 MBTI" />
                <SelectBox register={register('favoriteMbti')}>
                    <option value="">클릭하여 선택</option>
                    <option value="infp">INFP</option>
                    <option value="infj">INFJ</option>
                    <option value="intp">INTP</option>
                    <option value="intj">INTJ</option>
                    <option value="isfp">ISFP</option>
                    <option value="isfj">ISFJ</option>
                    <option value="istp">ISTP</option>
                    <option value="istj">ISTJ</option>
                    <option value="esfp">ESFP</option>
                    <option value="esfj">ESFJ</option>
                    <option value="estp">ESTP</option>
                    <option value="estj">ESTJ</option>
                    <option value="enfp">ENFP</option>
                    <option value="enfj">ENFJ</option>
                    <option value="entp">ENTP</option>
                    <option value="entj">ENTJ</option>
                </SelectBox>
            </QuestionContainer>
            <Button
                css={css`
                    margin-top: 100px;
                    ${isMobile} {
                        margin-top: 30px;
                    }
                `}
                onClick={handleFinalSubmit}
            >
                제출
            </Button>
        </>,
    ];

    return (
        <FormContainer
            onSubmit={handleSubmit((data) => {
                // users
                const { token, id, mbti, phone }: UsersDto = data;
                // common
                const {
                    gender,
                    birth,
                    personalColor,
                    hobby,
                    smartphoneOS,
                    politics,
                    religion,
                }: CommonDto = data;
                // etc
                const {
                    leagueOfLegendsPosition,
                    leagueOfLegendsTier,
                    starcraftRace,
                    favoriteMbti,
                }: EtcDto = data;
                // love
                const {
                    loveCount,
                    isLoveTarget,
                    isInLove,
                    isMarried,
                    longestLoveTime,
                }: LoveDto = data;
                // residence
                const {
                    residenceType,
                    isOnlyChild,
                    allBrothers,
                    allSisters,
                    myOrder,
                    currentAddress,
                }: ResidenceDto = data;
                // alcohol
                const {
                    alcoholPerOnce,
                    alcoholPerWeek,
                    favoriteAlcohol,
                }: AlcoholDto = data;
                // work
                const { isEmployed, job, income, firstWorkYear }: WorkDto =
                    data;

                setSurveyData({
                    users: {
                        token,
                        id,
                        mbti,
                        phone,
                    },
                    common: {
                        gender,
                        birth,
                        personalColor,
                        hobby,
                        smartphoneOS,
                        politics,
                        religion,
                    },
                    love: {
                        loveCount,
                        isLoveTarget,
                        isInLove,
                        isMarried,
                        longestLoveTime,
                    },
                    residence: {
                        residenceType,
                        isOnlyChild,
                        allBrothers,
                        allSisters,
                        myOrder,
                        currentAddress,
                    },
                    work: {
                        isEmployed,
                        job,
                        income,
                        firstWorkYear,
                    },
                    alcohol: {
                        alcoholPerOnce,
                        alcoholPerWeek,
                        favoriteAlcohol,
                    },
                    etc: {
                        leagueOfLegendsPosition,
                        leagueOfLegendsTier,
                        starcraftRace,
                        favoriteMbti,
                    },
                });
            })}
        >
            {surveySlide.map((elem, idx) => {
                return (
                    <div
                        key={idx}
                        css={css`
                            display: ${idx === currentSurveyStep
                                ? 'flex'
                                : 'none'};
                            flex-direction: column;
                            ${isMobile} {
                                align-items: center;
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

const RadioButtons = function ({
    items,
    itemWidth,
    register,
}: {
    items: { value: string; text: string }[];
    itemWidth: string;
    register?: UseFormRegisterReturn;
}) {
    return (
        <div
            css={css`
                margin: 10px 0;
                :last-child {
                    margin-bottom: 0;
                }
            `}
        >
            <Flex>
                {items.map((elem) => (
                    <Item
                        key={elem.value}
                        css={css`
                            width: ${itemWidth};
                        `}
                    >
                        <RadioButton value={elem.value} register={register}>
                            {elem.text}
                        </RadioButton>
                    </Item>
                ))}
            </Flex>
        </div>
    );
};

const FormContainer = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Item = styled.div`
    :not(:last-child) {
        margin-right: 20px;
    }
    ${isMobile} {
        margin-right: 10px;
    }
`;

const QuestionContainer = function ({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            css={css`
                width: 100%;
                display: flex;
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

export default SurveyPresenter;
