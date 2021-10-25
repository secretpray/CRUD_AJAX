class User < ApplicationRecord
  has_many :team_users, dependent: :destroy, inverse_of: :user
  has_many :teams, through: :team_users
  has_one_attached :avatar

  validates :name, presence: true
  validates :email, :address, presence: true, uniqueness: {case_sensitive: false}

  scope :recent, -> { User.order(created_at: :desc) }
  scope :search, ->(query) { where('name ILIKE ? OR email ILIKE ?', "%#{query}%", "%#{query}%").order(created_at: :desc) } # ILIKE  only in postgreSQL

  # def self.parse_filter_params(params)
  #   case
  #   when !params[:filter_name].blank?
  #     @users = User.where('name ILIKE ? OR email ILIKE ?', "%#{params[:filter_name]}%", "%#{params[:filter_name]}%")
  #     # @users = result.includes(:team, :user)
  #     #               .where('name ILIKE ? OR description ILIKE ?', "%#{params[:filter_name]}%", "%#{params[:filter_name]}%")
  #   # when !params[:description].blank?
  #   #   @ingredients = Bio.joins(:action_text_rich_text)
  #   #                       .where("action_text_rich_texts.body ILIKE ?", "%#{params[:description]}%")
  #   #   @recipes = Recipe.joins(:ingredients).where("ingredients.id" => @ingredients)
  # when !params[:age].blank?
  #     @users = @users.where("age LIKE ?", "%#{params[:age]}%")
  #   else
  #     @users = @users.includes(:team)
  #   end
  # end
end
