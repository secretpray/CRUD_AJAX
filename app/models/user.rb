class User < ApplicationRecord
  validates :name, presence:true
  validates :email, :address, presence:true, uniqueness: {case_sensitive: false}
end
