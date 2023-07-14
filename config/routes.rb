Rails.application.routes.draw do
 root 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/homepage/fetch_data'
  put '/homepage/update_all'
  # Defines the root path route ("/")
  # root "articles#index"
  # get 'currency/index'
end
