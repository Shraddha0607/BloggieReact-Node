import { useLoaderData, Await, redirect } from "react-router-dom";
import UsersList from "./UsersList";
import { Suspense } from "react";
import { getAuthToken } from "../../util/auth";

function UsersPage() {
    const { users } = useLoaderData();

    return (
        <Suspense fallback={<p>Loading...</p>} >
            <Await resolve={users}>
                {(loadedUsers) => <UsersList users={loadedUsers} />}
            </Await>
        </Suspense>
    )
}

export default UsersPage;

async function loadUsers() {
    const response = await fetch('http://localhost:8080/users');

    if (!response.ok) {
        throw new Response({
            message: 'Could not fetch users.'
        },
            {
                status: 500,
            });
    }
    else {
        const resData = await response.json();
        return resData.users;
    }
}

// async function loadUser(id) {
//     const response = await fetch('http://localhost:8080/users/' + id);

//     if (!response.ok) {
//         throw new Response (
//             { message : 'Could not fetch details for selected user.'},
//             { status : 500 }
//         );
//     }
//     else{
//         const resData = await response.json();
//         return resData.users;
//     }
// }


export function loader({ request, params }) {
    // const id = params.userId;

    return {
        users: loadUsers(),
        // user: loadUser(),
    };
}

export async function action({ params, request }) {

    const userId = params.userId;
    const token = getAuthToken();

    const response = await fetch('http://localhost:8080/users/'+ userId, {
        method : request.method,
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw new Response (
            { message: 'Could not delete user.'},
            { status : 500 }
        );
    }

    return redirect('/admin/users');
}