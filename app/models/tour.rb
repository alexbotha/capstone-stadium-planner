class Tour < ApplicationRecord
  validates :start_time, presence: true

  belongs_to :stadium
  
  has_many :tickets
  has_many :reviews
  
  has_many :users, through: :tickets

  def reviewed_by_user?(user)
    reviews.exists?(user: user)
  end

end
 
