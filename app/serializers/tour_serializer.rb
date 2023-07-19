class TourSerializer < ActiveModel::Serializer
  attributes :id, :max_capacity, :start_time, :tour_date, :rating, :stadium, :reviews, :upcoming_tours, :tickets

#has_many :tickets 
#belongs_to :stadium
has_many :users, through: :tickets

def upcoming_tours
  object.tour_date > Date.today
end 

end
