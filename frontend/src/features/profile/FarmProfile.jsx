import React, { useState } from 'react';
import { useFarmProfile } from '../../context/FarmProfileContext';
import { FaUser, FaMapMarkerAlt, FaLeaf, FaRuler, FaCheck } from 'react-icons/fa';

function FarmProfile() {
  const { profile, updateProfile } = useFarmProfile();
  const [formData, setFormData] = useState(profile);
  const [showSaved, setShowSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(() => {
    // If the profile has some data saved, start in view mode. Otherwise, edit mode.
    return !profile.farmerName && !profile.district;
  });

  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setShowSaved(true);
    setIsEditing(false);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const states = [
    "Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh", 
    "Punjab", "Haryana", "Uttar Pradesh", "Bihar", 
    "West Bengal", "Tamil Nadu", "Andhra Pradesh", "Telangana"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-amber-900 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-green-700">
            My Farm Profile
          </h1>
          <p className="text-gray-600">
            Keep your profile updated so KrishiMitra can provide personalized advice.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-amber-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Info */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaUser className="mr-2 text-green-600" />
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="farmerName"
                    value={formData.farmerName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Enter your district"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Village/Town</label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Enter your village"
                  />
                </div>
              </div>
            </div>

            {/* Farm Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaLeaf className="mr-2 text-green-500" />
                Farm Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crop</label>
                  <input
                    type="text"
                    name="primaryCrop"
                    value={formData.primaryCrop || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g. Wheat, Rice, Cotton"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size (Acres)</label>
                  <input
                    type="number"
                    name="farmSize"
                    value={formData.farmSize || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g. 5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                  <select
                    name="soilType"
                    value={formData.soilType || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="Loamy">Loamy</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Silt">Silt</option>
                    <option value="Black Cotton">Black Cotton</option>
                    <option value="Alluvial">Alluvial</option>
                    <option value="Red">Red</option>
                    <option value="Laterite">Laterite</option>
                    <option value="Mountain / Forest">Mountain / Forest</option>
                    <option value="Desert / Arid">Desert / Arid</option>
                    <option value="Peaty / Marshy">Peaty / Marshy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Irrigation Type</label>
                  <select
                    name="irrigationType"
                    value={formData.irrigationType || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="Rainfed">Rainfed (Monsoon dependent)</option>
                    <option value="Drip">Drip Irrigation</option>
                    <option value="Sprinkler">Sprinkler</option>
                    <option value="Canal">Canal</option>
                    <option value="Tube Well">Tube Well / Borewell</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              {showSaved ? (
                <div className="text-green-600 flex items-center font-medium">
                  <FaCheck className="mr-2" /> Profile Saved Successfully
                </div>
              ) : (
                <div />
              )}
              {isEditing ? (
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-md"
                >
                  Save Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setIsEditing(true); }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmProfile;
