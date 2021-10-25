require 'open-uri'
require 'faraday'
require 'json'

# return if Rails.env.production?
# TeamUser.delete_all
# Team.delete_all
# User.delete_all

EMAIL_REGEX_VALID = '/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i'
SEX_ARRAY = %w[male female]

def check_uniq(user, team)
  TeamUser.where(user_id: user.id, team_id: team.id).any?
end

def create_avatar(user, url = nil)
  downloaded_image = URI.parse(url).open rescue nil
  return if downloaded_image.nil?

  user.avatar.attach(io: downloaded_image, filename: user.name)
end

def get_email(user)
  user[:email].blank? ? Faker::Internet.unique.email : user[:email].match(EMAIL_REGEX_VALID).nil? ? Faker::Internet.unique.email : user[:email]
end

SEX_ARRAY.each do |subject|
  url = "https://uifaces.co/api?gender[]=#{subject}"
  response = Faraday.get(url, {a: 1}, {
    'Accept' => 'application/json',
    'X-API-KEY' => 'D9136472-2EBA45BF-B932DD5F-3487D4B1',
    'Cache-Control' => 'no-cache'
  })
  users = JSON.parse(response.body, symbolize_names: true)
  users.each do |usr|
    username = usr[:name].blank? ? Faker::Name.name_with_middle : usr[:name]
    sex = subject == "male" ? 1 : 2
    contact = rand(0..1).zero? ? Faker::PhoneNumber.cell_phone_with_country_code : ''
    user = User.create!(name: username,
                email: get_email(usr),
                address: Faker::Address.unique.full_address,
                contact: contact,
                age: rand(14..72),
                sex: sex ) # 1- male; 2 - female
    create_avatar(user, usr[:photo])
  end
end


5.times do |index|
  Team.create!(name: Faker::Company.name,
               project: Faker::Computer.stack,
                description: Faker::Company.catch_phrase)
end

while TeamUser.count < 10 do
  user = User.all.sample
  team = Team.all.sample
  next if check_uniq(user, team)

  TeamUser.create!(user: User.all.sample, team: Team.all.sample)
end

puts "Create #{User.count} uniq users (male: #{User.where(sex: 1).count}, female: #{User.where(sex: 2).count} )"
puts "Create #{Team.count} uniq teams"
puts "Create #{TeamUser.count} uniq teamusers"
