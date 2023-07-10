class ToursController < ApplicationController
  
  def index 
    tours = Tour.all 
    if tours
    render json: tours, status: :ok
  else 
    render json: {error: "There are no tour dates available"} 
  end 
end

  def create 
    tour = Tour.create(tour_params)
    if tour.valid?
      render json: tour, status: :created 
      else
        render json: {errors: tour.errors.full_messages}, status: :unprocessable_entity
      end 
  end 

  def show
    tour = Tour.find_by(id: params[:id])
    if tour
      if tour.valid?
        render json: tour, status: :ok
      else
        render json: { error: tour.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "There are no tour dates available" }, status: :not_found
    end
  end

  def destroy 
    tour = Tour.find_by(id: params[:id])
    tour.destroy 
  end 

  private 

  def tour_params
    params.permit(:start_time, :tour_date, :stadium_id, :max_capacity, :rating)
  end 

 
end
