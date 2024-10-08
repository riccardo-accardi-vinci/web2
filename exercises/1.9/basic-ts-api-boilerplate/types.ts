interface MyMovie {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: URL;
}

interface TextToType {
  id: string;
  content: string;
  level: "easy" | "medium" | "hard";
}

export type { MyMovie, TextToType };
