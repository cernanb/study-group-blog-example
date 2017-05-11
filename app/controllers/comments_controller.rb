class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]
  before_action :set_post, only: [:create, :destroy]

  def create
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user
    @comment.save
    redirect_to post_path(@post)
  end

  def destroy
    comment = Comment.find_by_id(params[:id])
    comment.delete
    redirect_to post_path(@post)
  end

  protected
    def comment_params
      params.require(:comment).permit(:content)
    end

    def set_post
      @post = Post.find_by_id(params[:comment][:post_id])
    end
end
