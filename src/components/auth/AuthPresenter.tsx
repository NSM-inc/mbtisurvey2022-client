import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Timer } from '../common';
import { Container, Title, InputContainer, InputBox, Time } from './AuthStyled';

const AuthPresenter = ({
    confirmAuthCode,
    sendAuthCode,
}: {
    confirmAuthCode: (data: { [x: string]: string }) => void;
    sendAuthCode: (phone: string) => Promise<boolean>;
}) => {
    const {
        register,
        watch,
        setValue,
        getValues,
        setFocus,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onChange',
    });
    const [timerActiveCount, setTimerActiveCount] = useState(0);
    const [step, setStep] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

    const requestAuthCode = async () => {
        const phone = getValues('phone');
        if (phone) {
            const result = await sendAuthCode(phone);
            if (result) {
                setTimerActiveCount((prev) => prev + 1);
            }
        }
    };

    useEffect(() => {
        setFocus(step ? 'authNumber' : 'phone');
    }, [step]);

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
                                    onKeyPress={(e) => {
                                        if (
                                            e.key === 'Enter' &&
                                            watch('phone')
                                        ) {
                                            setStep(1);
                                            requestAuthCode();
                                        }
                                    }}
                                />
                            </div>
                            {step > 0 && (
                                <>
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
                                        {errors['authNumber']?.type ===
                                            'required' && (
                                            <div>인증번호를 입력해주세요.</div>
                                        )}
                                    </div>
                                    <input type="submit" hidden />
                                </>
                            )}
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
                                id="sign-in-button"
                                type="button"
                                onClick={requestAuthCode}
                            >
                                문자 재발송
                            </Button>
                        </div>
                    </Time>
                </Container>
            </form>
        </>
    );
};

export default AuthPresenter;
