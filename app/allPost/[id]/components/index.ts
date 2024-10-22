export type Review = {
  post: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      title: string;
      content: string | null;
      published: boolean;
      authorId: number;
      planId: number;
    }
  ];
};
