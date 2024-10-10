import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [accessToken, setAccessToken] = useState([]);
  const hostUrl = import.meta.env.PROD
    ? window.location.href
    : "http://localhost:8080/";

  const { getAccessTokenSilently } = useAuth0();

  const fetchUsers = async (accessToken) => {
    const response = await fetch(`${hostUrl}api/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const usersToJson = await response.json();
    //console.log(usersToJson);
    setUsers(usersToJson);
  };

  useEffect(() => {
    async function GetAccessToken() {
      const accessToken = await getAccessTokenSilently();
      //console.log(accessToken);
      setAccessToken(accessToken);
      fetchUsers(accessToken);
    }
    GetAccessToken();
  }, []);

  //Create a new user
  const createUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${hostUrl}api/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: e.target.name.value,
        isAdmin: e.target.isAdmin.checked,
        car: e.target.car.value,
      }),
    });
    const newUser = await response.json();
    setUsers([...users, newUser]);
  };

  //Update User isAdmin
  //The e in async (e) is the event
  const updateUser = async (e) => {
    const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ isAdmin: e.target.checked }),
    });
    await response.json();
    await fetchUsers(accessToken);
  };

  //Delete User
  const deleteUser = async (e) => {
    await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    await fetchUsers(accessToken);
  };

  return (
    //These <> below are called React fragments
    //React can only do one fragment so there needs to be a parent container
    //which is the <> and </>
    <>
      <h1>Users</h1>
      <center>
        <table>
          <thead>
            <tr>
              <th>
                <center>Fullname</center>
              </th>
              <th>
                <center>Admin</center>
              </th>
              <th>
                <center>Drives</center>
              </th>
              <th>
                <center></center>
              </th>
              <th>
                <center>Delete?</center>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <center>{user.name}</center>
                </td>

                <td>
                  <center>
                    <input
                      data-id={user.id}
                      type="checkbox"
                      checked={user.isAdmin}
                      onChange={updateUser}
                    />
                  </center>
                </td>

                <td>
                  <center>{user.car}</center>
                </td>

                <td>
                  <center>&nbsp;</center>
                </td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-id={user.id}
                    onClick={deleteUser}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>

      <br></br>

      <h1>Create New User</h1>
      <form onSubmit={createUser}>
        <label htmlFor="name">
          <b>Name </b>
        </label>
        <input type="text" name="name" id="name" />
        <label htmlFor="isAdmin">
          <b> &nbsp;Admin </b>
        </label>
        <input type="checkbox" name="isAdmin" />
        <label htmlFor="name">
          <b> &nbsp;Car </b>
        </label>
        <input type="text" name="car" id="car" />
        <br></br>
        <br></br>
        <input type="submit" className="btn btn-success" />
      </form>
    </>
  );
}

export default Home;
