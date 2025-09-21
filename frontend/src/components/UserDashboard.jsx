import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [ratings, setRatings] = useState([]);
  const [editingRating, setEditingRating] = useState(null);
  const [newRating, setNewRating] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await api.get("/api/ratings/my");
        setRatings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRatings();
  }, []);

  const handleEditClick = (rating) => {
    setEditingRating(rating);
    setNewRating(rating.rating);
  };

  const updateRating = async (id) => {
    try {
      await api.put(`/api/ratings/${id}`, { rating: newRating });
      setRatings(
        ratings.map((r) => (r.id === id ? { ...r, rating: newRating } : r))
      );
      setEditingRating(null);
    } catch (err) {
      alert("Update failed");
    }
  };

  const deleteRating = async (id) => {
    try {
      await api.delete(`/api/ratings/${id}`);
      setRatings(ratings.filter((r) => r.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your store ratings</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            My Ratings
          </h2>

          {ratings.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No ratings yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start rating stores to see them here.
              </p>
              <button
                onClick={() => navigate("/stores")}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
              >
                Browse Stores
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {ratings.map((rating) => (
                <div
                  key={rating.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {rating.Store?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {rating.Store?.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {editingRating?.id === rating.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={newRating}
                            onChange={(e) =>
                              setNewRating(parseInt(e.target.value))
                            }
                            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <option key={star} value={star}>
                                {star} ⭐
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => updateRating(rating.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingRating(null)}
                            className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= rating.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            ))}
                            <span className="ml-2 text-sm font-medium text-gray-900">
                              {rating.rating}/5
                            </span>
                          </div>
                          <button
                            onClick={() => handleEditClick(rating)}
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteRating(rating.id)}
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:underline text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
