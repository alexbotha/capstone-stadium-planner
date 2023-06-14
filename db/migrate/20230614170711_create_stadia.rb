class CreateStadia < ActiveRecord::Migration[6.1]
  def change
    create_table :stadia do |t|
      t.string :name
      t.string :address
      t.string :image_url
      t.string :about

      t.timestamps
    end
  end
end
