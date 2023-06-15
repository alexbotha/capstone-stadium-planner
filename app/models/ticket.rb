class Ticket < ApplicationRecord

  validates :quantity, presence: true

  validate :check_max_capacity 

  belongs_to :user
  belongs_to :tour

  private 

# Model cannot directly render a JSON response. Model not responsible for handling HTTP responses. Instead we add an error to the models generic 'base' attribute which is used for adding errors to the model object itself
  def check_max_capacity
    if tour.tickets.count > tour.max_capacity
      errors.add(:base, "Maximum capacity of 20 reached.")
  end
end 

end
