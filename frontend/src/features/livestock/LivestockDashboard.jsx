import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Plus, Trash2, Edit, CheckCircle, AlertTriangle, FileText, Activity } from "lucide-react";

export default function LivestockDashboard() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnimals = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
      const res = await fetch(`${baseUrl}/livestock/`);
      const data = await res.json();
      setAnimals(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const deleteAnimal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this animal?")) return;
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
      await fetch(`${baseUrl}/livestock/` + id, { method: "DELETE" });
      fetchAnimals();
    } catch (err) {
      console.error(err);
    }
  };

  const total = animals.length;
  const healthy = animals.filter(a => a.health_status === "Healthy").length;
  const needsAttention = animals.filter(a => a.health_status !== "Healthy").length;
  
  // Calculate animals with upcoming or overdue care
  const careDue = animals.filter(a => {
      if (!a.health_records) return false;
      return a.health_records.some(r => {
          if (!r.next_due_date) return false;
          // Due if next_due_date is before tomorrow (i.e. today or earlier)
          // or just any date that is set, let's keep it simple: due <= today or next 7 days
          const dueDate = new Date(r.next_due_date);
          const today = new Date();
          const in7Days = new Date();
          in7Days.setDate(today.getDate() + 7);
          return dueDate <= in7Days;
      });
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Activity className="h-8 w-8 text-green-600 mr-3" />
              Livestock Management
            </h1>
            <p className="text-gray-500 mt-2">Manage your cattle, track health, and get AI veterinary assistance.</p>
          </div>
          <Link to="/livestock/new" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center shadow-sm">
            <Plus className="h-5 w-5 mr-1" /> Add Animal
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Animals</p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Healthy</p>
              <p className="text-2xl font-bold text-gray-900">{healthy}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Needs Attention</p>
              <p className="text-2xl font-bold text-gray-900">{needsAttention}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <HeartPulse className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Care Due</p>
              <p className="text-2xl font-bold text-gray-900">{careDue}</p>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading livestock data...</div>
          ) : animals.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">No animals found in your records.</p>
              <Link to="/livestock/new" className="text-green-600 font-medium hover:underline">Add your first animal</Link>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Breed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {animals.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      <Link to={"/livestock/" + a.id} className="hover:text-green-600">{a.tag_number}</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{a.type}</div>
                      <div className="text-sm text-gray-500">{a.breed}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${a.health_status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {a.health_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={"/livestock/" + a.id} className="text-indigo-600 hover:text-indigo-900 mr-4">View</Link>
                      <Link to={"/livestock/" + a.id + "/edit"} className="text-green-600 hover:text-green-900 mr-4">Edit</Link>
                      <button onClick={() => deleteAnimal(a.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
