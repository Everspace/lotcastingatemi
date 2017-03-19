class Character < ApplicationRecord
  has_many :merits,  dependent: :destroy
  has_many :weapons, dependent: :destroy
end
