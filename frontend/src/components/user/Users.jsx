import { useLoaderData, Await } from "react-router-dom";
import UsersList from "./UsersList";
import { Suspense } from "react";

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

export function loader() {
    return {
        users: loadUsers(),
    };
}