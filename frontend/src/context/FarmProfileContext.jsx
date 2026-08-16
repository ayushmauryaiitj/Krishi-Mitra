import React, { createContext, useState, useEffect, useContext } from "react";

const FarmProfileContext = createContext();

export const useFarmProfile = () => useContext(FarmProfileContext);

export const FarmProfileProvider = ({ children }) => {
  const defaultProfile = {
    farmerName: "",
    state: "Maharashtra",
    district: "",
    village: "",
    primaryCrop: "Wheat",
    farmSize: "",
    soilType: "Loamy",
    irrigationType: "Rainfed",
  };

  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("krishimitra_farm_profile");
      if (savedProfile) {
        return { ...defaultProfile, ...JSON.parse(savedProfile) };
      }
    } catch (error) {
      console.error("Error reading farm profile from localStorage", error);
    }
    return defaultProfile;
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "krishimitra_farm_profile" && e.newValue) {
        try {
          setProfile({ ...defaultProfile, ...JSON.parse(e.newValue) });
        } catch (err) {
          console.error("Failed to parse cross-tab storage update", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("krishimitra_farm_profile", JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (newProfileData) => {
    setProfile((prev) => ({ ...prev, ...newProfileData }));
  };

  return (
    <FarmProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </FarmProfileContext.Provider>
  );
};
