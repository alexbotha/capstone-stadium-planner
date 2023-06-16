class AddCountryToStadia < ActiveRecord::Migration[6.1]
  def change
    add_column :stadia, :country, :string
  end
end
