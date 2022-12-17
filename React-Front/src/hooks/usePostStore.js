import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../api';
import { setSaving, clearMessages, addPost, setErrorMessage, updatePost, deletePost, setMyPosts, setQueryResults } from '../store';

export const usePostStore = () => {
    const { isSaving, msgSaved, mypost, queryResults, active, errorMessage } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const getMyPosts = async ({ user_id }) => {
        try {
            const { data } = await authApi.get(`/users/profile?user_id=${user_id}`);
            dispatch(setMyPosts(data.posts));
        } catch (error) {
            console.log(error);
        }
    };

    const searchPosts = async ({ query }) => {
        dispatch(setSaving(true));
        try {
            const { data } = await authApi.get(`/posts?title=${query}`);
            dispatch(setQueryResults(data));
        } catch (error) {
            console.log(error);
        }
        dispatch(setSaving(false));
    };

    const newPost = async ({ title, description, category_id, archivo }) => {
        dispatch(setSaving(true));
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category_id', category_id);
            formData.append('archivo', archivo);
            const { data } = await authApi.post('/posts', formData);
            dispatch(addPost({ data: data, msg: 'Creado Exitosamente' }));
            setTimeout(() => {
                dispatch(clearMessages());
            }, 10);
        } catch (error) {
            dispatch(setErrorMessage('Error al crear publicacion'));
            setTimeout(() => {
                dispatch(clearMessages());
            }, 10);
        }
        dispatch(setSaving(false));
    };

    const editPost = async ({ id, title, description, category_id }) => {
        dispatch(setSaving(true));
        try {
            const { status, data } = await authApi.put(`/posts/${id}`, { title, description, category_id });
            if (status == 200) {

                dispatch(updatePost({ msg: 'Actualizado Exitosamente' }));
            } else {
                dispatch(setErrorMessage(data.message));
            }
            setTimeout(() => {
                dispatch(clearMessages());
            }, 10);
        } catch (error) {
            dispatch(setErrorMessage('Error al actualizar publicacion'));
            setTimeout(() => {
                dispatch(clearMessages());
            }, 10);
        }
        dispatch(setSaving(false));
    };

    const removePost = async ({ id }) => {
        dispatch(setSaving(true));
        try {
            const { data } = await authApi.delete(`/posts/${id}`);
            dispatch(deletePost({ data: id, msg: data.message }));
            setTimeout(() => {
                dispatch(clearMessages());
            }, 10);
        } catch (error) {
            dispatch(setErrorMessage('Error al eliminar publicacion'));
            setTimeout(() => {
                dispatch(clearMessages());
            }, 10);
        }
        dispatch(setSaving(false));
    };

    return {
        //* Propiedades
        isSaving,
        msgSaved,
        errorMessage,
        mypost,
        queryResults,
        active,

        //* Metodos
        newPost,
        editPost,
        removePost,
        getMyPosts,
        searchPosts,
    };
}
