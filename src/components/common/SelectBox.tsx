import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import COLOR from '../../assets/consts/color';
import { isMobile } from '../../assets/consts/mediaQuery';

const StyledSelect = styled.select`
    width: 356px;
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
        width: 100%;
        font-size: 28px;
    }
`;

interface SelectBoxOption {
    value: string;
    text: string;
}
interface SelectBoxProps
    extends React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    > {
    options: SelectBoxOption[];
    register?: UseFormRegisterReturn;
}

export default function SelectBox({
    options,
    register,
    ...attrs
}: SelectBoxProps) {
    return (
        <StyledSelect {...register} {...attrs}>
            {options.map((elem: SelectBoxOption) => {
                return (
                    <option key={elem.value} value={elem.value}>
                        {elem.text}
                    </option>
                );
            })}
        </StyledSelect>
    );
}
