import styled from '@emotion/styled';
import COLOR from '../../assets/consts/color';
import { isMobile } from '../../assets/consts/mediaQuery';

const Button = styled.button`
    width: 300px;
    height: 82px;
    background: ${COLOR.WHITE05};
    border: 2px solid ${COLOR.WHITE};
    border-radius: 321px;
    font-size: 28px;
    font-weight: normal;
    color: ${COLOR.WHITE};
    cursor: pointer;

    ${isMobile} {
        width: 200px;
        height: 54px;
        font-size: 20px;
    }
`;

export default Button;
