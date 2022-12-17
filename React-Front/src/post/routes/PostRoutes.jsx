import { Navigate, Route, Routes } from 'react-router-dom';
import { WallPage, MyPostsPage, CreatePostPage, EditPostPage, PricingPage, ProfilePage, PaymentsPage, ViewerPage } from '../pages/index';

export const PostRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<WallPage />} />
            <Route path='/myposts' element={<MyPostsPage />} />
            <Route path='/create' element={<CreatePostPage />} />
            <Route path='/edit' element={<EditPostPage />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/payments' element={<PaymentsPage />} />
            <Route path='/viewer' element={<ViewerPage />} />
            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    )
}