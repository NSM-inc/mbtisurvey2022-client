import { ContentsContainer, Footer, Header } from '.';

interface LayoutProps {
    children: React.ReactNode;
    showHeader?: Boolean;
    showFooter?: Boolean;
    showNav?: Boolean;
}

const Layout = ({
    children,
    showHeader = true,
    showFooter = true,
    showNav = true,
}: LayoutProps) => {
    return (
        <div>
            {showHeader && <Header />}
            <ContentsContainer showHeader={showHeader} showFooter={showFooter}>
                {children}
            </ContentsContainer>
            {showFooter && <Footer />}
        </div>
    );
};

export default Layout;
