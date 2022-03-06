import styled from '@emotion/styled';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import COLOR from '../../assets/consts/color';
import { isMobile } from '../../assets/consts/mediaQuery';
import Flex from './Flex';

const StyledInput = styled.input`
    position: absolute;
    opacity: 0;
    overflow: hidden;
    transition: 0.25s;

    & + label {
        font-size: 20px;
        color: ${COLOR.WHITE};
        display: inline-block;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 50%;
        transition: 0.25s;
        ${isMobile} {
            font-size: 18px;
        }
    }

    & + label:before {
        content: ' ';
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 16px;
        text-align: center;
        vertical-align: middle;
        background: ${COLOR.WHITE};
        border-radius: 50%;
        transition: 0.25s;
        margin-right: 10px;
    }

    &:checked + label:before {
        background: ${COLOR.DARKGRAY};
        box-shadow: inset 0px 0px 0px 5px ${COLOR.WHITE};
        transition: 0.25s;
    }
`;

interface RadioButtonProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    children: string;
    register?: UseFormRegisterReturn;
}

export default function RadioButton({
    children,
    register,
    ...attrs
}: RadioButtonProps) {
    const random = String(Math.random() * 5);

    return (
        <Flex>
            <StyledInput id={random} type="radio" {...attrs} {...register} />
            <label htmlFor={random}>{children}</label>
        </Flex>
    );
}
