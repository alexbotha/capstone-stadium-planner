class Ticket < ApplicationRecord

  validates :quantity, presence: true

  validate :validate_max_capacity

  belongs_to :user
  belongs_to :tour

  private 

# Model cannot directly render a JSON response. Model not responsible for handling HTTP responses. Instead we add an error to the models generic 'base' attribute which is used for adding errors to the model object itself
def validate_max_capacity
  total_booked_tickets = tour.tickets.sum(:quantity)
  if total_booked_tickets > tour.max_capacity
    errors.add(:base, "Tour has reached maximum capacity")
  end
end


end