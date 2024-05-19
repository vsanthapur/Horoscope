import OpenAI from "openai";

const openai = new OpenAI({
  //took this out for git push
  apiKey: "",
  dangerouslyAllowBrowser: true
});

export async function getImage(zodiac: string): Promise<string> {
    const image = await openai.images.generate({ 
        model: "dall-e-3",
        prompt: "An artistic representation of the zodiac sign ${zodiac}",
        n: 1,
        size: "1024x1024", 

    });
  
    const imageUrl = image.data[0]?.url ?? "Error generating image";
    return imageUrl;

    
  }

  //https://platform.openai.com/docs/guides/images/usage