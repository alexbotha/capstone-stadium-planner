class Ticket < ApplicationRecord

  validates :quantity, presence: true, numericality: { greater_than: 0 }


  validate :validate_max_capacity

  belongs_to :user
  belongs_to :tour

  private 

def validate_max_capacity
  total_booked_tickets = tour.tickets.sum(:quantity)
  if total_booked_tickets + quantity.to_i > tour.max_capacity
    errors.add(:quantity, "of tour has reached maximum capacity")
  end
end

end

# Model cannot directly render a JSON response. Model not responsible for handling HTTP responses. Instead we add an error to the models generic 'base' attribute which is used for adding errors to the model object itself

# Create a variable called total_booked_tickets

# Calculate the total quantity of tickets booked for a tour by summing up the quantity attribute of all existing tickets. Tour => Tickets => Take the quantity of each ticket instance => sum the values from quantity up

# Compare the sum of exisiting tickets with the quantity of the current ticket being created - quantity.to_i 

# Run some logic to see if that is greater than the tour.max_capacity.

# If that is the case add an error to the quantity attribute 

