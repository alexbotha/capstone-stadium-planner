class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :tour_id, :review
end
