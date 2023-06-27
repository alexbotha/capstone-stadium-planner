class Stadium < ApplicationRecord
  validates :name, :address, :image_url, :about, :rating, :country, presence: true
 
  has_many :tours
  has_many :reviews, through: :tours

end
