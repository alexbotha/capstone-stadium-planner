# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tour_times = ['10:00', '14:00', '18:00']


stadium_ids = [1, 2, 3, 4, 5] 


start_date = Date.today
end_date = Date.today + 30.days

(start_date..end_date).each do |date|
 
  tour_times.each do |time|
    stadium_ids.each do |stadium_id|
      Tour.create(
        stadium_id: stadium_id,
        tour_date: date,
        start_time: time,
        max_capacity: 20,
        rating: 0  
      )
    end
  end
end