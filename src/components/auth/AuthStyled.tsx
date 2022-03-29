import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { isMobile } from '../../assets/consts/mediaQuery';

const fadeIn = keyframes`
   0% { opacity: 0; }
   100% { opacity: 1; }
`;

export const Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;

    @media only screen and (max-width: 1000px) {
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
    }
`;

export const Title = styled.div`
    margin-bottom: 32px;
    font-size: 40px;
    font-weight: 400;
    line-height: 1.5;

    ${isMobile} {
        font-size: 28px;
    }
`;

export const InputBox = styled.div`
    max-width: 440px;

    > div {
        margin-bottom: 32px;
        animation: ${fadeIn} 1s linear;
    }
`;

export const TimerContainer = styled.div`
    @media only screen and (min-width: 1000px) {
        position: absolute;
        top: 0;
        right: -40px;
    }

    @media only screen and (max-width: 1000px) {
        position: relative;
        width: 100%;
        height: 190px;

        > div {
            position: absolute;
            top: 0;
            right: -40px;
        }

        > button {
            position: absolute;
            bottom: 0;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            text-align: center;
        }
    }
`;
