class Tour < ApplicationRecord

  validates :start_time, :end_time, presence: true

  has_many :tickets
  has_many :users, through: :tickets

  belongs_to :stadium
end
