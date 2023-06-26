class ChangeStartTimeColumnTypeInTours < ActiveRecord::Migration[6.1]
  def change
    change_column :tours, :start_time, :time

  end
end
