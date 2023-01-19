const API_KEY = "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";
      const languageSelect = document.getElementById("languageSelect");
      const skillSelect = document.getElementById("skillSelect");
      const submitBtn = document.getElementById("submitBtn");
      const displayProjectIdea = document.getElementById("displayProjectIdea");
      let cache = {};

      async function getProjectIdea(language, skill) {
        const userInput = `Generate a project idea for a ${skill} level ${language} developer.`;
        if (cache[userInput] && cache[userInput].timestamp > Date.now() - 86400000) {
          console.log("Response retrieved from cache");
          return cache[userInput].data;
        }
        
        console.log("getProjectIdea function called");
        const endpoint = "https://api.openai.com/v1/engines/text-davinci-002/completions";

        const body = {
          prompt: userInput,
          max_tokens: 250,
          stop: "Project completed",
          temperature: 0.75
        }

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(body)
        });
          const json = await response.json();
          if (json.choices && json.choices.length > 0) {
            cache[userInput] = {
              data: json.choices[0].text,
              timestamp: Date.now()
            };
            return json.choices[0].text;
          } else {
            throw new Error('No project ideas found');
          }
        } catch (error) {
          console.log(error);
        }
      }

      async function main() {
        submitBtn.addEventListener("click", async function() {
          const language = languageSelect.value;
          const skill = skillSelect.value;
          try {
            const projectIdeas = await getProjectIdea(language, skill);
            console.log(projectIdeas);
            displayProjectIdea.innerHTML = ""; // Clear the previous content
            const list = document.createElement("ul"); // Create a new unordered list element
            list.style.listStyleType = "none"; // Remove bullet points
            list.style.paddingLeft = "20px"; // Indent the bullet points
            projectIdeas.split("\n").forEach(idea => { // Split the text into lines
              if (idea !== "") { // Ignore empty lines
                const item = document.createElement("li"); // Create a new list item
                item.innerText = idea; // Set the text of the list item
                list.appendChild(item); // Add the list item to the unordered list
              }
            });
            displayProjectIdea.appendChild(list); // Add the unordered list to the displayProjectIdea element
          } catch (error) {
            console.log(error);
            displayProjectIdea.innerText = "Error: " + error.message;
          }
        });
      }

      main();
