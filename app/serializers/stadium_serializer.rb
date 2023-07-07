class StadiumSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :image_url, :rating, :about, :country, :tours, :reviews, :average_rating

 has_many :reviews, through: :tours
  
 def average_rating 
  object.reviews.average(:rating).to_f 
end 
     
end
