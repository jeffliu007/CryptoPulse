import { OpenAI } from "openai";

let openai = null;
let error = null;

if (process.env.REACT_APP_OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
} else {
  error = "OpenAI API key is missing. Please provide an API key.";
}

export { openai, error };
