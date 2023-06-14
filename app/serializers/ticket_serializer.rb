class TicketSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :tour_id, :quantity
end
