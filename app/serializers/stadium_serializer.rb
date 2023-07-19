class StadiumSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :image_url, :rating, :about, :country, :tours, :reviews, :average_rating
  
  #, :tickets 

has_many :reviews, through: :tours
 #has_many :tours
#  has_many :tickets, through: :tours
  
 def average_rating 
  object.reviews.average(:rating).to_f 
end 
     
end
