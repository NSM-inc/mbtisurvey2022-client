/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { isDesktop, isMobile, isTablet } from '../../assets/consts/mediaQuery';

interface StopWatchProps {
    // 시작
    isActive: boolean;
    // 시간
    seconds: number;
    // 재시작 횟수
    retryCount: number;
}

const Clock = styled('div')`
    font-family: Montserrat;
    font-weight: 300;

    ${isDesktop} {
        font-size: 200px;
    }
    ${isTablet} {
        font-size: 140px;
    }
    ${isMobile} {
        font-size: 100px;
    }
`;

const Timer = ({ isActive, seconds, retryCount }: StopWatchProps) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        setTime(seconds);
    }, [retryCount]);

    useEffect(() => {
        if (isActive) {
            if (time > 0) {
                const tick = setTimeout(() => {
                    setTime((prev) => prev - 1);
                }, 1000);

                return () => clearInterval(tick);
            }
        }
    }, [time, isActive]);

    return (
        <Clock>
            {`${Math.floor(time / 60)}`.padStart(2, '0')}:
            {`${time % 60}`.padStart(2, '0')}
        </Clock>
    );
};

export default Timer;
