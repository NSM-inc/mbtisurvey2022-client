import styled from '@emotion/styled';
import React from 'react';

interface ContentsContainerProps {
    children: React.ReactNode;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Template = ({
    children,
    ...containerStyle
}: ContentsContainerProps & React.CSSProperties) => {
    return <Container style={{ ...containerStyle }} />;
};

export default Template;
