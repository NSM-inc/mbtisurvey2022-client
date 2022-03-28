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

    > a {
        font-size: 20px;
    }
`;

const Footer = () => {
    return (
        <>
            <Container>
                <Image src={Logo} width="100px" height="50px" alt="Team NSM" />
                <Link href="/term">
                    <a target="_blank" rel="noopener noreferrer">
                        개인정보 처리방침
                    </a>
                </Link>
            </Container>
        </>
    );
};

export default Footer;
