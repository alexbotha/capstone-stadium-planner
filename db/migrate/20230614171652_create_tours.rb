class CreateTours < ActiveRecord::Migration[6.1]
  def change
    create_table :tours do |t|
      t.integer :stadium_id
      t.integer :max_capacity
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps
    end
  end
end
