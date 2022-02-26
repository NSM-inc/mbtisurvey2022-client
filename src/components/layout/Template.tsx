import styled from '@emotion/styled';
import React from 'react';

interface ContentsContainerProps {
    children: React.ReactNode;
    boxStyle?: React.CSSProperties;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    max-width: 1000px;
`;

const Template = ({
    children,
    boxStyle,
    ...containerStyle
}: ContentsContainerProps & React.CSSProperties) => {
    return (
        <Container style={{ ...containerStyle }}>
            <Box style={{ ...boxStyle }}>{children}</Box>
        </Container>
    );
};

export default Template;
