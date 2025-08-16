export async function submitDataToSheet(data) {
  const scriptURL = "https://script.google.com/macros/s/AKfycbzy5UdIB1w4C5KlN3dFqGVb59yw4GFu9X4LuwcXRB-ThH-4ZZ7XM0lBHQTEkVWxGvje/exec";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    return response.ok; // true if request succeeded
  } catch (error) {
    console.error("❌ Error adding data:", error);
    return false;
  }
}
