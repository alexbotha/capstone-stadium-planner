class ReviewsController < ApplicationController
   

  def index 
    reviews = Review.all 
    render json: review, status: :ok 
  end 

  def create
    review = Review.create(review_params)
    if review.valid? 
      render json: review, status: :created 
    else 
      render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
    end 
  end

  def update 
    review = current_user.reviews.find(params[:id])
    review.update!(review_params)
    if review
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
    params.permit(:user_id, :tour_id, :review)
  end

end
