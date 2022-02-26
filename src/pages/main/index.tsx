import { Layout } from '../../components/layout';
import MainPresenter from '../../components/main/MainPresenter';

const MainPage = function () {
    return (
        <Layout showHeader={false} showFooter={false}>
            <MainPresenter />
        </Layout>
    );
};

export default MainPage;
