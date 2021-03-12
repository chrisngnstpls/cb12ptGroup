/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

 const isLoggedIn = require("../api/policies/isLoggedIn");
 const formCheck = require("../api/policies/formCheck");
const trainingCheck = require("../api/policies/trainingCheck");

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  //'account/signup':formCheck,
  'account/signup2':formCheck,
  'account/detailsuser':isLoggedIn,
  'account/trainer':isLoggedIn,
  'account/trainer2':trainingCheck,

};
