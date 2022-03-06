import type { NextPage } from 'next';
import { Layout, Template } from '../../components/layout';
import SurveyContainer from '../../components/survey/SurveyContainer';
import { useWindowSize } from '../../util/useWindowSize';

const SurveyPage: NextPage = () => {
    const { width } = useWindowSize();
    const isMobileSize = (width || 0) < 480;

    return (
        <Layout showHeader={true} showFooter={true}>
            <Template
                padding={isMobileSize ? '120px 0' : '140px 0'}
                minHeight="100vh"
            >
                <SurveyContainer />
            </Template>
        </Layout>
    );
};

export default SurveyPage;
