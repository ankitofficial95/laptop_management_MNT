import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../slices/userSlice";

function FetchAPIScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users);

  const handleDeleteUser = (userId) => {
    dispatch(removeUser(userId))
  };

  const handleEditUser = (userId) => {
    //edit functionlity
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!user) {
    return (
      <div>
        <p className="lead text-center"> Login first to see the dashboard data</p>
      </div>
    );
  }

  return (
    <div>
      {
        (users.length === 0 ) &&
        <p className="lead text-center"> No users found </p>
    }
      {users.length > 0 && (
        <div>
        <p className="lead text-center"> User Details </p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Website</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm m-1"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-outline-info btn-sm m-1"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Edit
                  </button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
export default FetchAPIScreen;
