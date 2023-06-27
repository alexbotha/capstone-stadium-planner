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
    ticket = current_user.tickets.build(ticket_params)
    if ticket.save
      render json: ticket, status: :created
    else
      if ticket.errors[:base].present?
        render json: { errors: ticket.errors[:base] }, status: :unprocessable_entity
      else
        render json: { errors: ticket.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def update 
    ticket = current_user.tickets.find(params[:id])
    ticket.update(ticket_params)
    if ticket.valid?
      render json: ticket, status: :ok
    else
      if ticket.errors[:base].present?
        render json: {error: "Maximum capacity of 20 reached."}, status: :unprocessable_entity
      else 
      render json: {error: ticket.errors.full_messages}, status: :unprocessable_entity
    end 
  end
  end 

  def destroy 
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
    params.permit(:user_id, :tour_id, :quantity, :id)
  end

  def find_ticket
    Ticket.find(params[:id])
  end 
 
end

# Using build will instantiate a new object in memory but does not persist this object to the database. 

# ticket.save checks if the new ticket instance can be saved successfully. The save method attempts to save the instance to the db and returns 'true' if the save operation is successful or 'false' if there any any validation errors or other issues preventing it being saved to the db 

# If ticket.save is false, we enter the else. We have additional conditional check. This checks if there any any errors specifically added to the :base attribute of the ticket instance. These are added in the custom validation 

# If there are no errors in the :base attribute it means there are other validation errors not related to :base. In this case, we render json with "full.error.messages" from the instance. 

# Build provides us more control. 

# When we use create, it persists an object to the database instantly. If any validations are not met, the object is not persisted. This means our custom methods are never ran, because our validations fail and an error is raised. Likewise, if they do pass, then it's saved to the db. Our custom methods run, but it's now too late. The instance has already been saved. That is why we use .build because it allows us to run ALL of our validations actrec/custom BEFORE it's saved.