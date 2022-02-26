import styled from '@emotion/styled';
import { Footer, Header } from '.';
import COLOR from '../../assets/consts/color';

interface LayoutProps {
    children: React.ReactNode;
    showHeader?: Boolean;
    showFooter?: Boolean;
    showNav?: Boolean;
}

const Container = styled.div`
    background: ${COLOR.DARKGRAY};
    color: ${COLOR.WHITE};
`;

const Layout = ({
    children,
    showHeader = true,
    showFooter = true,
    showNav = true,
}: LayoutProps) => {
    return (
        <Container>
            {showHeader && <Header />}
            {children}
            {showFooter && <Footer />}
        </Container>
    );
};

export default Layout;
