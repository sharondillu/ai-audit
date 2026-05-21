// utils/sendEmail.js

export const sendPricingUpdateEmail = async ({ email, reportId, changes }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, reportId, changes }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Email error:", data);
      return { success: false };
    }

    console.log("✅ Email sent to:", email, data);
    return { success: true };

  } catch (error) {
    console.error("❌ Failed:", error);
    return { success: false };
  }
};