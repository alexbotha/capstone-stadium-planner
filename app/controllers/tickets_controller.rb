class TicketsController < ApplicationController

  def index
    tickets = Ticket.all
    render json: tickets, status: :ok
  end 

  def show 
    ticket = current_user.tickets.find_by(id: params[:id])
    render json: ticket, status: :ok
  end 

  def create 
    ticket = current_user.tickets.create(ticket_params)
    if ticket.valid?
      render json: ticket, status: :created 
    else 
      render json: {errors: ticket.errors.full_messages}, status: :unprocessable_entity
    end
  end 

  def update 
    ticket = current_user.tickets.find(params[:id])
    ticket.update(ticket_params)
    if ticket.valid?
      render json: ticket, status: :ok
    else
      render json: {error: ticket.errors.full_messages}, status: :unprocessable_entity
    end 
  end 

  def delete 
    ticket = find_ticket
    if ticket.user_id == session[:user_id]
      ticket.destroy 
    else 
      render json: {error: "You do not have permission to delete this ticket"}, status: :unauthorized 
      end 
    end 

  private 

  def current_user
    User.find_by(id: session[:user_id])
  end

  def ticket_params
    params.permit(:user_id, :id, :tour_id, :quantity)
  end

  def find_ticket
    Ticket.find(params[:id])
  end 
 
end
