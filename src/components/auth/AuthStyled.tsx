import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { isDesktop, isMobile } from '../../assets/consts/mediaQuery';

export const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 32px;
`;

const fadeIn = keyframes`
   0% { opacity: 0; }
   100% { opacity: 1; }
`;

export const Title = styled.div`
    width: 100%;
    max-width: 440px;
    margin-bottom: 32px;
    font-size: 40px;
    font-weight: 400;

    > div {
        line-height: 48px;
    }

    ${isMobile} {
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 28px;
    }
`;

export const InputBox = styled.div`
    width: 100%;
    max-width: 440px;

    > div {
        margin-bottom: 32px;
        ${isMobile} {
            margin-bottom: 10px;
        }
        animation: ${fadeIn} 1s linear;
    }
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Time = styled.div`
    ${isDesktop} {
        position: absolute;
        top: 0;
        right: -30px;
    }

    display: flex;
    justify-content: flex-end;

    > div {
        white-space: nowrap;
        overflow: hidden;
    }
`;
