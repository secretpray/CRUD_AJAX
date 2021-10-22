class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]

  def index
    unless params[:query].blank?
      users = User.search(params[:query]) # User.search(params[:query].to_s.downcase)
    else
      users =  User.recent
    end
    @pagy, @users = pagy(users, items: 10, link_extra: 'data-remote="true"')
  end

  def show; end

  def new
    @user = User.new
  end

  def edit; end

  def create
    @user = User.new(user_params)
    if @user.save
      @pagy, @users = pagy(User.recent, items: 10, link_extra: 'data-remote="true"')
    end
  end

  def update
    @user.update(user_params)
  end

  def destroy
    @user.destroy
    @pagy, @users = pagy(User.recent, items: 10, link_extra: 'data-remote="true"')
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :address, :contact)
    end
end
