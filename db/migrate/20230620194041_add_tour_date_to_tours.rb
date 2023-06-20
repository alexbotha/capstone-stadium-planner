class AddTourDateToTours < ActiveRecord::Migration[6.1]
  def change
    add_column :tours, :tour_date, :date
  end
end
