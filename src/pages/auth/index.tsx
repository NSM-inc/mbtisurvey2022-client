import AuthContainer from '../../components/auth/AuthContainer';
import { Layout, Template } from '../../components/layout';

const AuthPage = () => {
    return (
        <Layout>
            <Template minHeight="100vh">
                <AuthContainer />
            </Template>
        </Layout>
    );
};

export default AuthPage;
