import { Comment } from "./comment.model";

export class Post {
  id: string;
  type: string;
  postDate: Date;
  description: string;
  comments: Array<Comment>;
}
