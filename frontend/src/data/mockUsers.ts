import type { User } from '../types/User';

export const mockUsers: User[] = [
    {
        id: 1,
        name: "山田太郎",
        age: 24,
        location: "東京",
        bio: "AWSとPythonを勉強しています。一緒に勉強できる方を探しています！",
        avatarUrl: "https://i.pravatar.cc/300?img=12",
        studyFields: ["AWS", "Python"],
        studyTime: "平日夜",
        goal: "AWS SAA取得",
    },
    {
    id: 2,
    name: "佐藤花子",
    age: 23,
    location: "横浜",
    bio: "Reactを勉強中です。休日に一緒に勉強できる方を探しています。",
    avatarUrl: "https://i.pravatar.cc/300?img=47",
    studyFields: ["React", "TypeScript"],
    studyTime: "休日",
    goal: "Webエンジニア転職",
  },
  {
    id: 3,
    name: "鈴木健太",
    age: 26,
    location: "東京",
    bio: "資格取得に向けて毎日勉強しています。",
    avatarUrl: "https://i.pravatar.cc/300?img=33",
    studyFields: ["Java", "AWS"],
    studyTime: "平日夜",
    goal: "資格取得",
  },
];