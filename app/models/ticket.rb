class Ticket < ApplicationRecord

  validates :quantity, presence: true

  belongs_to :user
  belongs_to :tour
end
