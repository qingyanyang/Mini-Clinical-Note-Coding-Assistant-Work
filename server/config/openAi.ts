import "dotenv/config";

export const GPT_MODEL = process.env.OPENAI_MODEL ?? "gpt-3.5-turbo";
export const USER_ROLE = "user";
export const ASSISTANT_ROLE = "assistant";

export const OPENAI_API_KEY = (() => {
  const v = process.env.OPENAI_API_KEY;
  if (!v) throw new Error("Missing OPENAI_API_KEY in environment");
  return v;
})();
