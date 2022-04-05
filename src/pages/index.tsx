import type { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
    useEffect(() => {
        Router.push('/main');
    }, []);

    return (
        <div>
            <Head>
                <title>MBTI SURVEY 2022 : 대국민 MBTI 조사</title>
                <meta
                    name="description"
                    content="우리가 아는 MBTI에 대한 편견은 사실일까요? 여러분의
                소중한 시간을 투자해주세요!"
                />
                <meta property="og:image" content="/ogimage.png" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    );
};

export default Home;
