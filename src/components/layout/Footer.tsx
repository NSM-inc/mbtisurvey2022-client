import styled from '@emotion/styled';
import Link from 'next/link';
import { Logo } from '../../assets/icons';
import Image from '../common/Image';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    padding: 32px;
    font-size: 28px;
    width: 100%;
    height: 110px;

    > div:last-child {
        height: 50px;
        display: flex;
        align-items: flex-end;
        padding-bottom: 8px;
        font-size: 12px;
    }
`;

const Footer = () => {
    return (
        <>
            <Container>
                <Image src={Logo} width="100px" height="50px" alt="Team NSM" />
                <div>
                    <Link href="https://road-pewter-480.notion.site/bae625b6c3784d638606ec22812dfe01">
                        <a target="_blank" rel="noopener noreferrer">
                            개인정보 처리방침
                        </a>
                    </Link>
                </div>
            </Container>
        </>
    );
};

export default Footer;
