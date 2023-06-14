class StadiaController < ApplicationController
  before_action :set_stadium, only: [:show, :update, :destroy]

  # GET /stadia
  def index
    @stadia = Stadium.all

    render json: @stadia
  end

  # GET /stadia/1
  def show
    render json: @stadium
  end

  # POST /stadia
  def create
    @stadium = Stadium.new(stadium_params)

    if @stadium.save
      render json: @stadium, status: :created, location: @stadium
    else
      render json: @stadium.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stadia/1
  def update
    if @stadium.update(stadium_params)
      render json: @stadium
    else
      render json: @stadium.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stadia/1
  def destroy
    @stadium.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stadium
      @stadium = Stadium.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def stadium_params
      params.require(:stadium).permit(:name, :address, :image_url, :about)
    end
end
