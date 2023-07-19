class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :tickets
  has_many :tours, through: :tickets
  has_many :reviews
end
