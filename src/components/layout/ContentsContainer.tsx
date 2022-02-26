import styled from '@emotion/styled';
import React from 'react';
import COLOR from '../../assets/consts/color';

interface ContentsContainerProps {
    children: React.ReactNode;
    showHeader: Boolean;
    showFooter: Boolean;
}

const Container = styled.div<{ showHeader: Boolean; showFooter: Boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${COLOR.DARKGRAY};
    ${({ showHeader, showFooter }) =>
        showHeader
            ? showFooter
                ? `height: calc(100vh - 206px);`
                : `height: calc(100vh - 96px);`
            : showFooter
            ? `height: calc(100vh - 110px);`
            : 'height: 100vh;'};
`;

const Box = styled.div`
    max-width: 1440px;
`;

const ContentsContainer = ({
    children,
    showHeader,
    showFooter,
}: ContentsContainerProps) => {
    return (
        <Container showHeader={showHeader} showFooter={showFooter}>
            {children}
        </Container>
    );
};

export default ContentsContainer;
