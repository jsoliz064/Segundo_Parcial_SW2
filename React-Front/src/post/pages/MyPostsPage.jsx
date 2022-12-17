import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Divider } from '@mui/material';
import { PostLayout } from '../layout/PostLayout';
import { NoPostsView, MyPostsView } from '../views';
import { usePostStore } from '../../hooks';




export const MyPostsPage = () => {

    const { uid } = useSelector(state => state.auth);
    const { myposts } = useSelector(state => state.post);


    const { getMyPosts } = usePostStore();



    useEffect(() => {
        if (uid !== null) {

            getMyPosts({ user_id: uid });
        }
    }, [myposts]);

    return (
        <PostLayout>
            <Typography variant='h4' sx={{ my: 3 }}>Mis Publicaciones</Typography>
            <Divider />


            {myposts.length == 0 ? (
                <NoPostsView />
            ) : (
                <MyPostsView result={myposts} />
            )}

        </PostLayout>
    )
};
