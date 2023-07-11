class Review < ApplicationRecord

  validates :review, :rating, presence: true
  validates :user_id, uniqueness: { scope: :tour_id }
  validates_length_of :review, minimum: 10, maximum: 1000, allow_blank: false

  belongs_to :user
  belongs_to :tour
  has_one :stadium, through: :tour


end
