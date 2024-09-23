interface MyMovie {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: URL;
}

export type { MyMovie };
