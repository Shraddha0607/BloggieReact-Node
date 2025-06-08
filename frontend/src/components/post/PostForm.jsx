import { useState } from "react";
import { useActionData, Form, useRouteLoaderData } from "react-router-dom";

function PostForm({ method, post }) {
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const token = useRouteLoaderData('root');

    const data = useActionData();

    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler() {
        navigate('..');
    }

    function fileHandler(event) {
        const file = event.target.files[0];
        let fileContent = null;

        const reader = new FileReader();
        reader.onload = async (event) => {
            // console.log(event.target.result);
            const base64 = reader.result.split(',')[1];

            const imageData = {
                fileName: file.name,
                fileContent: base64,
            }

            let url = 'http://localhost:8080/cdn/urlGenerate';

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(imageData)
                });


                if (!response.ok) {
                    throw error('File not uploaded properly.');
                }

                const resData = await response.json();
                setGeneratedImageUrl(resData.url);
            }
            catch (error) {
                console.log(error);
            }
        }


        reader.readAsDataURL(file);




    }


    return (
        <div className='container py-3'>
            <Form method={method} >
                <h1>{method === 'patch' ? 'Edit Post' : 'Add New Post'}</h1>
                {data && data.errors && (
                    <ul>
                        {Object.values(data.errors).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
                <div className="row mb-3">
                    <label htmlFor="heading" className="col-sm-2 col-form-label">Heading</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="heading" name="heading" required
                            defaultValue={post ? post.heading : ''} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" name="title" required
                            defaultValue={post ? post.title : ''} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="content" className="col-sm-2 col-form-label">Content</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="content" name="content" required
                            defaultValue={post ? post.content : ''} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="shortDescription" className="col-sm-2 col-form-label">Short Description</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="shortDescription" name="shortDescription" required
                            defaultValue={post ? post.shortDescription : ''} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="content" className="col-sm-2 col-form-label">Featured Image Upload</label>
                    <div className="col-sm-10">
                        <input type="file" className="form-control" id="content" name="content" required
                            defaultValue={post ? post.content : ''}
                            onChange={fileHandler} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="imageUrl" className="col-sm-2 col-form-label">Featured Image URL</label>
                    <div className="col-sm-10">
                        <input type="url" className="form-control" id="imageUrl" name="imageUrl" required
                            defaultValue={post ? post.imageUrl : generatedImageUrl} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="urlHandle" className="col-sm-2 col-form-label">URL Handler</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="urlHandle" name="urlHandle" required
                            defaultValue={post ? post.urlHandle : ''} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="publishedDate" className="col-sm-2 col-form-label">Published Date</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" id="publishedDate" name="publishedDate" required
                            defaultValue={post ? post.publishedDate : new Date().toISOString().split('T')[0]} readOnly/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="author" className="col-sm-2 col-form-label">Author</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="author" name="author" required
                            defaultValue={post ? post.author : ''} />
                    </div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="isVisible" name="isVisible" defaultValue={post ? post.isVisible : ''} />
                    <label className="form-check-label" htmlFor="isVisible">Is Visible?</label>
                </div>

                <div>
                    <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting' : 'Submit'}</button>
                </div>
            </Form>
        </div>
    )
}

export default PostForm;