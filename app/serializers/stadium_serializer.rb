class StadiumSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :image_url, :about
end
