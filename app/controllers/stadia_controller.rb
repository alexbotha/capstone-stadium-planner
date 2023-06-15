class StadiaController < ApplicationController

# list all stadiums
  def index 
    stadiums = Stadium.all
    render json: stadiums, status: :ok
  end 

# Create a stadium
  def create
    stadium = Stadium.create(stadium_params)
    if stadium.valid?
      render json: stadium, status: :created 
    else 
      render json: {errors: stadium.errors.full_messages}, status: :unprocessable_entity
    end  
  end 

# Show a specific stadium 
  def show 
    stadium = Stadium.find_by(id: params[:id])
    render json: stadium, status: :ok 
  end 

private 

  def stadium_params
    params.permit(:name, :address, :image_url, :about)
  end 


end
