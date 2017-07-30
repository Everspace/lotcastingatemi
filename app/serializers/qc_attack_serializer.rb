# frozen_string_literal: true

# app/serializers/qc_attack_serializer.rb
class QcAttackSerializer < ActiveModel::Serializer
  attributes :id, :name, :pool, :range, :damage, :overwhelming, :tags
  attributes :qc_attackable_id, :qc_attackable_type
end
