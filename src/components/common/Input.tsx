import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import COLOR from '../../assets/consts/color';
import { isMobile } from '../../assets/consts/mediaQuery';

const StyledInput = styled.input`
    width: 100%;
    max-width: ${isMobile ? 'none' : '356px'};
    height: 65px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid ${COLOR.WHITE};
    color: ${COLOR.WHITE};
    font-size: 40px;
    padding-left: 20px;
    padding-bottom: 10px;
    appearance: none;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: ${COLOR.WHITE50};
    }

    ${isMobile} {
        height: 44px;
        font-size: 20px;
    }
`;

export default function Input({
    register,
    ...attrs
}: InputHTMLAttributes<HTMLInputElement> & {
    register?: UseFormRegisterReturn;
}) {
    return (
        <StyledInput
            {...attrs}
            {...register}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
        />
    );
}
