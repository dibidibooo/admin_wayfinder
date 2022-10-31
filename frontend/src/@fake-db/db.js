import mock from './mock'

/* eslint-disable import/extensions */

// JWT
import './jwt'

// Table
import './data/extensions/good-table'
import './data/extensions/auto-suggest'
import './data/card/card-statistics'
import './data/card/card-analytics'

// Apps
import './data/apps/calendar'
import './data/apps/store'
import './data/apps/category'
import './data/apps/email'

// dashboard
import './data/dashboard/analytics'

// pages
import './data/pages/faq-data'
import './data/pages/knowledge-base'
import './data/pages/account-setting'
import './data/pages/profile-data'
import './data/pages/blog'
/* eslint-enable import/extensions */

mock.onAny().passThrough() // forwards the matched request over network
