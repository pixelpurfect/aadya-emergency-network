import React, { useState } from 'react';



const SOSPage = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);


  const handleSOS = async () => {
    const type = await classifyEmergency();
  
    const payload = {
      description,
      location,
      emergencyType: type,
      timestamp: new Date().toISOString(),
    };
  
    console.log("🚨 Emergency Data:", payload);
  
    alert(`SOS triggered!\nType: ${type}\nLocation: ${location?.lat}, ${location?.lng}`);
  };
  

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          alert("Location access denied or unavailable.");
        }
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
  };
  const classifyEmergency = async () => {
    // Mock classifier for now
    if (!description) return "unknown";
  
    const keywords = {
      fire: ["burn", "fire", "flames"],
      accident: ["accident", "crash", "injury"],
      medical: ["blood", "unconscious", "pain"],
      crime: ["robbery", "assault", "attack"],
      mental: ["depression", "suicide", "anxiety"],
    };
  
    for (let type in keywords) {
      for (let word of keywords[type]) {
        if (description.toLowerCase().includes(word)) return type;
      }
    }
  
    return "general";
  };
  
  

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Aadya Emergency Response</h1>

      <textarea
        className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-400"
        rows={4}
        placeholder="Describe the emergency..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

<button
  className="mt-4 mb-2 bg-blue-500 text-white font-semibold px-6 py-2 rounded shadow hover:bg-blue-600 transition"
  onClick={detectLocation}
>
  📍 Detect Location
</button>

{location && (
  <p className="text-sm text-gray-600">
    Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
  </p>
)}


      <button
        className="mt-6 bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition"
        onClick={handleSOS}
      >
        🚨 Trigger SOS
      </button>
    </div>
  );
};

export default SOSPage;
