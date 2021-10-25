source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.2'

# Use Active Model has_secure_password
# Use Redis adapter to run Action Cable in production
# gem 'bcrypt', '~> 3.1.7'
# gem 'redis', '~> 4.0'
gem 'bootsnap', '>= 1.4.4', require: false
gem 'faker', :git => 'https://github.com/faker-ruby/faker.git', :branch => 'master'
gem 'faraday'
gem 'gravatar_image_tag', github: 'secretpray/gravatar_image_tag', branch: 'master'
gem 'image_processing', '~> 1.2'
gem 'jbuilder', '~> 2.7'
gem 'pagy'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'rails', '~> 6.1.4', '>= 6.1.4.1'
gem 'sass-rails', '>= 6'
gem 'turbolinks', '~> 5'
gem 'webpacker', '~> 5.0'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry', '~> 0.13.1'
  gem 'pry-byebug'
end

group :development do
  gem 'listen', '~> 3.3'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'spring'
  gem 'web-console', '>= 4.1.0'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
