import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, HeartPulse, MessageSquare, Plus, Bell, CheckSquare, List, Calendar, Activity, Info, Camera, Trash } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AnimalDetail({ mode = "edit" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    tag_number: "", type: "Cow", breed: "", age: "", gender: "Female", health_status: "Healthy", vaccination_status: "Up to Date", notes: "", photo_url: "",
    feed_type: "", daily_quantity: "", feeding_frequency: "",
    last_checkup_date: "", next_checkup_date: "", current_symptoms: "",
    last_vaccination: "", next_vaccination_due: "",
    current_medication: "", medication_due_date: "",
    water_status: "", cleaning_status: "", activity_behaviour: "", additional_care_notes: ""
  });
  const [animal, setAnimal] = useState(null);
  
  // AI Assistant State
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  
  // New features state
  const [dailyCare, setDailyCare] = useState({
    date: new Date().toISOString().split('T')[0],
    feeding_done: false, water_done: false, cleaning_done: false, exercise_done: false, medicine_done: false, observation_done: false
  });
  
  const [feedForm, setFeedForm] = useState({ feed_type: "", quantity: "", time: "", notes: "" });
  const [healthForm, setHealthForm] = useState({ record_type: "Checkup", date: new Date().toISOString().split('T')[0], notes: "", next_due_date: "", symptoms: "" });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const symptomList = ["Fever", "Loss of appetite", "Coughing", "Lethargy", "Diarrhea", "Limping", "Breathing difficulty", "Weight loss"];

  useEffect(() => {
    if (!isNew) {
      fetchAnimalData();
    }
  }, [id, isNew]);

  const fetchAnimalData = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
    fetch(`${baseUrl}/livestock/` + id)
      .then(res => res.json())
      .then(data => {
          if (data && data.id) {
              setAnimal(data);
              setFormData({
                  tag_number: data.tag_number || "", type: data.type || "Cow", breed: data.breed || "", 
                  age: data.age || "", gender: data.gender || "Female", 
                  health_status: data.health_status || "Healthy", vaccination_status: data.vaccination_status || "Up to Date", 
                  notes: data.notes || "", photo_url: data.photo_url || "",
                  feed_type: data.feed_type || "", daily_quantity: data.daily_quantity || "", feeding_frequency: data.feeding_frequency || "",
                  last_checkup_date: data.last_checkup_date || "", next_checkup_date: data.next_checkup_date || "", current_symptoms: data.current_symptoms || "",
                  last_vaccination: data.last_vaccination || "", next_vaccination_due: data.next_vaccination_due || "",
                  current_medication: data.current_medication || "", medication_due_date: data.medication_due_date || "",
                  water_status: data.water_status || "", cleaning_status: data.cleaning_status || "", activity_behaviour: data.activity_behaviour || "", additional_care_notes: data.additional_care_notes || ""
              });
              // Find today's care record
              const today = new Date().toISOString().split('T')[0];
              const todayCare = data.daily_care_records?.find(c => c.date === today);
              if (todayCare) setDailyCare(todayCare);
          }
      });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFeedChange = (e) => setFeedForm({ ...feedForm, [e.target.name]: e.target.value });
  const handleHealthChange = (e) => setHealthForm({ ...healthForm, [e.target.name]: e.target.value });
  
  const handlePhotoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setFormData({...formData, photo_url: reader.result});
          };
          reader.readAsDataURL(file);
      }
  };

  const [saveError, setSaveError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setSaveError(null);
    setSuccessMessage("");
    
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
    const url = isNew ? `${baseUrl}/livestock/` : `${baseUrl}/livestock/${id}`;
    const method = isNew ? "POST" : "PUT";
    
    const payload = { ...formData };
    
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend Save Error:", errorText);
        throw new Error(`API Error: ${res.status} ${res.statusText} - ${errorText}`);
      }
      
      setSuccessMessage("Animal record updated successfully.");
      setTimeout(() => { navigate(isNew ? "/livestock" : `/livestock/${id}`); }, 1500);
    } catch (err) {
      console.error(err);
      setSaveError(`Save failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const saveDailyCare = async () => {
      try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
          await fetch(`${baseUrl}/livestock/${id}/daily_care`, {
              method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dailyCare)
          });
          fetchAnimalData();
      } catch (err) { console.error(err); }
  };
  
  const saveFeeding = async (e) => {
      e.preventDefault();
      try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
          await fetch(`${baseUrl}/livestock/${id}/feeding`, {
              method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(feedForm)
          });
          setFeedForm({ feed_type: "", quantity: "", time: "", notes: "" });
          fetchAnimalData();
      } catch (err) { console.error(err); }
  };
  
  const saveHealthRecord = async (e) => {
      e.preventDefault();
      try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
          await fetch(`${baseUrl}/livestock/${id}/health`, {
              method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(healthForm)
          });
          setHealthForm({ record_type: "Checkup", date: new Date().toISOString().split('T')[0], notes: "", next_due_date: "", symptoms: "" });
          fetchAnimalData();
      } catch (err) { console.error(err); }
  };

  const toggleSymptom = (sym) => {
      setSelectedSymptoms(prev => prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]);
  };

  const askAI = async () => {
      if(!aiQuestion.trim() && selectedSymptoms.length === 0) return;
      setAiLoading(true);
      try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
          const res = await fetch(`${baseUrl}/livestock/ask`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                  question: aiQuestion || "What do these symptoms indicate?",
                  animal_context: animal ? { type: animal.type, breed: animal.breed, age: animal.age, gender: animal.gender, health_status: animal.health_status } : null,
                  symptoms: selectedSymptoms
              })
          });
          const data = await res.json();
          setAiResponse(data.answer);
      } catch (e) {
          setAiResponse("Error connecting to AI service.");
      } finally {
          setAiLoading(false);
      }
  };

  // Derived calculations for Care Overview
  const healthRecords = animal?.health_records || [];
  const checkups = healthRecords.filter(r => r.record_type === "Checkup").sort((a,b) => new Date(b.date) - new Date(a.date));
  const vaccines = healthRecords.filter(r => r.record_type === "Vaccination").sort((a,b) => new Date(b.date) - new Date(a.date));
  
  const lastCheckup = checkups.length > 0 ? checkups[0].date : "None";
  const nextCheckup = checkups.find(r => r.next_due_date)?.next_due_date || "Not set";
  const lastVax = vaccines.length > 0 ? vaccines[0].date : "None";
  const nextVax = vaccines.find(r => r.next_due_date)?.next_due_date || "Not set";
  
  const upcomingReminders = healthRecords.filter(r => r.next_due_date && new Date(r.next_due_date) >= new Date()).sort((a,b) => new Date(a.next_due_date) - new Date(b.next_due_date));
  
  const careItems = [dailyCare.feeding_done, dailyCare.water_done, dailyCare.cleaning_done, dailyCare.exercise_done, dailyCare.medicine_done, dailyCare.observation_done];
  const carePercent = Math.round((careItems.filter(Boolean).length / careItems.length) * 100);
  
  // Symptom severity logic
  let urgency = "LOW";
  let concern = "Monitor closely";
  if (selectedSymptoms.some(s => ["Breathing difficulty", "Lethargy", "Fever"].includes(s))) {
      urgency = "HIGH"; concern = "Immediate veterinary attention recommended";
  } else if (selectedSymptoms.some(s => ["Diarrhea", "Limping", "Loss of appetite"].includes(s))) {
      urgency = "MODERATE"; concern = "Consult a veterinarian soon";
  }

  if (mode === "edit") {
      return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center text-green-600 hover:text-green-800 mb-6 font-medium">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </button>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Animal Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">{isNew ? "Add New Animal" : "Edit Animal Details"}</h2>
                        
                        <div className="flex justify-center mb-6">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-2 overflow-hidden border-4 border-gray-200 flex items-center justify-center">
                                    {formData.photo_url ? <img src={formData.photo_url} alt="Animal" className="w-full h-full object-cover"/> : <Camera className="h-10 w-10 text-gray-400" />}
                                </div>
                                <label className="cursor-pointer text-sm text-green-600 font-medium hover:text-green-700">
                                    Upload Photo
                                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tag Number / ID *</label><input required type="text" name="tag_number" value={formData.tag_number || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Animal Type *</label><select name="type" value={formData.type || "Cow"} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"><option>Cow</option><option>Buffalo</option><option>Goat</option><option>Sheep</option></select></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Breed *</label><input required type="text" name="breed" value={formData.breed || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Age *</label><input required type="text" name="age" value={formData.age || ""} onChange={handleChange} placeholder="e.g. 2 years" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label><select name="gender" value={formData.gender || "Female"} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"><option>Female</option><option>Male</option></select></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Health Status *</label><select name="health_status" value={formData.health_status || "Healthy"} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"><option>Healthy</option><option>Needs Attention</option><option>Critical</option></select></div>
                        </div>
                    </div>

                    {/* Care & Management */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">CARE & MANAGEMENT</h2>
                        
                        <h3 className="text-md font-bold text-gray-800 mb-3 mt-4">Feeding</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Feed Type</label><input type="text" name="feed_type" value={formData.feed_type || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="e.g. Silage" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Daily Quantity</label><input type="text" name="daily_quantity" value={formData.daily_quantity || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="e.g. 5kg" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Feeding Frequency</label><input type="text" name="feeding_frequency" value={formData.feeding_frequency || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="e.g. Twice a day" /></div>
                        </div>

                        <h3 className="text-md font-bold text-gray-800 mb-3">Health</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Checkup Date</label><input type="date" name="last_checkup_date" value={formData.last_checkup_date || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Next Checkup Date</label><input type="date" name="next_checkup_date" value={formData.next_checkup_date || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500" /></div>
                            <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Current Symptoms / Concerns</label><input type="text" name="current_symptoms" value={formData.current_symptoms || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500" placeholder="Any noticeable issues?" /></div>
                        </div>

                        <h3 className="text-md font-bold text-gray-800 mb-3">Vaccination</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Vaccination</label><input type="date" name="last_vaccination" value={formData.last_vaccination || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Next Vaccination Due</label><input type="date" name="next_vaccination_due" value={formData.next_vaccination_due || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500" /></div>
                        </div>

                        <h3 className="text-md font-bold text-gray-800 mb-3">Medication</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Medication</label><input type="text" name="current_medication" value={formData.current_medication || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Medication Due Date</label><input type="date" name="medication_due_date" value={formData.medication_due_date || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500" /></div>
                        </div>

                        <h3 className="text-md font-bold text-gray-800 mb-3">General Care</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Water Status</label><select name="water_status" value={formData.water_status || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"><option value="">--Select--</option><option>Adequate</option><option>Needs Refill</option></select></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Cleaning Status</label><select name="cleaning_status" value={formData.cleaning_status || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"><option value="">--Select--</option><option>Clean</option><option>Needs Cleaning</option></select></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Activity / Behaviour</label><input type="text" name="activity_behaviour" value={formData.activity_behaviour || ""} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500" placeholder="e.g. Active, Lethargic" /></div>
                        </div>
                    </div>

                    {/* Notes & Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                        <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes / Observations</label><textarea name="notes" value={formData.notes || ""} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"></textarea></div>
                        <div className="flex justify-end items-center border-t pt-4">
                            {saveError && <span className="text-red-600 text-sm mr-4">{saveError}</span>}
                            {successMessage && <span className="text-green-600 text-sm mr-4">{successMessage}</span>}
                            <button disabled={isSaving} type="submit" className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 flex items-center disabled:opacity-50 transition-opacity">
                                <Save className="h-5 w-5 mr-2" /> {isSaving ? "Saving..." : "Save Record"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate("/livestock")} className="flex items-center text-green-600 hover:text-green-800 mb-6 font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Livestock
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN: Profile & Overview */}
            <div className="lg:col-span-1 space-y-6">
                {/* Animal Profile */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
                    <button onClick={() => navigate(`/livestock/${id}/edit`)} className="absolute top-4 right-4 text-sm text-green-600 font-medium hover:underline">Edit</button>
                    <div className="flex items-center mb-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-full mr-4 overflow-hidden border-2 border-gray-200 flex items-center justify-center">
                            {formData.photo_url ? <img src={formData.photo_url} alt={formData.tag_number} className="w-full h-full object-cover"/> : <Camera className="h-8 w-8 text-gray-400" />}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{formData.tag_number}</h2>
                            <p className="text-gray-500">{formData.type} • {formData.breed}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div><p className="text-gray-500">Age</p><p className="font-medium text-gray-900">{formData.age}</p></div>
                        <div><p className="text-gray-500">Gender</p><p className="font-medium text-gray-900">{formData.gender}</p></div>
                    </div>
                    
                    {formData.feed_type && (
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4 pt-4 border-t border-gray-100">
                        <div><p className="text-gray-500">Diet</p><p className="font-medium text-gray-900">{formData.feed_type}</p></div>
                        <div><p className="text-gray-500">Quantity</p><p className="font-medium text-gray-900">{formData.daily_quantity}</p></div>
                    </div>
                    )}
                    
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Notes</p>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{formData.notes || "No notes."}</p>
                    </div>
                </div>

                {/* Care Overview Cards */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><Activity className="h-5 w-5 text-green-600 mr-2" /> Care Overview</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Health Status</p>
                            <p className={`text-sm font-bold ${formData.health_status === 'Healthy' ? 'text-green-600' : 'text-red-600'}`}>{formData.health_status}</p>
                        </div>
                        <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Vaccination</p>
                            <p className="text-sm font-bold text-gray-900">{formData.vaccination_status}</p>
                        </div>
                        <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Last Checkup</p>
                            <p className="text-sm font-bold text-gray-900">{formData.last_checkup_date || lastCheckup}</p>
                        </div>
                        <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Next Checkup</p>
                            <p className="text-sm font-bold text-gray-900">{formData.next_checkup_date || nextCheckup}</p>
                        </div>
                        <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Medication</p>
                            <p className="text-sm font-bold text-gray-900">{formData.current_medication || "None"}</p>
                        </div>
                        <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Water</p>
                            <p className="text-sm font-bold text-gray-900">{dailyCare.water_done ? "Done Today" : formData.water_status || "Pending"}</p>
                        </div>
                    </div>
                </div>

                {/* Upcoming Reminders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><Bell className="h-5 w-5 text-amber-500 mr-2" /> Upcoming Reminders</h3>
                    
                    {(() => {
                        const allReminders = [...upcomingReminders];
                        if (formData.next_checkup_date && new Date(formData.next_checkup_date) >= new Date()) {
                            allReminders.push({ id: 'chk', record_type: 'Checkup', next_due_date: formData.next_checkup_date });
                        }
                        if (formData.next_vaccination_due && new Date(formData.next_vaccination_due) >= new Date()) {
                            allReminders.push({ id: 'vax', record_type: 'Vaccination', next_due_date: formData.next_vaccination_due });
                        }
                        if (formData.medication_due_date && new Date(formData.medication_due_date) >= new Date()) {
                            allReminders.push({ id: 'med', record_type: 'Medication', next_due_date: formData.medication_due_date, notes: formData.current_medication });
                        }
                        allReminders.sort((a,b) => new Date(a.next_due_date) - new Date(b.next_due_date));
                        
                        return allReminders.length > 0 ? (
                            <ul className="space-y-3">
                                {allReminders.map((r, i) => (
                                    <li key={r.id || i} className="flex items-start text-sm p-3 bg-amber-50 rounded-lg border border-amber-100">
                                        <Bell className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-900">{r.record_type} Due</p>
                                            <p className="text-gray-600">{new Date(r.next_due_date).toLocaleDateString()} {r.notes && `- ${r.notes}`}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 p-4 bg-gray-50 rounded-lg text-center">No upcoming care tasks.</p>
                        );
                    })()}
                </div>
            </div>

            {/* MIDDLE COLUMN: Daily Care & Records */}
            <div className="lg:col-span-1 space-y-6">
                {/* Daily Care Checklist */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center"><CheckSquare className="h-5 w-5 text-blue-500 mr-2" /> Daily Care</h3>
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{carePercent}%</span>
                    </div>
                    <div className="space-y-3 mb-4">
                        {['feeding', 'water', 'cleaning', 'exercise', 'medicine', 'observation'].map(item => (
                            <label key={item} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <input type="checkbox" checked={dailyCare[`${item}_done`]} onChange={e => {
                                    const updated = { ...dailyCare, [`${item}_done`]: e.target.checked };
                                    setDailyCare(updated);
                                }} className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500" />
                                <span className="ml-3 text-sm font-medium text-gray-700 capitalize">{item.replace('_', ' ')}</span>
                            </label>
                        ))}
                    </div>
                    <button onClick={saveDailyCare} className="w-full bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm">Save Daily Routine</button>
                </div>

                {/* Feeding Record */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><List className="h-5 w-5 text-emerald-500 mr-2" /> Feeding Record</h3>
                    <form onSubmit={saveFeeding} className="space-y-3 mb-6">
                        <div className="grid grid-cols-2 gap-3">
                            <input required type="text" name="feed_type" placeholder="Feed Type" value={feedForm.feed_type} onChange={handleFeedChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 text-sm" />
                            <input required type="text" name="quantity" placeholder="Quantity" value={feedForm.quantity} onChange={handleFeedChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input required type="time" name="time" value={feedForm.time} onChange={handleFeedChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 text-sm" />
                            <input type="text" name="notes" placeholder="Notes (Optional)" value={feedForm.notes} onChange={handleFeedChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 text-sm" />
                        </div>
                        <button type="submit" className="w-full bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-lg font-medium hover:bg-emerald-100 transition-colors text-sm">Add Feeding</button>
                    </form>
                    
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Recent Feedings</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {animal?.feeding_records?.slice().reverse().map((r, idx) => (
                            <div key={r.id || idx} className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm flex justify-between">
                                <div><span className="font-bold text-gray-800">{r.feed_type}</span> ({r.quantity})</div>
                                <div className="text-gray-500">{r.time}</div>
                            </div>
                        ))}
                        {!animal?.feeding_records?.length && <p className="text-xs text-gray-500">No feeding records yet.</p>}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Health & AI */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* AI Assistant & Symptoms */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-100 p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-green-900 flex items-center mb-4">
                        <MessageSquare className="h-5 w-5 mr-2" /> AI Vet & Symptoms
                    </h3>
                    
                    <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2 tracking-wider">1. Check Symptoms (Optional)</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {symptomList.map(sym => (
                                <button key={sym} onClick={() => toggleSymptom(sym)} className={`px-2 py-1 text-xs rounded-full font-medium transition-colors border ${selectedSymptoms.includes(sym) ? 'bg-red-100 text-red-700 border-red-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                                    {sym}
                                </button>
                            ))}
                        </div>
                        {selectedSymptoms.length > 0 && (
                            <div className={`p-3 rounded-lg border text-sm mb-4 ${urgency === 'HIGH' ? 'bg-red-50 border-red-200 text-red-800' : urgency === 'MODERATE' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
                                <p className="font-bold">Urgency: {urgency}</p>
                                <p>{concern}</p>
                            </div>
                        )}
                    </div>

                    <p className="text-xs font-semibold text-gray-600 uppercase mb-2 tracking-wider">2. Ask Assistant</p>
                    <textarea value={aiQuestion} onChange={(e) => setAiQuestion(e.target.value)} placeholder="Describe the issue or ask a question..." className="w-full p-3 rounded-lg border border-green-200 focus:ring-green-500 focus:border-green-500 mb-3 text-sm bg-white" rows="3"></textarea>
                    
                    <button onClick={askAI} disabled={aiLoading} className="w-full bg-white text-green-700 border border-green-300 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors disabled:opacity-50 text-sm">
                        {aiLoading ? "Asking AI..." : "Ask Assistant"}
                    </button>

                    {aiResponse && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-green-200 text-sm overflow-y-auto max-h-[300px] prose prose-sm prose-green">
                            <ReactMarkdown>{aiResponse}</ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Health History */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><HeartPulse className="h-5 w-5 text-rose-500 mr-2" /> Health History</h3>
                    <form onSubmit={saveHealthRecord} className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Add Record</p>
                        <div className="grid grid-cols-2 gap-3">
                            <select name="record_type" value={healthForm.record_type} onChange={handleHealthChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500">
                                <option>Checkup</option><option>Vaccination</option><option>Medicine</option><option>Treatment</option>
                            </select>
                            <input required type="date" name="date" value={healthForm.date} onChange={handleHealthChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <input type="text" name="notes" placeholder="Notes / Details" value={healthForm.notes} onChange={handleHealthChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500" />
                        <div className="flex items-center">
                            <label className="text-xs text-gray-500 mr-2 whitespace-nowrap">Next Due:</label>
                            <input type="date" name="next_due_date" value={healthForm.next_due_date} onChange={handleHealthChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <button type="submit" className="w-full bg-rose-50 text-rose-600 border border-rose-200 px-4 py-2 rounded-lg font-medium hover:bg-rose-100 transition-colors text-sm">Save Record</button>
                    </form>
                    
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                        {healthRecords.slice().reverse().map((r, i) => (
                            <div key={r.id || i} className="relative pl-4 border-l-2 border-gray-200 pb-2">
                                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-gray-400"></div>
                                <p className="text-sm font-bold text-gray-900">{r.record_type} <span className="text-gray-500 font-normal text-xs ml-2">{new Date(r.date).toLocaleDateString()}</span></p>
                                {r.notes && <p className="text-sm text-gray-600 mt-1">{r.notes}</p>}
                                {r.next_due_date && <p className="text-xs text-amber-600 mt-1 font-medium">Next Due: {new Date(r.next_due_date).toLocaleDateString()}</p>}
                            </div>
                        ))}
                        {!healthRecords.length && <p className="text-sm text-gray-500 text-center py-4">No health records yet.</p>}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}
