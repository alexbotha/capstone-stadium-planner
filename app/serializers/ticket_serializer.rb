class TicketSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :tour_id, :quantity, :tour, :stadium, :upcoming_tours
 

  belongs_to :tour
  has_one :stadium, through: :tour
  belongs_to :user
  

  def upcoming_tours
    object.tour.tour_date > Date.today
  end
end
