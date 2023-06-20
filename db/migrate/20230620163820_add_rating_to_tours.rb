class AddRatingToTours < ActiveRecord::Migration[6.1]
  def change
    add_column :tours, :rating, :integer
  end
end
