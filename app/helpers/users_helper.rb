module UsersHelper
  def link_to_avatar(user)
    if user.avatar.attached?
      polymorphic_url(user.avatar)
      # Rails.application.routes.url_helpers.polymorphic_url(user.avatar)
    else
      gravatar_image_url(user.email, size: 100)
      # image_tag('Unknowns_user_avatar.png')
      # polymorphic_url('Unknowns_user_avatar.png')
    end
  end

  def parsing_sex(user)
    user.sex == 2 ? 'female' : 'male'
  end
end
