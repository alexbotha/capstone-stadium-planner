class ChangeStartTimeColumnTypeAgainInTours < ActiveRecord::Migration[6.1]
  def change
    change_column :tours, :start_time, :string

  end
end
