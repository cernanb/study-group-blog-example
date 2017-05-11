class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_action :set_post, only: [:show, :edit, :update, :destroy, :next]

  def index
    @posts = Post.all
    respond_to do |f|
      f.html
      f.json {render json: @posts}
    end
  end

  def new
    @post = Post.new
    @tags = @post.tags.build
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save!
      redirect_to post_path(@post)
    else
      render 'new'
    end
  end

  def next
    @next_post = @post.next
    render json: @next_post
  end

  def show
    @comment = @post.comments.build
    respond_to do |f|
      f.html
      f.json {render json: @post}
    end
  end

  def api_show
    render json: @post
  end

  def api_next
    @next_post = @post.next
    render json: @next_post
  end

  def edit
    @tags = @post.tags.build
  end

  def update
    if @post.update(post_params)
      redirect_to post_path(@post)
    else
      render 'edit'
    end
  end

  def destroy
    @post.destroy
    redirect_to posts_path
  end

  protected

    def set_post
      @post = Post.find_by_id(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :content, tag_ids: [], tags_attributes: [:name])
    end

end
