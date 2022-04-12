import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from 'firebase/auth';
import AuthPresenter from './AuthPresenter';
import { useEffect } from 'react';
import api from '../../util/api';
import { GetResponse } from '../../models/ResponseDto';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { AuthState } from '../../recoil/atoms';
import { FirebaseApp } from '@firebase/app';

const AuthContainer = ({ app }: { app: FirebaseApp }) => {
    const [authState, setAuthState] = useRecoilState(AuthState);
    const auth = getAuth(app);
    const router = useRouter();

    auth.languageCode = 'ko';

    const sendAuthCode = async (phone: string) => {
        if (!phone) return false;
        const response = await api.get<GetResponse>('/users/checkphone', {
            params: { phone },
        });

        if (response.status === 200) {
            if (!response.data.payload) {
                const internationalPhone = phone.slice(1);
                signInWithPhoneNumber(
                    auth,
                    '+82' + internationalPhone,
                    window.recaptchaVerifier,
                )
                    .then((confirmationResult) => {
                        window.confirmationResult = confirmationResult;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                return true;
            } else {
                alert('이미 참여한 사용자 입니다.');
                return false;
            }
        }
        return false;
    };

    const confirmAuthCode = (data: { [x: string]: string }) => {
        window.confirmationResult
            .confirm(data['authNumber'])
            .then(async (result: any) => {
                alert('인증이 완료되었습니다.');
                if (result.user.accessToken) {
                    await api({
                        method: 'post',
                        url: '/tokens',
                        data: {
                            token: result.user.accessToken,
                        },
                    });

                    setAuthState({
                        token: result.user.accessToken,
                        phone: data.phone,
                    });
                }
            })
            .catch((error: any) => {
                if (error.code === 'auth/invalid-verification-code') {
                    alert('인증번호가 유효하지 않습니다.');
                } else if (error.code === 'auth/session-expired') {
                    alert('인증번호가 만료되었습니다.');
                } else {
                    alert('인증을 실패하였습니다.');
                }
            });
    };

    useEffect(() => {
        if (!window.recaptchaVerifier && auth) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                'sign-in-button',
                {
                    size: 'invisible',
                    callback: (response: any) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                    },
                },
                auth,
            );
        }
    }, [auth]);

    useEffect(() => {
        if (authState.token) {
            router.replace('/survey');
        }
    }, [authState]);

    return (
        <AuthPresenter
            confirmAuthCode={confirmAuthCode}
            sendAuthCode={sendAuthCode}
        />
    );
};

export default AuthContainer;
