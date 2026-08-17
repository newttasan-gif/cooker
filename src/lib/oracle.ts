import { supabase } from './supabase';

type OracleResponse = { text?: unknown; error?: unknown };

export async function askOracle(question: string, system: string) {
  const { data, error } = await supabase.functions.invoke<OracleResponse>('ai', {
    body: { prompt: question, system },
  });
  if (error) throw new Error('Малое Солнце сейчас не может ответить. Попробуй ещё раз.');
  if (typeof data?.error === 'string') throw new Error(data.error);
  if (typeof data?.text !== 'string') throw new Error('Ответ потерялся в свете. Попробуй ещё раз.');
  return data.text;
}
