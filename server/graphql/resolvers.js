import Post from "../models/Post.js";
import Comment from "../models/Comment.js"

export const resolvers = {
  Query: {
    posts: async () => await Post.find(),
    post: async (_, {_id}) => await Post.findById(_id),
    comments: async () => await Comment.find(),
    comment: async (_, {_id}) => await Comment.findById(_id)
  },
  Mutation: {
    createPost: async (_, { image, title, body }) => {
      const post = new Post({
        image,
        title,
        body,
      });
      const savedPost = await post.save();
      console.log(savedPost);
      return savedPost;
    },

    createComment: async (_, {comment, postId}) => {

        const postFound = await Post.findById(postId);
        if(!postFound) throw new Error ('Post no encontrado');

        const comment1 = new Comment({
            comment,
            postId,
        });
        const commentSaved = await comment1.save();
        return commentSaved;

    },

    deletePost: async (_, {_id}) => {
        const deletedPost = await Post.findByIdAndDelete(_id);
        if(!deletedPost) throw new Error ('Post no encontrado');
        await Comment.deleteMany({postId: deletedPost._id});
        return deletedPost;
    },

    deleteComment: async (_, {_id}) => {
        const deletedComment = await Comment.findByIdAndDelete(_id);
        if(!deletedComment) throw new Error ('Comentario no encontrado');
        return deletedComment;
    },
    
    updatePost: async(_,args) => {
        const updatedPost = await Post.findByIdAndUpdate(args._id, args, {
            new: true,
        });
        if(!updatedPost) throw new Error('Post not found');
        return updatedPost;
    },

    updateComment: async (_, args) => {
        const updatedComment = await Comment.findByIdAndUpdate(args._id, args, {
            new: true,
        });
        if(!updatedComment) throw new Error('Comment not found');
        return updatedComment;
    }
  },
  Post: {
    comments: async (parent) => {
      return await Comment.find({postId: parent._id});
    },
  },
  Comment: {
    post: async (parent) => await Post.findById(parent.postId)
  }

};
