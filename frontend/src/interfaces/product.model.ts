export interface Comment {
    user: string;
    text: string;
    date: Date;
  }
  
  export interface Product {
    _id: string
    name: string;
    image: string; 
    color: string;
    price: number;
    description: string;
    category: string;
    amount?: number;
    gender: 'Male' | 'Female' | 'Unisex';
    likes: number;
    dislikes: number;
    stock: boolean;
    comments: Comment[];
  }
  