import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAdminUsers } from "../../services/adminService";

const roleStyles = {
  admin: "bg-purple-100 text-purple-700",
  customer: "bg-blue-100 text-blue-700",
  vendor: "bg-orange-100 text-orange-700",
};

function ManageUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers(token)
      .then(setUsers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Manage Users</h1>
        <p className="text-gray-400 text-sm mt-1">{users.length} registered users</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading && <p className="text-gray-400 text-sm text-center py-12">Loading...</p>}
        {!loading && users.length === 0 && <p className="text-gray-400 text-sm text-center py-12">No users found.</p>}
        {!loading && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-gray-400 text-xs">
                  <th className="text-left px-6 py-4 font-medium">Name</th>
                  <th className="text-left px-6 py-4 font-medium">Email</th>
                  <th className="text-left px-6 py-4 font-medium">Phone</th>
                  <th className="text-left px-6 py-4 font-medium">Role</th>
                  <th className="text-left px-6 py-4 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-semibold text-gray-800">{u.name}</td>
                    <td className="px-6 py-4 text-gray-500">{u.email}</td>
                    <td className="px-6 py-4 text-gray-500">{u.phone || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleStyles[u.role]}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{u.createdAt?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
