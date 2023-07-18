class StadiaController < ApplicationController
  before_action :auth

# list all stadiums
  def index 
    stadiums = Stadium.all
    render json: stadiums, status: :ok
  end 

# Create a stadium
  # def create
  #   stadium = Stadium.create(stadium_params)
  #   if stadium.valid?
  #     render json: stadium, status: :created 
  #   else 
  #     render json: {errors: stadium.errors.full_messages}, status: :unprocessable_entity
  #   end  
  # end 

# Show a specific stadium 
  def show 
    stadium = Stadium.find_by(id: params[:id])
    render json: stadium, status: :ok 
  end 

  # def update 
  #   stadium = Stadium.find_by(id: params[:id])
  #   if stadium
  #     stadium.update!(stadium_params)
  #     render json: stadium, status: :ok
  #   else
  #     render json: {error: "Not authorized to edit these details"}, status: :unauthorized
  #   end 
  # end 

 private 

  # def stadium_params
  #   params.permit(:name, :address, :image_url, :about, :country, :rating)
  # end 

  def auth
    return render json: {error: "Not authorized. Please log in or sign up"}, status: :unauthorized unless session.include? :user_id
  end 



end
