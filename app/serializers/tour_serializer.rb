class TourSerializer < ActiveModel::Serializer
  attributes :id, :max_capacity, :start_time, :tour_date, :rating, :stadium_id
end
