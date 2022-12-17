import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthStore } from '../hooks';
import { PostRoutes } from '../post/routes/PostRoutes';
import { CheckingAuth } from '../ui/components';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken()
    }, []);

    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path='/*' element={<PostRoutes />} />
                    : <Route path='/auth/*' element={<AuthRoutes />} />
            }

            <Route path='/*' element={<Navigate to='/auth/login' />} />

        </Routes>
    )
}