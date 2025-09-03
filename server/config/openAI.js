import "dotenv/config";

export const MODEL = process.env.OPENAI_MODEL ?? "gpt-3.5-turbo";
export const USER_ROLE = process.env.OPENAI_USER_ROLE ?? "user";
export const ASSISTANT_ROLE = process.env.OPENAI_ASSISTANT_ROLE ?? "system";

export const API_KEY = (() => {
  const v = process.env.OPENAI_API_KEY;
  if (!v) throw new Error("Missing OPENAI_API_KEY in environment");
  return v;
})();
