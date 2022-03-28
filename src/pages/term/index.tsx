import type { NextPage } from 'next';
import { Layout, Template } from '../../components/layout';
import SurveyContainer from '../../components/survey/SurveyContainer';

const TermPage: NextPage = () => {
    return (
        <Layout showFooter={false}>
            <Template>개인정보처리방침</Template>
        </Layout>
    );
};

export default TermPage;
