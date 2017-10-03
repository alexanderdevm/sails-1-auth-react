/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  // '/': {
  //   view: 'index'
  // },

  // 'GET /*': {
  //   fn: function (req, res) {
  //     //return res.send('req', req);
  //     console.log('req', req.url);
  //     return res.ok();
  //   },
  //   skipAssets: false
  // },

  'GET /*': {
    fn: function (req, res, next) {
      if (req.path.match(/\..*/g)) {
        return next();
      } else {
        return res.view('index');
      }
    },
    skipAssets: true
  },

  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/
  'get /login': {
    view: 'login'
  },

  'post /_/login': 'UserController.loginLdap',

  '/_/logout': 'UserController.logout',

  'get /signup': {
    view: 'signup'
  }
};
