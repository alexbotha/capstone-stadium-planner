class User < ApplicationRecord
  has_secure_password 

  validates :username, :email, :password, :password_confirmation, presence: true 

  validates :email, uniqueness: true
  validates :username, uniqueness: true
  validates :password, length: {minimum: 5}

  has_many :tickets
  has_many :tours, through: :tickets
  has_many :reviews

  def has_review_for_tour(tour)
    reviews.exists?(tour: tour)
  end 
  
end
