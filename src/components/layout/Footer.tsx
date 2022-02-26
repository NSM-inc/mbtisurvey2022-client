import styled from '@emotion/styled';
import { Logo } from '../../assets/icons';
import Image from '../common/Image';

const Container = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    background: transparent;
    padding: 32px;
    font-size: 28px;
    width: 100%;
    height: 110px;
    position: fixed;
    bottom: 0;
`;

const Footer = () => {
    return (
        <Container>
            <Image src={Logo} width="100px" height="50px" alt="Team NSM" />
        </Container>
    );
};

export default Footer;
