class Review < ApplicationRecord

  validates :review, presence: true
  validates_length_of :review, minimum: 10, maximum: 1000, allow_blank: false

  belongs_to :user
  belongs_to :tour
end
