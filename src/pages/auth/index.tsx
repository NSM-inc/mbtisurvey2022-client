import { FirebaseApp, initializeApp } from '@firebase/app';
import { GetServerSideProps, GetStaticProps } from 'next';
import AuthContainer from '../../components/auth/AuthContainer';
import { Layout, Template } from '../../components/layout';

interface AuthPageProps {
    firebaseConfig: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    };
}

const AuthPage = ({ firebaseConfig }: AuthPageProps) => {
    const app = initializeApp(firebaseConfig);

    return (
        <Layout>
            <Template>
                <AuthContainer app={app} />
            </Template>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const res = await fetch(`${process.env.BASE_URL}/api/firebase`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await res.json();

    return {
        props: { firebaseConfig: response },
    };
};

export default AuthPage;
