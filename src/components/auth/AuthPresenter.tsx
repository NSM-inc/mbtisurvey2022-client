/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Timer } from '../common';
import { Container, Title, InputContainer, InputBox, Time } from './AuthStyled';

const AuthPresenter = ({
    confirmAuthCode,
    sendAuthCode,
}: {
    confirmAuthCode: (data: { [x: string]: string }) => void;
    sendAuthCode: (phone: string) => void;
}) => {
    const {
        register,
        setValue,
        getValues,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onChange',
    });
    const [timerActiveCount, setTimerActiveCount] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <form
                ref={formRef}
                style={{ width: '100%' }}
                onSubmit={handleSubmit(confirmAuthCode)}
            >
                <Container>
                    <InputContainer>
                        <Title>
                            <div>본인인증을 시작합니다.</div>
                            <div> Enter를 눌러 진행하세요.</div>
                        </Title>
                        <InputBox>
                            <div>
                                <Input
                                    placeholder="이름 입력"
                                    register={register('name', {
                                        required: true,
                                    })}
                                />
                                {errors['name']?.type === 'required' && (
                                    <div>이름을 입력해주세요.</div>
                                )}
                            </div>
                            <div>
                                <Input
                                    placeholder="전화번호 입력"
                                    register={register('phone', {
                                        required: true,
                                        validate: (v) => {
                                            if (!isFinite(v)) {
                                                setValue(
                                                    'phone',
                                                    v.slice(0, -1),
                                                );
                                                return false;
                                            }
                                            return true;
                                        },
                                    })}
                                />
                                {errors['phone']?.type === 'required' && (
                                    <div>전화번호를 입력해주세요.</div>
                                )}
                            </div>
                            <div>
                                <Input
                                    placeholder="인증번호 입력"
                                    register={register('authNumber', {
                                        required: true,
                                        validate: (v) => {
                                            if (!isFinite(v)) {
                                                setValue(
                                                    'authNumber',
                                                    v.slice(0, -1),
                                                );
                                                return false;
                                            }
                                            return true;
                                        },
                                    })}
                                />
                                {errors['authNumber']?.type === 'required' && (
                                    <div>인증번호를 입력해주세요.</div>
                                )}
                            </div>
                            <input type="submit" hidden />
                        </InputBox>
                    </InputContainer>
                    <Time>
                        <div>
                            <Timer
                                isActive={timerActiveCount > 0}
                                seconds={180}
                                retryCount={timerActiveCount}
                            />
                            <Button
                                css={css`
                                    position: fixed;
                                    margin: 0 auto;
                                    left: 0;
                                    right: 0;
                                    bottom: 50px;
                                `}
                                id="sign-in-button"
                                type="button"
                                onClick={() => {
                                    setTimerActiveCount((prev) => prev + 1);
                                    sendAuthCode(getValues('phone'));
                                }}
                            >
                                {timerActiveCount ? '문자 재발송' : '문자 발송'}
                            </Button>
                        </div>
                    </Time>
                </Container>
            </form>
        </>
    );
};

export default AuthPresenter;
