export const bookAppointment = async (appointmentData, token) => {
    try {
      const response = await fetch("https://arogo-ai-backend.onrender.com/api/appointments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error booking appointment");
    }
  };
  