class SessionsController < ApplicationController

  #Login 
  def create 
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else 
      render json: {error: "Invalid username or password"}, status: :unauthorized
    end
  end 

  #logout aka destroy session 
  def destroy 
    session.clear
  end 
  
end
