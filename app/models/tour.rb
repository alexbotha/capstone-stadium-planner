class Tour < ApplicationRecord

  validates :start_time, :end_time, presence: true
  validates :max_capacity, numericality: { less_than_or_equal_to: 20 }


  has_many :tickets
  has_many :users, through: :tickets

  belongs_to :stadium
end
