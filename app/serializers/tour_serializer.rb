class TourSerializer < ActiveModel::Serializer
  attributes :id, :stadium_id, :max_capacity, :start_time, :end_time
end
