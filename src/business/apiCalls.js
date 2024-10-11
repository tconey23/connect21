const getMessage = async () => {

    const messages = [
      { role: "user", content: "Provide a list of 21 things to love" },
      { role: "user", content: "Each thing to love should be a full sentence, not a single word" },
      { role: "user", content: "The list MUST be organized in an array format, without numbers or bullets" },
      { role: "user", content: "The array MUST follow this exact format: [\"string\", \"string\", \"string\"]" },
      { role: "user", content: "Make sure the response is a valid JSON array using double quotes (\") around each string" },
      { role: "user", content: "Do not include any graphics, icons, emojis, or explanations in the response, just the array" }
    ];
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 500,
          top_p: 1,
          temperature: 1,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error); 
      return null;
    }
  };
  
  export {getMessage}


  //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