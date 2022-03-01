import styled from '@emotion/styled';

export const Title = styled.div`
    width: 440px;
    margin-bottom: 32px;
    font-size: 40px;
    font-weight: 400;

    > div {
        line-height: 48px;
    }
`;

export const InputBox = styled.div`
    width: 440px;

    > div {
        margin-bottom: 32px;
    }
`;

export const InputContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const Time = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    flex: 1;
    height: 326px;

    > div {
        position: absolute;
        height: 100%;
        right: -10px;
        width: 500px;
        white-space: nowrap;
        overflow: hidden;
    }
`;