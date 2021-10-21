class User < ApplicationRecord
  validates :name, presence: true
  validates :email, :address, presence: true, uniqueness: {case_sensitive: false}

  scope :recent, -> { User.order(created_at: :desc) }
end
