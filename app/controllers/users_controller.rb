class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]

  def index
    users = params[:query].blank? ? User.recent : User.search(params[:query])
    
    @pagy, @users = pagy(users, items: 9, link_extra: 'data-remote="true"')

    respond_to do |format|
      format.html
      format.js
      format.json { render json: { entries: render_to_string(partial: 'cards', locals: { users: @users }, formats: [:html]), pagination: view_context.pagy_bootstrap_nav(@pagy)}}
    end
  end

  def show; end

  def new
    @user = User.new
  end

  def edit; end

  def create
    @user = User.new(user_params)
    if @user.save
      paginate_list
      # @pagy, @users = pagy(User.recent, items: 9, link_extra: 'data-remote="true"')
    end
  end

  def update
    @user.update(user_params)
  end

  def destroy
    @user.destroy
    paginate_list
    # @pagy, @users = pagy(User.recent, items: 9, link_extra: 'data-remote="true"')
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :address, :contact, :avatar)
    end

    def paginate_list
      @pagy, @users = pagy(User.recent, items: 9, link_extra: 'data-remote="true"')
    end
end
