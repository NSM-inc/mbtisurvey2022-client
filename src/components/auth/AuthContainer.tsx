import { useFirebaseAuth } from '../../util/usePhoneAuth';
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from 'firebase/auth';
import AuthPresenter from './AuthPresenter';
import { useEffect } from 'react';

const AuthContainer = () => {
    const { app } = useFirebaseAuth();
    const auth = getAuth(app);
    auth.languageCode = 'ko';

    const sendAuthCode = async (phone: string) => {
        if (!phone) return;
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
    };

    const confirmAuthCode = (data: { [x: string]: string }) => {
        window.confirmationResult
            .confirm(data['authNumber'])
            .then((result: any) => {
                alert('인증이 완료되었습니다.');
                console.log(result.user, result);
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
        const appVerifier = new RecaptchaVerifier(
            'sign-in-button',
            {
                size: 'invisible',
                callback: (response: any) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            },
            auth,
        );
        window.recaptchaVerifier = appVerifier;
    }, []);

    return (
        <AuthPresenter
            confirmAuthCode={confirmAuthCode}
            sendAuthCode={sendAuthCode}
        />
    );
};

export default AuthContainer;
