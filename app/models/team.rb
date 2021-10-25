class Team < ApplicationRecord
  has_many :team_users, dependent: :destroy, inverse_of: :team
  has_many :users, through: :team_users

  validates :name, presence: true
end
