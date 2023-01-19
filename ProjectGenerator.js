const API_KEY = "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";
const { value: languageSelect } = document.getElementById("languageSelect");
const { value: skillSelect } = document.getElementById("skillSelect");
const submitBtn = document.getElementById("submitBtn");
const displayProjectIdea = document.getElementById("displayProjectIdea");

async function getProjectIdea(language, skill) {
  document.getElementById("loading").style.display = "block"; 
  console.log("getProjectIdea function called");
  const endpoint = "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const body = {
    prompt: `Generate a project idea for a ${skill} level ${language} developer.`,
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
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { choices } = await response.json();
    if (choices && choices[0] && choices[0].text) {
      const { text } = choices[0];
      document.getElementById("loading").style.display = "none"; 
      return text;
    } else {
      throw new Error("No text returned from API");
    }
  } catch (err) {
    console.error(err);
    document.getElementById("loading").style.display = "none"; 
  }
}

submitBtn.addEventListener("click", async function() {
  const selectedLanguage = languageSelect;
  const selectedSkill = skillSelect;
  try {
    const projectIdeas = await getProjectIdea(selectedLanguage, selectedSkill);
    console.log(projectIdeas);
    displayProjectIdea.textContent = "";
    const list = document.createElement("ul");
    list.style.listStyleType = "none";
    list.style.paddingLeft = "20px";
    projectIdeas.split("\n").forEach(idea => {
      if (idea !== "") {
        const item = document.createElement("li");
        item.textContent = idea;
        list.appendChild(item);
      }
    });
    displayProjectIdea.appendChild(list);
  } catch (error) {
    console.log(error);
    displayProjectIdea.textContent = "Error: " + error.message;
  }
});
