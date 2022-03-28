import styled from '@emotion/styled';
import React from 'react';

interface ContentsContainerProps {
    children: React.ReactNode;
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 206px);
`;

const Template = ({
    children,
    ...containerStyle
}: ContentsContainerProps & React.CSSProperties) => {
    return <Container style={{ ...containerStyle }}>{children}</Container>;
};

export default Template;
