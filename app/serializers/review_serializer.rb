class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :tour_id, :review, :user_username, :rating, :stadium

  def user_username
    object.user.username
  end

 
end
