import styled from '@emotion/styled';
import { Image } from '../common';
import { ArrowHeader } from '../../assets/icons';
import {
    CurrentSurveyStepState,
    IsShowProcessPercentState,
} from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { isMobile } from '../../assets/consts/mediaQuery';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    font-size: 28px;
    width: 100%;
    height: 96px;
    background: transparent;
    pointer-events: none;
`;

const Header = () => {
    const currentSurveyStep = useRecoilValue(CurrentSurveyStepState);
    const isShowProcessPercent = useRecoilValue(IsShowProcessPercentState);

    return (
        <Container>
            <Image src={ArrowHeader} width="136px" height="32px" alt="arrow" />
            {isShowProcessPercent && (
                <span>
                    {((Number(currentSurveyStep) / 6) * 100).toFixed(0)}%
                </span>
            )}
        </Container>
    );
};

export default Header;
