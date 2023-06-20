class AddRatingToStadia < ActiveRecord::Migration[6.1]
  def change
    add_column :stadia, :rating, :integer
  end
end
