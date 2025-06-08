import { useRouteLoaderData } from "react-router-dom";
import PostForm from "./PostForm";


function EditPostPage() {
    const data = useRouteLoaderData('tag-details');
    return <PostForm method='patch' tag={data.post} />
}

export default EditTagPage;EditPostPage