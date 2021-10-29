// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from '@rails/ujs'
import Turbolinks from 'turbolinks'
import * as ActiveStorage from '@rails/activestorage'
import 'channels'

// popover script
require('utilities/popover')
// autosearch filter and service script
require('utilities/service_search')
// infinity scroll script
require('utilities/infinite_scroll')
// accordion script
require('utilities/accordion')
// full Page Scroll script
require('utilities/pagescrolling')

Rails.start()
Turbolinks.start()
ActiveStorage.start()

window.Rails = Rails
