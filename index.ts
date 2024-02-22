const office: {
  officeId: number,
  isOpened: boolean,
  contacts: {
    phone: string,
    email: string,
    address: {
      city: string,
    }
  }
} = {
  "officeId": 45,
  "isOpened": false,
  "contacts": {
      "phone": "+79100000000",
      "email": "my@email.ru",
      "address": {
          "city": "Москва"
      }
  }
}

// {
//   "topicId": 5,
//   "status": "published" // "draft", "deleted"
// }

/* Ответ */
// [
//   {
//       "question": "Как осуществляется доставка?",
//       "answer": "быстро!",
//       "tags": [
//           "popular",
//           "new"
//       ],
//       "likes": 3,
//       "status": "published"
//   }
// ]

enum PostStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  DELETED = 'deleted',
}

type RequestObj = {
  topicId: number,
  status?: PostStatus,
}

type PostEntity = {
  question: string,
  answer: string,
  tags: string[],
  likes: number,
  status: PostStatus
}

async function getFaqs(req: RequestObj): Promise<PostEntity[]> {
  const res = await fetch('/faqs', {
      method: 'POST',
      body: JSON.stringify(req)
  });
  const data: PostEntity[] = await res.json();
  return data;
}
