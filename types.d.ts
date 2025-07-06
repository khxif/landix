interface Fragment {
  _id: string;
  title: string;
  code: string;
}

interface Message {
  _id: string;
  content: string;
  role: 'user' | 'assistant';
  fragment?: Fragment;
}

interface Project {
  _id: string;
  title: string;
  createdBy: string;
  messages: Message[];
}