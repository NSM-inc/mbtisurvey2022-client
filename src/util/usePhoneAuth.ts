import { FirebaseApp, initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import api from './api';

export const useFirebaseAuth = () => {
    const [app, setApp] = useState<FirebaseApp>();

    useEffect(() => {
        console.log(222);
        fetchKey();
    }, []);

    const fetchKey = async () => {
        const response = await api.get('/api/firebase');
        const firebaseConfig = response.data;
        const firebase = initializeApp(firebaseConfig);
        setApp(firebase);

        console.log(response);
    };

    return {
        app,
    };
};
