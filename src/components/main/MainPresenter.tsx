/** @jsxImportSource @emotion/react */
import COLOR from '../../assets/consts/color';
import { useRouter } from 'next/router';
import { Button, Image } from '../common';
import {
    Circle,
    Container,
    Description,
    Display,
    Highlight,
    Intro,
    SubTitle,
    Title,
    Types,
    TypesBox,
} from './MainStyled';
import { ArrowHeader } from '../../assets/icons';
import { useWindowSize } from '../../util/useWindowSize';
import { css } from '@emotion/react';
import { isMobile } from '../../assets/consts/mediaQuery';

const MainPresenter = () => {
    const router = useRouter();
    const { width } = useWindowSize();
    const isMobileSize = (width || 0) < 480;

    return (
        <Container>
            <Description>
                <Title>MBTI</Title>
                <div
                    css={{
                        border: `2px solid ${COLOR.WHITE}`,
                        maxWidth: '465px',
                        width: '100%',
                    }}
                />
                <SubTitle>SURVEY 2022</SubTitle>
                <Intro>
                    <div>
                        반갑습니다, MBTI 서베이에 오신 여러분들을 진심으로
                        환영합니다.
                    </div>
                    <br />
                    <div>
                        MBTI에 대한 다양한 정보들이 돌아다니는 현재, 아직도
                        우리는 너무 오래되거나 값이 정확하지 않는 통계 자료를
                        기반으로 이야기를 풀어 나가고 있습니다.
                    </div>
                    <br />
                    <div>
                        이제, 여러분들의 힘을 모아 진실한 이야기를 만들어주세요.
                        이 서베이를 통해 중복이 없는 최신의 통계 자료를 만들어
                        봅시다!
                    </div>
                    {isMobileSize && (
                        <div
                            css={css`
                                margin-top: 38px;
                            `}
                        >
                            <Image
                                src={ArrowHeader}
                                width="92px"
                                height="22px"
                                alt="arrow"
                            />
                        </div>
                    )}
                </Intro>
                <Button
                    css={css`
                        ${isMobile} {
                            margin: 0 auto;
                        }
                    `}
                    onClick={() => router.push('/auth')}
                >
                    시작합니다!
                </Button>
            </Description>
            <Types>
                <TypesBox>
                    <div css={{ color: COLOR.WHITE }}>
                        <Highlight>E</Highlight>xtraversion
                    </div>
                    <div>
                        <Highlight>I</Highlight>ntroversion
                    </div>
                    <div>
                        <Highlight>S</Highlight>ensing
                    </div>
                    <div css={{ color: COLOR.WHITE }}>
                        i<Highlight>N</Highlight>tuition
                    </div>
                    <div>
                        <Highlight>T</Highlight>hinking
                    </div>
                    <div css={{ color: COLOR.WHITE }}>
                        <Highlight>F</Highlight>eeling
                    </div>
                    <div css={{ color: COLOR.WHITE }}>
                        <Highlight>J</Highlight>udging
                    </div>
                    <div>
                        <Highlight>P</Highlight>erceiving
                    </div>
                </TypesBox>
                <div
                    onClick={() => router.push('/auth')}
                    css={{ cursor: 'pointer' }}
                >
                    <Image
                        src={ArrowHeader}
                        width="136px"
                        height="32px"
                        alt="arrow"
                    />
                </div>
            </Types>
            <Display>
                <div
                    css={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Circle
                        size={isMobileSize ? 111 : 190}
                        top={15}
                        left={20}
                        shadow={`0px 0px 60px 0px ${COLOR.REDSHADOW80}`}
                        startColor={COLOR.RED}
                        endColor={COLOR.DEEPYELLOW}
                    />
                    <Circle
                        size={isMobileSize ? 194 : 332}
                        top={20}
                        left={50}
                        shadow={`0px 0px 80px 0px ${COLOR.GREENSHADOW80}`}
                        startColor={COLOR.LIGHTGREEN}
                        endColor={COLOR.BLUEGREEN}
                    />
                    <Circle
                        size={isMobileSize ? 180 : 300}
                        top={45}
                        left={65}
                        shadow={`0px 0px 80px 0px ${COLOR.PURPLESHADOW}`}
                        direction="to bottom right"
                        startColor={COLOR.DARKPURPLE}
                        endColor={COLOR.PURPLE}
                    />
                    <Circle
                        size={isMobileSize ? 113 : 194}
                        top={60}
                        left={30}
                        shadow={`0px 0px 50px 0px ${COLOR.BLUESHADOW80}`}
                        direction="to bottom left"
                        startColor={COLOR.SKYBLUE}
                        endColor={COLOR.BLUE}
                    />
                </div>
            </Display>
        </Container>
    );
};

export default MainPresenter;
