class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :telephone
      t.string :address
      t.string :city
      t.string :post_code
      t.string :avatar_url

      t.timestamps
    end
  end
end
