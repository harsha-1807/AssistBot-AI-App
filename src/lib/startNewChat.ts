export default async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: string
) {
  try {
    // 1.  Create a new guest entry
    const guestResponse = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: guestName, email: guestEmail }),
    });

    if (!guestResponse.ok) {
      throw new Error("Failed to create guest");
    }

    const guestData = await guestResponse.json();
    const guestId = guestData.id; // Extract guest ID
    console.log(guestId);

    // 2. Initialize a new chat session
    const chatResponse = await fetch("/api/chatbot-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestId, chatbotId }),
    });
    const chatSessionData = await chatResponse.json();
    const chatSessionId = chatSessionData.id;
    console.log(chatSessionData);

    if (!chatResponse.ok) {
      throw new Error("Failed to create chat session");
    }
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatSessionId: chatSessionId,
        sender: "ai",
        content: `Welcome ${guestName}!\n How can I assist you today?`,
      }),
    });

    return chatSessionId;
  } catch (error) {
    console.error("Error starting new chat session:", error);
    return null;
  }
}
