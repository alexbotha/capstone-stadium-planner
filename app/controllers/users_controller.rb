class UsersController < ApplicationController

#Show all users 
def index 
  users = User.all 
  render json: users
end

#Signup 
def create
  user = User.create(user_params)
  if user.valid?
    session[:user_id] = user.id 
    render json: user, status: :created
  else 
    render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
  end 
end 

#Current logged in user
def show 
  user = User.find_by(id: session[:user_id])
  if user 
    render json: user, status: :ok
  else 
    render json: {error: "Not authorized"}, status: :unauthorized
  end 
end 

# def update 
#   user = User.find_by(id: session[:user_id])
#   if user
#     user.update(profile_params)
#     render json: user, status: :ok
#   else
#     render json: {error: "Not authorized to edit these details"}, status: :unauthorized
#   end 
# end 

private 

def user_params 
  params.permit(:username, :email, :password, :password_confirmation)
end 

# def profile_params
#   params.permit(:first_name, :last_name, :email, :telephone, :address, :city, :post_code, :avatar_url)
# end 

end
