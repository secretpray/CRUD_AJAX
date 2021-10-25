return if Rails.env.production?

TeamUser.delete_all
Team.delete_all
User.delete_all

def check_uniq(user, team)
  TeamUser.where(user_id: user.id, team_id: team.id).any?
end

100.times do |index|
  User.create!(name: Faker::Name.name_with_middle,
              email: Faker::Internet.unique.email,
              address: Faker::Address.unique.full_address,
              contact: rand(0..1).zero? ? Faker::PhoneNumber.cell_phone_with_country_code : '')
end

10.times do |index|
  Team.create!(name: Faker::Company.name,
               project: Faker::Computer.stack,
                description: Faker::Company.catch_phrase)
end

while TeamUser.count < 30 do
  user = User.all.sample
  team = Team.all.sample
  next if check_uniq(user, team)

  TeamUser.create!(user: User.all.sample, team: Team.all.sample)
end

puts "Create #{User.count} uniq users"
puts "Create #{Team.count} uniq teams"
puts "Create #{TeamUser.count} uniq teamusers"
