
var config = {};

//app info
config.app_name = 'app stream';
config.app_version = '1.0.0';
config.api_version = '1.0.0';
config.app_owner = '';
config.app_admin = '';

//filter settings
config.target = 'steemit';
config.streamer_app = 'ops';
config.db_engine = 'post-by-app';
config.app_match = 'common';
config.source_app = '';

//controller
config.app_state = 'on';
config.api_state = 'on';
config.api_mode = 'open';
config.subdomain = 'api';
config.guide_api = 'on';
config.db_setup = 'false';

//mysql settings - for future use
config.votes = true | false;
config.comments = true | false;
config.replies = true | false;
config.follow = true | false;
config.depth = 0;

module.exports = config;
