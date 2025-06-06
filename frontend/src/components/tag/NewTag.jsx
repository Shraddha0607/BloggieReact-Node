import { Link, useSearchParams, Form, redirect } from 'react-router-dom';
import { getAuthToken } from '../../util/auth';

function NewTagPage() {

    return (
        <div>
            <Form method='post' >
                <h1>Add New Tag</h1>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="name" className="form-control" id="name" name="name" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="displayName" className="col-sm-2 col-form-label">Display Name</label>
                    <div className="col-sm-10">
                        <input type="displayName" className="form-control" id="displayName" name="displayName" required/>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </Form>
        </div>
    )
}

export default NewTagPage;

export async function action({ request }) {

    const data = await request.formData();
    const tagData = {
        name: data.get('name'),
        displayName : data.get('displayName'),
    };

    const token = getAuthToken();

    const response = await fetch('http://localhost:8080/tags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(tagData)
    });

    if(response.status === 422 || response.status === 401) {
        return response;
    }

    if(!response.ok) {
        throw new Response ({ message: 'Could not add tag.'}, { status: 500 });
    }

    const resData = await response.json();

    return redirect('/admin/tags');

}
