return unless Rails.env.development?
User.delete_all

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


100.times do |index|
  User.create(name: Faker::Name.name_with_middle,
              email: Faker::Internet.unique.email,
              address: Faker::Address.unique.full_address,
              contact: rand(0..1).zero? ? Faker::PhoneNumber.cell_phone_with_country_code : '')
end

puts "Create #{User.count} uniq users"
