class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]

  def index
    @pagy, @users = pagy(User.recent, items: 10)
  end

  def show; end

  def new
    @user = User.new
  end

  def edit; end

  def create
    @user = User.new(user_params)
    @user.save
    @index = User.count # (for use as index number in table Users)
    @pagy, @users = pagy(User.recent, items: 10) # make new pagination
  end

  def update
    @user.update(user_params)
  end

  def destroy
    @user.destroy
    binding.pry
    @pagy, @users = pagy(User.recent, items: 10) # make new pagination
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :address, :contact)
    end
end
