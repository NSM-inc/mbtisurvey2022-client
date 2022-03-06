import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import COLOR from '../../assets/consts/color';

import { isDesktop, isMobile, isTablet } from '../../assets/consts/mediaQuery';

export const Contianer = styled.div`
    background: ${COLOR.DARKGRAY};
    color: ${COLOR.WHITE};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    ${isMobile} {
        height: initial;
    }
`;

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 96px;
    font-size: 18px;

    ${isMobile} {
        width: 100%;
        padding: 24px;
        z-index: 2;
    }
`;

export const Types = styled.div`
    width: 50%;
    height: 536px;
    border-left: 1px solid ${COLOR.WHITE};
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 70px;

    ${isMobile} {
        display: none;
    }
`;

export const Title = styled.div`
    font-family: Montserrat;
    font-weight: 300;
    text-align: left;
    margin: 0 0 16px -23px;

    ${isDesktop} {
        font-size: 200px;
        height: 200px;
    }

    ${isTablet} {
        font-size: 77px;
        height: 77px;
        margin-left: -9px;
    }

    ${isMobile} {
        font-size: 100px;
        height: 122px;
        margin-left: -9px;
        margin-bottom: 0px;
    }
`;

export const SubTitle = styled.div`
    font-family: Montserrat;
    font-weight: 700;
    margin: 4px 0 40px;

    ${isDesktop} {
        font-size: 60px;
    }
`;

export const Intro = styled.div`
    line-height: 28px;
    margin-bottom: 34px;
    width: 100%;
    max-width: 600px;

    ${isMobile} {
        font-size: 14px;
        line-height: 24px;
    }
`;

export const TypesBox = styled.div`
    font-weight: 200;
    font-size: 40px;

    color: ${COLOR.WHITE50};

    > div {
        line-height: 50px;
        font-family: Montserrat;
    }
`;

export const Highlight = styled.span`
    font-weight: 300;
`;

export const Display = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: hidden;

    ${isMobile} {
        width: 100%;
        left: 0;
    }
`;

const getRandomNum = (num: number) => {
    num = Math.floor(Math.random() * 100) - 100;
    return `${num}px`;
};

const upAndDown = (top: number, left: number) => keyframes`
   0% { transform: translate3d(top, left, 0); }
   20% { transform: translate3d(${getRandomNum(top)}, ${getRandomNum(
    left,
)}, 0); }
   40% { transform: translate3d(${getRandomNum(top)}, ${getRandomNum(
    left,
)}, 0); }
   60% { transform: translate3d(${getRandomNum(top)}, ${getRandomNum(
    left,
)}, 0); }
   80% { transform: translate3d(${getRandomNum(top)}, ${getRandomNum(
    left,
)}, 0); }
   100% { transform: translate3d(top, left, 0); }
`;

export const Circle = styled.div<{
    size: number;
    startColor: string;
    endColor: string;
    direction?: string;
    shadow: string;
    top: number;
    left: number;
}>`
    ${({ size }) => size && `width: ${size}px;`}
    ${({ size }) => size && `height: ${size}px;`}
    ${({ top }) => top && `top: ${top}%;`}
    ${({ left }) => left && `left: ${left}%;`}
    ${({ top, left }) =>
        top &&
        left &&
        css`
            animation: ${upAndDown(top, left)} 15s linear infinite;
        `}
    ${({ shadow }) => shadow && `box-shadow: ${shadow};`}
    ${({ startColor, endColor, direction }) =>
        startColor &&
        endColor &&
        `background: linear-gradient(${
            direction ? `${direction},` : ''
        } ${startColor}, ${endColor});`}
   
    border-radius: 100%;
    position: absolute;
    animation-direction: alternate;
`;
