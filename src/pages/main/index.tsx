import { Layout, Template } from '../../components/layout';
import MainPresenter from '../../components/main/MainPresenter';

const MainPage = function () {
    return (
        <Layout showHeader={false} showFooter={false}>
            <Template>
                <MainPresenter />
            </Template>
        </Layout>
    );
};

export default MainPage;
