
import { useSelector } from 'react-redux';
import { Typography, Grid, Divider } from '@mui/material';
import { getEnvVariables } from '../../helpers';


import { PostLayout } from '../layout/PostLayout';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { ToolbarProps, ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { toCapitalizedSentence, getCategoryName } from '../../helpers';



export const ViewerPage = () => {

    const { displayName } = useSelector(state => state.auth);
    const { active: post } = useSelector(state => state.post);

    const { VITE_FILE_URL, VITE_CORS_URL } = getEnvVariables();

    const author = post.user ? post.user.name : displayName;

    const viewPdf = VITE_CORS_URL+VITE_FILE_URL + post.file_path;

    const transform = (slot = ToolbarSlot) => ({
        ...slot,
        Download: () => <></>,
        DownloadMenuItem: () => <></>,
        Print: () => <></>,
        PrintMenuItem: () => <></>,
        Open: () => <></>,
        OpenMenuItem: () => <></>,
    });

    const renderToolbar = (Toolbar = (props = ToolbarProps) => React.ReactElement) => (
        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
    );
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar,
    });
    const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance;

    return (
        <PostLayout>
            <Grid container direction='row' justifyContent='space-between' alignItems='center' px={2} >
                <Typography fontSize={39} fontWeight='light'>{toCapitalizedSentence(post.title)}</Typography>
            </Grid>
            <Grid container direction='row' justifyContent='space-between' alignItems='center' px={2} mb={2}>
                <Typography fontSize={15} fontWeight='light'>{post.description}</Typography>
            </Grid>
            <Grid container direction='row' justifyContent='space-between' alignItems='center' px={2} mb={2}>
                <Typography fontSize={15} fontWeight='light'>Author: {toCapitalizedSentence(author)}</Typography>
            </Grid>
            <Grid container direction='row' justifyContent='space-between' alignItems='center' px={2} mb={2}>
                <Typography fontSize={15} fontWeight='light'>Categoria: {getCategoryName(post.category_id)}</Typography>
            </Grid>
            <Divider sx={{ mb: 5 }} />
            <Grid container direction='row' justifyContent='space-between' alignItems='center' px={2} mb={2} >
                <div className='pdf-container'>
                    {post.file_path && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                        <Viewer fileUrl={viewPdf}
                            withCredentials={false}
                            httpHeaders={{
                                'Accept': '*/*',
                                "Access-Control-Allow-Origin": "*",
                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                            }}
                            plugins={[defaultLayoutPluginInstance]}

                        />
                    </Worker></>}
                    {!post.file_path && <>No pdf file selected</>}
                </div>


            </Grid>
        </PostLayout >
    )
}
