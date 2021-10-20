Rails.application.routes.draw do
  resources :users
  root 'home#index'
end
