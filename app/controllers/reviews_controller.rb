class ReviewsController < ApplicationController
   

  def index 
    reviews = Review.all 
    render json: reviews, status: :ok 
  end 

  # In order for a user to create a review the user must have a ticket that belongs to a tour. This will allow a user to leave a review. If the user tries to leave a review for a tour but they do not have a ticket for that tour then they can not leave a review. 

  # find the user, find the tour, then look in the user.tickets to see the users tickets. In a ticket object will be a foreign key - tour_id. If the user.tickets has an tour.id in the tour_id key then that means the user has a ticket for that tour. A user ticket will always have a value of tour.id in the tour_id key because a ticket cannot be created without a tour.id thanks to the validations in our model.
  def create
    tour = Tour.find(params[:tour_id])
    user = current_user

    if user_has_ticket?(user, tour)
      review = Review.new(review_params)
      
      if review.save 
        render json: review, status: :created
      else 
        render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
      end 
    else
      render json: { error: "You must have a ticket for this tour to leave a review." }, status: :unprocessable_entity
    end
  end
  
  def show
    stadium = Stadium.find(params[:id])
  end 

  def update 
    review = current_user.reviews.find(params[:id])
    review.update(review_params)
    if review.valid?
      render json: review, status: :ok
    else 
      render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
    end 
  end 

  def destroy
    review = Review.find(params[:id])
    if review.user_id == session[:user_id]
    review.destroy 
    else 
      render json: {error: "You do not have permission to delete this review."}, status: :unauthorized
      end 
  end

  private
   
  def current_user
    User.find_by(id: session[:user_id])
  end 

  def review_params
    params.permit(:user_id, :tour_id, :review, :rating)
  end

  def user_has_ticket?(user, tour)
    user.tickets.exists?(tour_id: tour.id)
  end 

end
