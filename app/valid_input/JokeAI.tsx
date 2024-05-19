import OpenAI from "openai";

const openai = new OpenAI({
  //took this out for git push
  apiKey: "",
  dangerouslyAllowBrowser: true
});

export async function getJoke(zodiac: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: `You are an ai assistant that ouputs jokes. 
      ONLY OUPUT THE JOKE NO SAYING STUFF LIKE SURE, OFCOURSE, ETC BEFORE SAYING THE JOKE` },
      { role: "user", content: `Tell me a funny joke about ${zodiac}.` }
    ],
    model: "gpt-3.5-turbo",
  });

  //return completion.choices[0].message.content;

  //need defualt value for no error
  const joke = completion.choices[0]?.message?.content ?? "Error generating joke";
  return joke;

}

//https://platform.openai.com/docs/quickstart?lang=ChatCompletions
