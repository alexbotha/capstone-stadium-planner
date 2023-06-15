class ToursController < ApplicationController
  
  def index 
    tours = Tour.all 
    render json: tour, status: :ok
  end 

  def create 
    tour = Tour.create(tour_params)
    if tour.valid?
      render json: tour, status: :created 
      else
        render json: {errors: tour.errors.full_messages}, status: :unprocessable_entity
      end 
  end 

  private 

  def tour_params
    params.permit(:start_time, :end_time, :stadium_id, :id, :max_capacity)
  end 

 
end
