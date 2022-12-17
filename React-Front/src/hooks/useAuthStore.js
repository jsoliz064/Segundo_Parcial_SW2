import { useDispatch, useSelector } from 'react-redux';
import { authApi, faceApi } from '../api';
import { checkingCredentials, clearErrorMessage, login, logout } from '../store';


export const useAuthStore = () => {
    const { status, uid, email, token, displayName, errorMessage, subscribed } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const startLogin = async ({ email, password }) => {
        dispatch(checkingCredentials());
        try {
            const { data } = await authApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: data.usuario.id,
                email: data.usuario.email,
                displayName: data.usuario.name,
                token: data.token,
                subscribed: data.subscription
            }));
        } catch (error) {
            console.log(error);
            dispatch(logout({ errorMessage: 'Credenciales Incorrectas' }));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const faceLogin = async ({ img, user_id }) => {
        try {
            const formData = new FormData();
            formData.append('img', img);
            formData.append('user_id', user_id);
            const resp = await faceApi.post('auth/loginFace', formData);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const faceRegister = async ({ name, user_id, file1, file2, file3 }) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('user_id', user_id);
            formData.append('file1', file1);
            formData.append('file2', file2);
            formData.append('file3', file3);
            const resp = await faceApi.post('auth/registerFaces', formData);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const startRegister = async ({ email, password, name }) => {
        dispatch(checkingCredentials());
        try {
            const role_id = 2;
            const { status } = await authApi.post('/users', { email, password, name, role_id });
            if (status !== 200) return;
            await startLogin({ email: email, password: password });
        } catch (error) {
            dispatch(logout({ errorMessage: error.response.data.errors[0]?.msg || '--' }));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            localStorage.clear();
            dispatch(logout());
        }
        try {
            const { data } = await authApi.post('/auth/checkLogin');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: data.usuario.id,
                email: data.usuario.email,
                displayName: data.usuario.name,
                token: data.token,
                subscribed: data.subscription
            }));
        } catch (error) {
            localStorage.clear();
            dispatch(logout());
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(logout());
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        uid,
        email,
        token,
        displayName,


        //* Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
        faceLogin,
        faceRegister,
    };
};
